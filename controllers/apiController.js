const axios = require('axios');
const cheerio = require('cheerio');
const companiesModel = require('./../models/companies');
const mobileModel    = require('./../models/mobile');

//get all companies data
const mobileCompaines = async (req, res) =>{

   // const getAllCompaines = await companiesModel.find();
    const getAllCompaines = [
        {
            "competitor": "Samsung"
        },
        {
            "competitor": "Vivo",
        },
        {
            "competitor": "OnePlus",
        },
        {
            "competitor": "Xiaomi",
        },
        {
            "competitor": "OPPO",
        }
    ]
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

    let data = [];
    // Make a GET request to the URL
    axios.get(url)
    .then( async response => {
        // Load the HTML document into cheerio
        const $ = cheerio.load(response.data);
        

        // Iterate through each .finder_snipet_wrap element
        $('.finder_snipet_wrap').each((i, el) => {
            // Extract the image URL, price, and features
            const imageUrl = $(el).find('img').attr('src').slice(2);
            const price = $(el).find('.price').text().replace(/[\s\n]+/g, '');;
            const name = $(el).find('ul').text().replace(/\n+/g, '').trim();
            const link = $(el).find('.hover_blue_link.name.gaclick').attr('href');

            // Append the data to the object
            let priceSet = price.slice(3).replace(',','')
            priceSet = parseFloat(priceSet);
            const tempdata = {
                brand: getBrand,
                image: "https://"+imageUrl,
                price:  priceSet,
                name: name,
                link: link
            };
            console.log(tempdata);
            data.push(tempdata)
            
        });

        await  mobileModel.deleteMany({brand: getBrand});
        await mobileModel.insertMany(data);
            
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
    let getBrand = req.params.id.replaceAll(' ', '-');
    getBrand = getBrand.replace('-5g','');
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

const searchSingleBrand = async (req,res) =>{
    const { name, searchBox, range } = req.query;
    console.log(`name ${req.query}`);

    const nameReg = new RegExp(`${name}`);
    const searchBoxReg = new RegExp(`${searchBox}`);

    let query = {}
    //for Name
    if(name.length >0 && searchBox.length === 0 && range === '0')
        query = {brand: {$regex: nameReg, $options: 'i'}}
    //Search Box
    else if(name.length === 0 && searchBox.length > 0 && range === '0')
        query = { name: {$regex: searchBoxReg, $options: 'i' }};
    //range
    else if(name.length === 0 && searchBox.length === 0 && range > '0') 
        query = { price: { $lte: range } };
    // name and search box
    else if(name.length > 0 && searchBox.length > 0 && range === '0')
        query = {brand: { $regex: nameReg,$options: 'i' },name: { $regex: searchBoxReg, $options: 'i' }};
    // name and range
    else if (name.length > 0 && searchBox.length === 0 && range > 0) 
        query = {name: { $regex: nameReg,$options: 'i' },price: { $lte: range }};
    //search box and range
    else if (name.length === 0 && searchBox.length > 0 && range > 0) 
        query = {name: { $regex: searchBoxReg,$options: 'i' },price: { $lte: range }};
    //all 
    else if (name.length > 0 && searchBox.length > 0 && range > 0) 
        query = {name: { $regex: searchBoxReg,$options: 'i' },brand: { $regex: nameReg,$options: 'i' },price: { $lte: range }};
    console.log(req.query);
//{brand: {$regex: nameReg,$options: 'i'}}
    try{
        let mobiles = []
        mobiles = await mobileModel.find(query)
        res
            .status(200)
            .json({
                status: "success",
                data: mobiles
            })
    }catch(error){

    }
}

module.exports = {
    mobileCompaines,
    saveCompany,
    getBrandData,
    getSingleBrandData,
    searchSingleBrand
}