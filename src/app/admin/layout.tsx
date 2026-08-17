import React from 'react'
import Link from 'next/link'
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If there's no session, it means they are on the /admin/login page
  // (because middleware protects all other /admin routes).
  // Return just the children so they don't see the admin header on the login page,
  // and this prevents the ERR_TOO_MANY_REDIRECTS loop!
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
      {/* Admin Header */}
      <header className="bg-[var(--color-brand-dark)] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin" className="font-serif text-xl font-bold">
            Bhadohi Arts Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/80">Welcome, {session?.user?.name || session?.user?.email}</span>
            <form action={async () => {
              "use server"
              await signOut({ redirectTo: '/admin/login' })
            }}>
              <button className="text-sm font-bold hover:text-[var(--color-brand-burgundy)] transition-colors">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Admin Secondary Nav */}
      <nav className="bg-white border-b border-[var(--color-brand-border)]">
        <div className="container mx-auto flex items-center gap-6 px-4 py-3 overflow-x-auto whitespace-nowrap">
          <Link href="/admin" className="text-sm font-bold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)]">Dashboard</Link>
          <Link href="/admin/products" className="text-sm font-bold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)]">Products</Link>
          <Link href="/admin/orders" className="text-sm font-bold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)]">Orders</Link>
          <Link href="/admin/inquiries" className="text-sm font-bold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)]">Inquiries</Link>
          <Link href="/admin/users" className="text-sm font-bold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)]">Users</Link>
          <Link href="/admin/portfolio-slider" className="text-sm font-bold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)]">Portfolio Slider</Link>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
