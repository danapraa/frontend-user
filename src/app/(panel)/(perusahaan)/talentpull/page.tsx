"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Shield,
  Trophy,
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Star,
  Users,
  Building,
  ChevronDown,
  X,
  BookOpen,
  Languages,
  Heart,
  MessageCircle,
} from "lucide-react";
import apiBissaKerja from "@/lib/api-bissa-kerja";

// Interfaces (sama seperti CV template)
interface Location {
  id: number;
  kode_pos_ktp: string;
  alamat_lengkap_ktp: string;
  province: {
    name: string;
  };
  regency: {
    name: string;
  };
  district: {
    name: string;
  };
  village: {
    name: string;
  };
  kode_pos_domisili: string;
  alamat_lengkap_domisili: string;
  province_domisili: {
    name: string;
  };
  regency_domisili: {
    name: string;
  };
  district_domisili: {
    name: string;
  };
  village_domisili: {
    name: string;
  };
  user_profile_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Disabilitas {
  kategori_disabilitas: string;
  tingkat_disabilitas: string;
}

interface Resume {
  id: number;
  user_profile_id: number;
  ringkasan_pribadi: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  bahasa: Array<{
    id: number;
    name: string;
    tingkat: string;
    resume_id: number;
    created_at: string;
    updated_at: string;
  }>;
  keterampilan: Array<{
    id: number;
    nama_keterampilan: string[];
    resume_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  pendidikan: Array<{
    id: number;
    tingkat: string;
    bidang_studi: string;
    nilai: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    lokasi: string;
    deskripsi: string;
    ijazah: string;
    resume_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  pencapaian: Array<{
    id: number;
    name: string;
    penyelenggara: string;
    tanggal_pencapaian: string;
    dokumen: string;
    resume_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  pelatihan: Array<{
    id: number;
    name: string;
    penyelenggara: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    deskripsi: string;
    sertifikat_file: string;
    resume_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  sertifikasi: Array<{
    id: number;
    program: string;
    lembaga: string;
    nilai: number;
    tanggal_mulai: string;
    tanggal_akhir: string;
    deskripsi: string;
    sertifikat_file: string;
    resume_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  pengalaman_kerja: Array<{
    id: number;
    name: string;
    nama_perusahaan: string;
    tipe_pekerjaan: string;
    lokasi: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    deskripsi: string;
    status: number;
    sertifikat_file: string;
    resume_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
}

interface UserProfile {
  id: number;
  nik: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  no_telp: string;
  latar_belakang: string;
  status_kawin: number;
  user_id: number;
  disabilitas_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  lokasi: Location;
  resume: Resume;
  disabilitas: Disabilitas;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_profile: UserProfile;
  // Additional fields for company interaction
  isBookmarked?: boolean;
  companyNotes?: string;
  interactionHistory?: Array<{
    date: string;
    type: string;
    note: string;
  }>;
}

const TalentPullDashboard = () => {
  const [talents, setTalents] = useState<UserData[]>([]);
  const [filteredTalents, setFilteredTalents] = useState<UserData[]>([]);
  const [selectedTalent, setSelectedTalent] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [companyNotes, setCompanyNotes] = useState("");
  const [savedTalents, setSavedTalents] = useState<Set<number>>(new Set());

  // Avatar logic functions
  const generateDefaultAvatar = useCallback((name: string) => {
    const encodedName = encodeURIComponent(name || "User");
    return `https://ui-avatars.com/api/?name=${encodedName}&length=2`;
  }, []);

  const getAvatarSrc = useCallback((userData: UserData) => {
    if (userData?.avatar && userData.avatar.trim()) {
      if (userData.avatar.startsWith("http")) {
        return userData.avatar;
      }
      if (userData.avatar.startsWith("/storage/")) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        return `${apiBaseUrl}${userData.avatar}`;
      }
    }
    return generateDefaultAvatar(userData?.name || "User");
  }, [generateDefaultAvatar]);

  // Fetch all talents (users with CV)
  const fetchTalents = async () => {
    try {
      setLoading(true);
      // Assumsi endpoint untuk mendapatkan semua user dengan CV
      const response = await apiBissaKerja.get("/talents/all");
      setTalents(response.data.data || []);
      setFilteredTalents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching talents:", error);
      // Mock data untuk demo
      setTalents([]);
      setFilteredTalents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = talents;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(talent =>
        talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.user_profile?.resume?.keterampilan.some(skill => 
          Array.isArray(skill.nama_keterampilan) 
            ? skill.nama_keterampilan.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
            : JSON.parse(skill.nama_keterampilan).some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }

    // Category filter
    if (filterBy !== "all") {
      filtered = filtered.filter(talent => {
        switch (filterBy) {
          case "fresh_graduate":
            return talent.user_profile?.resume?.pengalaman_kerja?.length === 0;
          case "experienced":
            return talent.user_profile?.resume?.pengalaman_kerja?.length > 0;
          case "certified":
            return talent.user_profile?.resume?.sertifikasi?.length > 0;
          case "disability":
            return talent.user_profile?.disabilitas?.kategori_disabilitas;
          case "bookmarked":
            return savedTalents.has(talent.id);
          default:
            return true;
        }
      });
    }

    setFilteredTalents(filtered);
  }, [searchTerm, filterBy, talents, savedTalents]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { year: "numeric", month: "long" });
  };

  const calculateExperience = (experiences: any[]) => {
    if (!experiences || experiences.length === 0) return "Fresh Graduate";
    
    let totalMonths = 0;
    experiences.forEach(exp => {
      const start = new Date(exp.tanggal_mulai);
      const end = exp.tanggal_akhir ? new Date(exp.tanggal_akhir) : new Date();
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      totalMonths += months;
    });
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return years > 0 ? `${years} tahun ${months} bulan` : `${months} bulan`;
  };

  const handleBookmarkTalent = (talentId: number) => {
    const newSavedTalents = new Set(savedTalents);
    if (savedTalents.has(talentId)) {
      newSavedTalents.delete(talentId);
    } else {
      newSavedTalents.add(talentId);
    }
    setSavedTalents(newSavedTalents);
  };

  const handleViewDetail = (talent: UserData) => {
    setSelectedTalent(talent);
    setCompanyNotes(talent.companyNotes || "");
    setShowDetailModal(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedTalent) return;
    
    try {
      // API call to save company notes
      // await apiBissaKerja.post(`/talents/${selectedTalent.id}/notes`, {
      //   notes: companyNotes
      // });
      
      // Update local state
      const updatedTalents = talents.map(t => 
        t.id === selectedTalent.id 
          ? { ...t, companyNotes }
          : t
      );
      setTalents(updatedTalents);
      setShowDetailModal(false);
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const TalentCard = ({ talent }: { talent: UserData }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200">
            <img
              src={getAvatarSrc(talent)}
              alt={talent.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = generateDefaultAvatar(talent.name);
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {talent.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {talent.email}
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {talent.user_profile?.no_telp}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleBookmarkTalent(talent.id)}
            className={`p-2 rounded-full transition-colors ${
              savedTalents.has(talent.id)
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Heart className={`w-5 h-5 ${savedTalents.has(talent.id) ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {talent.user_profile?.lokasi?.regency?.name}, {talent.user_profile?.lokasi?.province?.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-green-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {calculateExperience(talent.user_profile?.resume?.pengalaman_kerja)}
          </span>
        </div>

        {talent.user_profile?.disabilitas?.kategori_disabilitas && (
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-sm px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
              {talent.user_profile.disabilitas.kategori_disabilitas}
            </span>
          </div>
        )}
      </div>

      {/* Skills Preview */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Keterampilan:</p>
        <div className="flex flex-wrap gap-1">
          {talent.user_profile?.resume?.keterampilan?.slice(0, 3).map((skill, index) => {
            const skillNames = Array.isArray(skill.nama_keterampilan)
              ? skill.nama_keterampilan
              : JSON.parse(skill.nama_keterampilan);
            
            return skillNames.slice(0, 2).map((name: string, i: number) => (
              <span
                key={`${index}-${i}`}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
              >
                {name}
              </span>
            ));
          })}
          {talent.user_profile?.resume?.keterampilan?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
              +{talent.user_profile.resume.keterampilan.length - 3} lainnya
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleViewDetail(talent)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Lihat Detail
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Kontak
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat data talent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              TalentPull Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Temukan dan kelola talent terbaik untuk perusahaan Anda
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, email, atau keterampilan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer"
              >
                <option value="all">Semua Talent</option>
                <option value="fresh_graduate">Fresh Graduate</option>
                <option value="experienced">Berpengalaman</option>
                <option value="certified">Bersertifikat</option>
                <option value="disability">Penyandang Disabilitas</option>
                <option value="bookmarked">Disimpan</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{talents.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Talent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {talents.filter(t => t.user_profile?.resume?.pengalaman_kerja?.length > 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Berpengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {talents.filter(t => t.user_profile?.disabilitas?.kategori_disabilitas).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Penyandang Disabilitas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{savedTalents.size}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Disimpan</div>
            </div>
          </div>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.map((talent) => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>

        {filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tidak ada talent ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTalent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Detail Talent: {selectedTalent.name}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[70vh] p-6">
              {/* Simplified CV View */}
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white">
                    <img
                      src={getAvatarSrc(selectedTalent)}
                      alt={selectedTalent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedTalent.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {selectedTalent.user_profile?.resume?.ringkasan_pribadi}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        {selectedTalent.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        {selectedTalent.user_profile?.no_telp}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Pengalaman</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {calculateExperience(selectedTalent.user_profile?.resume?.pengalaman_kerja)}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">Pendidikan</span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">
                      {selectedTalent.user_profile?.resume?.pendidikan?.[0]?.tingkat || "N/A"}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold">Sertifikat</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedTalent.user_profile?.resume?.sertifikasi?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Company Notes Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Catatan Perusahaan
                  </h4>
                  <textarea
                    value={companyNotes}
                    onChange={(e) => setCompanyNotes(e.target.value)}
                    placeholder="Tambahkan catatan internal tentang kandidat ini..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPullDashboard;