import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Type Definitions
export interface PortfolioItem {
  title: string;
  image: string;
  year: string;
}

export interface Mandor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  projectsCount: number;
  specialization: string[];
  location: string;
  tier: 'gold' | 'silver' | 'bronze';
  phone: string;
  bio: string;
  portfolio: PortfolioItem[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'unpaid' | 'verifying' | 'paid';
  progress: number; // 0 to 100
}

export interface ChangeOrder {
  id: string;
  description: string;
  priceChange: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface ProgressLog {
  id: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface Project {
  mandorId: string;
  clientName: string;
  mandorName: string;
  status: 'draft' | 'offered' | 'active' | 'completed';
  title: string;
  totalBudget: number;
  startDate: string;
  endDate: string;
  scope: string;
  milestones: Milestone[];
  changeOrders: ChangeOrder[];
  progressLogs: ProgressLog[];
}

interface AppContextType {
  foremen: Mandor[];
  activeProject: Project | null;
  selectedMandor: Mandor | null;
  selectMandor: (mandor: Mandor | null) => void;
  createProject: (project: Omit<Project, 'changeOrders' | 'progressLogs' | 'status'>) => void;
  approveContract: () => void;
  payMilestone: (milestoneId: string) => void;
  verifyMilestonePayment: (milestoneId: string) => void;
  updateMilestoneProgress: (milestoneId: string, progress: number) => void;
  addProgressLog: (description: string, imageUrl: string) => void;
  addChangeOrder: (description: string, priceChange: number) => void;
  approveChangeOrder: (coId: string) => void;
  rejectChangeOrder: (coId: string) => void;
  resetSimulation: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock Foremen Data
const mockForemen: Mandor[] = [
  {
    id: 'm-1',
    name: 'Pak Joko Susilo',
    avatar: '/images/joko_portrait.png',
    rating: 4.8,
    projectsCount: 14,
    specialization: ['Renovasi Total', 'Pondasi & Dinding', 'Instalasi Listrik'],
    location: 'Surabaya',
    tier: 'gold',
    phone: '6281234567890',
    bio: 'Berpengalaman 15 tahun memimpin proyek perumahan dan ruko menengah di area Jawa Timur. Menjamin ketepatan waktu dengan tukang-tukang bersertifikasi dan material berkualitas.',
    portfolio: [
      { title: 'Renovasi Rumah Mewah Graha Famili', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80', year: '2025' },
      { title: 'Pembangunan Ruko 3 Lantai Wiyung', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80', year: '2024' }
    ]
  },
  {
    id: 'm-2',
    name: 'Pak Muji Raharjo',
    avatar: '/images/muji_portrait.png',
    rating: 4.6,
    projectsCount: 7,
    specialization: ['Pekerjaan Atap', 'Pengecatan & Finishing', 'Pasang Keramik/Granit'],
    location: 'Pamekasan',
    tier: 'silver',
    phone: '6282345678901',
    bio: 'Spesialis pekerjaan interior finishing, cat, dan atap baja ringan. Mengedepankan kerapian detail kerja dengan estimasi RAB yang transparan dan jujur.',
    portfolio: [
      { title: 'Pasang Atap & Plafon Masjid Pamekasan', image: 'https://images.unsplash.com/photo-1632759162444-129685ae3b61?w=600&auto=format&fit=crop&q=80', year: '2025' },
      { title: 'Finishing Interior Kafe Arek Madura', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', year: '2024' }
    ]
  },
  {
    id: 'm-3',
    name: 'Mas Dani Setiawan',
    avatar: '/images/dani_portrait.png',
    rating: 4.2,
    projectsCount: 2,
    specialization: ['Pengecatan & Finishing', 'Taman & Eksterior'],
    location: 'Surabaya',
    tier: 'bronze',
    phone: '6283456789012',
    bio: 'Mandor muda berbakat dengan dedikasi tinggi pada kerapian desain eksterior, pengecatan dinding premium, dan taman estetis untuk rumah minimalis modern.',
    portfolio: [
      { title: 'Taman Minimalis Rumah Citraland', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80', year: '2025' }
    ]
  },
  {
    id: 'm-4',
    name: 'Pak Slamet Hariyadi',
    avatar: '/images/slamet_portrait.png',
    rating: 4.9,
    projectsCount: 22,
    specialization: ['Renovasi Total', 'Pondasi & Dinding', 'Konstruksi Baja'],
    location: 'Sidoarjo',
    tier: 'gold',
    phone: '6284567890123',
    bio: 'Ahli konstruksi baja berat dan renovasi struktural gedung/gudang. Telah bersertifikasi keahlian teknis tingkat madya dan mengawasi tukang bersertifikat KemenPUPR.',
    portfolio: [
      { title: 'Pembangunan Gudang Baja Sidoarjo', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80', year: '2025' },
      { title: 'Renovasi Struktur Rumah Mewah Sedati', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80', year: '2024' }
    ]
  },
  {
    id: 'm-5',
    name: 'Pak Ahmad Subagyo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.75,
    projectsCount: 16,
    specialization: ['Pondasi & Dinding', 'Pasang Keramik/Granit', 'Renovasi Total'],
    location: 'Sidoarjo',
    tier: 'gold',
    phone: '6285678901234',
    bio: 'Berpengalaman membangun fondasi beton bertulang dan struktur tahan gempa untuk wilayah pemukiman padat. Komitmen pada kekuatan struktur utama.',
    portfolio: [
      { title: 'Pondasi Kompleks Perumahan Waru', image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80', year: '2025' }
    ]
  },
  {
    id: 'm-6',
    name: 'Pak Heri Setiawan',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80',
    rating: 4.5,
    projectsCount: 8,
    specialization: ['Renovasi Total', 'Pekerjaan Atap', 'Instalasi Listrik'],
    location: 'Surabaya',
    tier: 'silver',
    phone: '6286789012345',
    bio: 'Spesialis peremajaan rumah kuno menjadi minimalis modern dengan penyesuaian tata udara, kelistrikan standar SNI, dan konstruksi atap galvalum berkualitas.',
    portfolio: [
      { title: 'Renovasi Rumah Kolonial Dharmahusada', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80', year: '2024' }
    ]
  },
  {
    id: 'm-7',
    name: 'Mas Rian Hidayat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 4.3,
    projectsCount: 4,
    specialization: ['Pasang Keramik/Granit', 'Pengecatan & Finishing'],
    location: 'Pamekasan',
    tier: 'bronze',
    phone: '6287890123456',
    bio: 'Muda dan teliti, berfokus pada estetika pemasangan granit lantai presisi tinggi tanpa nat berongga serta pengecatan dekoratif/aksen kamar tidur modern.',
    portfolio: [
      { title: 'Pasang Lantai Granit Masjid Pamekasan', image: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=600&auto=format&fit=crop&q=80', year: '2025' }
    ]
  },
  {
    id: 'm-8',
    name: 'Pak Budi Prasetya',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    rating: 4.65,
    projectsCount: 11,
    specialization: ['Instalasi Listrik', 'Taman & Eksterior', 'Pekerjaan Atap'],
    location: 'Surabaya',
    tier: 'silver',
    phone: '6288901234567',
    bio: 'Ahli sistem kelistrikan pintar, instalasi lampu luar ruangan terintegrasi taman, serta pembuatan gazebo/kolam ikan minimalis dengan sistem sirkulasi teruji.',
    portfolio: [
      { title: 'Taman & Lampu Hias Cluster Citraland', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80', year: '2025' }
    ]
  }
];

const defaultProject: Project = {
  mandorId: 'm-1',
  clientName: 'Budi Santoso',
  mandorName: 'Pak Joko Susilo',
  status: 'active',
  title: 'Renovasi Interior & Dapur Rumah Wiyung',
  totalBudget: 45000000,
  startDate: '2026-07-01',
  endDate: '2026-10-01',
  scope: 'Pekerjaan renovasi area dapur bersih dan kotor, penggantian keramik lantai ruang makan dengan granit tile 60x60, pengecatan ulang plafon dan dinding interior ruang tamu.',
  milestones: [
    { id: 'ms-1', title: 'DP & Pembongkaran Dinding', description: 'Pembongkaran kitchen set lama, keramik dinding, dan sekat ruang.', price: 10000000, status: 'paid', progress: 100 },
    { id: 'ms-2', title: 'Struktur Fondasi Dapur & Granit', description: 'Cor beton meja dapur baru, pasang pipa air bersih/kotor, pasang keramik dinding dapur dan granit lantai.', price: 15000000, status: 'verifying', progress: 65 },
    { id: 'ms-3', title: 'Plafon Gypsum & Cat Dinding', description: 'Pekerjaan rangka plafon hollow, pasang gipsum 9mm, pengecatan waterproofing dinding dapur luar.', price: 10000000, status: 'unpaid', progress: 0 },
    { id: 'ms-4', title: 'Instalasi Kitchen Set & Listrik', description: 'Pemasangan kabinet atas/bawah, kompor tanam, wastafel, pasang lampu LED strip.', price: 10000000, status: 'unpaid', progress: 0 }
  ],
  changeOrders: [
    { id: 'co-mock-1', description: 'Tambah titik stop kontak Panasonic (3 titik) dan kabel eterna', priceChange: 750000, status: 'approved', date: '1 Juli 2026' },
    { id: 'co-mock-2', description: 'Upgrade kran air cuci piring ke brand Wasser leher angsa fleksibel', priceChange: 350000, status: 'pending', date: '3 Juli 2026' }
  ],
  progressLogs: [
    { id: 'log-mock-1', description: 'Pengecoran beton meja dapur berbentuk L selesai dilakukan, menunggu kering 3 hari.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80', date: '2 Juli 2026' },
    { id: 'log-mock-2', description: 'Pembongkaran sekat bata ruang makan selesai dilakukan dan pembersihan puing.', imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80', date: '1 Juli 2026' }
  ]
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foremen] = useState<Mandor[]>(mockForemen);
  const [selectedMandor, setSelectedMandor] = useState<Mandor | null>(null);
  
  // Simulation states
  const [activeProject, setActiveProject] = useState<Project | null>(() => {
    const saved = localStorage.getItem('mandorin_active_project');
    if (saved) return JSON.parse(saved);
    // Initialize default project so that the workspace has active project from the beginning
    localStorage.setItem('mandorin_active_project', JSON.stringify(defaultProject));
    return defaultProject;
  });

  const saveProject = (proj: Project | null) => {
    setActiveProject(proj);
    if (proj) {
      localStorage.setItem('mandorin_active_project', JSON.stringify(proj));
    } else {
      localStorage.removeItem('mandorin_active_project');
    }
  };

  const selectMandor = (mandor: Mandor | null) => {
    setSelectedMandor(mandor);
  };

  // 1. Create a contract (SPK Draft)
  const createProject = (projectData: Omit<Project, 'changeOrders' | 'progressLogs' | 'status'>) => {
    const newProject: Project = {
      ...projectData,
      status: 'offered', // offered to the mandor, waiting for approval
      changeOrders: [],
      progressLogs: []
    };
    saveProject(newProject);
  };

  // 2. Mandor approves the SPK
  const approveContract = () => {
    if (!activeProject) return;
    saveProject({
      ...activeProject,
      status: 'active'
    });
  };

  // 3. Client deposits milestone escrow payment
  const payMilestone = (milestoneId: string) => {
    if (!activeProject) return;
    const updatedMilestones = activeProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, status: 'verifying' as const } : m
    );
    saveProject({
      ...activeProject,
      milestones: updatedMilestones
    });
  };

  // 4. Admin verifies deposit and releases to paid status (escrow release)
  const verifyMilestonePayment = (milestoneId: string) => {
    if (!activeProject) return;
    const updatedMilestones = activeProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, status: 'paid' as const } : m
    );

    // If all milestones are paid and physical progress is 100%, set project status as completed
    const allPaidAndFinished = updatedMilestones.every(m => m.status === 'paid' && m.progress === 100);

    saveProject({
      ...activeProject,
      milestones: updatedMilestones,
      status: allPaidAndFinished ? 'completed' : activeProject.status
    });
  };

  // 5. Mandor updates physical progress percentage of a milestone
  const updateMilestoneProgress = (milestoneId: string, progress: number) => {
    if (!activeProject) return;
    const updatedMilestones = activeProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, progress } : m
    );
    
    const allPaidAndFinished = updatedMilestones.every(m => m.status === 'paid' && m.progress === 100);

    saveProject({
      ...activeProject,
      milestones: updatedMilestones,
      status: allPaidAndFinished ? 'completed' : activeProject.status
    });
  };

  // 6. Mandor uploads daily progress log
  const addProgressLog = (description: string, imageUrl: string) => {
    if (!activeProject) return;
    const newLog: ProgressLog = {
      id: `log-${Date.now()}`,
      description,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80',
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    saveProject({
      ...activeProject,
      progressLogs: [newLog, ...activeProject.progressLogs] // newest logs first
    });
  };

  // 7. Mandor proposes a Change Order (additional work/cost)
  const addChangeOrder = (description: string, priceChange: number) => {
    if (!activeProject) return;
    const newCO: ChangeOrder = {
      id: `co-${Date.now()}`,
      description,
      priceChange,
      status: 'pending',
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
    saveProject({
      ...activeProject,
      changeOrders: [...activeProject.changeOrders, newCO]
    });
  };

  // 8. Client approves Change Order -> increases totalBudget
  const approveChangeOrder = (coId: string) => {
    if (!activeProject) return;
    let priceDiff = 0;
    const updatedCOs = activeProject.changeOrders.map((co) => {
      if (co.id === coId) {
        priceDiff = co.priceChange;
        return { ...co, status: 'approved' as const };
      }
      return co;
    });

    saveProject({
      ...activeProject,
      changeOrders: updatedCOs,
      totalBudget: activeProject.totalBudget + priceDiff
    });
  };

  // 9. Client rejects Change Order
  const rejectChangeOrder = (coId: string) => {
    if (!activeProject) return;
    const updatedCOs = activeProject.changeOrders.map((co) =>
      co.id === coId ? { ...co, status: 'rejected' as const } : co
    );
    saveProject({
      ...activeProject,
      changeOrders: updatedCOs
    });
  };

  // Reset simulation back to clean slate
  const resetSimulation = () => {
    saveProject(null);
    setSelectedMandor(null);
  };

  return (
    <AppContext.Provider
      value={{
        foremen,
        activeProject,
        selectedMandor,
        selectMandor,
        createProject,
        approveContract,
        payMilestone,
        verifyMilestonePayment,
        updateMilestoneProgress,
        addProgressLog,
        addChangeOrder,
        approveChangeOrder,
        rejectChangeOrder,
        resetSimulation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
