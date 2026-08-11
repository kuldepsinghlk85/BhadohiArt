import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const totalProducts = await prisma.product.count();
  const totalCollections = await prisma.collection.count();
  const totalOrders = await prisma.order.count();
  const totalLeads = await prisma.lead.count();

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--color-brand-dark)] mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Quick Links Card */}
        <div className="bg-white p-6 border border-[var(--color-brand-border)] shadow-sm rounded-lg">
          <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)] mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/admin/products" className="text-[var(--color-brand-burgundy)] hover:underline flex items-center justify-between">
                <span>Manage Products</span>
                <span>→</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/collections" className="text-[var(--color-brand-burgundy)] hover:underline flex items-center justify-between">
                <span>Manage Collections</span>
                <span>→</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="text-[var(--color-brand-burgundy)] hover:underline flex items-center justify-between">
                <span>View Orders</span>
                <span>→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Stats Card */}
        <div className="bg-white p-6 border border-[var(--color-brand-border)] shadow-sm rounded-lg">
          <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)] mb-4">Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--color-brand-border)] pb-2">
              <span className="text-[var(--color-brand-muted)]">Total Products</span>
              <span className="font-bold text-[var(--color-brand-dark)]">{totalProducts}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-brand-border)] pb-2">
              <span className="text-[var(--color-brand-muted)]">Total Collections</span>
              <span className="font-bold text-[var(--color-brand-dark)]">{totalCollections}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-brand-border)] pb-2">
              <span className="text-[var(--color-brand-muted)]">Total Orders</span>
              <span className="font-bold text-[var(--color-brand-dark)]">{totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-brand-muted)]">New Leads</span>
              <span className="font-bold text-[var(--color-brand-dark)]">{totalLeads}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
