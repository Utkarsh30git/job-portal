import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import JobCard from '../components/JobCard';
import kconvert from 'k-convert';
import moment from 'moment';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [JobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply for jobs");
      }
      if (!userData.resume) {
        navigate('/applications');
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/user/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const checkAlreadyApplied = () => {
    if (!JobData || !JobData._id || !userApplications || userApplications.length === 0) {
      setIsAlreadyApplied(false);
      return;
    }

    const hasApplied = userApplications.some(item => 
      item && item.jobId && item.jobId._id === JobData._id
    );
    setIsAlreadyApplied(hasApplied);
  }

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    checkAlreadyApplied();
  }, [userApplications, JobData, id]);

  return JobData ? (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              {JobData.companyId?.image ? (
                <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={JobData.companyId.image} alt={JobData.companyId.name || "Company"} />
              ) : (
                <div className='h-24 w-24 bg-gray-300 rounded-lg p-4 mr-4 max-md:mb-4 border flex items-center justify-center text-gray-600 text-2xl font-bold'>
                  {JobData.companyId?.name ? JobData.companyId.name.charAt(0).toUpperCase() : 'C'}
                </div>
              )}
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId?.name || 'Company'}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC: {JobData.salary ? kconvert.convertTo(JobData.salary) : 'Not specified'}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button 
                onClick={applyHandler} 
                disabled={isAlreadyApplied}
                className={`p-2.5 px-10 rounded cursor-pointer transition-all duration-300 ${
                  isAlreadyApplied 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-[#0EA5E9] text-black hover:bg-[#0284C7] transform hover:scale-105'
                }`}
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className='mt-1 text-gray-600'>Posted {JobData.date ? moment(JobData.date).fromNow() : 'Recently'}</p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4'>Job description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description || 'No description available.' }}></div>
              <button 
                onClick={applyHandler} 
                disabled={isAlreadyApplied}
                className={`p-2.5 px-10 rounded mt-10 cursor-pointer transition-all duration-300 ${
                  isAlreadyApplied 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-[#0EA5E9] text-black hover:bg-[#0284C7] transform hover:scale-105'
                }`}
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>

            {/* Right Section More jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2 className='font-bold text-xl mb-4'>More Jobs from {JobData.companyId?.name || 'this Company'}</h2>
              <div className='space-y-4'>
                {jobs && jobs.length > 0 && jobs
                  .filter(job => job && job._id !== JobData._id && job.companyId && job.companyId._id === JobData.companyId?._id)
                  .filter(job => {
                    if (!userApplications || userApplications.length === 0) return true;
                    // Set of applied jobIds
                    const appliedJobIds = new Set(userApplications
                      .filter(app => app && app.jobId && app.jobId._id)
                      .map(app => app.jobId._id));
                    // Return true if the user has not applied for this job
                    return !appliedJobIds.has(job._id);
                  })
                  .slice(0, 4)
                  .map((job, index) => <JobCard key={job._id || index} job={job} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob