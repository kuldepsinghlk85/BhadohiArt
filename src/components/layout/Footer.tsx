import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#FAF7F0] border-t border-[var(--color-brand-border)] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="text-2xl font-serif font-bold text-[var(--color-brand-burgundy)] leading-tight">
                BHADOHI<br/>ARTS<br/>WEAVE
              </div>
            </Link>
            <p className="text-[var(--color-brand-muted)] text-sm mb-6 leading-relaxed">
              Bhadohi Arts Weave brings you the finest range of Handmade, Handloom, Machine Made and Wall-to-Wall Carpets crafted with precision, passion and perfection.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)] transition-colors">
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)] transition-colors">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)] transition-colors">
                <FaYoutube className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)] transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm tracking-widest uppercase mb-6 text-[var(--color-brand-burgundy)]">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">Home</Link></li>
              <li><Link href="/collections" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">Collections</Link></li>
              <li><Link href="/catalogue" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">Catalogue</Link></li>
              <li><Link href="/projects" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">Projects</Link></li>
              <li><Link href="/wall-to-wall" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">Wall-To-Wall</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div>
            <h4 className="font-serif font-bold text-sm tracking-widest uppercase mb-6 text-[var(--color-brand-burgundy)]">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-brand-burgundy)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--color-brand-muted)]">+91 8558085579</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--color-brand-burgundy)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--color-brand-muted)] break-all">atozcarpetlucknow@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-brand-burgundy)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  Flat No G-1, Awasthi Green Apartment,<br />
                  Prag Narayan Road,<br />
                  Lucknow - 226001
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-brand-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-brand-muted)]">
            © {new Date().getFullYear()} Bhadohi Arts Weave. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)]">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)]">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
