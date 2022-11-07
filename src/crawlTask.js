const crawlUrls = require('./crawler');

const depth = 2;

async function crawl(paths, http) {
  const links = await crawlUrls(paths, depth, http);
  console.log('links:', links);
}

crawl(['htmls/1.html'], false)
  .then(() => crawl(['htmls/2.html', 'htmls/3.html'], false));
