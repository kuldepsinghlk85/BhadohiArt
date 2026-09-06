import React from 'react'
import Link from 'next/link'
import { auth, signOut } from '@/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800">Workspace Overview</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                {(session?.user?.name || session?.user?.email || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="text-gray-800 font-bold leading-none">{session?.user?.name || 'Administrator'}</p>
                <p className="text-gray-500 text-xs mt-1">{session?.user?.email}</p>
              </div>
            </div>
            
            <form action={async () => {
              "use server"
              await signOut({ redirectTo: '/admin/login' })
            }}>
              <button className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors bg-red-50 px-3 py-1.5 rounded-md border border-red-100">
                Logout
              </button>
            </form>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
