#!/bin/bash

# Find all the cloudformation templates.
find ./cicd/cloudformation -name "*.cloudformation.yaml" > ./cf_stacks.txt

while read line; do
  # Get the index of the file (ex:  "0" if the file name is `0.codebuild_pipeline.cloudformation.yaml`.
  INDEX=$(echo "$line" | awk -F . '{print $1}')

  # The 1st index should be the codebuild pipeline cloudformation template (named, for example, `0.codebuild_pipeline.cloudformation.yaml`).
  # If the file is the codebuild pipeline (the 1st index), then don't deploy because the pipeline should already exist and
  # be running this shell script.
  if [ "$INDEX" != "1" ]; then
    NAME=$(echo "$line" | awk -F . '{print $2}')

    aws cloudformation deploy --template-file "$line" --stack-name "$NAME" --capabilities CAPABILITY_NAMED_IAM
  fi;

done < ./cf_stacks.txt
