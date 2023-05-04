const companiesModel = require('./../models/companies');

const getMobileData = async (req, res) =>{

    const getAllCompaines = await companiesModel.find();
    res.render('companies', {data: getAllCompaines});
}  

const mobileBrandPage = (req, res) => {
    const brand = req.params.id;

    res.render('companybrand', {brand: brand})
}

module.exports = {
    getMobileData,
    mobileBrandPage
}
