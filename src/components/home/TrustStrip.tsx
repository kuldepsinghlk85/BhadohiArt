import React from 'react';
import { Crown, ScrollText, PenTool, Globe, Building2, ShieldCheck } from 'lucide-react';

export function TrustStrip() {
  const stats = [
    {
      icon: <Crown className="w-8 h-8 text-[var(--color-brand-burgundy)]" />,
      value: '20+',
      label: 'Years Experience'
    },
    {
      icon: <ScrollText className="w-8 h-8 text-[var(--color-brand-burgundy)]" />,
      value: '5000+',
      label: 'Carpet Designs'
    },
    {
      icon: <PenTool className="w-8 h-8 text-[var(--color-brand-burgundy)]" />,
      value: '100%',
      label: 'Customization'
    },
    {
      icon: <Globe className="w-8 h-8 text-[var(--color-brand-burgundy)]" />,
      value: 'Worldwide',
      label: 'Shipping'
    },
    {
      icon: <Building2 className="w-8 h-8 text-[var(--color-brand-burgundy)]" />,
      value: '1000+',
      label: 'Projects Completed'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-brand-burgundy)]" />,
      value: 'Quality',
      label: 'Assurance'
    }
  ];

  return (
    <section className="border-b border-[var(--color-brand-border)] bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-x-0 lg:divide-x divide-[var(--color-brand-border)]">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center px-4">
              <div className="mb-3">
                {stat.icon}
              </div>
              <h3 className="font-sans font-bold text-xl text-[var(--color-brand-dark)] mb-1">
                {stat.value}
              </h3>
              <p className="text-[var(--color-brand-muted)] text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
