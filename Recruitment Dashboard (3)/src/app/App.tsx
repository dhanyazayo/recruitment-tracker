import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { PipelineDashboardPage } from './pages/PipelineDashboardPage';
import { VisualPipelinePage } from './pages/VisualPipelinePage';
import { CandidateVisibilityPage } from './pages/CandidateVisibilityPage';
import { ExecutiveDashboardPage } from './pages/ExecutiveDashboardPage';
import { SLABreakdownPage } from './pages/SLABreakdownPage';
import { AddCandidatePage } from './pages/AddCandidatePage';
import { RecruiterManagementPage } from './pages/RecruiterManagementPage';
import { CandidateListPage } from './pages/CandidateListPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PipelineDashboardPage />} />
          <Route path="/visual-pipeline" element={<VisualPipelinePage />} />
          <Route path="/candidates" element={<CandidateListPage />} />
          <Route path="/candidate/new" element={<AddCandidatePage />} />
          <Route path="/candidate-visibility" element={<CandidateVisibilityPage />} />
          <Route path="/executive-dashboard" element={<ExecutiveDashboardPage />} />
          <Route path="/sla-breakdown" element={<SLABreakdownPage />} />
          <Route path="/recruiters" element={<RecruiterManagementPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
