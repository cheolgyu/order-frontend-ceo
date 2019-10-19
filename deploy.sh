#!/bin/bash

export AWS_ACCESS_KEY_ID="AKIAV7EF4KB4ISWZYIOV" 
export AWS_SECRET_ACCESS_KEY="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" 
export AWS_BUCKET_NAME="ceo.togo82.com" 
export AWS_CLOUDFRONT="E1Q9POMWC8XY61"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
gulp deploy