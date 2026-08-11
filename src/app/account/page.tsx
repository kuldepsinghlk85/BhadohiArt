import React from 'react';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/account');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="bg-[#FAF7F0] min-h-[80vh] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-4xl text-[var(--color-brand-dark)] mb-2">My Account</h1>
            <p className="text-[var(--color-brand-muted)]">Welcome back, {user.name || user.email}</p>
          </div>
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: '/login' })
          }}>
            <Button variant="outline" className="font-bold">
              Sign Out
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="md:col-span-1 space-y-2">
            <Link href="/account" className="block w-full text-left bg-[var(--color-brand-dark)] text-white px-4 py-3 font-bold text-sm">
              My Orders
            </Link>
            <Link href="/cart" className="block w-full text-left bg-white text-[var(--color-brand-dark)] border border-[var(--color-brand-border)] hover:bg-[#FAF7F0] px-4 py-3 font-bold text-sm transition-colors">
              My Cart
            </Link>
          </div>

          {/* Main Content: Orders */}
          <div className="md:col-span-3">
            <div className="bg-white border border-[var(--color-brand-border)] shadow-sm">
              <div className="p-6 border-b border-[var(--color-brand-border)]">
                <h2 className="font-bold text-xl text-[var(--color-brand-dark)]">Order History</h2>
              </div>
              
              <div className="p-0">
                {user.orders.length === 0 ? (
                  <div className="p-8 text-center text-[var(--color-brand-muted)]">
                    <p className="mb-4">You haven't placed any orders yet.</p>
                    <Link href="/collections">
                      <Button className="bg-[var(--color-brand-burgundy)] text-white hover:bg-[#5a1b24]">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF7F0] text-[var(--color-brand-dark)] border-b border-[var(--color-brand-border)]">
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Order ID</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Date</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Status</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Total</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.orders.map((order) => (
                          <tr key={order.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                            <td className="p-4 font-mono text-sm text-[var(--color-brand-muted)]">#{order.id.slice(-8).toUpperCase()}</td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">
                              <span className="font-bold text-[var(--color-brand-burgundy)]">{order.status}</span>
                            </td>
                            <td className="p-4 text-sm font-bold text-[var(--color-brand-dark)] text-right">
                              ₹{order.total.toLocaleString()}
                            </td>
                            <td className="p-4 text-right">
                              <Link href={`/account/orders/${order.id}`}>
                                <Button variant="outline" size="sm" className="h-8 text-xs font-bold">
                                  View / Track
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
