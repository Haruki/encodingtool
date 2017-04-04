var jschardet = require("jschardet")
var iconv = require("iconv-lite")
// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFileSync(filename, function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  //console.log(data);
  var detectedEncoding = jschardet.detect(data).encoding;
  console.log('Detected: ' + detectedEncoding);
});
var newFileName = filename + '_iso-8859-1.txt';
// Convert encoding streaming example
fs.createReadStream(filename)
    .pipe(iconv.decodeStream('utf8'))
    .pipe(iconv.encodeStream('ISO-8859-1'))
    .pipe(fs.createWriteStream(newFileName));
