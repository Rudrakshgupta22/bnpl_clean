import { useState } from 'react'
import { motion } from 'framer-motion'

function FinancialHealthSection({ profile, riskData, onProfileUpdate }) {
  const [simulatedSalary, setSimulatedSalary] = useState(profile?.salary || 30000)
  const [simulatedRent, setSimulatedRent] = useState(profile?.monthly_rent || 5000)
  const [simulatedExpenses, setSimulatedExpenses] = useState(profile?.other_expenses || 3000)

  const monthlyObligation = riskData?.monthly_obligation || 0
  
  // Calculate simulated values
  const simulatedDisposable = simulatedSalary - (simulatedRent + simulatedExpenses + monthlyObligation)
  const simulatedSavingsRatio = simulatedSalary > 0 ? (simulatedDisposable / simulatedSalary * 100) : 0
  const simulatedDebtRatio = simulatedSalary > 0 ? (monthlyObligation / simulatedSalary * 100) : 0

  const getHealthColor = (value) => {
    if (value >= 20) return 'text-green-400'
    if (value >= 10) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getHealthBg = (value) => {
    if (value >= 20) return 'from-green-500/10 to-emerald-600/10 border-green-500/30'
    if (value >= 10) return 'from-yellow-500/10 to-orange-600/10 border-yellow-500/30'
    return 'from-red-500/10 to-rose-600/10 border-red-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Current Financial Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30"
        >
          <p className="text-gray-400 text-sm mb-2">Monthly Salary</p>
          <p className="text-3xl font-bold text-blue-400">₹{simulatedSalary.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Current income</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
        >
          <p className="text-gray-400 text-sm mb-2">Fixed Expenses</p>
          <p className="text-3xl font-bold text-purple-400">₹{(simulatedRent + simulatedExpenses).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Rent + Other</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-gradient-to-br ${getHealthBg(simulatedDisposable)} backdrop-blur-lg rounded-2xl p-6 border`}
        >
          <p className="text-gray-400 text-sm mb-2">Disposable Income</p>
          <p className={`text-3xl font-bold ${getHealthColor(simulatedDisposable)}`}>
            ₹{Math.max(0, simulatedDisposable).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">After all expenses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-gradient-to-br ${getHealthBg(simulatedSavingsRatio)} backdrop-blur-lg rounded-2xl p-6 border`}
        >
          <p className="text-gray-400 text-sm mb-2">Savings Ratio</p>
          <p className={`text-3xl font-bold ${getHealthColor(simulatedSavingsRatio)}`}>
            {simulatedSavingsRatio.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-2">Of monthly income</p>
        </motion.div>
      </div>

      {/* Interactive Sliders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-8">💡 Financial Simulator</h3>
        <p className="text-gray-400 text-sm mb-6">Adjust your financial parameters to see impact on your financial health</p>

        {/* Salary Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-white font-semibold">Monthly Salary</label>
            <span className="text-2xl font-bold text-blue-400">₹{simulatedSalary.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={simulatedSalary}
            onChange={(e) => setSimulatedSalary(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹10,000</span>
            <span>₹200,000</span>
          </div>
        </div>

        {/* Rent Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-white font-semibold">Monthly Rent</label>
            <span className="text-2xl font-bold text-purple-400">₹{simulatedRent.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={simulatedRent}
            onChange={(e) => setSimulatedRent(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹0</span>
            <span>₹50,000</span>
          </div>
        </div>

        {/* Other Expenses Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-white font-semibold">Other Monthly Expenses</label>
            <span className="text-2xl font-bold text-orange-400">₹{simulatedExpenses.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={simulatedExpenses}
            onChange={(e) => setSimulatedExpenses(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹0</span>
            <span>₹50,000</span>
          </div>
        </div>

        {/* BNPL Obligation (Read-only) */}
        <div className="mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <label className="text-white font-semibold">Monthly BNPL Obligation</label>
            <span className="text-2xl font-bold text-red-400">₹{monthlyObligation.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">From your BNPL commitments (read-only)</p>
        </div>
      </motion.div>

      {/* Impact Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-6">📈 Impact Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Debt Ratio */}
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-3">Debt-to-Income Ratio</p>
            <p className={`text-4xl font-bold mb-2 ${simulatedDebtRatio > 40 ? 'text-red-400' : simulatedDebtRatio > 20 ? 'text-yellow-400' : 'text-green-400'}`}>
              {simulatedDebtRatio.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500">
              {simulatedDebtRatio > 40 ? '⚠️ High - Consider reducing BNPL' : simulatedDebtRatio > 20 ? '⚡ Moderate - Monitor closely' : '✅ Healthy - Good ratio'}
            </p>
          </div>

          {/* Disposable Income */}
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-3">Disposable Income</p>
            <p className={`text-4xl font-bold mb-2 ${simulatedDisposable < 0 ? 'text-red-400' : simulatedDisposable < 5000 ? 'text-yellow-400' : 'text-green-400'}`}>
              ₹{Math.max(0, simulatedDisposable).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              {simulatedDisposable < 0 ? '🚨 Deficit - Expenses exceed income' : simulatedDisposable < 5000 ? '⚠️ Low - Limited buffer' : '✅ Healthy - Good cushion'}
            </p>
          </div>

          {/* Savings Potential */}
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-3">Savings Potential</p>
            <p className={`text-4xl font-bold mb-2 ${simulatedSavingsRatio < 10 ? 'text-red-400' : simulatedSavingsRatio < 20 ? 'text-yellow-400' : 'text-green-400'}`}>
              {simulatedSavingsRatio.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500">
              {simulatedSavingsRatio < 10 ? '🚨 Very low - Increase income or reduce expenses' : simulatedSavingsRatio < 20 ? '⚠️ Below target - Aim for 20%+' : '✅ Excellent - On track'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30"
      >
        <h3 className="text-2xl font-bold text-white mb-4">💡 Recommendations</h3>
        <ul className="space-y-3 text-gray-300">
          {simulatedDebtRatio > 40 && (
            <li className="flex items-start space-x-3">
              <span className="text-red-400 mt-1">⚠️</span>
              <span>Your debt-to-income ratio is high. Consider paying off BNPL commitments faster or reducing new purchases.</span>
            </li>
          )}
          {simulatedDisposable < 0 && (
            <li className="flex items-start space-x-3">
              <span className="text-red-400 mt-1">🚨</span>
              <span>Your expenses exceed income. Reduce spending or increase income to avoid financial stress.</span>
            </li>
          )}
          {simulatedSavingsRatio < 10 && (
            <li className="flex items-start space-x-3">
              <span className="text-yellow-400 mt-1">⚡</span>
              <span>Your savings ratio is below 10%. Aim to save at least 20% of your income for emergencies.</span>
            </li>
          )}
          {simulatedDebtRatio <= 40 && simulatedDisposable >= 0 && simulatedSavingsRatio >= 10 && (
            <li className="flex items-start space-x-3">
              <span className="text-green-400 mt-1">✅</span>
              <span>Your financial health looks good! Keep maintaining this balance and continue building your savings.</span>
            </li>
          )}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default FinancialHealthSection
