import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'

function EditProfileModal({ profile, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    salary: profile?.salary || 30000,
    monthly_rent: profile?.monthly_rent || 5000,
    other_expenses: profile?.other_expenses || 3000
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'full_name' ? value : Number(value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.put('/api/user/profile', formData)
      if (res.data.success) {
        onSave(res.data.data)
        onClose()
      } else {
        setError(res.data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              placeholder="Your name"
            />
          </div>

          {/* Monthly Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              min="10000"
              max="500000"
              step="5000"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">₹{formData.salary.toLocaleString()}</p>
          </div>

          {/* Monthly Rent */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Rent (₹)</label>
            <input
              type="number"
              name="monthly_rent"
              value={formData.monthly_rent}
              onChange={handleChange}
              min="0"
              max="100000"
              step="1000"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">₹{formData.monthly_rent.toLocaleString()}</p>
          </div>

          {/* Other Expenses */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Other Monthly Expenses (₹)</label>
            <input
              type="number"
              name="other_expenses"
              value={formData.other_expenses}
              onChange={handleChange}
              min="0"
              max="100000"
              step="1000"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">₹{formData.other_expenses.toLocaleString()}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-lg transition font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default EditProfileModal
