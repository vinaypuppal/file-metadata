var path = require('path')
var formidable = require('formidable')
var cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CAPI_CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})

module.exports = function router (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })
  app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiple = true
    form.onPart = function (part) {
      console.log(part)
      var stream = cloudinary.uploader.upload_stream(function (result) {
        res.send(result)
      })
      part.pipe(stream)
    }
    form.on('error', function (err) {
      console.log('An error has occured: \n' + err)
    })
    form.parse(req)
  })
}
