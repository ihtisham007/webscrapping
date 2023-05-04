const companiesModel = require('./../models/companies');

const getMobileData = async (req, res) =>{

    const getAllCompaines = await companiesModel.find();
    res.render('companies', {data: getAllCompaines});
}  

module.exports = {
    getMobileData
}
