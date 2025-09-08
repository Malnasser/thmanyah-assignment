resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "Allow inbound access to RDS instance"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432 # PostgreSQL default port
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.ecs_tasks.id] # Allow ECS tasks to connect
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-rds-sg"
  }
}

resource "aws_db_instance" "main" {
  allocated_storage    = var.db_allocated_storage
  db_name              = var.db_name
  engine               = "postgres"
  engine_version       = "14"
  instance_class       = var.db_instance_type
  username             = var.db_username
  password             = random_password.db_password.result
  parameter_group_name = "default.postgres14"
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible  = false

  tags = {
    Name = "${var.project_name}-rds-instance"
  }
}
