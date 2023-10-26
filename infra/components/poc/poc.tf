data "aws_cloudfront_cache_policy" "cloudfront_cache_policy_managed_caching_disabled" {
  name = "Managed-CachingDisabled"
}

module "lambda_poc" {
  source  = "../../modules/lambda"
  name    = "poc-rest-api"
  handler = "server.handler"
}

module "api_gateway_poc" {
  source = "../../modules/api_gateway"
  name   = "poc-rest-api"
  lambda = module.lambda_poc
}

module "cloudfront_poc" {
  source                 = "../../modules/cloudfront"
  region                 = "us-east-1"
  description            = "POC API Rest"
  ordered_cache_behavior = []
  origins_custom         = [module.api_gateway_poc]

  default_cache_behavior = {
    cache_policy_id             = data.aws_cloudfront_cache_policy.cloudfront_cache_policy_managed_caching_disabled.id
    origin_request_policy_id    = null
    target_origin_id            = module.api_gateway_poc.id
    lambda_function_association = []
    function_association        = []
  }
}
