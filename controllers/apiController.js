const axios = require('axios');
const cheerio = require('cheerio');
const companiesModel = require('./../models/companies');

//get all companies data
const mobileCompaines = async (req, res) =>{

    const getAllCompaines = await companiesModel.find();

    res
        .status(200)
        .json({
            status: 'success',
            data: getAllCompaines 
        })
}

//post companies data
const saveCompany = async (req,res) =>{

    const newCompany = req.body;
    const savedCompany = await companiesModel.create(newCompany);

    res
        .status(200)
        .json({
           'status': "success",
            data: savedCompany
        });
}

//Scrapping functions

//get brand scrape
const getBrandData = (req, res) =>{
    // URL of the webpage to scrape
    const getBrand = req.params.id;
    const url = `https://www.91mobiles.com/${getBrand}-mobile-price-list-in-india`;

    // Make a GET request to the URL
    axios.get(url)
    .then(response => {
        // Load the HTML document into cheerio
        const $ = cheerio.load(response.data);
        let data = [];

        // Iterate through each .finder_snipet_wrap element
        $('.finder_snipet_wrap').each((i, el) => {
            // Extract the image URL, price, and features
            const imageUrl = $(el).find('img').attr('src').slice(2);
            const price = $(el).find('.price').text().replace(/[\s\n]+/g, '');;
            const name = $(el).find('ul').text().replace(/\n+/g, '').trim();

            // Append the data to the object
            const tempdata = {
                image: "https://"+imageUrl,
                price: price,
                name: name
            };

            data.push(tempdata)
        });

        res
            .status(200)
            .json({
                "status": "success",
                data: data
            })
    })
    .catch(error => {
        console.error(`Error fetching ${url}: ${error}`);
    });
}

module.exports = {
    mobileCompaines,
    saveCompany,
    getBrandData
}