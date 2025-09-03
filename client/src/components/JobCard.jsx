import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-10 bg-white border border-gray-200 p-6 shadow-lg rounded-xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Top content */}
      <div>
        <div className="flex justify-between items-center">
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
            {job.companyId?.image ? (
              <img className="h-8" src={job.companyId.image} alt={job.companyId.name || "Company"} />
            ) : (
              <div className="h-8 w-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-semibold">
                {job.companyId?.name ? job.companyId.name.charAt(0).toUpperCase() : 'C'}
              </div>
            )}
          </div>
        </div>
        <h4 className="font-semibold text-xl mt-4 text-gray-900 group-hover:text-[#0EA5E9] transition-colors duration-300">
          {job.title}
        </h4>
        
        <div className="flex items-center gap-3 mt-3 text-xs">
          <span className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full font-medium">
            {job.location}
          </span>
          <span className="bg-green-50 border border-green-200 text-green-700 px-4 py-1.5 rounded-full font-medium">
            {job.level}
          </span>
        </div>
        
        <p 
          className="text-gray-600 text-sm mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.description ? job.description.slice(0, 150) : '' }}
        ></p>
      </div>
      
      {/* Bottom buttons */}
      <div className="mt-6 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`)
            scrollTo(0, 0)
          }}
          className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-black font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-3 focus:ring-blue-200"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`)
            scrollTo(0, 0)
          }}
          className="text-gray-600 border border-gray-300 hover:border-[#0EA5E9] hover:text-[#0EA5E9] rounded-lg px-6 py-2.5 hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 font-medium"
        >
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard