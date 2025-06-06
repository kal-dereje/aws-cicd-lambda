# Node.js Lambda Function with CodePipeline

This repository contains a Node.js Lambda function with AWS CodePipeline integration for continuous deployment.

## Repository Structure

- `lambda_function.js`: The main Lambda function code
- `package.json`: Node.js dependencies
- `template.yml`: CloudFormation template for infrastructure

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. GitHub account and repository
4. GitHub Personal Access Token with repo access
5. Node.js 18.x installed (for local development)

## Deployment Steps

1. **Create a GitHub repository**:
   - Create a new repository on GitHub
   - Clone the repository locally:
     ```bash
     git clone <your-github-repo-url>
     cd <repository-name>
     ```

2. **Initialize the repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Deploy the CloudFormation stack**:
   ```bash
   aws cloudformation create-stack \
     --stack-name lambda-pipeline \
     --template-body file://template.yml \
     --parameters \
       ParameterKey=GitHubToken,ParameterValue=<your-github-token> \
       ParameterKey=GitHubOwner,ParameterValue=<your-github-username> \
       ParameterKey=GitHubRepo,ParameterValue=<your-repo-name> \
     --capabilities CAPABILITY_NAMED_IAM
   ```

4. **Wait for stack creation**:
   ```bash
   aws cloudformation wait stack-create-complete --stack-name lambda-pipeline
   ```

5. **Get stack outputs**:
   ```bash
   aws cloudformation describe-stacks --stack-name lambda-pipeline --query 'Stacks[0].Outputs'
   ```

## How It Works

1. **CodePipeline Stages**:
   - Source: Pulls code from GitHub
   - Build: Installs dependencies and creates a deployment package
   - Deploy: Uploads the package to S3 and updates Lambda

2. **When you push changes**:
   - The pipeline automatically triggers
   - Builds a new deployment package with dependencies
   - Updates the Lambda function

## Testing the Lambda Function

1. **Invoke the function**:
   ```bash
   aws lambda invoke \
     --function-name <LambdaFunctionName> \
     --payload '{"message": "Hello World"}' \
     response.json
   ```

2. **Check the response**:
   ```bash
   cat response.json
   ```

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Test locally**:
   ```bash
   node -e "require('./lambda_function').handler({message: 'Hello World'}, {getRemainingTimeInMillis: () => 1000}).then(console.log)"
   ```

## Cleanup

To delete all resources:
```bash
aws cloudformation delete-stack --stack-name lambda-pipeline
```

## Security Notes

1. Never commit your GitHub token to the repository
2. Store sensitive information in AWS Secrets Manager or Parameter Store
3. All AWS services are configured with least-privilege IAM roles #   a w s - c i c d - l a m b d a  
 