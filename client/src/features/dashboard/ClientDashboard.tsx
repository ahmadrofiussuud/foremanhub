import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/common';
import { ArrowRight, Clipboard, DollarSign, Plus, Hammer, MapPin } from 'lucide-react';
import styles from './ClientDashboard.module.css';

interface ClientDashboardProps {
  onViewChange: (view: string) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onViewChange }) => {
  const { activeProject } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
            Selamat Datang Kembali, Budi Santoso!
          </h2>
          <p style={{ color: 'var(--gray-500)', marginTop: '0.25rem' }}>
            Pantau perkembangan renovasi rumah Anda dan kelola pengeluaran proyek secara transparan.
          </p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<Plus size={16} />}
          onClick={() => onViewChange('directory')}
        >
          Cari Mandor Baru
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <DollarSign size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>
              Dana di Escrow
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              Rp 50.000.000
            </span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)' }}>
            <Hammer size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>
              Proyek Berjalan
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              1 Proyek
            </span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'var(--color-info-light)', color: 'var(--color-info)' }}>
            <Clipboard size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>
              SPK Ditandatangani
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              1 Kontrak
            </span>
          </div>
        </Card>
      </div>

      {/* Proyek Aktif Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>Proyek Konstruksi Berjalan</h3>
        
        {activeProject ? (
          <Card className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                  {activeProject.title}
                </h4>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={14} /> Area Surabaya
                  </span>
                  <span style={{ color: 'var(--gray-300)' }}>|</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                    Mandor: <strong>{activeProject.mandorName}</strong>
                  </span>
                </div>
              </div>
              <Badge variant="success">Proyek Aktif</Badge>
            </div>

            {/* Progres Fisik */}
            <div className={styles.progressSection}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--gray-600)' }}>Rata-rata Progres Fisik Lapangan</span>
                <span style={{ color: 'var(--color-primary)' }}>60% Selesai</span>
              </div>
              <div className={styles.progressBarTrack}>
                <div className={styles.progressBarFill} style={{ width: '60%' }} />
              </div>
            </div>

            <div className={styles.projectFooter}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Total Anggaran RAB
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
                Buka Workspace Proyek
              </Button>
            </div>
          </Card>
        ) : (
          <Card style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Clipboard size={48} className="text-muted" />
            <h4 style={{ fontWeight: 700 }}>Belum Ada Proyek Berjalan</h4>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', maxWidth: '400px' }}>
              Rencanakan pembangunan atau renovasi rumah Anda dengan mencari mandor terbaik di direktori kami.
            </p>
            <Button variant="primary" size="sm" onClick={() => onViewChange('directory')}>
              Cari Mandor Sekarang
            </Button>
          </Card>
        )}
      </div>

      {/* Rencana Proyek Tambahan (Quick Draft CTA) */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Card className={styles.secondaryCard}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gray-900)' }}>Rencanakan Renovasi Selanjutnya?</h4>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.35rem', lineHeight: 1.5 }}>
            Buat RAB digital transparan dan cari mitra pelaksana bersertifikasi untuk pekerjaan pagar, atap, atau interior rumah Anda berikutnya.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            style={{ width: 'fit-content', marginTop: '1rem' }}
            onClick={() => onViewChange('directory')}
          >
            Mulai Draft Baru
          </Button>
        </Card>
      </div>
    </div>
  );
};
