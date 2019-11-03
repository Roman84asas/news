const unirest = require('unirest');
const cheerio = require('cheerio');

async function parsePost(url) {

    return new Promise(async (resolve, reject) => {

        await unirest.get(url).end(({ body, error }) => {
            const $ = cheerio.load(body);

            const title = $('.c-article-title').text().trim();
            const text  = $('.c-article-content').text().trim();
            const time  = $('.c-article-meta__time').attr('datetime');
            const image = $('.media__img__obj').attr('src');


            const post = {
                title: title,
                image: image,
                text: text,
                time: time
            };

            if (error) {
                return reject(error);
            }
            resolve(post);
        });
    });
}

module.exports = parsePost;