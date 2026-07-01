import React from 'react';
import { Card, Button } from '../../components/common';
import { User, HardHat, ShieldCheck } from 'lucide-react';
import styles from './LoginPortal.module.css';

interface LoginPortalProps {
  onLoginSuccess: (role: 'client' | 'mandor') => void;
  onCancel: () => void;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({ onLoginSuccess, onCancel }) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.headerArea}>
        <ShieldCheck size={48} className="text-primary" style={{ margin: '0 auto' }} />
        <h1>Portal Masuk MandorIn</h1>
        <p>Silakan pilih profil simulasi di bawah ini untuk mengakses fungsionalitas workspace penuh.</p>
      </div>

      <div className={styles.roleSelectionGrid}>
        {/* Client Selector */}
        <Card 
          className={`${styles.roleCard} ${styles.clientCard}`} 
          padding="lg"
          onClick={() => onLoginSuccess('client')}
        >
          <div className={`${styles.iconCircle} ${styles.clientCircle}`}>
            <User size={40} />
          </div>
          <h3>Masuk sebagai Klien</h3>
          <p>Kelola pembayaran escrow milestone, pantau progres harian lapangan, dan setujui usulan change order.</p>
          
          <div className={styles.profileIndicator}>
            <img 
              src="/images/client_avatar.png" 
              alt="Avatar Klien Budi" 
            />
            <div className={styles.profileMeta}>
              <span className={styles.profileName}>Budi Santoso</span>
              <span className={styles.profileDesc}>Pemilik Proyek Wiyung</span>
            </div>
          </div>
          <Button variant="accent" style={{ width: '100%', marginTop: '1rem' }}>
            Pilih Klien Budi
          </Button>
        </Card>

        {/* Mandor Selector */}
        <Card 
          className={`${styles.roleCard} ${styles.mandorCard}`} 
          padding="lg"
          onClick={() => onLoginSuccess('mandor')}
        >
          <div className={`${styles.iconCircle} ${styles.mandorCircle}`}>
            <HardHat size={40} />
          </div>
          <h3>Masuk sebagai Mandor</h3>
          <p>Tanda tangani draf SPK, update persentase progres pekerjaan fisik, kirim log laporan foto, dan ajukan change order.</p>
          
          <div className={styles.profileIndicator}>
            <img 
              src="/images/joko_portrait.png" 
              alt="Avatar Mandor Joko" 
            />
            <div className={styles.profileMeta}>
              <span className={styles.profileName}>Pak Joko Susilo</span>
              <span className={styles.profileDesc}>Mitra Mandor Gold Tier</span>
            </div>
          </div>
          <Button variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Pilih Mandor Joko
          </Button>
        </Card>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={onCancel}
          style={{ textDecoration: 'underline', color: 'var(--gray-500)', fontSize: '0.9rem', cursor: 'pointer' }}
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};

export default LoginPortal;
