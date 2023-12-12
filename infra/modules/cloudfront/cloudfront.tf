resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  comment = var.description
  price_class = "PriceClass_100"
  tags = var.tags

  dynamic "origin" {
    for_each = var.origins_custom
    content {
      domain_name = origin.value["domain_name"]
      origin_id   = origin.value["id"]

      custom_origin_config {
        http_port              = 80
        https_port             = 443
        origin_protocol_policy = "https-only"
        origin_ssl_protocols   = ["TLSv1.2"]
      }
    }
  }

  enabled = true

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "https-only"
    target_origin_id       = var.default_cache_behavior.target_origin_id

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = true
    }
  }

  dynamic "ordered_cache_behavior" {
    for_each = var.ordered_cache_behavior
    content {
      allowed_methods          = ordered_cache_behavior.value["allowed_methods"] == null ? ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"] : ordered_cache_behavior.value["allowed_methods"]
      cached_methods           = ["GET", "HEAD"]
      cache_policy_id          = ordered_cache_behavior.value["cache_policy_id"]
      compress                 = true
      origin_request_policy_id = ordered_cache_behavior.value["origin_request_policy_id"]
      path_pattern             = ordered_cache_behavior.value["path_pattern"]
      target_origin_id         = ordered_cache_behavior.value["target_origin_id"]
      viewer_protocol_policy   = "redirect-to-https"
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
