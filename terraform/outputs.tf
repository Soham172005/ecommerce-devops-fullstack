output "public_ip" {
  description = "Public IP address of the EC2 instance."
  value       = aws_instance.ecommerce.public_ip
}

output "frontend_url" {
  description = "Frontend NodePort URL."
  value       = "http://${aws_instance.ecommerce.public_ip}:30000"
}

output "backend_url" {
  description = "Backend NodePort URL."
  value       = "http://${aws_instance.ecommerce.public_ip}:30080/api"
}
