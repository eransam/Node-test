const scrapeLinks = require('./utils/scraper');

// פרמטר ראשון זה הנתיב של
module.exports = function crawlUrls(paths, depth, http) {
  
    // As an example, the following extracts links from given website URL or file path
    scrapeLinks(paths,depth,http).then(console.log);
    // scrapeLinks('https://edition.cnn.com/', true).then(console.log);
  return [];
}


//     scrapeLinks('htmls/1.html', false).then(console.log);
