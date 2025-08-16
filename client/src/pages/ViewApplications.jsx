import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  //  Function to fetch company Job Applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to Update job Application Status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Applications Found</p>
   </div>
    ) : (
      <div className="flex-1 container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-300">
                <th className="py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700">
                  #
                </th>
                <th className="py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700">
                  User name
                </th>
                <th className="py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700 hidden md:table-cell">
                  Job Title
                </th>
                <th className="py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700 hidden lg:table-cell">
                  Location
                </th>
                <th className="py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700">
                  Resume
                </th>
                <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-gray-700 hover:bg-gray-50">
                    <td className="py-3 px-2 sm:px-4 border-b border-gray-300 border-r  text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="py-3 px-2 sm:px-4 border-b border-gray-300 border-r  min-w-0">
                      <div className="flex items-center space-x-2">
                        <img
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 hidden sm:block"
                          src={applicant.userId.image}
                          alt=""
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {applicant.userId.name}
                          </p>
                          <p className="text-xs text-gray-500 md:hidden">
                            {applicant.jobId.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 border-b border-gray-300 border-r text-sm hidden md:table-cell">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-3 px-2 sm:px-4 border-b border-gray-300 border-r text-sm hidden lg:table-cell">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-3 px-2 sm:px-4 border-b border-gray-300 border-r">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        className="bg-blue-50 text-blue-600 px-2 sm:px-3 py-1 rounded inline-flex gap-1 sm:gap-2 items-center text-xs sm:text-sm hover:bg-blue-100 transition-colors"
                      >
                        <span className="hidden sm:inline">Resume</span>
                        <span className="sm:hidden">CV</span>
                        <img
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          src={assets.resume_download_icon}
                          alt=""
                        />
                      </a>
                    </td>
                    <td className="py-3 px-2 sm:px-4 border-b border-gray-300 relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-500 hover:text-gray-700 p-1 text-lg font-bold">
                            ⋯
                          </button>
                          <div className="z-10 hidden absolute right-0 top-0 mt-8 w-32 bg-white border border-gray-300 rounded-md shadow-lg group-hover:block">
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                              className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className={`inline-block ${applicant.status === 'Accepted' ? 'bg-green-100 text-green-600' : applicant.status === 'Rejected' ? 'bg-red-100 text-red-600': 'bg-blue-100 text-blue-600'} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
                          {applicant.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;