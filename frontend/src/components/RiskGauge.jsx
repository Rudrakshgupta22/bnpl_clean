import { motion } from 'framer-motion'

function RiskGauge({ score, level }) {
  const getRiskColor = (score) => {
    if (score < 20) return '#22C55E'      // Green - Safe
    if (score < 50) return '#F59E0B'      // Amber - Caution
    return '#DC2626'                       // Red - High Risk
  }

  const getRiskLevelText = (score) => {
    if (score < 20) return 'Excellent'
    if (score < 50) return 'Moderate'
    return 'High Risk'
  }

  const color = getRiskColor(score)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Circular Gauge */}
      <div className="relative w-48 h-48">
        {/* Background Circle */}
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 120 120"
        >
          {/* Outer Border */}
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="rgba(212, 175, 55, 0.1)"
            strokeWidth="1"
          />
          
          {/* Background Track */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="8"
          />
          
          {/* Animated Progress Track */}
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div 
              className="text-5xl font-bold"
              style={{ color }}
            >
              {score}
            </div>
            <div className="text-xs text-[#A1A1AA] mt-1 tracking-widest uppercase">
              Risk Score
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center space-y-1"
      >
        <div className="text-lg font-semibold text-[#F5F5F5]">
          {getRiskLevelText(score)}
        </div>
        <div className="text-sm text-[#A1A1AA]">
          {score < 20 && 'Your BNPL obligations are well-managed'}
          {score >= 20 && score < 50 && 'Monitor your BNPL commitments closely'}
          {score >= 50 && 'Your debt obligations require immediate attention'}
        </div>
      </motion.div>
    </div>
  )
}

export default RiskGauge
