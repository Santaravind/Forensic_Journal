import React from 'react'
import Sidebar from '../components/reviewerDashboard/Sidebar'
import Navbar from '../components/reviewerDashboard/Navbar'
import StatsSection from '../components/reviewerDashboard/StatsSection'
import ReviewCalender from '../components/reviewerDashboard/ReviewCalender'
import RecentActivity from '../components/reviewerDashboard/RecentActivity'
import QuickActions from '../components/reviewerDashboard/QuickActions'
import ManuscriptTable from '../components/reviewerDashboard/ManuscriptTable'

function ReviewerDashboards() {
  return (<>
    <div className="h-screen flex bg-[#f7f8fc]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <Navbar />

        <div className="p-6">
          <h1 className="text-4xl font-bold text-[#171c44]">
            Welcome Back, Dr. Reviewer 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Here's what's happening with your reviews today.
          </p>

          <StatsSection />

          <div className="mt-6">
            <ManuscriptTable />
          </div>

          <div className="grid grid-cols-3 gap-5 mt-6">
            <RecentActivity />
            <ReviewCalender />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ReviewerDashboards