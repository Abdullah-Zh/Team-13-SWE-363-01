export function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-0 md:flex md:items-center md:justify-center md:p-8">
      <div className="min-h-screen w-full bg-white overflow-hidden md:min-h-0 md:max-w-[1440px] md:rounded-xl md:shadow-2xl">
        {/* Browser Top Bar */}
        <div className="hidden h-11 items-center gap-3 border-b border-gray-300 bg-gradient-to-b from-gray-200 to-gray-100 px-4 md:flex">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div className="flex-1 mx-4 h-7 bg-white rounded-md border border-gray-300 flex items-center px-3 gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-600">swecompass.io</span>
          </div>
        </div>
        
        {/* Application Content */}
        <div className="min-h-screen overflow-hidden md:h-[calc(100vh-160px)] md:min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}
