import { motion } from 'framer-motion'
import KPICard from './KPICard'
import RiskGauge from './RiskGauge'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function DashboardSection({ profile, riskData, records, affordability }) {
  if (!riskData) return <div className="text-gray-400">Loading...</div>

  const chartData = [
    { name: 'Monthly EMI', value: riskData.monthly_obligation },
    { name: 'Rent', value: profile?.monthly_rent || 0 },
    { name: 'Other Expenses', value: profile?.other_expenses || 0 }
  ]

  const expenseData = [
    { name: 'EMI', value: riskData.monthly_obligation },
    { name: 'Rent', value: profile?.monthly_rent || 0 },
    { name: 'Other', value: profile?.other_expenses || 0 }
  ]

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981']

  const getAffordabilityColor = (status) => {
    if (status === 'Healthy') return 'from-green-500/10 to-emerald-600/10 border-green-500/30'
    if (status === 'Warning') return 'from-yellow-500/10 to-orange-600/10 border-yellow-500/30'
    return 'from-red-500/10 to-rose-600/10 border-red-500/30'
  }

  const getAffordabilityTextColor = (status) => {
    if (status === 'Healthy') return 'text-green-400'
    if (status === 'Warning') return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Outstanding"
          value={riskData.total_outstanding}
          icon="💰"
          prefix="₹"
          color="blue"
        />
        <KPICard
          title="Monthly EMI"
          value={riskData.monthly_obligation}
          icon="📅"
          prefix="₹"
          color="purple"
        />
        <KPICard
          title="Upcoming Dues"
          value={riskData.upcoming_dues}
          icon="⏰"
          prefix="₹"
          color="yellow"
        />
        <KPICard
          title="Risk Score"
          value={riskData.risk_score}
          icon="⚠️"
          suffix="/100"
          color={riskData.risk_score < 20 ? 'green' : riskData.risk_score < 50 ? 'yellow' : 'red'}
        />
      </div>

      {/* Affordability Card */}
      {affordability && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${getAffordabilityColor(affordability.status)} backdrop-blur-lg rounded-2xl p-6 border`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Available EMI Capacity</p>
              <p className={`text-3xl font-bold ${getAffordabilityTextColor(affordability.status)}`}>
                ₹{affordability.available_emi_capacity.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Safe to borrow</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-2">Financial Status</p>
              <p className={`text-3xl font-bold ${getAffordabilityTextColor(affordability.status)}`}>
                {affordability.status}
              </p>
              <p className="text-xs text-gray-500 mt-1">Current health</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Safe EMI Usage</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    affordability.status === 'Healthy' ? 'bg-green-500' :
                    affordability.status === 'Warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, affordability.safe_emi_percentage)}%` }}
                />
              </div>
              <p className={`text-sm font-semibold ${getAffordabilityTextColor(affordability.status)}`}>
                {affordability.safe_emi_percentage.toFixed(1)}% of safe limit
              </p>
            </div>
          </div>

          {affordability.status === 'Overleveraged' && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">
                ⚠️ You are exceeding safe borrowing limits. Consider paying off existing BNPL commitments.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-4">Monthly Obligations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Risk Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-bold text-white mb-4">Risk Assessment</h3>
        <RiskGauge score={riskData.risk_score} level={riskData.risk_level} />
      </motion.div>
    </motion.div>
  )
}

export default DashboardSection
