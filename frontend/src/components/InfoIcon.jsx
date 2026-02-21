import { motion } from 'framer-motion'
import InfoTooltip from './InfoTooltip'

function InfoIcon({ metric, className = '' }) {
  return (
    <InfoTooltip metric={metric}>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/10 border border-yellow-500/30 cursor-help transition-all hover:bg-yellow-500/20 hover:border-yellow-500/50 ${className}`}
      >
        <span className="text-xs font-bold text-yellow-400">ⓘ</span>
      </motion.div>
    </InfoTooltip>
  )
}

export default InfoIcon
