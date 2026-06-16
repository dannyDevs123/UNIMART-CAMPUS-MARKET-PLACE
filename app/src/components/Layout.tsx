import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-sans transform-gpu">
      <Navbar />
      <main className={`flex-1 transform-gpu will-change-transform ${isDashboard ? '' : 'pt-[72px]'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="transform-gpu will-change-transform"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}
