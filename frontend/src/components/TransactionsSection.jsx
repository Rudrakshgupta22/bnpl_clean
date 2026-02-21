import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'

function TransactionsSection({ records, riskData, onRecordPaid }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [statusFilter, setStatusFilter] = useState('active')
  const [currentPage, setCurrentPage] = useState(1)
  const [markingPaid, setMarkingPaid] = useState(null)
  const itemsPerPage = 10

  const filteredAndSorted = useMemo(() => {
    let filtered = records.filter(r => {
      const matchesSearch = r.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email_subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount
      if (sortBy === 'installments') return b.installments - a.installments
      return new Date(b.created_at) - new Date(a.created_at)
    })

    return filtered
  }, [records, searchTerm, sortBy, statusFilter])

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage)
  const paginatedRecords = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleMarkPaid = async (recordId) => {
    setMarkingPaid(recordId)
    try {
      const res = await api.put(`/api/bnpl/${recordId}/mark-paid`)
      if (res.data.success) {
        // Call parent callback to update dashboard
        if (onRecordPaid) {
          onRecordPaid(res.data.analysis, res.data.affordability)
        }
      }
    } catch (error) {
      console.error('Error marking as paid:', error)
    } finally {
      setMarkingPaid(null)
    }
  }

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">✓ Paid</span>
    }
    return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Active</span>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search vendor or subject..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
        
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="active">Active Only</option>
          <option value="paid">Paid Only</option>
          <option value="all">All</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="installments">Sort by Installments</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Vendor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">EMI</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.map((record, idx) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`border-b border-gray-700 hover:bg-gray-700/30 transition-colors ${
                    record.status === 'paid' ? 'opacity-60' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-white font-medium">{record.vendor}</td>
                  <td className="px-6 py-4 text-white">₹{record.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">{record.installments}</td>
                  <td className="px-6 py-4 text-gray-300">{record.due_date || 'N/A'}</td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                  <td className="px-6 py-4">
                    {record.status === 'active' ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMarkPaid(record.id)}
                        disabled={markingPaid === record.id}
                        className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs rounded transition disabled:opacity-50"
                      >
                        {markingPaid === record.id ? '⏳' : '✓ Mark Paid'}
                      </motion.button>
                    ) : (
                      <span className="text-gray-500 text-xs">Completed</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Row */}
        <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700 font-semibold text-white">
          Total Outstanding: ₹{riskData?.total_outstanding.toLocaleString()}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg transition-all ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {page}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default TransactionsSection
