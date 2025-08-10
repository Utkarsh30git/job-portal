import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {
  const navigate = useNavigate()

  return (
    <div className='flex-1 container mx-auto p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='w-full bg-white border border-gray-300'>
          <thead className='bg-gray-50'>
            <tr className='border-b border-gray-300'>
              <th className='py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700 hidden sm:table-cell'>#</th>
              <th className='py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700'>Job Title</th>
              <th className='py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700 hidden md:table-cell'>Date</th>
              <th className='py-3 px-2 sm:px-4 text-left border-r border-gray-300 text-sm font-medium text-gray-700 hidden lg:table-cell'>Location</th>
              <th className='py-3 px-2 sm:px-4 text-center border-r border-gray-300 text-sm font-medium text-gray-700'>Applicants</th>
              <th className='py-3 px-2 sm:px-4 text-center text-sm font-medium text-gray-700'>Visible</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {manageJobsData.map((job, index) => (
              <tr key={index} className='text-gray-700 hover:bg-gray-50'>
                <td className='py-3 px-2 sm:px-4 border-b border-gray-300 border-r  text-center text-sm hidden sm:table-cell'>{index + 1}</td>
                <td className='py-3 px-2 sm:px-4 border-b border-gray-300 border-r  min-w-0'>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-gray-900 truncate'>{job.title}</p>
                    <div className='md:hidden'>
                      <p className='text-xs text-gray-500'>{moment(job.date).format('ll')}</p>
                      <p className='text-xs text-gray-500 lg:hidden'>{job.location}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-4 border-b border-gray-300 border-r  text-sm hidden md:table-cell'>{moment(job.date).format('ll')}</td>
                <td className='py-3 px-2 sm:px-4 border-b border-gray-300 border-r  text-sm hidden lg:table-cell'>{job.location}</td>
                <td className='py-3 px-2 sm:px-4 border-b border-gray-300 border-r  text-center'>
                  <span className='inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                    {job.applicants}
                  </span>
                </td>
                <td className='py-3 px-2 sm:px-4 border-b border-gray-300 text-center'>
                  <div className='flex items-center justify-center'>
                    <input 
                      type="checkbox" 
                      defaultChecked={job.visible} 
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-6 flex justify-end'>
        <button 
          onClick={() => navigate('/dashboard/add-job')} 
          className='bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm font-medium'
        >
          Add new job
        </button>
      </div>
    </div>
  )
}

export default ManageJobs