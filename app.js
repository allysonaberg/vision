var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var base64encoded
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});

//KAIROS STUFF
var Kairos = require('kairos-api')
var client = new Kairos('08a254e5', '315a6abdbd53264966354b7057afe853')

var params = {
  image: 'http://media.kairos.com/kairos-elizabeth.jpg',
};

//function detectLandmarks() {
client.detect(params).then(function(result) {
  console.log("RESULT: " + JSON.stringify(result, null, 2))
})
//}
// function base64_encode(form) {
//   var bitmap = fs.readFileSync(form);
//   base64encoded = bitmap.toString('base64')
//   //return new Buffer(bitmap.toString('base64'))
// } 

// module.exports = {
//   base64_encode: base64_encode,
//   detectLandmarks: detectLandmarks
// }