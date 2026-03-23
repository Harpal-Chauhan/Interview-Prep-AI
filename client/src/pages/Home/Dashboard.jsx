import React, { useEffect, useState } from 'react';
import DashbordLayout from '../../components/Layout/DashbordLayout';
import { useNavigate } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import axiosInstance from '../../utils/axiosInstanse';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import { CARD_BG } from '../../utils/data';
import moment from 'moment';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success('Session deleted successfully');
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashbordLayout>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-lg sm:text-xl md:text-2xl md:text-3xl font-bold text-white">Interview Sessions</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and practice your interview sessions</p>
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 
      text-white px-5 py-2.5 rounded-lg text-sm font-semibold 
      shadow-lg hover:scale-105 hover:shadow-xl transition"
        >
          <LuPlus className="text-lg" />
          Add Session
        </button>
      </div>

      {/* Sessions Container */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions?.length > 0 ? (
          sessions.map((data, index) => (
            <SummaryCard
              key={data._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ''}
              topicsToFocus={data?.topicsToFocus || ''}
              experience={data?.experience || '-'}
              questions={data?.questions?.length || '-'}
              description={data?.description || ''}
              lastUpdated={data?.updatedAt ? moment(data.updatedAt).format('Do MMMM YYYY') : ''}
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full text-center py-20">
            <h3 className="text-xl font-semibold text-gray-300">No Sessions Yet</h3>

            <p className="text-gray-500 mt-2 text-sm">
              Start by creating your first interview preparation session.
            </p>

            <button
              onClick={() => setOpenCreateModal(true)}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 
          text-white px-6 py-3 rounded-lg text-sm font-semibold transition"
            >
              Create Session
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={() => setOpenCreateModal(true)}
        className="md:hidden fixed bottom-6 right-6 flex items-center justify-center 
    w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 
    text-white shadow-xl hover:scale-110 transition"
      >
        <LuPlus className="text-xl" />
      </button>

      {/* Create Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Session"
      >
        <div className="text-center w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashbordLayout>
  );
}
