data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_lambda-${var.name}"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_lambda_function" "lambda" {
  architectures = ["x86_64"]
  filename      = "${path.module}/lambda.zip"
  function_name = var.name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = var.handler
  memory_size   = var.memory_size
  package_type  = "Zip"
  runtime       = var.runtime
  timeout       = var.timeout
  tags = var.tags

  environment {
    variables = {
      LOG_GROUP_NAME = aws_cloudwatch_log_group.lambda_logs.name
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.name}"
  retention_in_days = 14
}

