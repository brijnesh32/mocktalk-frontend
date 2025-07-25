import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/SiderBar';
import UseForm from '../components/UseForm';
import CampaignContent from '../components/CampaignContent';
import AudienceContent from '../components/AudienceContent';
import ReportCard from '../components/ReportCard';

const InterviewBot = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4faff' }}>
        <Routes>
          <Route index element={<UseForm />} />
          <Route path="Ai-Bot" element={<CampaignContent />} />
          <Route path="Candidate-Reports" element={<AudienceContent />} /> {/* ✅ Add this line */}
          <Route path="report-Card" element={<ReportCard />} />
        </Routes>
      </div>
    </div>
  );
};

export default InterviewBot;
