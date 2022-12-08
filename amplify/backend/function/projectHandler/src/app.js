/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

let tableName = "todoTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}


const randomId = () => '#' + [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

/**********************
 * Example get method *
 **********************/

app.get('/projects', function (req, res) {
  // Add your code here
  const params = {
    TableName: tableName
  }
  docClient.scan(params, function (err, data) {
    if (err) return res.json({ err })
    res.json({ error: false, data })
  })
});

app.post('/projects', function (req, res) {
  // Add your code here

  const params = {
    TableName: tableName,
    // Key : 1,
    Item: {
      id: randomId(),
      descp: req.body.descp,
      status: req.body.status
    }

  }
  docClient.put(params, function (err, data) {
    if (err) return res.json({ err })
    res.json({ error: false, data })
  })
});


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
