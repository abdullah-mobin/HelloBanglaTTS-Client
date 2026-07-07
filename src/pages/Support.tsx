'use client';

import Footer from '../components/Footer';
import { useState } from 'react';
import { openMailClient } from '../services/mailService';

export default function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Support request from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      details,
    ].join('\n');

    openMailClient({ subject, body });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Contact Support
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Have a question, suggestion, or issue? 
          <p> Fill out the form below and your mail client will open with the details ready to send to HelloBanglaTTS. </p>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Your full name"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Details / Message</label>
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              required
              placeholder="Write your message here..."
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none h-40"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
          >
            Submit
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
