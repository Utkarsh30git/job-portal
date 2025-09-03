

const AppDownload = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Content */}
          <div className="flex-1 p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get Our Mobile App
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Take your job search on the go! Download our mobile app and never miss out on great opportunities. Apply to jobs, get notifications, and manage your career from anywhere.
            </p>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-black font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download for iOS
              </button>
              
              <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-1 active:scale-95 border border-gray-200 flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Download for Android
              </button>
            </div>
            
            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
                <span>Instant notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
                <span>Easy application process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
                <span>Offline job browsing</span>
              </div>
            </div>
          </div>
          
          {/* Right Image - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 p-8 lg:p-12 justify-center items-center">
            <div className="relative">
              {/* Phone Mockup Frame */}
              <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                <div className="bg-white rounded-2xl overflow-hidden w-64 h-96 relative">
                  {/* Mobile Job Listing UI */}
                  <div className="w-full h-full bg-gray-50 p-3 overflow-hidden">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                      <h3 className="text-xs font-semibold text-gray-800">Job Dock</h3>
                      <div className="w-4 h-4 bg-[#0EA5E9] rounded-full"></div>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="bg-white rounded-lg p-2 mb-3 shadow-sm border">
                      <div className="text-xs text-gray-500">🔍 React Developer</div>
                    </div>
                    
                    {/* Job Cards */}
                    <div className="space-y-2">
                      {/* Job 1 */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">G</div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800">Frontend Developer</div>
                            <div className="text-xs text-gray-500">Google • Remote</div>
                          </div>
                        </div>
                        <div className="text-xs bg-[#0EA5E9] text-black px-2 py-1 rounded text-center font-medium">Apply</div>
                      </div>
                      
                      {/* Job 2 */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center">M</div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800">UI/UX Designer</div>
                            <div className="text-xs text-gray-500">Microsoft • New York</div>
                          </div>
                        </div>
                        <div className="text-xs bg-[#0EA5E9] text-black px-2 py-1 rounded text-center font-medium">Apply</div>
                      </div>
                      
                      {/* Job 3 */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">A</div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800">Full Stack Engineer</div>
                            <div className="text-xs text-gray-500">Apple • California</div>
                          </div>
                        </div>
                        <div className="text-xs bg-[#0EA5E9] text-black px-2 py-1 rounded text-center font-medium">Apply</div>
                      </div>
                      
                      {/* Job 4 */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center">N</div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800">DevOps Engineer</div>
                            <div className="text-xs text-gray-500">Netflix • Remote</div>
                          </div>
                        </div>
                        <div className="text-xs bg-[#0EA5E9] text-black px-2 py-1 rounded text-center font-medium">Apply</div>
                      </div>
                      
                      {/* Job 5 */}
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center">A</div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800">Product Manager</div>
                            <div className="text-xs text-gray-500">Amazon • Seattle</div>
                          </div>
                        </div>
                        <div className="text-xs bg-[#0EA5E9] text-black px-2 py-1 rounded text-center font-medium">Apply</div>
                      </div>
                    </div>
                    
                    {/* Bottom Navigation */}
                    <div className="absolute bottom-1 left-3 right-3 bg-sky-500 rounded-lg p-2 shadow-lg">
                    </div>
                  </div>
                  
                  {/* Phone UI Elements */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-900 rounded-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#0EA5E9] rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AppDownload