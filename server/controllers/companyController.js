
// Register a new company

import Company from "../models/Company";
import bcrypt from "bcrypt";

 export const registerCompany = async (req, res) => {

    const { name, email,  password } = req.body;

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile) {
        return res.json({success:false, message:'Missing Details'});

    }

    try{

        const companyExists = await Company.findOne({ email });

        if(companyExists) {
            return res.json({success:false, message:'Company already registered'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newCompany = new Company({
            name,
            email,
            hashedPassword,
            image: imageFile.path
        });

        await newCompany.save();

        return res.json({success:true, message:'Company registered successfully'});

    } catch (error){

    }
    

}

// Company login
 export const loginCompany = async (req, res) => {

}

// Get company data
export const getCompanyData = async (req, res) => {

}

// Post a new job
export const postJob = async (req, res) => {


}

// Get company job Applicants
export const getCompanyJobApplicants = async (req, res) => {

}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {

}

// Change Job Application Status
export const changeJobApplicationsStatus = async (req, res) => {
 
}

//  Change job visibility
export const changeVisibility = async (req, res) => {

}
