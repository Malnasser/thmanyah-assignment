resource "aws_instance" "ssm_bastion" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.private[0].id # Deploy in a private subnet
  vpc_security_group_ids = [aws_security_group.ssm_bastion.id]
  associate_public_ip_address = false # No public IP needed for SSM

  iam_instance_profile = aws_iam_instance_profile.ssm_bastion.name

  tags = {
    Name = "${var.project_name}-ssm-bastion"
  }
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_security_group" "ssm_bastion" {
  name        = "${var.project_name}-ssm-bastion-sg"
  description = "Security group for SSM Bastion host"
  vpc_id      = aws_vpc.main.id

  # Allow outbound traffic to RDS (PostgreSQL) and Redis
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    security_groups = [aws_security_group.elasticache.id]
  }

  # Allow outbound HTTPS for SSM agent communication
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-ssm-bastion-sg"
  }
}

resource "aws_iam_role" "ssm_bastion" {
  name = "${var.project_name}-ssm-bastion-role"

  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    Name = "${var.project_name}-ssm-bastion-role"
  }
}

resource "aws_iam_role_policy_attachment" "ssm_bastion" {
  role       = aws_iam_role.ssm_bastion.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_bastion" {
  name = "${var.project_name}-ssm-bastion-profile"
  role = aws_iam_role.ssm_bastion.name
}
