const cheerio = require('cheerio');
const axios   = require('axios');


const index = async (req,res) =>{
    const url = `https://www.91mobiles.com/hub/category/news-2/`;

    // Make a GET request to the URL
    axios.get(url)
    .then( async response => {
        // Load the HTML document into cheerio
        const $ = cheerio.load(response.data);
        let data = [];

        $('.td-pb-span8.td-main-content .td-block-span6').each((i, el) => {
            const link = $(el).find('a').attr('href').split('/');
            const title = $(el).find('a').attr('title');
            const author =  $(el).find('.td-post-author-name a').text();
            const postDate =  $(el).find('.entry-date.updated.td-module-date').text();
            const img = $(el).find('img').attr('data-src');
            const news = $(el).find('.td-excerpt').text();

            const temp = {
                title: title,
                news: news,
                author: author,
                postDate: postDate,
                img: img,
                link: link[link.length-2]
            }
            console.log(temp);
            data.push(temp);

        });

        res.render('newsIndex', {data: data,user: req.session.name});
    });
}

const singleNews = async (req,res) =>{
    const getLink = req.params.id;
    const url = `https://www.91mobiles.com/hub/${getLink}`;
    console.log(url);
    // Make a GET request to the URL
    let data = {}
    axios.get(url)
    .then( async response => {
        // Load the HTML document into cheerio
        const $ = cheerio.load(response.data);
        const html = $('.td-pb-span8.td-main-content').html();
        data ={
            title: $('h1.entry-title').text(),
            html: html,
            img: $('img').attr('src'),

        } 
        console.log(data);
        res.render('singleNews', {data: data,user: req.session.name})

    });

}


module.exports ={
    index,
    singleNews
}