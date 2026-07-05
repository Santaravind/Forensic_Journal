import Sidebar from "../editorDashboard/Sidebar";
import Navbar from "../editorDashboard/Navbar";
import StatsSection from "../editorDashboard/StatsSection";
import ManuscriptTable from "../editorDashboard/ManuscriptTable";
import SubmissionTrend from "../editorDashboard/SubmissionTrend";
import RecentActivity from "../editorDashboard/RecentActivity";
import QuickActions from "../editorDashboard/QuickActions";

export default function EditorDashboard() {
  return (
    <div className="h-screen flex bg-[#F6F8FC] overflow-hidden mt-0.5">
      {/* Sidebar */}
      <Sidebar/>

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