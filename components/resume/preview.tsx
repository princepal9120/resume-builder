"use client";

export interface ResumePreviewProps {
  mode: "desktop" | "mobile";
}

export function ResumePreview({ mode }: ResumePreviewProps) {
  return (
    <div className={`flex-1 bg-white ${mode === "mobile" ? "w-[380px]" : "w-full"} mx-auto rounded-md shadow-md overflow-hidden`}>
      <div className="h-full w-full min-h-[842px] bg-white relative">
        {/* Sample Resume Preview Content */}
        <div className="p-8">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Charles Bloomberg</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
              <div>charlesbloomberg@wisc.edu</div>
              <div>(621) 799-5548</div>
              <div>New York, NY</div>
            </div>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <div className="text-emerald-600">linkedin.com/in/cbloomberg</div>
              <div className="text-emerald-600">charlesbloomberg.com</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase">Professional Summary</h2>
            <p className="text-sm text-gray-700">
              Results-driven Senior Frontend Developer with 7+ years of experience creating responsive, user-centered web applications. 
              Specializing in React and modern JavaScript frameworks with a strong focus on performance optimization and accessibility. 
              Proven track record of reducing load times by 40% and improving user engagement metrics through intuitive UI/UX design.
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase">Experience</h2>
            
            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-base font-semibold text-gray-800">Marketing Analyst</h3>
                <span className="text-sm text-gray-600">May 2023 - Present</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Google</span>
                <span className="text-gray-600">New York, NY</span>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                <li>Organized and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software.</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase">Education</h2>
            
            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-base font-semibold text-gray-800">Bachelor of Science in Economics</h3>
                <span className="text-sm text-gray-600">2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">University of Wisconsin, Madison</span>
                <span className="text-gray-600">Madison, WI</span>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <span className="font-medium">Minor:</span> Mathematics
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <span className="font-medium">GPA:</span> 3.82
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase">Skills</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">JavaScript</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">React</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">TypeScript</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">HTML/CSS</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Node.js</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Git</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">UI/UX Design</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Agile</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Communication</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">Problem Solving</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}