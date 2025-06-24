variable "gh_access_token" {
  type        = string
  description = "Github access token for ICharter web repository"
}

variable "app_environment_development" {
  type        = string
  description = "App environment development"
}
variable "app_environment_staging" {
  type        = string
  description = "App environment staging"
}

variable "app_environment_prod" {
  type        = string
  description = "App environment production"
}

variable "facebook_app_id" {
  type        = string
  description = "Faceebok app id "
}

variable "base_api_prod" {
  type        = string
  description = "base api url"
}

variable "base_api_staging" {
  type        = string
  description = "staging base api url"
}
variable "base_api_development" {
  type        = string
  description = "development base api url"
}
variable "s3_region" {
  type        = string
  description = "aws s3 region"
}

variable "s3_access_key_id" {
  type        = string
  description = "aws s3 access key"
}

variable "s3_secret_key" {
  type        = string
  description = "aws s3 secret key"
}

variable "s3_bucket" {
  type        = string
  description = "aws s3 secret key"
}

variable "fishes_api_host" {
  type        = string
  description = "fishes api host url"
}

variable "fishes_api_url" {
  type        = string
  description = "fishes api url"
}

variable "fishes_api_key" {
  type        = string
  description = "fishes api key"
}

variable "weather_api_url_prod" {
  type        = string
  description = "weather api url"
}

variable "weather_api_key_prod" {
  type        = string
  description = "weather api key"
}

variable "weather_api_url_staging" {
  type        = string
  description = "weather api url"
}

variable "weather_api_key_staging" {
  type        = string
  description = "weather api key"
}

variable "weather_api_url_development" {
  type        = string
  description = "weather api url"
}

variable "weather_api_key_development" {
  type        = string
  description = "weather api key"
}

variable "weather_icon_url" {
  type        = string
  description = "weather icon api url"
}

variable "google_maps_api_key" {
  type        = string
  description = "google maps production api key"
}

variable "bugsnag_api_key" {
  type        = string
  description = "bugsnag api key"
}


variable "stripe_api_key_development" {
  type        = string
  description = "stripe api key development"
}


variable "stripe_api_key_staging" {
  type        = string
  description = "stripe api key staging"
}

variable "stripe_api_key_prod" {
  type        = string
  description = "stripe api key production"
}


variable "client_mixpanel_token" {
  type        = string
  description = "mixpanel api key production ost client"
}


variable "oneseven_mixpanel_token" {
  type        = string
  description = "mixpanel api key production ost"
}

