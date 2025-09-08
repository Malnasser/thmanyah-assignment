variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "thmanyah-cms"
}

variable "db_username" {
  description = "Username for the RDS database"
  type        = string
  default     = "cmsadmin"
}

variable "db_password" {
  description = "Password for the RDS database"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Name of the RDS database"
  type        = string
  default     = "cmsdb"
}

variable "db_instance_type" {
  description = "RDS database instance type"
  type        = string
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  description = "Allocated storage for the RDS database (GB)"
  type        = number
  default     = 20
}
