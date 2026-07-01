import React, { useState } from 'react';
import { useApp, type Mandor } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/common';
import { Search, Hammer, RefreshCw, Star, ArrowRight } from 'lucide-react';
import styles from './Directory.module.css';

interface DirectoryProps {
  onViewChange: (view: string) => void;
}

export const Directory: React.FC<DirectoryProps> = ({ onViewChange }) => {
  const { foremen, selectMandor } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpec, setSelectedSpec] = useState('all');

  // Available locations & specializations for filtering
  const locations = ['all', 'Surabaya', 'Pamekasan', 'Sidoarjo'];
  const specializations = [
    'all',
    'Renovasi Total',
    'Pondasi & Dinding',
    'Instalasi Listrik',
    'Pekerjaan Atap',
    'Pengecatan & Finishing',
    'Pasang Keramik/Granit',
    'Taman & Eksterior'
  ];

  // Filtering Logic
  const filteredForemen = foremen.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || m.location === selectedLocation;
    const matchesSpec = selectedSpec === 'all' || m.specialization.includes(selectedSpec);
    return matchesSearch && matchesLocation && matchesSpec;
  });

  const handleSelect = (mandor: Mandor) => {
    selectMandor(mandor);
    onViewChange('detail');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedSpec('all');
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'gold': return 'Gold Tier';
      case 'silver': return 'Silver Tier';
      case 'bronze': return 'Bronze Tier';
      default: return 'Mitra';
    }
  };

  return (
    <div className={styles.directoryPage}>
      {/* 1. Full-bleed Hero wrapper */}
      <div className={styles.heroWrapper}>
        <div className="container">
          <section className={styles.heroSection}>
            <div className={styles.heroLeft}>
              <h1 className={styles.heroHeading}>
                Solusi Terpercaya untuk <span className={styles.heroHighlight}>Membangun dan Renovasi</span> Hunian Anda
              </h1>
              <p className={styles.heroParagraph}>
                Wujudkan hunian impian Anda dengan mandor terverifikasi, kontrak digital yang sah, dan laporan progres harian langsung ke ponsel Anda.
              </p>

              {/* Overlapping client reviews avatar block */}
              <div className={styles.reviewAvatarBlock}>
                <div className={styles.avatarRow}>
                  <img src="/images/client_avatar.png" alt="User 1" />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="User 2" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="User 3" />
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80" alt="User 4" />
                </div>
                <span className={styles.reviewText}>10.000+ Pemilik Rumah Puas</span>
              </div>

              <div className={styles.statsBlock}>
                <span className={styles.statsNumber}>15+</span>
                <span className={styles.statsText}>Tahun Pengalaman</span>
              </div>
            </div>

            {/* Hero Right: standing foreman with floating card */}
            <div className={styles.heroRight}>
              <img src="/images/joko_portrait.png" alt="Mandor Utama" className={styles.heroMandorImg} />

              {/* Floating Mandor Card */}
              <div 
                className={styles.floatingMandorCard}
                onClick={() => {
                  const joko = foremen.find(f => f.id === 'm-1');
                  if (joko) {
                    selectMandor(joko);
                    onViewChange('detail');
                  }
                }}
              >
                <img src="/images/joko_portrait.png" alt="Rio Prasetya Avatar" className={styles.floatingAvatar} />
                <div className={styles.floatingInfo}>
                  <strong className={styles.floatingName}>Rio Prasetya</strong>
                  <div className={styles.floatingStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <div className={styles.floatingArrow}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Catalog & Filter content inside standard container */}
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '3.5rem', paddingBottom: '3rem' }}>
        {/* Catalog Title Section */}
        <div className={styles.catalogHeadingArea}>
          <h2 className={styles.catalogTitle}>Mitra Mandor Berpengalaman</h2>
          <p className={styles.catalogSubtitle}>Temukan mandor ahli dengan portofolio teruji untuk mewujudkan hunian impian Anda.</p>
        </div>

        {/* Filter Panel */}
        <div className={styles.filterPanel}>
          {/* Name Search */}
          <div className={styles.filterGroup}>
            <label htmlFor="search-name">Cari Nama</label>
            <div className={styles.inputWrapper}>
              <Search size={18} className={styles.inputIcon} />
              <input
                id="search-name"
                type="text"
                className={styles.filterInput}
                placeholder="Contoh: Pak Joko..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="filter-location">Lokasi Proyek</label>
            <select
              id="filter-location"
              className={styles.filterSelect}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'all' ? 'Semua Wilayah' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Specialization Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="filter-spec">Keahlian Khusus</label>
            <select
              id="filter-spec"
              className={styles.filterSelect}
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === 'all' ? 'Semua Spesialisasi' : spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className={styles.grid}>
          {filteredForemen.length > 0 ? (
            filteredForemen.map((mandor) => (
              <Card key={mandor.id} hoverable className={`${styles.mandorCard} ${styles['card_' + mandor.tier]}`} onClick={() => handleSelect(mandor)}>
                {/* Card Header: Projects Count & Tier Badge */}
                <div className={styles.cardHeader}>
                  <span className={styles.projectBadge}>{mandor.projectsCount} Proyek</span>
                  <Badge
                    variant="neutral"
                    className={`${styles.tierBadge} ${styles[`tier_${mandor.tier}`]}`}
                  >
                    {getTierName(mandor.tier)}
                  </Badge>
                </div>

                {/* Center Portrait Image */}
                <div className={styles.portraitWrapper}>
                  <img 
                    src={mandor.avatar} 
                    alt={`Foto potret mandor ${mandor.name}`} 
                    className={styles.portrait} 
                    loading="lazy" 
                  />
                </div>

                {/* Bottom Floating Detail Pill */}
                <div className={styles.detailPill}>
                  <img 
                    src={mandor.avatar} 
                    alt={`Avatar mini ${mandor.name}`} 
                    className={styles.miniAvatar} 
                    loading="lazy" 
                  />
                  <div className={styles.detailMeta}>
                    <span className={styles.detailName}>{mandor.name}</span>
                    <span className={styles.detailSpec}>{mandor.specialization[0]}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className={styles.noResults}>
              <Hammer size={48} className="text-muted" />
              <h3>Mandor Tidak Ditemukan</h3>
              <p>Cobalah untuk mengubah pencarian atau mereset filter Anda.</p>
              <Button variant="outline" size="sm" onClick={handleResetFilters} leftIcon={<RefreshCw size={16} />}>
                Reset Semua Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directory;
