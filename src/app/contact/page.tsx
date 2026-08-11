import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const resolvedParams = await searchParams;
  const productSlug = resolvedParams.product;
  let defaultMessage = "";
  if (productSlug) {
    const formattedName = productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    defaultMessage = `I would like to request a quote for the ${formattedName}. Please provide pricing and sizing details.`;
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-brand-dark)] mb-4">
            Contact Us
          </h1>
          <p className="font-sans text-[var(--color-brand-muted)] max-w-2xl mx-auto">
            We are here to help you with your premium carpet requirements. Get in touch with us for quotes, bulk orders, and custom designs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-8 md:p-12 border border-[var(--color-brand-border)]">
            <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-8">
              Get in Touch
            </h2>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FAF7F0] flex items-center justify-center shrink-0 border border-[var(--color-brand-border)]">
                  <Phone className="w-5 h-5 text-[var(--color-brand-burgundy)]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[var(--color-brand-dark)] mb-1">Phone</h4>
                  <p className="text-[var(--color-brand-muted)] text-sm">+91 8558085579</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FAF7F0] flex items-center justify-center shrink-0 border border-[var(--color-brand-border)]">
                  <Mail className="w-5 h-5 text-[var(--color-brand-burgundy)]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[var(--color-brand-dark)] mb-1">Email</h4>
                  <p className="text-[var(--color-brand-muted)] text-sm break-all">atozcarpetlucknow@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FAF7F0] flex items-center justify-center shrink-0 border border-[var(--color-brand-border)]">
                  <MapPin className="w-5 h-5 text-[var(--color-brand-burgundy)]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[var(--color-brand-dark)] mb-1">Office Address</h4>
                  <p className="text-[var(--color-brand-muted)] text-sm leading-relaxed">
                    Flat No G-1, Awasthi Green Apartment,<br />
                    Prag Narayan Road,<br />
                    Lucknow - 226001<br/>
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 border border-[var(--color-brand-border)]">
            <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-8">
              Send an Inquiry
            </h2>
            
            <ContactForm defaultMessage={defaultMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
