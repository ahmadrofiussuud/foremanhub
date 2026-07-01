import React from 'react';
import { Hammer, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  onViewChange: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        {/* Column 1: Brand Info */}
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Hammer size={24} />
            </div>
            <span>MandorIn</span>
          </div>
          <p className={styles.desc}>
            Platform terpercaya yang menghubungkan pemilik proyek dengan mandor profesional terverifikasi. Transparan, aman, dan terdokumentasi dengan baik.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Client Links */}
        <div>
          <h4 className={styles.title}>Pemilik Rumah</h4>
          <ul className={styles.links}>
            <li className={styles.link} onClick={() => onViewChange('directory')}>Cari Mandor</li>
            <li className={styles.link}>Cara Kerja MandorIn</li>
            <li className={styles.link}>Jaminan Keamanan</li>
            <li className={styles.link}>Estimator Biaya</li>
          </ul>
        </div>

        {/* Column 3: Mandor Links */}
        <div>
          <h4 className={styles.title}>Mitra Mandor</h4>
          <ul className={styles.links}>
            <li className={styles.link}>Gabung Jadi Mitra</li>
            <li className={styles.link}>Sertifikasi Mandor</li>
            <li className={styles.link}>Fitur Workspace</li>
            <li className={styles.link}>Komunitas Mitra</li>
          </ul>
        </div>

        {/* Column 4: Service Area */}
        <div>
          <h4 className={styles.title}>Area Layanan</h4>
          <ul className={styles.links}>
            <li className={styles.link}>Surabaya</li>
            <li className={styles.link}>Pamekasan</li>
            <li className={styles.link}>Sidoarjo</li>
            <li className={styles.link}>Gresik</li>
            <li className={styles.link}>Malang & Batu</li>
          </ul>
        </div>
      </div>

      {/* Bottom Area */}
      <div className={`${styles.bottom} container`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} className="text-accent" />
          <span>&copy; {new Date().getFullYear()} MandorIn Indonesia. Hak Cipta Dilindungi.</span>
        </div>
        <div className={styles.bottomLinks}>
          <a href="#" className={styles.bottomLink}>Syarat & Ketentuan</a>
          <a href="#" className={styles.bottomLink}>Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
