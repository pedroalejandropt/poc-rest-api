variable "name" {
  type     = string
  nullable = false
}

variable "handler" {
  type     = string
  nullable = false
}

variable "runtime" {
  type    = string
  default = "nodejs18.x"
}

variable "memory_size" {
  type    = string
  default = "128"
}

variable "timeout" {
  type    = string
  default = "30"
}
