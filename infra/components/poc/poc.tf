data "aws_cloudfront_cache_policy" "cloudfront_cache_policy_managed_caching_disabled" {
  name = "Managed-CachingDisabled"
}

module "lambda_poc" {
  source  = "../../modules/lambda"
  name    = "poc-rest-api"
  handler = "server.handler"
}

module "lambda_net_poc" {
  source  = "../../modules/lambda"
  name    = "poc-net-rest-api"
  handler = "poc-net-api"
  runtime = "dotnet6"
}

module "api_gateway_poc" {
  source = "../../modules/api_gateway"
  name   = "poc-rest-api"
  lambda = module.lambda_poc
}

module "api_gateway_net_poc" {
  source = "../../modules/api_gateway"
  name   = "poc-net-rest-api"
  lambda = module.lambda_net_poc
}

module "cloudfront_poc" {
  source         = "../../modules/cloudfront"
  region         = "us-east-1"
  description    = "POC API Rest"
  origins_custom = [module.api_gateway_poc, module.api_gateway_net_poc]

  default_cache_behavior = {
    cache_policy_id             = data.aws_cloudfront_cache_policy.cloudfront_cache_policy_managed_caching_disabled.id
    origin_request_policy_id    = null
    target_origin_id            = module.api_gateway_poc.id
    lambda_function_association = []
    function_association        = []
  }

  ordered_cache_behavior = [
    {
      allowed_methods             = null
      cache_policy_id             = data.aws_cloudfront_cache_policy.cloudfront_cache_policy_managed_caching_disabled.id
      origin_request_policy_id    = null
      path_pattern                = "/todo*"
      target_origin_id            = module.api_gateway_net_poc.id
      lambda_function_association = []
      function_association        = []
    }
  ]
}
