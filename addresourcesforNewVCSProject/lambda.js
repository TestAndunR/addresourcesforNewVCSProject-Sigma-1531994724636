let AWS = require('aws-sdk');
const sns = new AWS.SNS();
const ses = new AWS.SES();
const s3 = new AWS.S3();
const kinesis = new AWS.Kinesis();
const ddb = new AWS.DynamoDB.DocumentClient();
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    cognito_idp.listUsers({
        UserPoolId: "us-east-1_22P5Kpusb",
        Limit: "10"
    }, function (error, data) {
        if (error) {
            // implement error handling logic here
            console.log(error)
            throw error;
        }
        console.log(data)
        // your logic goes within this block
    });
    ddb.put({
        TableName: 'BTMenu',
        Item: {}
    }, function (err, data) {
        if (err) {
            //handle error
        } else {
            //your logic goes here
        }
    });

    kinesis.describeStream({
        StreamName: 'testcafe'
    }).promise()
        .then(data => {
            // your logic goes here
        })
        .catch(err => {
            // error handling goes here
        });
    s3.listObjects({
        'Bucket': 'btbucket.images',
        'MaxKeys': 10,
        'Prefix': ''
    }).promise()
        .then(data => {
            console.log(data);           // successful response
            /*
            data = {
             Contents: [
                {
                   ETag: "\\"70ee1738b6b21e2c8a43f3a5ab0eee71\\"",
                   Key: "example1.jpg",
                   LastModified: <Date Representation>,
                   Owner: {
                      DisplayName: "myname",
                      ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
                   },
                   Size: 11,
                   StorageClass: "STANDARD"
                },
                {...}
            */
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });
    ses.sendEmail({
        Destination: {
            ToAddresses: ['andun@adroitlogic.com'],
            CcAddresses: [],
            BccAddresses: []
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Hello from Git'
                }
            },
            Subject: {
                Data: 'Test VCS for Git'
            }
        },
        Source: 'kannangarar1993@gmail.com',
    }, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
    sns.publish({
        Message: '"Hello from another world"',
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                DataType: 'String',
                StringValue: 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: 'Alias'
            },
        },
        PhoneNumber: '+94770630943'
    }).promise()
        .then(data => {
            // your code goes here
        })
        .catch(err => {
            // error handling goes here
        });

    callback(null, 'Successfully executed');
}