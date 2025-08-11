
import express from 'express';
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Register a company
router.post('/register',upload.single('image'), registerCompany);

// Company login
router.post('/login', loginCompany);

// Get company data
router.get('/company', getCompanyData);

// Post a new job
router.post('/post-job', postJob);

// Get company job Applicants
router.get('/applicants', getCompanyJobApplicants);

// Get Company Posted Jobs
router.get('/list-jobs', getCompanyPostedJobs);

// Change Job Application Status
router.patch('/change-status', changeJobApplicationsStatus);

//  Change job visibility
router.patch('/change-visibility', changeVisibility);

export default router;