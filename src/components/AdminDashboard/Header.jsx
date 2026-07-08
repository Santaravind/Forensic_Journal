import React from "react";
import { Menu, Search, Bell, IdCard, ChevronDown, Calendar, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="flex items-center gap-4 px-6 py-4">
        <button className="text-slate-400 hover:text-slate-600">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete overview and control of the Forensic Patrika system.
          </p>
        </div>

        <div className="flex-1 max-w-md relative ml-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search users, manuscripts, journals, etc..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button className="relative text-slate-500 hover:text-slate-700">
            <Bell size={20} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              12
            </span>
          </button>

          <button className="hidden md:flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <IdCard size={16} className="text-indigo-500" />
            Certificates
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={18} className="text-indigo-500" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                System Admin
              </p>
              <p className="text-xs text-slate-400 leading-tight">
                Super Administrator
              </p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-end px-6 pb-3">
        <span className="flex items-center gap-1.5 text-xs text-slate-400 border border-slate-200 rounded-lg px-3 py-1">
          <Calendar size={12} />
          18 May 2026
        </span>
      </div>
    </header>
  );
}
