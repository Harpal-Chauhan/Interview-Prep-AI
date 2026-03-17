import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashbordLayout from '../../components/Layout/DashbordLayout';
import moment from 'moment';
import RoleInfoHeader from './components/RoleInfoHeader';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstanse';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionCard from '../../components/Cards/QuestionCard';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
import { toast } from 'react-hot-toast';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';

const InterViewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by sessionId
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //  Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg('');
      setExplanation(null);

      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      });

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg('Failed to generate explanation, try again');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //  Pin Question
  const toggleQuestionPinSatus = async (questionId) => {
    try {
      await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));

      // UI update
      setSessionData((prev) => {
        const updatedQuestions = prev.questions
          .map((q) => (q._id === questionId ? { ...q, isPinned: !q.isPinned } : q))
          .sort((a, b) => b.isPinned - a.isPinned);

        return {
          ...prev,
          questions: updatedQuestions,
        };
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //  Add More Questions to a Session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      // Should be arry like [{question, answer}, ...]
      const generatedQuestions = aiResponse?.data;

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success('Added more Q&A!!');
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Something went wrong, try again');
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);
  return (
    <DashbordLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <RoleInfoHeader
          role={sessionData?.role || ''}
          topicsToFocus={sessionData?.topicsToFocus || ''}
          experience={sessionData?.experience || '-'}
          questions={sessionData?.questions?.length || '-'}
          description={sessionData?.description || ''}
          lastUpdated={
            sessionData?.updatedAt ? moment(sessionData.updatedAt).format('Do MMM YYYY') : ''
          }
        />

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Interview Q&A
          </h2>

          <div className="grid grid-cols-12 gap-4">
            <div
              className={`col-span-12 ${
                openLeanMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'
              } space-y-4`}
            >
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 100,
                        delay: index * 0.1,
                        damping: 15,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                    >
                      <>
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() => generateConceptExplanation(data.question)}
                          isPinned={data?.isPinned}
                          onTogglePin={() => toggleQuestionPinSatus(data._id)}
                        />

                        {!isLoading && sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-4">
                            <button
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}
                              {''}
                              Load More
                            </button>
                          </div>
                        )}
                      </>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            <div className="p-4 space-y-4">
              {errorMsg && (
                <p className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                  <LuCircleAlert className="mt-0.5 flex-shrink-0" size={18} />
                  <span>{errorMsg}</span>
                </p>
              )}

              {isLoading && <SkeletonLoader />}
              {!isLoading && explanation && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                  <AIResponsePreview content={explanation?.explanation} />
                </div>
              )}
            </div>
          </Drawer>
        </div>
      </div>
    </DashbordLayout>
  );
};

export default InterViewPrep;
