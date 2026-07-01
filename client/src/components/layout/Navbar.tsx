import React, { useState, useEffect } from 'react';
import { Hammer, Lock, LogOut, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={`${styles.navContainer} container`}>
          {/* Logo area */}
          <div className={styles.logoArea} onClick={() => { onViewChange('landing'); setMobileMenuOpen(false); }}>
            <div className={styles.logoIcon}>
              <Hammer size={24} />
            </div>
            <div className={styles.logoText}>
              <span>MandorIn</span>
              <span className={styles.logoSub}>Konstruksi & Renovasi</span>
            </div>
          </div>

          {/* Navigation Menu (Desktop) */}
          <nav className={styles.desktopNav}>
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

          {/* Actions & Hamburger Menu Trigger */}
          <div className={styles.actions}>
            {/* Desktop Actions */}
            <div className={styles.desktopActions}>
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

            {/* Mobile Hamburger Toggle Button */}
            <button 
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu navigasi"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileNavDropdown}>
            <ul className={styles.mobileMenuList}>
              <li>
                <button
                  className={`${styles.mobileMenuLink} ${currentView === 'landing' ? styles.mobileMenuLinkActive : ''}`}
                  onClick={() => { onViewChange('landing'); setMobileMenuOpen(false); }}
                >
                  Beranda
                </button>
              </li>
              {(!isLoggedIn || userRole !== 'mandor') && (
                <li>
                  <button
                    className={`${styles.mobileMenuLink} ${currentView === 'directory' ? styles.mobileMenuLinkActive : ''}`}
                    onClick={() => { onViewChange('directory'); setMobileMenuOpen(false); }}
                  >
                    Cari Mandor
                  </button>
                </li>
              )}
              <li>
                <button
                  className={`${styles.mobileMenuLink} ${(currentView === 'workspace' || currentView === 'dashboard') ? styles.mobileMenuLinkActive : ''}`}
                  onClick={() => { onViewChange(isLoggedIn ? 'dashboard' : 'workspace'); setMobileMenuOpen(false); }}
                >
                  Workspace
                </button>
              </li>
              <li className={styles.mobileMenuDivider} />
              <li>
                {isLoggedIn ? (
                  <div className={styles.mobileProfileBlock}>
                    <div className={styles.mobileProfileInfo}>
                      <img 
                        src={userRole === 'client' 
                          ? "/images/client_avatar.png"
                          : "/images/joko_portrait.png"
                        } 
                        alt="Foto Profil" 
                        className={styles.profileAvatar}
                      />
                      <div className={styles.profileText}>
                        <span className={styles.profileName}>
                          {userRole === 'client' ? 'Budi Santoso' : 'Pak Joko Susilo'}
                        </span>
                        <span className={styles.profileRole}>
                          {userRole === 'client' ? 'Pemilik Rumah' : 'Mitra Mandor'}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}
                    >
                      Keluar Akun
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => { onViewChange('login'); setMobileMenuOpen(false); }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Masuk / Daftar
                  </Button>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
