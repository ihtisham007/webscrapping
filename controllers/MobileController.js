const axios = require('axios');

const companiesModel = require('./../models/companies');

const getMobileData = async (req, res) =>{
    
    console.log(req.session.name);
    const getAllCompaines = await companiesModel.find();
    res.render('companies', {data: getAllCompaines,user: req.session.name});
}  

const mobileBrandPage = async (req, res) => {
    const brand = req.params.id;
    const get = await axios.get(`http://localhost:3000/api/v1/mobile-company/${brand}`)
    console.log(get.data.data)
    res.render('companybrand', {brand: get.data.data,user: req.session.name})
}

const singleBrandPage  = async (req,res) =>{
    const singleMobile = req.params.id.toLowerCase();
    const singleProduct = await axios.get(`http://localhost:3000/api/v1/single-mobile/${singleMobile}`)
    res.render('singlecompanybrand', {data: singleProduct.data.data, user: req.session.name});
}

module.exports = {
    getMobileData,
    mobileBrandPage,
    singleBrandPage
}
