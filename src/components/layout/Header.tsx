"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, MessageCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { handleSignOut } from '@/actions/authActions';
import { WhatsAppInquiryModal } from '@/components/ecommerce/WhatsAppInquiryModal';

interface HeaderProps {
  user?: {
    id: string;
    role: string;
    name?: string | null;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { 
      label: 'COLLECTIONS', 
      href: '/collections', 
      hasDropdown: true,
      subLinks: [
        { label: 'All Collections', href: '/collections' },
        { label: 'Infinity', href: '/collections/infinity' },
      ]
    },
    { label: 'GRAND ROOM', href: '/grand-room' },
    { label: 'WALL-TO-WALL', href: '/wall-to-wall' },
    { label: 'PORTFOLIO', href: '/projects' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'CATALOGUE', href: '/catalogue' },
    { label: 'TRACK ORDER', href: '/track-order' },
    { label: 'CONTACT', href: '/contact' },
  ];

  if (!user) {
    navLinks.push({ label: 'LOGIN', href: '/admin/login' });
  } else if (user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.role === 'admin' || user.role === 'superadmin') {
    navLinks.push({ 
      label: 'ADMIN PANEL', 
      href: '/admin',
      hasDropdown: true,
      subLinks: [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Orders', href: '/admin/orders' },
        { label: 'Inquiries', href: '/admin/inquiries' }
      ]
    });
  } else {
    navLinks.push({ 
      label: 'MY ACCOUNT', 
      href: '/account',
      hasDropdown: true,
      subLinks: [
        { label: 'Dashboard', href: '/account' },
        { label: 'My Orders', href: '/account/orders' }
      ]
    });
  }

  const { items: cartItems, setIsOpen: setCartOpen } = useCartStore();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Top Bar for Admin / User Info */}
      <div className="bg-[var(--color-brand-dark)] text-white text-xs py-1.5 px-4 w-full z-50 relative flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="hidden sm:inline-block">Free Shipping Worldwide</span>
          </div>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-[var(--color-brand-cream)] font-bold">
                  Welcome, {user.name || user.role}
                </span>
                <span className="opacity-50">|</span>
                <form action={handleSignOut}>
                  <button type="submit" className="hover:text-[var(--color-brand-burgundy)] transition-colors">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/admin/login" className="hover:text-[var(--color-brand-burgundy)] transition-colors text-[var(--color-brand-muted)] hover:text-white font-bold">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-[var(--color-background)] border-b border-[var(--color-brand-border)]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo Left */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-center">
              <img src="/logo.png" alt="Bhadohi Arts Weave Logo" className="h-14 md:h-16 w-auto object-contain" />
            </Link>
          </div>

        {/* Desktop Navigation Center */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group py-6">
              <Link 
                href={link.href}
                className="text-sm font-sans font-medium text-[var(--color-foreground)] hover:text-[var(--color-brand-burgundy)] transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.hasDropdown && <span className="text-[10px] ml-0.5">▼</span>}
              </Link>
              
              {/* Desktop Dropdown */}
              {link.hasDropdown && link.subLinks && (
                <div className="absolute top-[100%] left-0 w-56 bg-white border border-[var(--color-brand-border)] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 py-2">
                  {link.subLinks.map(sub => (
                    <Link 
                      key={sub.label} 
                      href={sub.href} 
                      className="px-5 py-2.5 text-sm font-sans text-[var(--color-foreground)] hover:bg-[#FAF7F0] hover:text-[var(--color-brand-burgundy)] transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-[var(--color-foreground)] hover:text-[var(--color-brand-burgundy)] transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-[var(--color-foreground)] hover:text-[var(--color-brand-burgundy)] transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <div className="relative">
            <button onClick={() => setCartOpen(true)} className="text-[var(--color-foreground)] hover:text-[var(--color-brand-burgundy)] transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--color-brand-burgundy)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <button className="text-[var(--color-foreground)] hover:text-[var(--color-brand-burgundy)] transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <Button variant="default" size="default" className="ml-2" onClick={() => setIsInquiryModalOpen(true)}>
            GET QUOTE
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button className="text-[var(--color-foreground)]">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setCartOpen(true)} className="text-[var(--color-foreground)] relative">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--color-brand-burgundy)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button 
            className="text-[var(--color-foreground)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[var(--color-background)] border-b border-[var(--color-brand-border)] p-4 shadow-lg z-40 flex flex-col gap-4 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-[var(--color-brand-border)]">
                <div className="flex justify-between items-center pb-2">
                  <Link 
                    href={link.href}
                    className="text-base font-sans font-medium text-[var(--color-foreground)]"
                    onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <button 
                      onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                      className="p-1"
                    >
                      <span className="text-xs">{mobileDropdownOpen === link.label ? '▲' : '▼'}</span>
                    </button>
                  )}
                </div>
                {link.hasDropdown && mobileDropdownOpen === link.label && link.subLinks && (
                  <div className="flex flex-col gap-3 pb-3 pl-4 pt-2">
                    {link.subLinks.map(sub => (
                      <Link 
                        key={sub.label} 
                        href={sub.href}
                        className="text-sm font-sans text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1 justify-center gap-2" onClick={() => setIsInquiryModalOpen(true)}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button variant="default" className="flex-1 justify-center" onClick={() => setIsInquiryModalOpen(true)}>
              GET QUOTE
            </Button>
          </div>
        </div>
      )}
    </header>

      <WhatsAppInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)}
        message="Hi! I would like to get a quote or make a general inquiry."
      />
    </>
  );
}
