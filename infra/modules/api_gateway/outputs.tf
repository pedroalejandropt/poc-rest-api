output "id" {
  value = aws_apigatewayv2_api.api_gateway.name
}

output "domain_name" {
  value = substr(aws_apigatewayv2_api.api_gateway.api_endpoint, 8, -1)
}