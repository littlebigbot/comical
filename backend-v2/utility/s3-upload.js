var aws = require('aws-sdk')
var config = require('../config/config')

// function defaultContentType(req, file, cb) {
//   setImmediate(function () {
//     var ct = file.contentType || file.mimetype || 'application/octet-stream'
//     cb(null, ct);
//   });
// }

module.exports = function (fileName, file, contentType) {
  aws.config.update({
    secretAccessKey: config.awsSecretAccessKey,
    accessKeyId: config.awsAccessKeyId,
    region: 'us-east-2',
    limits: { fileSize: 1000000, files: config.MAX_FILE_COUNT || 6 }
  })

  var s3bucket = new aws.S3({
    params: {
      Bucket: 'waywardrobot',
      ACL: 'public-read',
      ContentType: contentType || file.contentType
    }
  });

  var params = {Key: fileName, Body: file};

  return new Promise((resolve, reject) => {
    // TODO setting proper header for s3
    return s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('Error uploading data: ', err);
        return reject(err);
      } else {
        console.log('Successfully uploaded data to bucket');
        return resolve(data)
      }
    });
  });

}
