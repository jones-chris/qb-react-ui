# qb4j-ui [![Build Status](https://travis-ci.com/jones-chris/qb-react-ui.svg?branch=master)](https://travis-ci.com/jones-chris/qb-react-ui)

## Deployment
The cloudformation template in the `/cloudformation` directory can be used to create the following resources:
1. The `querybuilder4j.net` S3 bucket that hosts this project's React build files as a static website.
2. The `www.querybuilder4j.net` S3 bucket that redirects traffic to the `querybuilder4j.net` S3 bucket.
3. A bucket policy for the `querybuilder4j.net` and `www.querybuilder4j.net` S3 buckets to allow public read access.
4. A Route53 hosted zone for the `querybuilder4j.net` registered domain.
5. 2 Route53 Alias record sets to direct traffic for the `querybuilder4j.net` domain to the `querybuilder4j.net` S3 bucket
   and for the `www.querybuilder4j.net` domain to the `www.querybuilder4j.net` S3 bucket.
   
In the future, integrate GitHub Actions to build the React project with `npm build` and deploy the `/cloudformation/cloudformation.yaml`
file to AWS and load the React build files into the `querybuilder4j.net` S3 bucket with `aws s3 cp -r ./build s3://querybuilder4j.net`,
