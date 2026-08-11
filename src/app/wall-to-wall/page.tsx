import React from 'react';

export default function WallToWallPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-brand-dark)] mb-6">
          Wall-to-Wall Carpets
        </h1>
        <p className="font-sans text-lg text-[var(--color-brand-muted)] leading-relaxed max-w-3xl mx-auto mb-12">
          Experience seamless luxury with our premium wall-to-wall carpet solutions. We offer Indian customers world-class installations that meet global standards while remaining competitively priced. Perfect for hotels, hospitals, apartments, banquet halls, offices, and residential spaces.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white p-8 border border-[var(--color-brand-border)] text-left">
             <h3 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-4">Professional Installation</h3>
             <p className="font-sans text-[var(--color-brand-muted)] leading-relaxed">
               In addition to manufacturing, we provide professional installation services through our trained and experienced staff, ensuring perfect fitting and finishing for every project.
             </p>
          </div>
          <div className="bg-white p-8 border border-[var(--color-brand-border)] text-left">
             <h3 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-4">Hygiene & Safety</h3>
             <p className="font-sans text-[var(--color-brand-muted)] leading-relaxed">
               Many of our wall-to-wall products are anti-bacterial and anti-fungal treated, ensuring better hygiene, safety, and durability for high-traffic environments.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
