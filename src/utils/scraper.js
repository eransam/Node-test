const fs = require('fs').promises;
const axios = require('axios');
const url = require('url');
const cheerio = require('cheerio');

function log(p) {
  console.log(p);
}

function fetchUrl(siteUrl) {
  log(`Downloading: ${siteUrl}`);

  const promise = axios.get(siteUrl).then(r => r.data);
  promise.then(() => log(`Download completed: ${siteUrl}`))

  return promise;
}

//יקבל את הנתיב ויקרא אותו html יהיה שקר אז תמיד המשתנה  httpבדוג שלנו ה
async function scrapeLinks(pathUrl, depth, http) {
    const arrChildren =[];
    if (typeof(pathUrl) === 'object') {
        for (const iterator of pathUrl) {

            const html = await (http ? fetchUrl(iterator) : fs.readFile(iterator));

            // $ שבנתיב שהכנסנו ונכניס אותו למשתנה  html כאן אנו נטעין את הקובץ ה
              const $ = cheerio.load(html);
            
              let baseHref = $('base').attr('href');
              if (!baseHref) baseHref = iterator;
            
              $('a').map((i, a) => {
                //שווה לשמות הילדים href
                const href = a.attribs.href;
                arrChildren.push(href);
              });
              console.log("arrChildren224: " ,arrChildren);
            
            
              if (arrChildren.length<=depth) {
              return $('a').map((i, a) => {
                //שווה לשמות הילדים href
                const href = a.attribs.href;
                //הנתיב הראשית האבא baseHref
                // !!href במידה ויש ילדים
                // כך אנו נחזיר את האבא והילדים
            
                return !!href ? url.resolve(baseHref, href) : null;
              }).toArray()
              .filter(o => !!o);
            }
            
            return "";

            
        }

        
    }else{

        const html = await (http ? fetchUrl(pathUrl) : fs.readFile(pathUrl));

        // $ שבנתיב שהכנסנו ונכניס אותו למשתנה  html כאן אנו נטעין את הקובץ ה
          const $ = cheerio.load(html);
        
          let baseHref = $('base').attr('href');
          if (!baseHref) baseHref = pathUrl;
        
          $('a').map((i, a) => {
            //שווה לשמות הילדים href
            const href = a.attribs.href;
            arrChildren.push(href);
          });
          console.log("arrChildren222: " ,arrChildren);
        
        
          if (arrChildren.length<=depth) {
          return $('a').map((i, a) => {
            //שווה לשמות הילדים href
            const href = a.attribs.href;
            //הנתיב הראשית האבא baseHref
            // !!href במידה ויש ילדים
            // כך אנו נחזיר את האבא והילדים
        
            return !!href ? url.resolve(baseHref, href) : null;
          }).toArray()
          .filter(o => !!o);
        }
        
        return "";
        }



    }
    



module.exports = scrapeLinks;
