import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
  const {setSearchFilter, setIsSearched} = useContext(AppContext)
  
  const titleRef = useRef(null)
  const locationRef = useRef(null)
  
  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    })
    setIsSearched(true)
  }
  
  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
        
        <div className='flex items-center justify-between bg-white rounded-xl text-gray-600 max-w-xl mx-4 sm:mx-auto shadow-lg border border-gray-100'>
          <div className='flex items-center flex-1 pl-4'>
            <img className='h-4 sm:h-5 mr-3' src={assets.search_icon} alt="" />
            <input 
              type="text"
              placeholder='Search for jobs'
              className='max-sm:text-xs p-2 rounded outline-none w-full text-gray-700 placeholder-gray-400'
              ref={titleRef}
            />
          </div>
          
          <div className='flex items-center flex-1 border-l border-gray-200 pl-4'>
            <img className='h-4 sm:h-5 mr-3' src={assets.location_icon} alt="" />
            <input 
              type="text"
              placeholder='Location'
              className='max-sm:text-xs p-2 rounded outline-none w-full text-gray-700 placeholder-gray-400'
              ref={locationRef}
            />
          </div>
          
          <button 
            onClick={onSearch} 
            className='bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-black font-semibold px-8 py-3 m-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50'
          >
            Search
          </button>
        </div>
      </div>
       
      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap items-center'>
          <p className='font-medium'>Trusted by</p>
          <img className='h-6' src={assets.microsoft_logo} alt="" />
          <img className='h-6' src={assets.walmart_logo} alt="" />
          <img className='h-6' src={assets.accenture_logo} alt="" />
          <img className='h-6' src={assets.samsung_logo} alt="" />
          <img className='h-6' src={assets.amazon_logo} alt="" />
          <img className='h-6' src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero