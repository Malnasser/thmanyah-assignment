resource "aws_ecr_repository" "cms_service" {
  name                 = "${var.project_name}/cms-service"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project_name}-ecr-cms-service"
  }
}
