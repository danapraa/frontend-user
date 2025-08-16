import React from "react";
import {
  User,
  FileText,
  Briefcase,
  Building2,
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Eye,
  Send,
  Star,
  Award,
  Shield,
  Heart,
  Target,
  Accessibility,
} from "lucide-react";

export default function DashboardUser() {
  // Mock data untuk progress resume
  const resumeProgress = {
    completed: 8,
    total: 10,
    percentage: 80,
    missingFields: ["Sertifikasi", "Referensi"],
  };

  // Mock data untuk statistik
  const stats = {
    totalApplications: 12,
    interviewScheduled: 3,
    totalAppliedJobs: 28,
    newJobs: 8,
  };

  // Mock data untuk lamaran terbaru
  const recentApplications = [
    {
      id: 1,
      company: "PT Inklusi Teknologi",
      position: "Web Developer",
      status: "interview",
      appliedDate: "2025-01-15",
      accessibility: "Ramah Tuna Netra",
    },
    {
      id: 2,
      company: "CV Digital Inklusi",
      position: "Content Creator",
      status: "review",
      appliedDate: "2025-01-12",
      accessibility: "Ramah Tuna Rungu",
    },
    {
      id: 3,
      company: "PT Aksesibilitas Prima",
      position: "Data Analyst",
      status: "rejected",
      appliedDate: "2025-01-10",
      accessibility: "Ramah Kursi Roda",
    },
  ];

  // Mock data untuk lowongan terbaru
  const newJobs = [
    {
      id: 1,
      company: "PT Inklusi Digital",
      position: "Frontend Developer",
      location: "Surabaya",
      salary: "Rp 8.000.000 - 12.000.000",
      accessibility: "Ramah Tuna Netra",
      postedDate: "2025-01-16",
      type: "Full Time",
    },
    {
      id: 2,
      company: "CV Aksesible Tech",
      position: "UI/UX Designer",
      location: "Malang",
      salary: "Rp 6.000.000 - 10.000.000",
      accessibility: "Ramah Tuna Rungu",
      postedDate: "2025-01-15",
      type: "Remote",
    },
    {
      id: 3,
      company: "PT Karya Inklusi",
      position: "Content Writer",
      location: "Sidoarjo",
      salary: "Rp 4.500.000 - 7.000.000",
      accessibility: "Ramah Kursi Roda",
      postedDate: "2025-01-14",
      type: "Hybrid",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "interview":
        return "Interview";
      case "review":
        return "Sedang Direview";
      case "rejected":
        return "Ditolak";
      case "accepted":
        return "Diterima";
      default:
        return "Unknown";
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Selamat Datang di JATIM BISSA! 👋
              </h1>
              <p className="text-blue-100 mb-4">
                Platform pencarian kerja yang ramah dan inklusif untuk semua
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Accessibility className="w-4 h-4" />
                  Ramah Disabilitas
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  Inklusi untuk Semua
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Lamaran
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalApplications}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+2</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                minggu ini
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interview Terjadwal
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.interviewScheduled}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Calendar className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">
                2 minggu ke depan
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Lowongan Dilamar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalAppliedJobs}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+5</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                bulan ini
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lowongan Baru
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.newJobs}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Star className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">
                Sesuai kriteria Anda
              </span>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
            Lamaran Terbaru
          </h3>

          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {application.position}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.company}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {application.accessibility}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(application.appliedDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {getStatusText(application.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              Lihat Semua Lamaran →
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-12 xl:col-span-4 space-y-6">
        {/* Resume Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Status CV/Resume
            </h3>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-2">
                  Profil Belum Lengkap
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                  Lengkapi profil Anda untuk meningkatkan peluang mendapatkan
                  pekerjaan yang sesuai.
                </p>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                  Lengkapi Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aksi Cepat
          </h3>

          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  Cari Lowongan
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Temukan pekerjaan impian
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  Lamaran Saya
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Lihat status semua lamaran
                </p>
              </div>
            </button>

            {/* <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Komunitas</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Bergabung dengan komunitas</p>
              </div>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
