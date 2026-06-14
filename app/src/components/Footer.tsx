import { Link } from 'react-router-dom';
import { GraduationCap, Shield, Heart } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Browse Marketplace', href: '/marketplace' },
    { label: 'Sell an Item', href: '/seller-dashboard' },
    { label: 'Escrow Protection', href: '/' },
    { label: 'How It Works', href: '/' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Safety Tips', href: '#' },
    { label: 'Report an Issue', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <GraduationCap size={18} />
              </div>
              <span className="text-lg font-bold text-primary">UniMart</span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              The safest way for students to buy and sell on campus. Our escrow system ensures you
              get what you paid for, or your money back.
            </p>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Shield size={14} className="text-success" />
              <span>Secured with UniMart Escrow</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm text-on-surface mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} UniMart Marketplace. All rights reserved.
          </p>
          <p className="text-xs text-on-surface-variant flex items-center gap-1">
            Made with <Heart size={12} className="text-error fill-error" /> for students in Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
