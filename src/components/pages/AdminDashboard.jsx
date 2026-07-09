import React from "react";
import Sidebar from "../AdminDashboard/Sidebar";
import Header from "../AdminDashboard/Header";
import QuickActions from "../AdminDashboard/QuickActions";
import ManuscriptSummary from "../AdminDashboard/ManuscriptSummary";
import UserRolesDistribution from "../AdminDashboard/UserRolesDistribution";
import CertificatesIssued from "../AdminDashboard/CertificatesIssued";
import NotificationCenter from "../AdminDashboard/NotificationCenter";
import ManagementSection from "../AdminDashboard/ManagementSection";
import LearningResources from "../AdminDashboard/LearningResources";
import AchievementOverview from "../AdminDashboard/AchievementOverview";
import AchievementsLeaderboard from "../AdminDashboard/AchievementsLeaderboard";
import MonthlyActivityOverview from "../AdminDashboard/MonthlyActivityOverview";
import SystemInformation from "../AdminDashboard/SystemInformation";
 import StatsRow from "../AdminDashboard/StatsRow";
export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-sans mt-0.5">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Header />

        <div className="p-6 space-y-4">
          {/* Top stat cards */}
          <StatsRow />

          {/* Quick Actions + Manuscript Summary + User Roles + Certificates */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <QuickActions />
            <ManuscriptSummary />
            <UserRolesDistribution />
            <CertificatesIssued />
          </div>

          {/* Notification Center + 4 Management cards + Learning Resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
            <NotificationCenter />
            <ManagementSection />
            <LearningResources />
          </div>

          {/* Achievement Overview + Leaderboard + Monthly Activity + System Info */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <AchievementOverview />
            <AchievementsLeaderboard />
            <MonthlyActivityOverview />
            <SystemInformation />
          </div>
        </div>
      </main>
    </div>
  );
}
