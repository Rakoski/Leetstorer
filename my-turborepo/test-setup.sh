#!/bin/bash
export NODE_ENV=test
export API_URL=http://localhost:4001/graphql
export MONGODB_URI=mongodb://localhost:27017/testdb

docker-compose up -d test-mongodb
npm run start:api