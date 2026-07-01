import React, { useState } from 'react';
import { useApp, type Milestone } from '../../context/AppContext';
import { Card, Button, Badge } from '../../components/common';
import { 
  Hammer, Clipboard, Calendar, DollarSign, CheckCircle, 
  Image as ImageIcon, Plus, Check, X, AlertTriangle, AlertCircle 
} from 'lucide-react';
import styles from './Workspace.module.css';

interface WorkspaceProps {
  onViewChange: (view: string) => void;
  userRole: 'client' | 'mandor';
}

export const Workspace: React.FC<WorkspaceProps> = ({ onViewChange, userRole }) => {
  const { 
    activeProject, approveContract, payMilestone, verifyMilestonePayment, 
    updateMilestoneProgress, addProgressLog, addChangeOrder, 
    approveChangeOrder, rejectChangeOrder, resetSimulation 
  } = useApp();

  // Progress Log inputs
  const [logDesc, setLogDesc] = useState('');
  const [logImgPreset, setLogImgPreset] = useState('pondasi');

  // Change Order inputs
  const [coDesc, setCoDesc] = useState('');
  const [coPrice, setCoPrice] = useState(1500000);

  // Temporary local state for editing milestone progress
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [tempProgress, setTempProgress] = useState<number>(0);

  // Unsplash presets for progress logs
  const imagePresets: { [key: string]: { label: string; url: string } } = {
    pondasi: {
      label: 'Pengecoran Pondasi',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80'
    },
    dinding: {
      label: 'Pemasangan Bata Dinding',
      url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80'
    },
    atap: {
      label: 'Pekerjaan Rangka Baja Atap',
      url: 'https://images.unsplash.com/photo-1632759162444-129685ae3b61?w=600&auto=format&fit=crop&q=80'
    },
    finishing: {
      label: 'Pengecatan & Finishing',
      url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80'
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Check if project is empty
  if (!activeProject) {
    return (
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>
          <Hammer size={48} />
        </div>
        <h2>Workspace Proyek Masih Kosong</h2>
        <p>
          Anda belum memiliki proyek konstruksi atau renovasi berjalan. Cari mandor terpercaya di kota Anda, lalu ajukan draf kontrak kerja SPK digital.
        </p>
        <Button variant="accent" onClick={() => onViewChange('directory')}>
          Cari Mandor Terverifikasi
        </Button>
      </div>
    );
  }

  // Handle Log Submission
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logDesc) return;
    const selectedUrl = imagePresets[logImgPreset]?.url || imagePresets.pondasi.url;
    addProgressLog(logDesc, selectedUrl);
    setLogDesc('');
  };

  // Handle Change Order Submission
  const handleAddCO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coDesc || coPrice <= 0) return;
    addChangeOrder(coDesc, coPrice);
    setCoDesc('');
    setCoPrice(1000000);
  };

  // Handle Milestone Progress Save
  const handleSaveProgress = (milestoneId: string) => {
    updateMilestoneProgress(milestoneId, tempProgress);
    setEditingMilestoneId(null);
  };

  const getMilestoneStatusBadge = (m: Milestone) => {
    switch (m.status) {
      case 'paid':
        return <Badge variant="success">Terbayar (Escrow Dirilis)</Badge>;
      case 'verifying':
        return <Badge variant="warning">Verifikasi Deposit Admin</Badge>;
      case 'unpaid':
      default:
        return <Badge variant="neutral">Menunggu Pembayaran</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Workspace Header Info */}
      <div className={`${styles.workspaceHeader} ${userRole === 'client' ? styles.clientHeader : styles.mandorHeader}`}>
        <div className={styles.headerLeft}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2>{activeProject.title}</h2>
            {activeProject.status === 'draft' && <Badge variant="neutral">Draft</Badge>}
            {activeProject.status === 'offered' && <Badge variant="warning">Menunggu Approval Mandor</Badge>}
            {activeProject.status === 'active' && <Badge variant="info">Proyek Sedang Berjalan</Badge>}
            {activeProject.status === 'completed' && <Badge variant="success">Proyek Selesai</Badge>}
          </div>
          <div className={styles.projectMeta}>
            <div className={styles.metaItem}>
              <Clipboard size={14} />
              <span>Mandor: <strong>{activeProject.mandorName}</strong></span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={14} />
              <span>Target Mulai: <strong>{activeProject.startDate}</strong></span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={14} />
              <span>Target Selesai: <strong>{activeProject.endDate}</strong></span>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
            Nilai Anggaran RAB Total
          </span>
          <span className={styles.budgetTag}>{formatRupiah(activeProject.totalBudget)}</span>
          <Button variant="ghost" size="sm" onClick={resetSimulation} style={{ color: 'var(--color-danger)' }}>
            Reset Proyek & Simulasi
          </Button>
        </div>
      </div>

      {/* Role Alert Banner */}
      <div className={`${styles.roleBanner} ${userRole === 'client' ? styles.clientBanner : styles.mandorBanner}`}>
        <div>
          Portal Kerja Aktif: Anda masuk sebagai <strong>{userRole === 'client' ? 'Budi Santoso (Pemilik Rumah)' : 'Pak Joko Susilo (Mitra Mandor)'}</strong>
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          *Seluruh kontrol aksi keuangan dan progres lapangan disesuaikan otomatis dengan wewenang akun Anda.
        </div>
      </div>

      {/* Main Grid */}
      <div className={styles.grid}>
        
        {/* Left Column: SPK & Milestone Escrow Tracker */}
        <div className={styles.leftCol}>
          
          {/* SPK Digital Section */}
          <Card className={styles.spkPanel}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clipboard size={20} className="text-accent" />
              Kontrak Kerja Digital (SPK)
            </h3>
            
            {activeProject.status === 'offered' ? (
              <div className={styles.spkBody}>
                <div style={{ backgroundColor: 'var(--color-warning-light)', border: '1px solid var(--color-warning)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem' }}>
                  <AlertTriangle className="text-accent" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-accent-dark)' }}>Kontrak Baru Diajukan</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>
                      Kontrak ini diajukan oleh Klien <strong>{activeProject.clientName}</strong>. Pekerjaan fisik tidak dapat dimulai sebelum mandor menyetujui kontrak.
                    </p>
                  </div>
                </div>

                <div className={styles.spkScopeBox}>
                  <strong>Lingkup Pekerjaan:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{activeProject.scope}</p>
                </div>

                {userRole === 'mandor' ? (
                  <Button variant="accent" style={{ alignSelf: 'flex-start' }} onClick={approveContract}>
                    Setujui & Tandatangani Kontrak SPK
                  </Button>
                ) : (
                  <p className="text-muted" style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Menunggu Mandor menyetujui kontrak SPK. Silakan ubah peran ke **Mandor** di kanan atas untuk menyetujuinya.
                  </p>
                )}
              </div>
            ) : (
              <div className={styles.spkBody}>
                <div style={{ backgroundColor: 'var(--color-success-light)', border: '1px solid var(--color-success)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem' }}>
                  <CheckCircle className="text-success" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-success)' }}>Kontrak SPK Sah & Aktif</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>
                      Kontrak ditandatangani secara digital oleh kedua belah pihak. Proyek berjalan secara transparan dan dipantau sistem.
                    </p>
                  </div>
                </div>
                <div className={styles.spkScopeBox}>
                  <strong>Lingkup Kerja yang Disetujui:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{activeProject.scope}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Milestone Escrow Tracker */}
          <Card>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={20} className="text-primary" />
              Tracker Pembayaran Escrow & Progres Fisik
            </h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Dana milestione disimpan aman di rekening bersama MandorIn, baru dilepaskan setelah progres fisik disetujui.
            </p>

            <div className={styles.milestonesList}>
              {activeProject.milestones.map((m) => {
                const isActive = activeProject.status === 'active' || activeProject.status === 'completed';
                const isCardActive = isActive && (m.status === 'paid' || m.progress > 0);
                return (
                  <Card 
                    key={m.id} 
                    padding="md"
                    className={`${styles.milestoneCard} ${isCardActive ? styles.milestoneCardActive : ''} ${m.status === 'paid' ? styles.milestoneCardPaid : ''}`}
                    style={{ opacity: isActive ? 1 : 0.6 }}
                  >
                    {/* Header */}
                    <div className={styles.milestoneHeader}>
                      <div>
                        <span className={styles.milestoneTitle}>{m.title}</span>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                          {getMilestoneStatusBadge(m)}
                        </div>
                      </div>
                      <span className={styles.milestonePrice}>{formatRupiah(m.price)}</span>
                    </div>

                    <p className={styles.milestoneDesc}>{m.description}</p>

                    {/* Progress Bar */}
                    <div className={styles.progressContainer}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                        <span className="text-muted">Progres Fisik Lapangan</span>
                        <span className={m.status === 'paid' ? 'text-success' : 'text-primary'}>
                          {m.progress}%
                        </span>
                      </div>
                      <div className={styles.progressBarTrack}>
                        <div 
                          className={`${styles.progressBarFill} ${m.status === 'paid' ? styles.progressBarFillPaid : ''}`}
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Client Payment Interactions */}
                    {isActive && userRole === 'client' && m.status === 'unpaid' && (
                      <Button variant="accent" size="sm" onClick={() => payMilestone(m.id)}>
                        Setor Deposit Escrow (Bayar {formatRupiah(m.price)})
                      </Button>
                    )}

                    {/* Admin Payment Verification Simulation */}
                    {isActive && m.status === 'verifying' && (
                      <div style={{ backgroundColor: 'var(--gray-100)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--gray-300)', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertCircle size={14} className="text-accent" />
                          Simulasi Verifikasi Manual Bukti Transfer oleh Admin MandorIn
                        </span>
                        <Button variant="primary" size="sm" onClick={() => verifyMilestonePayment(m.id)}>
                          Verifikasi Pembayaran
                        </Button>
                      </div>
                    )}

                    {/* Mandor Progress Update Interactions */}
                    {isActive && userRole === 'mandor' && m.status === 'paid' && (
                      <div>
                        {editingMilestoneId === m.id ? (
                          <div className={styles.progressInputArea}>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              step="5"
                              value={tempProgress}
                              className={styles.progressSlider}
                              onChange={(e) => setTempProgress(Number(e.target.value))}
                            />
                            <span style={{ fontWeight: 700, width: '3rem', textAlign: 'center' }}>
                              {tempProgress}%
                            </span>
                            <Button variant="primary" size="sm" onClick={() => handleSaveProgress(m.id)}>
                              Simpan
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setEditingMilestoneId(null)}>
                              Batal
                            </Button>
                          </div>
                        ) : (
                          m.progress < 100 ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setEditingMilestoneId(m.id);
                                setTempProgress(m.progress);
                              }}
                            >
                              Update Progres Fisik
                            </Button>
                          ) : (
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <CheckCircle size={14} /> Pekerjaan Fisik Tahap Ini Selesai 100%
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* Mandor Locked Milestone */}
                    {isActive && userRole === 'mandor' && m.status === 'unpaid' && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-danger)', fontStyle: 'italic', fontWeight: 500 }}>
                        *Terkunci: Client harus melakukan pembayaran escrow sebelum Anda memulai pekerjaan fisik.
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Progress Logs & Change Orders */}
        <div className={styles.rightCol}>
          
          {/* Laporan Progres Harian */}
          <Card>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={20} className="text-primary" />
              Laporan Harian Progres Proyek
            </h3>
            
            {activeProject.status === 'active' && userRole === 'mandor' && (
              <form onSubmit={handleAddLog} className={styles.formBox}>
                <div className={styles.formGroup}>
                  <label htmlFor="log-desc">Deskripsi Pekerjaan Hari Ini</label>
                  <input
                    id="log-desc"
                    type="text"
                    className={styles.inputField}
                    placeholder="Contoh: Pengecoran pondasi sisi barat ruko selesai..."
                    value={logDesc}
                    onChange={(e) => setLogDesc(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="log-preset">Simulasi Bukti Foto Lapangan</label>
                  <select
                    id="log-preset"
                    className={styles.inputField}
                    value={logImgPreset}
                    onChange={(e) => setLogImgPreset(e.target.value)}
                  >
                    {Object.keys(imagePresets).map((key) => (
                      <option key={key} value={key}>
                        {imagePresets[key].label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                  Kirim Laporan Progres
                </Button>
              </form>
            )}

            <div className={styles.timeline}>
              {activeProject.progressLogs.length > 0 ? (
                activeProject.progressLogs.map((log) => (
                  <div key={log.id} className={styles.logCard}>
                    <div className={styles.logHeader}>
                      <span>{log.date}</span>
                      <Badge variant="success">Terverifikasi</Badge>
                    </div>
                    <img src={log.imageUrl} alt={`Foto progres harian tanggal ${log.date} - ${log.description}`} className={styles.logImg} loading="lazy" />
                    <p className={styles.logText}>{log.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted" style={{ padding: '2rem 0', textAlign: 'center', fontSize: '0.9rem' }}>
                  Belum ada log progres harian yang diunggah mandor.
                </p>
              )}
            </div>
          </Card>

          {/* Log Keputusan / Change Order */}
          <Card>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clipboard size={20} className="text-accent" />
              Log Perubahan & Keputusan (*Change Order*)
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Mendokumentasikan perubahan spek/biaya tambahan agar tidak terjadi kesalahpahaman verbal.
            </p>

            {activeProject.status === 'active' && userRole === 'mandor' && (
              <form onSubmit={handleAddCO} className={styles.formBox}>
                <div className={styles.formGroup}>
                  <label htmlFor="co-desc">Usulan Pekerjaan Tambahan</label>
                  <input
                    id="co-desc"
                    type="text"
                    className={styles.inputField}
                    placeholder="Contoh: Tambah pemasangan 4 stop kontak dinding..."
                    value={coDesc}
                    onChange={(e) => setCoDesc(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="co-price">Nilai Perubahan Biaya (Rp)</label>
                  <input
                    id="co-price"
                    type="number"
                    className={styles.inputField}
                    value={coPrice}
                    onChange={(e) => setCoPrice(Number(e.target.value))}
                  />
                </div>

                <Button type="submit" variant="accent" size="sm" leftIcon={<Plus size={16} />}>
                  Usulkan Perubahan
                </Button>
              </form>
            )}

            <div className={styles.coList}>
              {activeProject.changeOrders.length > 0 ? (
                activeProject.changeOrders.map((co) => (
                  <div key={co.id} className={styles.coCard}>
                    <div className={styles.coHeader}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{co.date}</span>
                      {co.status === 'pending' && <Badge variant="warning">Menunggu Konfirmasi</Badge>}
                      {co.status === 'approved' && <Badge variant="success">Disetujui</Badge>}
                      {co.status === 'rejected' && <Badge variant="danger">Ditolak</Badge>}
                    </div>
                    <p className={styles.coDesc}>{co.description}</p>
                    <div className={styles.coMeta}>
                      <span className={styles.coPrice} style={{ color: co.priceChange >= 0 ? 'var(--color-primary)' : 'var(--color-danger)' }}>
                        {co.priceChange >= 0 ? '+' : ''}{formatRupiah(co.priceChange)}
                      </span>
                      
                      {/* Client Approves / Rejects CO */}
                      {userRole === 'client' && co.status === 'pending' && (
                        <div className={styles.coActions}>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}
                            onClick={() => approveChangeOrder(co.id)}
                          >
                            <Check size={14} /> Setuju
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-danger)' }}
                            onClick={() => rejectChangeOrder(co.id)}
                          >
                            <X size={14} /> Tolak
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted" style={{ padding: '2rem 0', textAlign: 'center', fontSize: '0.9rem' }}>
                  Belum ada log perubahan keputusan proyek (*change order*).
                </p>
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Workspace;
