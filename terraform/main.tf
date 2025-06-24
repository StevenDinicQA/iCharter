terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.9.0"
    }
  }
  backend "s3" {
    bucket = "icharter-terraform-state"
    key    = "production/amplify/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = "us-east-1"
}


data "aws_acm_certificate" "amazon_issued" {
  domain      = "*.icharterbooking.com"
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}

data "aws_route53_zone" "this" {
  name = "icharterbooking.com"
}



#Policy document specifying what service can assume the role
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["amplify.amazonaws.com"]
    }
  }
}


#IAM role providing permission to Amplify to deploy backend apps
resource "aws_iam_role" "amplify-backend" {
  name                = "amplifyconsole-backend-role"
  assume_role_policy  = join("", data.aws_iam_policy_document.assume_role.*.json)
  managed_policy_arns = ["arn:aws:iam::aws:policy/AdministratorAccess-Amplify"]
}

resource "aws_amplify_app" "iCharter" {
  name       = "iCharter"
  repository = "https://github.com/icharter-Team/icharterweb"
  access_token = var.gh_access_token
  iam_service_role_arn        = aws_iam_role.amplify-backend.arn
  enable_branch_auto_build    = true
  enable_auto_branch_creation = false
  enable_branch_auto_deletion = true
  platform                    = "WEB_COMPUTE"

   build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - nvm use $VERSION_NODE_16
            - yarn install
        build:
          commands:
            - nvm use $VERSION_NODE_16
            - echo __NEXT_PRIVATE_PREBUNDLED_REACT=next >> .env.production
            - echo __NEXT_PRIVATE_PREBUNDLED_REACT_DOM=next >> .env.production
            - yarn run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
    EOT

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"  
  }

}

# Development Branch
resource "aws_amplify_branch" "staging" {
  app_id                      = aws_amplify_app.iCharter.id
  branch_name                 = "staging"
  enable_auto_build           = true
  framework                   = "Next.js - SSR"
  stage                       = "DEVELOPMENT"
  enable_notification         = false
  enable_performance_mode     = false
  enable_pull_request_preview = true
  environment_variables = {
    BASE_API  = var.base_api_staging  
    FACEBOOK_APP_ID = var.facebook_app_id
    S3_REGION = var.s3_region
    S3_ACCESS_KEY_ID = var.s3_access_key_id
    S3_SECRET_ACCESS_KEY = var.s3_secret_key
    S3_BUCKET = var.s3_bucket
    FISHES_API_HOST= var.fishes_api_host
    FISHES_API_URL= var.fishes_api_url
    FISHES_API_KEY= var.fishes_api_key
    WEATHER_API_URL= var.weather_api_url_staging
    WEATHER_API_KEY= var.weather_api_key_staging
    WEATHER_ICON_URL= var.weather_icon_url
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY= var.google_maps_api_key
    BUGSNAG_API_KEY = var.bugsnag_api_key
    NEXT_PUBLIC_STRIPE_API_KEY = var.stripe_api_key_staging
    NEXT_PUBLIC_APP_ENVIRONMENT = var.app_environment_staging
  }
}

resource "aws_amplify_branch" "production" {
  app_id                      = aws_amplify_app.iCharter.id
  branch_name                 = "main"
  framework                   = "Next.js - SSR"
  stage                       = "PRODUCTION"
  enable_auto_build           = true
  environment_variables = {
    BASE_API  = var.base_api_prod
    FACEBOOK_APP_ID = var.facebook_app_id
    S3_REGION = var.s3_region
    S3_ACCESS_KEY_ID = var.s3_access_key_id
    S3_SECRET_ACCESS_KEY = var.s3_secret_key
    S3_BUCKET = var.s3_bucket
    FISHES_API_HOST= var.fishes_api_host
    FISHES_API_URL= var.fishes_api_url
    FISHES_API_KEY= var.fishes_api_key
    WEATHER_API_URL= var.weather_api_url_prod
    WEATHER_API_KEY= var.weather_api_key_prod
    WEATHER_ICON_URL= var.weather_icon_url
    BUGSNAG_API_KEY = var.bugsnag_api_key
    NEXT_PUBLIC_STRIPE_API_KEY = var.stripe_api_key_prod
    MIXPANEL_TOKEN = var.client_mixpanel_token
    OST_MIXPANEL = var.oneseven_mixpanel_token
    NEXT_PUBLIC_APP_ENVIRONMENT = var.app_environment_prod
  }
}

resource "aws_amplify_branch" "dev" {
  app_id                      = aws_amplify_app.iCharter.id
  branch_name                 = "development"
  enable_auto_build           = true
  framework                   = "Next.js - SSR"
  stage                       = "DEVELOPMENT"
  enable_notification         = false
  enable_performance_mode     = false
  enable_pull_request_preview = true
  environment_variables = {
    BASE_API  = var.base_api_development 
    FACEBOOK_APP_ID = var.facebook_app_id
    S3_REGION = var.s3_region
    S3_ACCESS_KEY_ID = var.s3_access_key_id
    S3_SECRET_ACCESS_KEY = var.s3_secret_key
    S3_BUCKET = var.s3_bucket
    FISHES_API_HOST= var.fishes_api_host
    FISHES_API_URL= var.fishes_api_url
    FISHES_API_KEY= var.fishes_api_key
    WEATHER_API_URL= var.weather_api_url_development
    WEATHER_API_KEY= var.weather_api_key_development
    WEATHER_ICON_URL= var.weather_icon_url
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY= var.google_maps_api_key
    BUGSNAG_API_KEY = var.bugsnag_api_key
    NEXT_PUBLIC_STRIPE_API_KEY = var.stripe_api_key_development
    NEXT_PUBLIC_APP_ENVIRONMENT = var.app_environment_development
  }
}


# Domain Association
# resource "aws_amplify_domain_association" "main" {
#   app_id      = aws_amplify_app.iCharter.id
#   domain_name = "icharterbooking.com"

#   sub_domain {
#     branch_name = aws_amplify_branch.production.branch_name
#     prefix      = ""
#   }
  
#   sub_domain {
#     branch_name = aws_amplify_branch.production.branch_name
#     prefix      = "www"
#   }

#   sub_domain {
#     branch_name = aws_amplify_branch.staging.branch_name
#     prefix      = "staging"
#   } 
 
# }