output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.cms_service.repository_url
}

output "db_instance_address" {
  description = "The address of the RDS database instance"
  value       = aws_db_instance.main.address
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}
