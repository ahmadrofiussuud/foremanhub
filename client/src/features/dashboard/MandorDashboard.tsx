import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/common';
import { ArrowRight, Clipboard, DollarSign, Star, Hammer, Bell, Check, X } from 'lucide-react';
import styles from './MandorDashboard.module.css';

interface MandorDashboardProps {
  onViewChange: (view: string) => void;
}

export const MandorDashboard: React.FC<MandorDashboardProps> = ({ onViewChange }) => {
  const { activeProject } = useApp();
  const [hasNewOffer, setHasNewOffer] = useState(true);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            Selamat Datang Kembali, Pak Joko Susilo!
          </h2>
          <p style={{ color: 'var(--gray-500)', marginTop: '0.25rem' }}>
            Kelola jadwal pengerjaan fisik proyek, kirim laporan harian, dan usulkan perubahan biaya.
          </p>
        </div>
        <div className={styles.partnerBadge}>
          <Star size={16} fill="currentColor" />
          <span>Mitra Gold Terverifikasi</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)' }}>
            <Star size={20} fill="currentColor" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>
              Rating Reputasi
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              4.8 / 5.0
            </span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <DollarSign size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>
              Dana Escrow Terkunci
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              Rp 50.000.000
            </span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'var(--color-info-light)', color: 'var(--color-info)' }}>
            <Hammer size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>
              Pekerjaan Aktif
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              1 Proyek
            </span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Left = Active Projects, Right = Incoming Offers / Notifications */}
      <div className={styles.dashboardGrid}>
        
        {/* Left: Active Projects */}
        <div className={styles.leftCol}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem' }}>
            Pekerjaan Fisik Berjalan
          </h3>

          {activeProject ? (
            <Card className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    {activeProject.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '0.35rem' }}>
                    Pemilik Rumah: <strong>{activeProject.clientName}</strong>
                  </p>
                </div>
                <Badge variant="info">Sedang Berjalan</Badge>
              </div>

              {/* Progres Fisik Track */}
              <div className={styles.progressSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--gray-600)' }}>Progres Fisik Saat Ini</span>
                  <span style={{ color: 'var(--color-primary)' }}>60% Terpenuhi</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '60%' }} />
                </div>
              </div>

              <div className={styles.projectFooter}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>
                    RAB Disetujui
                  </span>
                  <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary)', fontWeight: 800 }}>
                    Rp 120.000.000
                  </strong>
                </div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  rightIcon={<ArrowRight size={16} />}
                  onClick={() => onViewChange('workspace')}
                >
                  Kelola Proyek & Laporan
                </Button>
              </div>
            </Card>
          ) : (
            <Card style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Hammer size={48} className="text-muted" />
              <h4 style={{ fontWeight: 700 }}>Tidak Ada Pekerjaan Aktif</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                Silakan tunggu tawaran kontrak SPK baru masuk dari pemilik rumah.
              </p>
            </Card>
          )}
        </div>

        {/* Right: Notifications & Offers */}
        <div className={styles.rightCol}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} className="text-primary" />
            Tawaran Kontrak Masuk
          </h3>

          {hasNewOffer ? (
            <Card className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--gray-900)' }}>
                  Pemasangan Pagar Keliling Rumah
                </h4>
                <Badge variant="warning">SPK Baru</Badge>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', margin: '0.5rem 0' }}>
                Pengirim: <strong>Ibu Ani (Klien)</strong><br />
                Lokasi: <strong>Graha Famili, Surabaya</strong><br />
                Penawaran RAB: <strong style={{ color: 'var(--color-primary)' }}>Rp 15.000.000</strong>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', lineHeight: 1.4, margin: '0.75rem 0 1.25rem 0', padding: '0.5rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
                *Catatan Klien: "Mohon menggunakan besi hollow galvanis dengan pengecatan anti karat hitam doff."
              </p>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button 
                  variant="primary" 
                  size="sm" 
                  leftIcon={<Check size={14} />}
                  onClick={() => {
                    alert('Simulasi: Anda menyetujui tawaran proyek ini. Proyek baru akan ditambahkan ke daftar kelola Anda.');
                    setHasNewOffer(false);
                  }}
                  style={{ flex: 1 }}
                >
                  Terima SPK
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<X size={14} />}
                  onClick={() => setHasNewOffer(false)}
                  style={{ color: 'var(--color-danger)' }}
                >
                  Tolak
                </Button>
              </div>
            </Card>
          ) : (
            <Card style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <Clipboard size={32} className="text-muted" />
              <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>
                Semua tawaran kontrak SPK baru telah ditinjau. Belum ada tawaran masuk lainnya saat ini.
              </p>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};
