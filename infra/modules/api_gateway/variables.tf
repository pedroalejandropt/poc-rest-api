variable "name" {
  type     = string
  nullable = false
}

variable "lambda" {
  type     = object({ name = string, invoke_arn = string })
  nullable = false
}

variable "tags" {
  type    = map(string)
  default = {}
}
