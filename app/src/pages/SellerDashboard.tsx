import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AtSign,
  Copy,
  ExternalLink,
  GraduationCap,
  Instagram,
  Facebook,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Store,
} from 'lucide-react';

const adminPhone = '';
const adminPhoneDisplay = '+233508757036';
const supportEmail = 'support@unimart.edu.gh';
const whatsappLink =
  'https://api.whatsapp.com/send?phone=233508757036&text=Hi%20UniMart%20Administration%2C%20I%20would%20like%20to%20list%20a%20product%20on%20UniMart.';

const socialLinks = [
  {
    label: 'Instagram',
    handle: '@unimartgh',
    href: 'https://instagram.com/unimartgh',
    icon: Instagram,
  },
  {
    label: 'X',
    handle: '@unimartgh',
    href: 'https://x.com/unimartgh',
    icon: AtSign,
  },
  {
    label: 'Facebook',
    handle: 'UniMart',
    href: 'https://www.facebook.com/profile.php?id=61591007273210',
    icon: Facebook,
  },
];

const cardAnimation = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function SellerDashboard() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (value: string, type: 'phone' | 'email') => {
    await navigator.clipboard.writeText(value);
    if (type === 'phone') {
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-[72px]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16 animate-fade-in-up">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 text-white shadow-premium text-center transition-all duration-300"
        >
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/90 mb-6">
              <Store size={16} />
              UniMart Seller Contact Hub
            </span>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              List Your Products with UniMart
            </h1>

            <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-white/80 mb-8">
              To list, upload, or sell a product on UniMart, please reach out to our administration
              directly via the channels below.
            </p>

            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Official Administration Line
              </p>
              <a
                href={`tel:${adminPhone}`}
                className="flex items-center gap-3 text-3xl md:text-4xl font-bold tracking-wide transition-all duration-300 ease-in-out hover:scale-[1.02] hover:text-white/90"
              >
                <Phone size={28} className="flex-shrink-0" />
                {adminPhoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(adminPhone, 'phone')}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-blue-600"
              >
                <Copy size={16} />
                {copiedPhone ? 'Copied! ✓' : 'Copy Number'}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <motion.a
            {...cardAnimation}
            transition={{ duration: 0.35, delay: 0.08 }}
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform duration-300 ease-in-out group-hover:scale-110">
                <MessageCircle size={22} />
              </div>
              <ExternalLink
                size={18}
                className="text-emerald-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <h3 className="font-semibold text-on-surface">WhatsApp Administration</h3>
            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
              Send product photos, pricing, and listing details directly to our team.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors duration-200 group-hover:text-emerald-800">
              Message on WhatsApp
              <MessageCircle size={15} />
            </span>
          </motion.a>

          <motion.div
            {...cardAnimation}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container/15 text-primary transition-transform duration-300 ease-in-out group-hover:scale-110">
                <Mail size={22} />
              </div>
            </div>
            <h3 className="font-semibold text-on-surface">Official Support Email</h3>
            <p className="mt-1 text-sm text-on-surface-variant">{supportEmail}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => copyToClipboard(supportEmail, 'email')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant/40 px-4 py-2.5 text-sm font-semibold text-on-surface shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary/40 hover:bg-primary-container/10 hover:text-primary hover:shadow-md"
              >
                <Copy size={16} />
                {copiedEmail ? 'Copied! ✓' : 'Copy Email'}
              </button>
              <a
                href={`mailto:${supportEmail}?subject=UniMart%20Product%20Listing%20Request`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-container hover:shadow-md"
              >
                Send Email
                <ExternalLink size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...cardAnimation}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="mt-5 rounded-2xl border border-outline-variant/10 bg-gray-50/80 p-6 md:p-8 shadow-sm"
        >
          <h3 className="font-semibold text-on-surface text-center md:text-left">Connect With Us</h3>
          <p className="mt-1 text-sm text-on-surface-variant text-center md:text-left">
            Follow UniMart for updates, campus safety notices, and new marketplace drops.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/80 p-3 text-on-surface transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-md"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-container-low transition-transform duration-200 group-hover:scale-110">
                  <social.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{social.label}</p>
                  <p className="truncate text-xs text-on-surface-variant group-hover:text-blue-500">
                    {social.handle}
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="flex-shrink-0 text-outline transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...cardAnimation}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-5 flex items-start gap-4 rounded-2xl border border-primary-container/30 bg-primary-container/10 p-5 md:p-6 transition-all duration-300 ease-in-out hover:shadow-lg"
        >
          <ShieldCheck size={22} className="mt-0.5 flex-shrink-0 text-primary" />
          <div>
            <h3 className="font-semibold text-on-surface">Admin-Managed Listings</h3>
            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
              All products on UniMart are listed through our administration team. Buyers purchase
              securely via mobile money — no direct seller messaging required.
            </p>
            <Link
              to="/marketplace"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:scale-105 hover:text-primary-container"
            >
              <GraduationCap size={16} />
              Browse the marketplace
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
