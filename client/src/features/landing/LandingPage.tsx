import React, { useState } from 'react';
import { useApp, type Mandor } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/common';
import { 
  Shield, CheckCircle, HardHat, FileText, Landmark, ChevronDown, 
  ArrowRight
} from 'lucide-react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onViewChange: (view: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onViewChange }) => {
  const { foremen, selectMandor } = useApp();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Take the first 3 foremen as featured
  const featuredMandors = foremen.slice(0, 3);

  const faqs = [
    {
      q: 'Bagaimana MandorIn menjamin keakuratan profil dan portofolio mandor?',
      a: 'Setiap mandor yang tergabung di MandorIn wajib melewati verifikasi identitas (KTP), wawancara tatap muka mengenai pengalaman konstruksi, dan peninjauan langsung proyek sebelumnya oleh tim verifikator kami sebelum mendapatkan status "Terverifikasi".'
    },
    {
      q: 'Bagaimana mekanisme Rekening Bersama (Escrow) di MandorIn bekerja?',
      a: 'Dana proyek Anda dipecah menjadi beberapa milestone fisik (misal: uang muka, fondasi, dinding, dll). Anda menyetor dana per milestone ke rekening bersama MandorIn. Dana tersebut baru dicairkan ke mandor setelah progres fisik milestone tersebut selesai 100% dan Anda mengklik tombol "Setujui" di portal.'
    },
    {
      q: 'Apakah ada biaya tambahan di tengah jalan yang tidak terduga?',
      a: 'MandorIn mewajibkan semua lingkup kerja awal tertulis dalam Kontrak Kerja Digital (SPK). Jika terjadi perubahan di lapangan, mandor wajib mengajukan usulan "Change Order" di sistem. Biaya baru sah bertambah hanya jika Anda menyetujuinya, sehingga tidak ada pembengkakan biaya sepihak.'
    },
    {
      q: 'Bagaimana jika proyek mengalami keterlambatan atau ketidaksesuaian hasil?',
      a: 'Kami memiliki tim mediator yang akan meninjau log progres harian dan SPK digital Anda. Jika terbukti ada kelalaian mandor, dana escrow yang belum dicairkan akan ditahan dan dapat dialokasikan untuk pembenahan atau dikembalikan ke klien.'
    }
  ];

  const handleSelectFeatured = (mandor: Mandor) => {
    selectMandor(mandor);
    onViewChange('detail');
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className={styles.landingContainer}>
      
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <Badge variant="primary" size="md" icon={<Shield size={14} />}>
            Platform Konstruksi Terpercaya & Transparan #1
          </Badge>
          <h1>
            Bangun Rumah Impian Anda Tanpa <span className="text-accent" style={{ color: 'var(--color-accent-dark)' }}>Rasa Khawatir</span>
          </h1>
          <p>
            Hubungkan proyek renovasi atau pembangunan properti Anda dengan mitra mandor bersertifikasi. Amankan transaksi keuangan dengan sistem escrow terintegrasi dan pantau progres fisik secara harian.
          </p>
          <div className={styles.heroActions}>
            <Button 
              variant="primary" 
              size="lg" 
              rightIcon={<ArrowRight size={18} />}
              onClick={() => onViewChange('directory')}
            >
              Cari Mandor Sekarang
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onViewChange('workspace')}
            >
              Simulasi Workspace
            </Button>
          </div>
        </div>

        {/* Hero Right: Real house photo with glassmorphism floating badges */}
        <div className={styles.heroRight}>
          <div className={styles.imageContainer}>
            <img 
              src="/images/modern_house_renovation.png" 
              alt="Renovasi Rumah Modern Minimalis" 
              className={styles.heroHouseImg} 
            />
            
            {/* Glassmorphic Badge 1: Escrow */}
            <div className={`${styles.glassBadge} ${styles.badgeEscrow}`}>
              <div className={styles.badgeIcon} style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-accent-dark)' }}>
                <Landmark size={18} />
              </div>
              <div className={styles.badgeMeta}>
                <strong>Escrow Terlindung</strong>
                <span className={styles.badgeSubtext}>Dana aman & transparan</span>
              </div>
            </div>

            {/* Glassmorphic Badge 2: Progress logs */}
            <div className={`${styles.glassBadge} ${styles.badgeLogs}`}>
              <div className={styles.badgeIcon} style={{ backgroundColor: 'rgba(12, 62, 43, 0.15)', color: 'var(--color-primary)' }}>
                <CheckCircle size={18} />
              </div>
              <div className={styles.badgeMeta}>
                <strong>Laporan Harian</strong>
                <span className={styles.badgeSubtext}>Progres log real-time</span>
              </div>
            </div>

            {/* Glassmorphic Badge 3: Certified Mitra */}
            <div className={`${styles.glassBadge} ${styles.badgeCertified}`}>
              <div className={styles.badgeIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
                <Shield size={18} />
              </div>
              <div className={styles.badgeMeta}>
                <strong>Mitra Terverifikasi</strong>
                <span className={styles.badgeSubtext}>Kredibilitas 100% riil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions */}
      <section>
        <h2 className={styles.sectionTitle}>Tiga Masalah Utama Konstruksi, Terpecahkan</h2>
        <p className={styles.sectionSubtitle}>MandorIn menghadirkan solusi konkret untuk masalah klasik hubungan pemilik rumah dengan mandor.</p>
        
        <div className={styles.propsGrid}>
          <Card className={styles.propCard} padding="lg">
            <div className={styles.iconWrapper}>
              <HardHat size={28} />
            </div>
            <h3>1. Kepercayaan (Trust)</h3>
            <p>
              Kami mengeliminasi mandor fiktif dan amatir. Profil mandor diisi portofolio riil, ulasan asli klien lama, dan tingkat tiering (Gold, Silver, Bronze) sesuai jumlah proyek sukses mereka.
            </p>
          </Card>

          <Card className={styles.propCard} padding="lg">
            <div className={styles.accentIconWrapper}>
              <Landmark size={28} />
            </div>
            <h3>2. Transparansi Finansial</h3>
            <p>
              Uang Anda aman bersama Rekening Escrow MandorIn. Dana per fase baru dicairkan setelah progres fisik disetujui, mencegah mandor kabur membawa uang proyek atau hasil kerja mangkrak.
            </p>
          </Card>

          <Card className={styles.propCard} padding="lg">
            <div className={styles.iconWrapper}>
              <FileText size={28} />
            </div>
            <h3>3. Dokumentasi Keputusan</h3>
            <p>
              Segala kesepakatan tertulis resmi dalam SPK digital. Jika ada perubahan material/biaya di tengah jalan, mandor mengajukan Change Order tertulis yang harus disetujui Klien sebelum berjalan.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. How It Works */}
      <section>
        <h2 className={styles.sectionTitle}>Cara Kerja MandorIn</h2>
        <p className={styles.sectionSubtitle}>Proses renovasi aman dan terdokumentasi dalam empat langkah terintegrasi.</p>
        
        <div className={styles.stepsGrid}>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <h3>Pilih Mitra</h3>
            <p>Cari mandor terpercaya berdasarkan keahlian, wilayah, ulasan, dan tier reputasi.</p>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <h3>Sepakati SPK</h3>
            <p>Tulis draf anggaran RAB, target tanggal, dan deskripsi kerja spesifik secara digital.</p>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <h3>Setor Escrow</h3>
            <p>Depositkan dana milestone awal ke rekening bersama MandorIn untuk memicu pengerjaan fisik.</p>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>4</div>
            <h3>Rilis Dana</h3>
            <p>Pantau foto progres harian di portal, lalu cairkan dana milestone saat pekerjaan rampung.</p>
          </div>
        </div>
      </section>

      {/* 4. Featured Foremen */}
      <section>
        <h2 className={styles.sectionTitle}>Rekomendasi Mitra Mandor Unggulan</h2>
        <p className={styles.sectionSubtitle}>Mandor terbaik dengan ulasan tertinggi dan rekam jejak penyelesaian proyek sempurna.</p>
        
        <div className={styles.featuredGrid}>
          {featuredMandors.map((mandor) => (
            <Card 
              key={mandor.id} 
              hoverable 
              className={`${styles.mandorCard} ${styles['card_' + mandor.tier]}`}
              onClick={() => handleSelectFeatured(mandor)}
            >
              {/* Card Header: Projects Count & Tier Badge */}
              <div className={styles.cardHeader}>
                <span className={styles.projectBadge}>{mandor.projectsCount} Proyek</span>
                <Badge
                  variant="neutral"
                  className={`${styles.tierBadge} ${styles[`tier_${mandor.tier}`]}`}
                >
                  {mandor.tier.charAt(0).toUpperCase() + mandor.tier.slice(1)}
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
          ))}
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section>
        <h2 className={styles.sectionTitle}>Pertanyaan yang Sering Diajukan (FAQ)</h2>
        <p className={styles.sectionSubtitle}>Temukan jawaban cepat seputar keamanan, alur kerja, dan sistem sengketa MandorIn.</p>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx} 
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
              >
                <button 
                  className={styles.faqHeader} 
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`} 
                  />
                </button>
                <div 
                  className={styles.faqBody} 
                  style={{ maxHeight: isOpen ? '200px' : '0px' }}
                >
                  <div className={styles.faqContent}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Partner CTA Banner */}
      <section className={styles.partnerBanner}>
        <HardHat size={48} className="text-accent" />
        <h2>Apakah Anda Seorang Mandor Profesional?</h2>
        <p>
          Gabung sebagai Mitra Mandor bersertifikasi di MandorIn. Dapatkan akses proyek renovasi yang lebih stabil, perlindungan transaksi SPK resmi, dan reputasi bisnis digital yang tepercaya.
        </p>
        <Button 
          variant="accent" 
          size="lg"
          onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20MandorIn,%20saya%20ingin%20mendaftar%20sebagai%20mitra%20mandor.', '_blank')}
        >
          Daftar Jadi Mitra Mandor
        </Button>
      </section>

    </div>
  );
};

export default LandingPage;
