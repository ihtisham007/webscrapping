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

//single page Scrapping
const getSingleBrandData = (req, res) =>{
    // URL of the webpage to scrape
    const getBrand = req.params.id.replaceAll(' ', '-');
    console.log(getBrand);
    const url = `https://www.91mobiles.com/${getBrand.toLowerCase()}-price-in-india`;

    // Make a GET request to the URL
    axios.get(url)
    .then(response => {
        // Load the HTML document into cheerio
        const $ = cheerio.load(response.data);

        const title = $('.h1_pro_head').text();
        const price = "Rs " + $('.big_prc').eq(1).text();
        const userRating = $('.ratpt').eq(0).text();
        const expertRating = $('.ratpt').eq(0).text();
        const specScore = $('.top_box div div').eq(0).text();
        const KeySpechtml = $('.spec_rvw_pnl').eq(5).html();
        const img         = $('#img_01').attr('src').slice(2);
        
        res
            .status(200)
            .json({
                "status": "success",
                data: {
                    title: title,
                    price: price,
                    userrating: userRating,
                    expertrating: expertRating,
                    specscore: specScore,
                    keyspcechtml: KeySpechtml,
                    image: "https://" + img
                }
            })
    })
    .catch(error => {
        console.error(`Error fetching ${url}: ${error}`);
    });
}

module.exports = {
    mobileCompaines,
    saveCompany,
    getBrandData,
    getSingleBrandData
}