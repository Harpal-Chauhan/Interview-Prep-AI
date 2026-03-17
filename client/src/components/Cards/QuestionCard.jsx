import React, { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../../pages/InterViewPrep/components/AIResponsePreview';

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 20);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div
        className={`group bg-white border border-gray-200 rounded-xl shadow-sm 
hover:shadow-lg transition-all duration-300 p-5 
${isExpanded ? 'bg-indigo-50/30 border-indigo-200' : ''}`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Question Section */}
          <div className="flex items-start gap-3 flex-1">
            {/* Q Badge */}
            <span
              className="flex items-center justify-center w-8 h-8 text-xs font-bold 
      bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full shadow-sm"
            >
              Q
            </span>

            {/* Question */}
            <h3
              onClick={toggleExpand}
              className="cursor-pointer text-gray-800 font-medium leading-relaxed 
        hover:text-indigo-600 transition-colors"
            >
              {question?.replace(/\.+$/, '').trim().endsWith('?')
  ? question.replace(/\.+$/, '')
  : question.replace(/\.+$/, '') + '?'}
            </h3>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 ${
                isExpanded ? 'md:flex' : 'md:hidden group-hover:flex'
              }`}
            >
              {/* Pin Button */}
              <button
                onClick={onTogglePin}
                className={`p-2 rounded-lg transition 
          ${
            isPinned
              ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
              : 'hover:bg-gray-100 text-gray-600 hover:text-indigo-600'
          }`}
              >
                {isPinned ? <LuPinOff /> : <LuPin />}
              </button>

              {/* Learn More Button */}
              <button
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
                className="flex items-center gap-1 text-xs font-semibold 
          bg-gradient-to-r from-indigo-500 to-purple-500 
          text-white px-3 py-1.5 rounded-full 
          hover:opacity-90 transition shadow-sm"
              >
                <LuSparkles size={14} />
                <span>Learn More</span>
              </button>
            </div>

            {/* Expand Button */}
            <button onClick={toggleExpand} className="p-2 rounded-lg hover:bg-gray-100 transition">
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 text-gray-600 ${
                  isExpanded ? 'rotate-180 text-indigo-600' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Answer Section */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-sm text-gray-700 leading-relaxed border-t pt-4"
          >
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
