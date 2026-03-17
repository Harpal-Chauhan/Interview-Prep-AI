import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer 
  hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top Section */}
      <div
        className="flex items-start gap-4 p-4 rounded-xl"
        style={{ background: colors?.bgcolor || '#e8f4f1' }}
      >
        {/* Avatar */}
        <div
          className="w-14 h-14 flex items-center justify-center bg-white 
    rounded-xl font-semibold text-lg text-gray-800 shadow-sm border"
        >
          {getInitials(role)}
        </div>

        {/* Title + Skills */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">{role}</h2>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{topicsToFocus}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
            >
              <LuTrash2 className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Pills Section */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-full bg-gray-50">
          Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
        </span>

        <span className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-full bg-gray-50">
          {questions} Q&A
        </span>

        <span className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-full bg-gray-50">
          Updated: {lastUpdated}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-3">{description}</p>
    </div>
  );
};

export default SummaryCard;
