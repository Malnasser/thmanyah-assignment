resource "aws_security_group_rule" "rds_ingress_from_ssm_bastion" {
  type              = "ingress"
  from_port         = 5432
  to_port           = 5432
  protocol          = "tcp"
  security_group_id = aws_security_group.rds.id
  source_security_group_id = aws_security_group.ssm_bastion.id
  description       = "Allow PostgreSQL from SSM Bastion"
}

resource "aws_security_group_rule" "elasticache_ingress_from_ssm_bastion" {
  type              = "ingress"
  from_port         = 6379
  to_port           = 6379
  protocol          = "tcp"
  security_group_id = aws_security_group.elasticache.id
  source_security_group_id = aws_security_group.ssm_bastion.id
  description       = "Allow Redis from SSM Bastion"
}

resource "aws_security_group_rule" "elasticache_ingress_from_ecs_tasks" {
  type              = "ingress"
  from_port         = 6379
  to_port           = 6379
  protocol          = "tcp"
  security_group_id = aws_security_group.elasticache.id
  source_security_group_id = aws_security_group.ecs_tasks.id
  description       = "Allow Redis from ECS Tasks"
}
