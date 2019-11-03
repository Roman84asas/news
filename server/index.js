const parsePost = require('./parserPost');
const unirest = require('unirest');
const cheerio = require('cheerio');
const fs = require('fs');


const sleep = ms => new Promise(r => setTimeout(r, ms));

const parseLink = async ({ url, maxPage = 0, startWith = 0, delay = 1000 }) => {
    let urls = [];

    for (let page = startWith; page <= maxPage; page++) {
        await unirest.get(url.replace('{page}', page)).end(({ body }) => {
            const $ = cheerio.load(body);
            const domain   = url.match(/\/\/(.*?)\//)[1];

            $('.m-object__title__link').each( (i, e) =>  {
                urls.push('https://' + domain + $(e).attr('href'));
            });
        });
        await sleep(delay);
    }
    return urls;
};

const saveResult = json => {
    fs.writeFile('result.json', json, err => {
        console.log(err);
    })
};

parseLink({
    url: 'https://www.euronews.com/news/europe/united-kingdom'
}).then(async urls => {
    console.log(urls);
    let post = [];
    for (let i = 0; i < urls.length; i++) {
         post.push(await parsePost(urls[i]));
        saveResult(JSON.stringify(post, 0, 1))
    }
    /*console.log();*/
        /*.then(post => )
        .catch(e => console.log(e));*/
});


