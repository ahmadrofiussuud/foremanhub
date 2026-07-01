import React, { useState, useEffect } from 'react';
import { Hammer, Home, Search, ClipboardList, Lock, LogOut } from 'lucide-react';
import styles from './Navbar.module.css';
import { Button } from '../common';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: 'client' | 'mandor';
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  userRole,
  isLoggedIn,
  onLogout,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? 'header-scrolled' : ''}`}>
        <div className={`${styles.navContainer} container`}>
          {/* Logo area */}
          <div className={styles.logoArea} onClick={() => onViewChange('landing')}>
            <div className={styles.logoIcon}>
              <Hammer size={24} />
            </div>
            <div className={styles.logoText}>
              <span>MandorIn</span>
              <span className={styles.logoSub}>Konstruksi & Renovasi</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className={styles.menu}>
              <li>
                <button
                  className={`${styles.menuLink} ${currentView === 'landing' ? styles.menuLinkActive : ''}`}
                  onClick={() => onViewChange('landing')}
                >
                  Beranda
                </button>
              </li>
              {(!isLoggedIn || userRole !== 'mandor') && (
                <li>
                  <button
                    className={`${styles.menuLink} ${currentView === 'directory' ? styles.menuLinkActive : ''}`}
                    onClick={() => onViewChange('directory')}
                  >
                    Cari Mandor
                  </button>
                </li>
              )}
              <li>
                <button
                  className={`${styles.menuLink} ${(currentView === 'workspace' || currentView === 'dashboard') ? styles.menuLinkActive : ''}`}
                  onClick={() => onViewChange(isLoggedIn ? 'dashboard' : 'workspace')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>Workspace</span>
                  {!isLoggedIn && <Lock size={12} style={{ color: 'var(--gray-400)' }} />}
                </button>
              </li>
            </ul>
          </nav>

          {/* Actions & Role Switcher */}
          <div className={styles.actions}>
            {isLoggedIn ? (
              <div className={styles.profilePill}>
                <img 
                  src={userRole === 'client' 
                    ? "/images/client_avatar.png"
                    : "/images/joko_portrait.png"
                  } 
                  alt="Foto Profil" 
                  className={styles.profileAvatar}
                  loading="lazy"
                />
                <div className={styles.profileText}>
                  <span className={styles.profileName}>
                    {userRole === 'client' ? 'Budi Santoso' : 'Pak Joko Susilo'}
                  </span>
                  <span className={styles.profileRole}>
                    {userRole === 'client' ? 'Pemilik Rumah' : 'Mitra Mandor'}
                  </span>
                </div>
                <button 
                  onClick={onLogout}
                  title="Keluar akun simulasi"
                  className={styles.logoutBtn}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onViewChange('login')}
              >
                Masuk / Daftar
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Frosted Bottom Navigation Bar for Mobile */}
      <nav className={styles.bottomNav} aria-label="Navigasi Utama Mobile">
        <div 
          className={`${styles.bottomNavItem} ${currentView === 'landing' ? styles.bottomNavItemActive : ''}`}
          onClick={() => onViewChange('landing')}
          role="link"
          tabIndex={0}
          aria-label="Kembali ke Beranda"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewChange('landing'); }}
        >
          <Home size={20} />
          <span>Beranda</span>
        </div>
        {(!isLoggedIn || userRole !== 'mandor') && (
          <div 
            className={`${styles.bottomNavItem} ${currentView === 'directory' || currentView === 'detail' ? styles.bottomNavItemActive : ''}`}
            onClick={() => onViewChange('directory')}
            role="link"
            tabIndex={0}
            aria-label="Cari Mandor Proyek"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewChange('directory'); }}
          >
            <Search size={20} />
            <span>Cari Mandor</span>
          </div>
        )}
        <div 
          className={`${styles.bottomNavItem} ${(currentView === 'workspace' || currentView === 'dashboard') ? styles.bottomNavItemActive : ''}`}
          onClick={() => onViewChange(isLoggedIn ? 'dashboard' : 'workspace')}
          role="link"
          tabIndex={0}
          aria-label="Buka Workspace Proyek Anda"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewChange(isLoggedIn ? 'dashboard' : 'workspace'); }}
        >
          <ClipboardList size={20} />
          <span>Workspace</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
