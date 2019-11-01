const unirest = require('unirest');
const cheerio = require('cheerio');

async function parsePost(elems) {
    await unirest.get(elems.url)
        .end( ({ body }) => {
                const $ = cheerio.load(body);

                const title = $(elems.title).text().trim();
                const text  = $(elems.text).text().trim();
                const time  = $(elems.time).attr('datetime');
                const image = $(elems.image).attr('src');

                const post = {
                    title: title,
                    image: image,
                    text:  text,
                    time:  time
                };
                console.log(post)
            }
        );
}

module.exports = parsePost;