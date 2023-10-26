# POC App with AWS Lambda, TypeScript, and Terraform

This Proof of Concept (POC) application demonstrates the implementation of an AWS Lambda function with a RESTful API using Node.js and TypeScript. Additionally, Terraform is used to provision the necessary infrastructure, including CloudFront, Lambda, and API Gateway.

## Project Structure

```
.
├── lambda
│   ├── tsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── server.ts
│       └── ...
├── infra
│   ├── main.tf
│   ├── modules
│   |   ├── lambda
│   |   └── ...
│   ├── components
│   |   ├── poc
│   |   └── ...
│   └── ...
├── README.md
└── .gitignore
```

## Lambda Function

The `lambda` folder contains the TypeScript code for the Lambda function:

- `tsconfig.json`: Configuration file for TypeScript.
- `src/server.ts`: Lambda function logic. Customize this file to implement your desired functionality.

### Getting Started

1. Install dependencies:

   ```bash
   cd lambda
   npm install
   ```

2. Build TypeScript:

   ```bash
   npm run build
   ```

3. Deploy the Lambda function to AWS.

## Infrastructure with Terraform

The `infra` folder contains the Terraform configuration to set up the required AWS resources:

- `main.tf`: Main Terraform configuration file.
- `module/lambda/lambda.tf`: Lambda Module TF configuration file.
- `module/api_gateway/api_gateway.tf`: API Gateway Module TF configuration file.
- `module/cloudfront/cloudfront.tf`: Cloudfront Module TF configuration file.
- `../../variables.tf`: Input variables for each Terraform module or component.
- `../../outputs.tf`: Outputs variables for each Terraform module or component.

### Getting Started

1. Install Terraform:

   Follow the instructions in the [official documentation](https://learn.hashicorp.com/tutorials/terraform/install-cli) to install Terraform.

2. Initialize Terraform:

   ```bash
   cd infra
   terraform init
   ```

3. Format the Terraform configuration before create the infrastructure:

   ```bash
   terraform fmt
   ```

4. Plan the Terraform configuration to check what is new in the infrastructure:

   ```bash
   terraform plan
   ```

5. Apply the Terraform configuration to create the infrastructure:

   ```bash
   terraform apply
   ```

   Follow the prompts to confirm the changes.

## Cleaning Up

To remove the created resources, run the following command in the `infra` folder:

```bash
terraform destroy
```

Follow the prompts to confirm the deletion.

## Additional Notes

- Ensure you have AWS credentials configured locally to deploy the Lambda function and Terraform to interact with AWS.
- Customize the Lambda function (`src/server.ts`) according to your requirements.
- Always follow best practices for security, error handling, and performance when building real-world applications.

For more detailed information, consult the individual `README.md` files in the `lambda` and `infra` folders.