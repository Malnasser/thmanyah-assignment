resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "_!%^"
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name        = "${var.project_name}/db_credentials"
  description = "RDS database credentials for ${var.project_name}"
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id     = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = var.db_username
    password = random_password.db_password.result
    db_name  = var.db_name
    host     = aws_db_instance.main.address
    port     = aws_db_instance.main.port
  })
}
