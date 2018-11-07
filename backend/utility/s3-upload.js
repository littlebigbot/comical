var aws = require('aws-sdk')

module.exports = function (fileName, file, contentType) {
  aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    limits: { fileSize: 1000000, files: 1 }
  })

  var s3bucket = new aws.S3({
    params: {
      Bucket: process.env.AWS_BUCKET,
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
