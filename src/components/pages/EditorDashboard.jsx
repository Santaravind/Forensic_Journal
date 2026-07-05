import Sidebar from "../components/editorDashboard/Sidebar";
import Navbar from "../components/editorDashboard/Navbar";
import StatsSection from "../components/editorDashboard/StatsSection";
import ManuscriptTable from "../components/editorDashboard/ManuscriptTable";
import SubmissionTrend from "../components/editorDashboard/SubmissionTrend";
import RecentActivity from "../components/editorDashboard/RecentActivity";
import QuickActions from "../components/editorDashboard/QuickActions";

export default function EditorDashboard() {
  return (
    <div className="h-screen flex bg-[#F6F8FC] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-6">
          {/* Stats Cards */}
          <StatsSection />

          {/* Manuscript Table */}
          <div className="mt-6">
            <ManuscriptTable />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Submission Trend */}
            <div className="col-span-5">
              <SubmissionTrend />
            </div>

            {/* Recent Activity */}
            <div className="col-span-4">
              <RecentActivity />
            </div>

            {/* Quick Actions */}
            <div className="col-span-3">
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}