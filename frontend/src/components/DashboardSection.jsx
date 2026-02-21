import { motion } from 'framer-motion'
import KPICard from './KPICard'
import RiskGauge from './RiskGauge'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function DashboardSection({ profile, riskData, records, affordability }) {
  if (!riskData) return <div className="text-[#A1A1AA]">Loading...</div>

  const chartData = [
    { name: 'BNPL EMI', value: riskData.monthly_obligation },
    { name: 'Rent', value: profile?.monthly_rent || 0 },
    { name: 'Other', value: profile?.other_expenses || 0 }
  ]

  const expenseData = [
    { name: 'BNPL', value: riskData.monthly_obligation },
    { name: 'Rent', value: profile?.monthly_rent || 0 },
    { name: 'Other', value: profile?.other_expenses || 0 }
  ]

  const COLORS = ['#D4AF37', '#8B5CF6', '#22C55E']

  const getAffordabilityColor = (status) => {
    if (status === 'Healthy') return { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)', text: '#22C55E' }
    if (status === 'Warning') return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', text: '#F59E0B' }
    return { bg: 'rgba(220, 38, 38, 0.1)', border: 'rgba(220, 38, 38, 0.2)', text: '#DC2626' }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Outstanding"
          value={riskData.total_outstanding}
          icon="💰"
          prefix="₹"
          color="gold"
        />
        <KPICard
          title="Monthly EMI"
          value={riskData.monthly_obligation}
          icon="📅"
          prefix="₹"
          color="amber"
        />
        <KPICard
          title="Upcoming Dues"
          value={riskData.upcoming_dues}
          icon="⏰"
          prefix="₹"
          color="purple"
        />
        <KPICard
          title="Risk Score"
          value={riskData.risk_score}
          icon="⚠️"
          suffix="/100"
          color={riskData.risk_score < 20 ? 'green' : riskData.risk_score < 50 ? 'amber' : 'red'}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.15)] to-transparent"></div>

      {/* Affordability Card */}
      {affordability && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-8 space-y-6"
          style={{ 
            backgroundColor: '#1E1E1E',
            borderColor: getAffordabilityColor(affordability.status).border
          }}
        >
          <h3 className="text-lg font-bold text-[#F5F5F5]">📊 Financial Affordability</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[#A1A1AA] text-xs uppercase tracking-widest mb-2">Available EMI Capacity</p>
              <p 
                className="text-3xl font-bold"
                style={{ color: getAffordabilityColor(affordability.status).text }}
              >
                ₹{affordability.available_emi_capacity.toLocaleString()}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">Safe to borrow</p>
            </div>
            
            <div>
              <p className="text-[#A1A1AA] text-xs uppercase tracking-widest mb-2">Status</p>
              <p 
                className="text-3xl font-bold"
                style={{ color: getAffordabilityColor(affordability.status).text }}
              >
                {affordability.status}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">Current health</p>
            </div>

            <div>
              <p className="text-[#A1A1AA] text-xs uppercase tracking-widest mb-2">EMI Usage</p>
              <div className="w-full bg-[rgba(212,175,55,0.1)] rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ 
                    width: `${Math.min(100, affordability.safe_emi_percentage)}%`,
                    backgroundColor: getAffordabilityColor(affordability.status).text
                  }}
                />
              </div>
              <p className="text-sm font-semibold" style={{ color: getAffordabilityColor(affordability.status).text }}>
                {affordability.safe_emi_percentage.toFixed(1)}% utilized
              </p>
            </div>
          </div>

      {affordability.status === 'Overleveraged' && (
            <div className="p-4 rounded" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <p className="text-[#DC2626] text-sm">
                ⚠️ You are exceeding safe borrowing limits. Prioritize paying off existing commitments.
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
          className="luxury-card p-6 space-y-4"
          style={{ borderColor: 'rgba(212,175,55,0.2)' }}
        >
          <h3 className="text-lg font-bold text-[#F5F5F5]">Monthly Obligations Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  border: '1px solid rgba(212,175,55,0.3)', 
                  borderRadius: '8px',
                  color: '#F5F5F5'
                }} 
              />
              <Bar dataKey="value" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="luxury-card p-6 space-y-4"
          style={{ borderColor: 'rgba(212,175,55,0.2)' }}
        >
          <h3 className="text-lg font-bold text-[#F5F5F5]">Expense Breakdown</h3>
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
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  border: '1px solid rgba(212,175,55,0.3)', 
                  borderRadius: '8px',
                  color: '#F5F5F5'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Risk Gauge Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="luxury-card p-8"
        style={{ borderColor: 'rgba(212,175,55,0.2)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Risk Assessment</h3>
            <p className="text-[#A1A1AA] text-sm mb-6">Comprehensive financial risk evaluation based on your BNPL obligations</p>
            
            <div className="space-y-4">
              <div className="p-3 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <p className="text-[#A1A1AA] text-xs mb-1 uppercase">Total Outstanding</p>
                <p className="text-2xl font-bold text-[#D4AF37]">₹{riskData.total_outstanding.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <p className="text-[#A1A1AA] text-xs mb-1 uppercase">Upcoming Dues (30 days)</p>
                <p className="text-2xl font-bold text-[#D4AF37]">₹{riskData.upcoming_dues.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <RiskGauge score={riskData.risk_score} level={riskData.risk_level} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardSection

