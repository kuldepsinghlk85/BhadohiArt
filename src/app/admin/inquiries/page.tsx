import React from 'react';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.quotation.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">WhatsApp Inquiries</h1>
      </div>

      <div className="bg-white border border-[var(--color-brand-border)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-[var(--color-brand-border)] text-[var(--color-brand-dark)]">
              <th className="p-4 font-bold text-sm">Date</th>
              <th className="p-4 font-bold text-sm">Customer</th>
              <th className="p-4 font-bold text-sm">Phone</th>
              <th className="p-4 font-bold text-sm">Details</th>
              <th className="p-4 font-bold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-[var(--color-brand-muted)]">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              inquiries.map(inq => (
                <tr key={inq.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                  <td className="p-4 text-sm align-top whitespace-nowrap">{format(new Date(inq.createdAt), 'MMM d, yyyy HH:mm')}</td>
                  <td className="p-4 text-sm font-bold text-[var(--color-brand-dark)] align-top">{inq.name}</td>
                  <td className="p-4 text-sm align-top">
                    {inq.phone}
                    <br />
                    <a href={`https://wa.me/${inq.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-xs mt-1 inline-block">
                      Message on WhatsApp
                    </a>
                  </td>
                  <td className="p-4 text-sm align-top">
                    <div className="whitespace-pre-wrap text-[var(--color-brand-muted)] max-w-lg">
                      {inq.message || inq.carpetType || 'No details provided'}
                    </div>
                  </td>
                  <td className="p-4 text-sm align-top">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                      inq.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                      inq.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      inq.status === 'QUOTED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
