"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm({ defaultMessage }: { defaultMessage: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      // 1. Generate inquiry in DB
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // 2. Alert via WhatsApp
      const adminPhone = "918558085579"; // As per contact info
      const waMessage = `New Inquiry from ${data.name} (${data.phone}):\n\n${data.message}`;
      const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waMessage)}`;
      
      // Open WhatsApp link in new tab or same tab
      window.open(waUrl, '_blank');
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      alert("Inquiry generated successfully! Redirecting to WhatsApp...");
      
    } catch (error) {
      console.error(error);
      alert("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">First Name</label>
          <input name="firstName" required type="text" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-burgundy)]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Last Name</label>
          <input name="lastName" type="text" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-burgundy)]" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Email Address</label>
        <input name="email" type="email" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-burgundy)]" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Phone Number</label>
        <input name="phone" required type="tel" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-burgundy)]" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Message</label>
        <textarea name="message" required rows={4} defaultValue={defaultMessage} className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-burgundy)] resize-none"></textarea>
      </div>

      <Button type="submit" disabled={loading} className="w-full h-12 text-sm mt-2">
        {loading ? "SENDING..." : "SEND MESSAGE & WHATSAPP ALERT"}
      </Button>
    </form>
  );
}
