"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, Users, Image as ImageIcon, FolderTree, FileUp, Library } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'PDF Import', href: '/admin/products/import', icon: FileUp },
    { name: 'Categories', href: '/admin/collections', icon: FolderTree },
    { name: 'Media Library', href: '/admin/media', icon: Library },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-[#1e293b] text-white flex-shrink-0 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-20 shadow-2xl">
      <div className="h-16 flex items-center px-6 bg-[#0f172a] border-b border-gray-800">
        <Link href="/admin" className="font-serif text-xl font-bold tracking-wider text-orange-500">
          BHADOHI ARTS
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Workspace
        </p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-orange-500 text-white font-medium shadow-md' 
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        Bhadohi Arts Admin v2.0
      </div>
    </aside>
  );
}
