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

module.exports = {
    mobileCompaines,
    saveCompany
}