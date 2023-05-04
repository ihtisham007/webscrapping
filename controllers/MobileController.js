const axios = require('axios');

const companiesModel = require('./../models/companies');

const getMobileData = async (req, res) =>{

    
    console.log(req.session);
    const getAllCompaines = await companiesModel.find();
    res.render('companies', {data: getAllCompaines});
}  

const mobileBrandPage = async (req, res) => {
    const brand = req.params.id;
    const get = await axios.get(`http://localhost:3000/api/v1/mobile-company/${brand}`)
    console.log(get.data.data)
    res.render('companybrand', {brand: get.data.data})
}

module.exports = {
    getMobileData,
    mobileBrandPage
}
