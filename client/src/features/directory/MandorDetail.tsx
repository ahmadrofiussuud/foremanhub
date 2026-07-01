import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Button } from '../../components/common';
import { ArrowLeft, ArrowRight, Star, ShieldCheck, MessageSquare, Clipboard, Lock } from 'lucide-react';
import styles from './MandorDetail.module.css';

interface MandorDetailProps {
  onViewChange: (view: string) => void;
  isLoggedIn: boolean;
}

export const MandorDetail: React.FC<MandorDetailProps> = ({ onViewChange, isLoggedIn }) => {
  const { selectedMandor, createProject, activeProject, resetSimulation } = useApp();

  // SPK form inputs
  const [projectTitle, setProjectTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [budget, setBudget] = useState(50000000); // 50jt default
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [formError, setFormError] = useState('');

  if (!selectedMandor) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Silakan pilih mandor dari menu Cari Mandor.</p>
        <Button variant="primary" onClick={() => onViewChange('directory')}>Cari Mandor</Button>
      </div>
    );
  }

  // Handle SPK creation
  const handleSubmitSpk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !clientName || !startDate || !endDate || !scopeOfWork) {
      setFormError('Semua field wajib diisi.');
      return;
    }

    // Auto-generate 4 standard milestones based on construction standard
    const milestones = [
      {
        id: 'ms-1',
        title: 'Fase 1: Mobilisasi & Pekerjaan Pondasi',
        description: 'Persiapan lahan, penggalian, dan pengecoran pondasi tapak/sloof.',
        price: budget * 0.2, // 20%
        status: 'unpaid' as const,
        progress: 0
      },
      {
        id: 'ms-2',
        title: 'Fase 2: Struktur Dinding & Kolom',
        description: 'Pemasangan dinding bata merah/hebel, kolom praktis, dan kusen.',
        price: budget * 0.4, // 40%
        status: 'unpaid' as const,
        progress: 0
      },
      {
        id: 'ms-3',
        title: 'Fase 3: Pekerjaan Atap & Utilitas',
        description: 'Pemasangan kuda-kuda baja ringan, genteng, instalasi listrik & air.',
        price: budget * 0.3, // 30%
        status: 'unpaid' as const,
        progress: 0
      },
      {
        id: 'ms-4',
        title: 'Fase 4: Finishing & Serah Terima',
        description: 'Plester acian, pemasangan keramik lantai, pengecatan, dan pembersihan lokasi.',
        price: budget * 0.1, // 10%
        status: 'unpaid' as const,
        progress: 0
      }
    ];

    createProject({
      mandorId: selectedMandor.id,
      mandorName: selectedMandor.name,
      clientName,
      title: projectTitle,
      totalBudget: budget,
      startDate: new Date(startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      endDate: new Date(endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      scope: scopeOfWork,
      milestones
    });

    // Reset form states
    setFormError('');
    onViewChange('workspace');
  };

  const formattedWAUrl = `https://wa.me/${selectedMandor.phone}?text=Halo%20${encodeURIComponent(selectedMandor.name)},%20saya%20melihat%20profil%20Anda%20di%20MandorIn%20dan%20ingin%20berkonsultasi%20mengenai%20proyek%20renovasi%20saya.`;

  // Custom mock reviews based on foreman id
  const getMockReviews = (id: string) => {
    switch (id) {
      case 'm-1':
        return [
          { reviewer: 'Budi Santoso (Surabaya)', rating: 5, date: '12 Mei 2026', text: 'Pak Joko sangat profesional. Pekerjaan renovasi rumah saya di Wiyung selesai tepat waktu. Setiap hari ada laporan progres foto di WA. Sangat direkomendasikan!' },
          { reviewer: 'Rina Wijaya (Sidoarjo)', rating: 4, date: '3 Maret 2026', text: 'Kualitas pengerjaan struktur sangat kokoh. Sedikit lambat di bagian acian cat dinding luar karena hujan, tapi Pak Joko merespon dengan cepat dan menambah tukang agar cepat selesai.' }
        ];
      case 'm-2':
        return [
          { reviewer: 'Adi Syahputra (Pamekasan)', rating: 5, date: '19 April 2026', text: 'Spesialis finishing yang luar biasa! Pemasangan granit lantai 60x60 sangat presisi dan rapi. Pak Muji jujur dalam pemakaian bahan bangunan.' }
        ];
      default:
        return [
          { reviewer: 'Hendra (Gresik)', rating: 4, date: '1 Januari 2026', text: 'Respons cepat dan komunikasi lancar. Mandor mau mendengarkan request detail dari pemilik rumah.' }
        ];
    }
  };

  return (
    <div className={styles.container}>
      {/* Back to Directory Button */}
      <button className={styles.backBtn} onClick={() => onViewChange('directory')}>
        <ArrowLeft size={16} />
        <span>Kembali ke Pencarian</span>
      </button>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroName}>{selectedMandor.name}</h1>
          <p className={styles.heroTagline}>
            Spesialis {selectedMandor.specialization.join(' & ')} dan penambahan lantai. Telah sukses menyelesaikan {selectedMandor.projectsCount}+ proyek dengan tingkat kepuasan pelanggan yang tinggi.
          </p>
        </div>
        <div className={styles.heroRight}>
          <img src={selectedMandor.avatar} alt={`Foto utama ${selectedMandor.name}`} className={styles.heroAvatar} />
        </div>
      </div>

      {/* Overlapping Bio Card */}
      <Card className={styles.bioCard}>
        <h3 className={styles.bioTitle}>{selectedMandor.name}</h3>
        <p className={styles.bioText}>{selectedMandor.bio}</p>
      </Card>

      {/* Portfolio Grid Section */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>Rekam Jejak & Portofolio {selectedMandor.name}</h2>
        <div className={styles.portfolioGrid}>
          {selectedMandor.portfolio.slice(0, 3).map((p, idx) => (
            <div key={idx} className={styles.portfolioCard}>
              <img src={p.image} alt={p.title} className={styles.portfolioImg} loading="lazy" />
              <div className={styles.portfolioOverlay}>
                <span className={styles.portfolioYear}>{p.year}</span>
                <div className={styles.portfolioFooter}>
                  <span className={styles.portfolioTag}>Bangun Rumah</span>
                  <p className={styles.portfolioDesc}>{p.title}</p>
                </div>
                <div className={styles.portfolioArrow}>
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Section & SPK Form Layout */}
      <div className={styles.whySection}>
        {/* Left Column: Why Choose */}
        <div className={styles.whyLeft}>
          <h2 className={styles.sectionHeading}>Mengapa Pilih {selectedMandor.name}?</h2>
          <p className={styles.whyText}>
            {selectedMandor.name} adalah mitra mandor berlisensi yang berdedikasi untuk memberikan hasil pembangunan berbasis standar teknis yang kokoh, dengan memprioritaskan keamanan dan kenyamanan pemilik rumah. Dengan pengalaman bertahun-tahun di lapangan, ia memastikan setiap detail konstruksi direncanakan secara matang agar hunian Anda terbangun dengan sempurna dan tanpa hambatan.
          </p>

          <div className={styles.credentialsGrid}>
            <div className={styles.credentialItem}>
              <ShieldCheck size={18} className={styles.checkIcon} />
              <span>Identitas KTP & Profil Terverifikasi</span>
            </div>
            <div className={styles.credentialItem}>
              <ShieldCheck size={18} className={styles.checkIcon} />
              <span>Wawancara Fisik Lapangan</span>
            </div>
            <div className={styles.credentialItem}>
              <ShieldCheck size={18} className={styles.checkIcon} />
              <span>Rekomendasi Asosiasi & Sertifikat Keahlian</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Button
              variant="outline"
              leftIcon={<MessageSquare size={16} />}
              onClick={() => window.open(formattedWAUrl, '_blank')}
              className={styles.waBtn}
            >
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>

        {/* Right Column: SPK Form */}
        <div className={styles.whyRight}>
          <Card className={styles.spkCard}>
            <h3 className={styles.spkTitle}>
              <Clipboard size={18} style={{ color: 'var(--color-primary)' }} />
              Ajukan Kontrak Kerja (SPK)
            </h3>
            
            {!isLoggedIn ? (
              <div className={styles.authLock}>
                <Lock size={36} className="text-muted" style={{ margin: '0 auto 1rem auto' }} />
                <h4>Ajukan Kontrak SPK Terkunci</h4>
                <p>
                  Silakan masuk (*login*) terlebih dahulu ke akun Klien Anda untuk menyusun rencana anggaran biaya (RAB) dan meresmikan SPK digital bersama mandor ini.
                </p>
                <Button variant="primary" size="sm" onClick={() => onViewChange('login')} style={{ marginTop: '0.5rem' }}>
                  Masuk Akun Simulasi
                </Button>
              </div>
            ) : activeProject ? (
              <div className={styles.activeProjectStatus}>
                <p>
                  Anda memiliki satu proyek aktif berjalan di Workspace (<strong>{activeProject.title}</strong>).
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', width: '100%' }}>
                  <Button variant="primary" size="sm" onClick={() => onViewChange('workspace')}>
                    Buka Workspace Proyek
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetSimulation}>
                    Reset Simulasi (Mulai Baru)
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitSpk} className={styles.spkForm}>
                {formError && (
                  <p className={styles.errorText}>
                    {formError}
                  </p>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="client-name">Nama Pemilik Rumah (Klien)</label>
                  <input
                    id="client-name"
                    type="text"
                    className={styles.inputField}
                    placeholder="Contoh: Budi Santoso"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="project-title">Nama / Judul Proyek</label>
                  <input
                    id="project-title"
                    type="text"
                    className={styles.inputField}
                    placeholder="Contoh: Renovasi Dapur Rumah Wiyung"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="project-budget">Estimasi Anggaran (RAB Rp)</label>
                  <input
                    id="project-budget"
                    type="number"
                    className={styles.inputField}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label htmlFor="start-date">Mulai</label>
                    <input
                      id="start-date"
                      type="date"
                      className={styles.inputField}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label htmlFor="end-date">Selesai</label>
                    <input
                      id="end-date"
                      type="date"
                      className={styles.inputField}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="scope-work">Spesifikasi Lingkup Pekerjaan</label>
                  <textarea
                    id="scope-work"
                    className={styles.textareaField}
                    placeholder="Contoh: Pembongkaran sekat tembok dapur lama, pembuatan instalasi kitchen island baru, dan pasang keramik teraso lantai..."
                    value={scopeOfWork}
                    onChange={(e) => setScopeOfWork(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className={styles.submitBtn}>
                  Kirim & Tandatangani Kontrak SPK
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className={styles.sectionContainer} style={{ borderTop: '2px solid #F5EFEB', paddingTop: '3rem', marginTop: '2rem' }}>
        <h2 className={styles.sectionHeading} style={{ textAlign: 'center', marginBottom: '2rem' }}>Testimoni Pelanggan</h2>
        <div className={styles.testimonialsGrid}>
          {getMockReviews(selectedMandor.id).map((r, idx) => (
            <Card key={idx} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewerName}>{r.reviewer}</span>
                <span className={styles.reviewDate}>{r.date}</span>
              </div>
              <div className={styles.reviewStars}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} className={styles.starIcon} fill="currentColor" />
                ))}
              </div>
              <p className={styles.reviewText}>"{r.text}"</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
