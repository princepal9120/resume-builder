import { useState } from 'react';

export default function ResumeCreationForm({ onClose, onSave }) {
  const [resumeName, setResumeName] = useState("Prince Pal");
  const [experience, setExperience] = useState("");
  const [targetResume, setTargetResume] = useState(false);
  
  const handleSave = () => {
    // Create a new resume object
    const newResume = {
      id: Math.floor(Math.random() * 10000),
      name: resumeName,
      experience: experience,
      isTargeted: targetResume,
      lastEdited: '1 minute ago'
    };
    
    // Call the onSave function with the new resume data
    if (onSave) {
      onSave(newResume);
    }
    
    // Close the modal
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    // Close the modal
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          <button className="bg-blue-500 px-4 py-1 rounded-md">RESUMES</button>
          <button className="text-gray-300 px-4 py-1">COVER LETTERS</button>
          <button className="text-gray-300 px-4 py-1">RESIGNATION LETTERS</button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
          </div>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
        </div>
      </div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Create a resume</h1>
            <button 
              className="text-white text-2xl" 
              onClick={handleCancel}
            >
              ×
            </button>
          </div>
          
          <div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                RESUME NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-blue-500 rounded-md focus:outline-none"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                EXPERIENCE
              </label>
              <div className="relative">
                <select
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <button
                type="button"
                className="flex items-center text-blue-400 font-medium"
              >
                IMPORT YOUR RESUME FROM LINKEDIN
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="py-4 border-t border-gray-700 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Target your resume</h2>
                <div className="relative">
                  <div 
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${targetResume ? 'bg-blue-500' : 'bg-gray-600'}`}
                    onClick={() => setTargetResume(!targetResume)}
                  >
                    <div 
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${targetResume ? 'translate-x-7' : 'translate-x-1'} mt-1`}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-gray-400 text-sm">
                  A targeted resume is a resume tailored to a specific job opening. 
                  You have a significantly higher chance of getting an interview 
                  when you make it clear you have the experience required for the job.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700 rounded-md"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-blue-500 rounded-md"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}