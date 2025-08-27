'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Search, Filter, MapPin, Accessibility, Clock, DollarSign, ChevronDown, X, ChevronUp } from 'lucide-react'
import JobCard from '@/components/company/JobCard'
import apiBissaKerja from '@/lib/api-bissa-kerja'

// Interface job dari backend
interface PerusahaanProfile {
  id: number
  nama_perusahaan: string
  logo: string | null
  alamat_lengkap: string
}

interface Job {
  id: number
  job_title: string
  job_type: string
  description: string
  requirements: string
  salary_range: string
  location: string
  application_deadline: string
  experience: string
  perusahaan_profile: PerusahaanProfile
  accessibility_features?: string
  skills: string[]
}

export default function CariPekerjaanPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [disabilityFilter, setDisabilityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  const locationRef = useRef<HTMLDivElement>(null)

  // Fetch jobs dari backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await apiBissaKerja.get("/company/job-vacancies")
        if (response.data.success) {
          setJobs(response.data.data || [])
        } else {
          setJobs([])
        }
      } catch (err) {
        console.error("Error fetch jobs:", err)
        setError("Gagal mengambil data lowongan")
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Unique lokasi dan tipe pekerjaan
  const uniqueLocations = useMemo(() =>
    [...new Set(jobs.map(job => job.location))], [jobs]
  )
  const filteredLocations = useMemo(() =>
    uniqueLocations.filter(location =>
      location.toLowerCase().includes(locationInput.toLowerCase())
    ), [uniqueLocations, locationInput]
  )
  const uniqueTypes = useMemo(() =>
    [...new Set(jobs.map(job => job.job_type))], [jobs]
  )

  // Jenis disabilitas (hardcode)
  const disabilityTypes = [
    'Ramah untuk tunanetra',
    'Ramah untuk tunarungu',
    'Ramah untuk tunadaksa',
    'Ramah untuk disabilitas intelektual',
    'Ramah untuk disabilitas mental',
    'Ramah untuk semua disabilitas'
  ]

  // Tutup dropdown lokasi jika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocationSelect = (location: string) => {
    setLocationFilter(location)
    setLocationInput(location)
    setShowLocationDropdown(false)
  }

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value)
    setLocationFilter(value)
    setShowLocationDropdown(true)
  }

  // Filter dan sort
  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = searchTerm === '' ||
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = locationFilter === '' ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase())

      const matchesDisability = disabilityFilter === '' ||
        (job.accessibility_features && job.accessibility_features === disabilityFilter)

      const matchesType = typeFilter === '' || job.job_type === typeFilter

      return matchesSearch && matchesLocation && matchesDisability && matchesType
    })

    switch (sortBy) {
      case 'oldest':
        return filtered.reverse()
      case 'salary-high':
        return filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary_range.replace(/[^\d]/g, '')) || 0
          const salaryB = parseInt(b.salary_range.replace(/[^\d]/g, '')) || 0
          return salaryB - salaryA
        })
      case 'salary-low':
        return filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary_range.replace(/[^\d]/g, '')) || 0
          const salaryB = parseInt(b.salary_range.replace(/[^\d]/g, '')) || 0
          return salaryA - salaryB
        })
      default:
        return filtered
    }
  }, [jobs, searchTerm, locationFilter, disabilityFilter, typeFilter, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setLocationFilter('')
    setLocationInput('')
    setDisabilityFilter('')
    setTypeFilter('')
    setSortBy('newest')
    setShowLocationDropdown(false)
  }

  const hasActiveFilters = searchTerm || locationFilter || disabilityFilter || typeFilter || sortBy !== 'newest'

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cari Pekerjaan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Temukan peluang karier yang sesuai dengan keahlian dan kebutuhan Anda
          </p>
        </div>

        {/* Search dan filter */}
        {/* ... (bagian Search, Filter, Dropdown, sama dengan kode Anda sebelumnya, tidak berubah) */}

        {/* Job Results */}
        {loading ? (
          <div className="text-center py-12">Memuat data...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  id: job.id,
                  title: job.job_title,
                  company: job.perusahaan_profile.nama_perusahaan,
                  location: job.location,
                  salary: job.salary_range,
                  type: job.job_type,
                  posted: job.application_deadline,
                  description: job.description,
                  requirements: job.requirements.split('\n'),
                  logo: job.perusahaan_profile.logo || ''
                }}
                urlDetail={`/cari-kerja/detail/${job.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Tidak ada lowongan ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Coba ubah kata kunci pencarian atau filter yang Anda gunakan
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
