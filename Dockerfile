FROM node:10

WORKDIR /usr/src/app

ADD package.json ./
RUN npm install
RUN npm install --save-dev gulp gulp-awspublish gulp-cloudfront-invalidate-aws-publish concurrent-transform
RUN npm install -g gulp
COPY . .

EXPOSE 3334
