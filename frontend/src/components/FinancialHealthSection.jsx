import { useState } from 'react'
import { motion } from 'framer-motion'

function FinancialHealthSection({ profile, riskData, onProfileUpdate }) {
  const [simulatedSalary, setSimulatedSalary] = useState(profile?.salary || 30000)
  const [simulatedRent, setSimulatedRent] = useState(profile?.monthly_rent || 5000)
  const [simulatedExpenses, setSimulatedExpenses] = useState(profile?.other_expenses || 3000)

  const monthlyObligation = riskData?.monthly_obligation || 0
  
  const simulatedDisposable = simulatedSalary - (simulatedRent + simulatedExpenses + monthlyObligation)
  const simulatedSavingsRatio = simulatedSalary > 0 ? (simulatedDisposable / simulatedSalary * 100) : 0
  const simulatedDebtRatio = simulatedSalary > 0 ? (monthlyObligation / simulatedSalary * 100) : 0

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.good) return { text: '#22C55E', label: 'Excellent' }
    if (value >= thresholds.ok) return { text: '#F59E0B', label: 'Moderate' }
    return { text: '#DC2626', label: 'Critical' }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Financial Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Monthly Salary',
            value: simulatedSalary,
            color: '#D4AF37',
            icon: '💰'
          },
          {
            label: 'Fixed Expenses',
            value: simulatedRent + simulatedExpenses,
            color: '#A1A1AA',
            icon: '🏠'
          },
          {
            label: 'BNPL Obligation',
            value: monthlyObligation,
            color: monthlyObligation > simulatedSalary * 0.3 ? '#DC2626' : '#F59E0B',
            icon: '📋'
          },
          {
            label: 'Disposable Income',
            value: Math.max(0, simulatedDisposable),
            color: simulatedDisposable > 10000 ? '#22C55E' : simulatedDisposable > 0 ? '#F59E0B' : '#DC2626',
            icon: '🎯'
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="luxury-card p-6 border-[rgba(212,175,55,0.2)] space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-[#A1A1AA] text-xs uppercase tracking-widest">{item.label}</p>
              <span className="text-xl">{item.icon}</span>
            </div>
            <p 
              className="text-2xl font-bold"
              style={{ color: item.color }}
            >
              ₹{item.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Gold Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.2)] to-transparent"></div>

      {/* Financial Simulator */}
      <motion.div
        variants={itemVariants}
        className="luxury-card p-8 border-[rgba(212,175,55,0.2)] space-y-8"
      >
        <div>
          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">Financial Simulator</h3>
          <p className="text-[#A1A1AA] text-sm">Adjust parameters to model different scenarios</p>
        </div>

        {/* Sliders */}
        <div className="space-y-8">
          {[
            {
              label: 'Monthly Salary',
              value: simulatedSalary,
              onChange: setSimulatedSalary,
              min: 10000,
              max: 200000,
              step: 5000,
              color: '#D4AF37'
            },
            {
              label: 'Monthly Rent',
              value: simulatedRent,
              onChange: setSimulatedRent,
              min: 0,
              max: 50000,
              step: 1000,
              color: '#8B5CF6'
            },
            {
              label: 'Other Expenses',
              value: simulatedExpenses,
              onChange: setSimulatedExpenses,
              min: 0,
              max: 50000,
              step: 1000,
              color: '#F59E0B'
            }
          ].map((slider, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-end mb-3">
                <label className="text-[#F5F5F5] font-medium text-sm">{slider.label}</label>
                <span 
                  className="text-xl font-semibold"
                  style={{ color: slider.color }}
                >
                  ₹{slider.value.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={(e) => slider.onChange(Number(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${slider.color} 0%, ${slider.color} ${(slider.value - slider.min) / (slider.max - slider.min) * 100}%, rgba(212,175,55,0.15) ${(slider.value - slider.min) / (slider.max - slider.min) * 100}%, rgba(212,175,55,0.15) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-[#A1A1AA] mt-2">
                <span>₹{slider.min.toLocaleString()}</span>
                <span>₹{slider.max.toLocaleString()}</span>
              </div>
            </div>
          ))}

          {/* BNPL Obligation (Read-only) */}
          <div className="p-4 bg-[#242424] border border-[rgba(212,175,55,0.15)] rounded">
            <div className="flex justify-between items-center">
              <label className="text-[#F5F5F5] font-medium text-sm">Monthly BNPL Obligation</label>
              <span className="text-xl font-bold text-[#DC2626]">
                ₹{monthlyObligation.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-2">Auto-detected from your emails</p>
          </div>
        </div>
      </motion.div>

      {/* Impact Analysis */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            title: 'Debt-to-Income',
            value: simulatedDebtRatio.toFixed(1),
            unit: '%',
            thresholds: { good: 20, ok: 40 },
            description: (value) => value > 40 ? 'High risk - reduce BNPL' : value > 20 ? 'Monitor closely' : 'Healthy ratio',
            icon: '📊'
          },
          {
            title: 'Disposable Income',
            value: Math.max(0, simulatedDisposable),
            unit: '₹',
            thresholds: { good: 10000, ok: 5000 },
            description: (value) => value < 0 ? 'Deficit alert' : value < 5000 ? 'Limited buffer' : 'Good cushion',
            icon: '💸'
          },
          {
            title: 'Savings Ratio',
            value: simulatedSavingsRatio.toFixed(1),
            unit: '%',
            thresholds: { good: 20, ok: 10 },
            description: (value) => value < 10 ? 'Below target' : value < 20 ? 'Moderate' : 'Excellent',
            icon: '🏦'
          }
        ].map((metric, idx) => {
          const status = metric.thresholds ? getStatusColor(parseFloat(metric.value), metric.thresholds) : {}
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="luxury-card p-6 border-[rgba(212,175,55,0.2)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[#A1A1AA] text-xs uppercase tracking-wider font-medium">
                  {metric.title}
                </h4>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <p 
                className="text-3xl font-bold"
                style={{ color: status.text }}
              >
                {metric.value}{metric.unit}
              </p>
              <p className="text-xs text-[#A1A1AA]">
                {metric.description(parseFloat(metric.value))}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={itemVariants}
        className="luxury-card p-8 space-y-4"
        style={{ borderColor: 'rgba(212,175,55,0.2)' }}
      >
        <h3 className="text-lg font-bold text-[#D4AF37]">Financial Insights</h3>
        <div className="space-y-3">
          {simulatedDebtRatio > 40 && (
            <div className="flex gap-3 items-start p-3 rounded" style={{ backgroundColor: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.2)', borderWidth: '1px' }}>
              <span className="text-lg">⚠️</span>
              <span className="text-[#F5F5F5] text-sm">Your BNPL obligations are high relative to income. Consider prioritizing repayment.</span>
            </div>
          )}
          {simulatedDisposable < 0 && (
            <div className="flex gap-3 items-start p-3 rounded" style={{ backgroundColor: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.2)', borderWidth: '1px' }}>
              <span className="text-lg">🚨</span>
              <span className="text-[#F5F5F5] text-sm">Expenses exceed income. Adjust parameters or increase earnings to regain balance.</span>
            </div>
          )}
          {simulatedSavingsRatio < 10 && (
            <div className="flex gap-3 items-start p-3 rounded" style={{ backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)', borderWidth: '1px' }}>
              <span className="text-lg">⏱️</span>
              <span className="text-[#F5F5F5] text-sm">Savings ratio is below target. Build an emergency fund of 3-6 months expenses.</span>
            </div>
          )}
          {simulatedDebtRatio <= 40 && simulatedDisposable > 0 && simulatedSavingsRatio >= 10 && (
            <div className="flex gap-3 items-start p-3 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.2)', borderWidth: '1px' }}>
              <span className="text-lg">✅</span>
              <span className="text-[#F5F5F5] text-sm">Your financial health is strong. Maintain this balance and continue building wealth.</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FinancialHealthSection
