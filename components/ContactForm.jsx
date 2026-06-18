'use client';

import { useState } from 'react';
import { site } from '../lib/site';

// To enable real submissions: create a free form at https://web3forms.com
// (or https://formspree.io), paste your access key below, and the form
// will deliver to your inbox — works on static hosting, no backend needed.
const WEB3FORMS_ACCESS_KEY = ''; // TODO: add access key

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!WEB3FORMS_ACCESS_KEY) {
      // Fallback: open the user's email client pre-filled
      const body = encodeURIComponent(
        `Name: ${data.name}\nCompany: ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n${data.message}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        'Business Inquiry — ' + data.company
      )}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-md border border-navy-200 px-4 py-3 text-sm text-navy-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500';

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-navy-100 p-8 shadow-sm">
      <h2 className="text-xl font-bold text-navy-900">Send Us a Message</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-800">
            Full Name *
          </label>
          <input id="name" name="name" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy-800">
            Company *
          </label>
          <input id="company" name="company" required placeholder="Company name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-800">
            Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-800">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+91" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-800">
            How can we help? *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your requirement — service type, locations, volumes…"
            className={field}
          />
        </div>
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'sent' && (
        <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          Thank you — your message has been sent. We&apos;ll get back to you shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          Something went wrong. Please email us directly at {site.email}.
        </p>
      )}
    </form>
  );
}
