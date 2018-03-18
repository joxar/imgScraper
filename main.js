var fs = require('fs');
var client = require('cheerio-httpcli');
var config = require('config');
const PATH_TO_SAVE = config.OUTPUT.FILEPREFIX_TO_SAVE;
const PATH_TO_SCRAPE = config.INPUT.SCRAPE_FROM;
const FILE_EXT = '.png';

// setting of download manager
var count = 1;
client.download
.on('ready', function (stream) {
    var formattedCount = ('00' + count++).slice(-3);
    stream.pipe(fs.createWriteStream(PATH_TO_SAVE + formattedCount + FILE_EXT));
    console.log('Downloaded : ' + stream.url.href);
})
.on('error', function (err) {
    console.error('Could not download : ' + err.url + ' - ' + err.message);
})
.on('end', function () {
    console.log('Download is done!');
});

// num of processing of download
client.download.parallel = 4;

// start scraping
client.fetch(PATH_TO_SCRAPE, function (err, $, res, body) {
    $('img').download();
    console.log('OK!');
});
