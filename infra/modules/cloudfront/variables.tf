variable "ordered_cache_behavior" {
    type = list(object({
    allowed_methods          = list(string)
    cache_policy_id          = string
    origin_request_policy_id = string
    path_pattern             = string
    target_origin_id         = string
  }))
  nullable = false
}

variable "origins_custom" {
  type = list(object({
    id          = string
    domain_name = string
  }))
  nullable = false
}

variable "default_cache_behavior" {
  type = object({
    cache_policy_id            = string
    origin_request_policy_id   = string
    target_origin_id           = string
  })
}

variable "region" {
    type = string
    default = "eu-west-2"
}

variable "description" {
    type = string
    nullable = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
