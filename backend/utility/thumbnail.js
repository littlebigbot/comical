var sharp = require('sharp')
var request = require('request').defaults({encoding: null})
var s3Upload = require('./s3-upload')

module.exports = function (fileLocation) {
  return new Promise((resolve, reject) => {
    return request(fileLocation, (error, response, body) => {
      if(error) {
        return reject(error);
      }
      const thumbnail = sharp(body).resize(600).toFormat('jpeg')
      const originalFilename = fileLocation.split('/').slice(-1)[0];
      const filename = originalFilename.split('.')[0] + '-thumbnail.jpg'

      return resolve(s3Upload(filename, thumbnail, 'image/jpeg'));
    })
  })
}
