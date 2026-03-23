import React from 'react';

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div>
            <div>
              <div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg sm:text-xl md:text-2xl md:text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                    {role}
                  </h2>
                  <p className="text-sm text-indigo-500 font-medium"> {topicsToFocus}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <div className="bg-gray-50 px-3 py-1 rounded-full border">
              Experience: {experience} {experience == 1 ? 'year' : 'years'}
            </div>

            <div className="bg-gray-50 px-3 py-1 rounded-full border">{questions} Q&A</div>

            <div className="bg-gray-50 px-3 py-1 rounded-full border">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full" />
          <div className="w-3 h-3 bg-purple-500 rounded-full" />
          <div className="w-3 h-3 bg-pink-500 rounded-full" />
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
