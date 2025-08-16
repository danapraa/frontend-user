"use client";
import React from "react";
import {
  Building2,
  FileText,
  Briefcase,
  Users,
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MapPin,
  Clock,
  Eye,
  Plus,
  Star,
  Award,
  Shield,
  Heart,
  Target,
  Accessibility,
  PlusCircle,
  Settings,
  BarChart3,
  UserCheck,
} from "lucide-react";

export default function DashboardCompany() {
  // Mock data untuk statistik perusahaan
  const stats = {
    totalJobs: 15,
    totalApplicants: 142,
    activeJobs: 8,
    newApplicants: 24,
  };

  // Mock data untuk lowongan terbaru
  const recentJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "IT Development",
      type: "Full Time",
      status: "active",
      applicants: 28,
      postedDate: "2025-01-15",
      accessibility: "Ramah Tuna Netra",
      location: "Surabaya",
    },
    {
      id: 2,
      title: "Content Creator",
      department: "Marketing",
      type: "Contract",
      status: "active",
      applicants: 15,
      postedDate: "2025-01-12",
      accessibility: "Ramah Tuna Rungu",
      location: "Remote",
    },
    {
      id: 3,
      title: "Data Analyst",
      department: "Business Intelligence",
      type: "Full Time",
      status: "draft",
      applicants: 0,
      postedDate: "2025-01-10",
      accessibility: "Ramah Kursi Roda",
      location: "Malang",
    },
  ];

  // Mock data untuk pelamar terbaru
  const recentApplicants = [
    {
      id: 1,
      name: "Ahmad Rizki",
      position: "Frontend Developer",
      appliedDate: "2025-01-16",
      status: "new",
      experience: "2 tahun",
      disability: "Tuna Netra",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Sari Wulandari",
      position: "Content Creator",
      appliedDate: "2025-01-15",
      status: "review",
      experience: "3 tahun",
      disability: "Tuna Rungu",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Budi Santoso",
      position: "Data Analyst",
      appliedDate: "2025-01-14",
      status: "interview",
      experience: "4 tahun",
      disability: "Kursi Roda",
      rating: 4.2,
    },
  ];

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  const getJobStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "draft":
        return "Draft";
      case "closed":
        return "Ditutup";
      default:
        return "Unknown";
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getApplicantStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Baru";
      case "review":
        return "Review";
      case "interview":
        return "Interview";
      case "accepted":
        return "Diterima";
      case "rejected":
        return "Ditolak";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Dashboard Perusahaan
              </h1>
              <p className="text-blue-100 mb-4">
                Kelola lowongan kerja dan temukan talent terbaik yang inklusif
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  PT Inklusi Teknologi
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Accessibility className="w-4 h-4" />
                  Perusahaan Inklusif
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white/80" />
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
                  Total Lowongan
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalJobs}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+3</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                bulan ini
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Pelamar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalApplicants}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+18</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                minggu ini
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lowongan Aktif
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeJobs}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Eye className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">
                Sedang berjalan
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pelamar Baru
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.newApplicants}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">
                7 hari terakhir
              </span>
            </div>
          </div>
        </div>

        {/* Recent Job Postings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Lowongan Terbaru
            </h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {job.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getJobStatusColor(
                          job.status
                        )}`}
                      >
                        {getJobStatusText(job.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {job.department} • {job.type}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {job.applicants} pelamar
                      </span>
                      <span className="flex items-center gap-1">
                        <Accessibility className="w-3 h-3" />
                        {job.accessibility}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(job.postedDate).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              Pelamar Terbaru
            </h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {applicant.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {applicant.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Melamar: {applicant.position}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Pengalaman: {applicant.experience}</span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {applicant.disability}
                      </span>
                      <span>
                        {new Date(applicant.appliedDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicantStatusColor(
                        applicant.status
                      )}`}
                    >
                      {getApplicantStatusText(applicant.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-12 xl:col-span-4 space-y-6">
        {/* Company Profile Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Profil Perusahaan
            </h3>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                  Profil Lengkap
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Profil perusahaan Anda sudah lengkap dan siap menarik kandidat
                  terbaik.
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                  Edit Profil
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
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  Tambah Lowongan
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Buat lowongan kerja baru
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  Kelola Pelamar
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Review dan proses lamaran
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  Laporan & Analitik
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Lihat performa rekrutmen
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  Pengaturan
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Kelola akun perusahaan
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
