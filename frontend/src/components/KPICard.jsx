import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

function KPICard({ title, value, icon, prefix = '', suffix = '', color = 'gold' }) {
  const colorMap = {
    gold: '#D4AF37',
    green: '#22C55E',
    red: '#DC2626',
    amber: '#F59E0B',
    purple: '#8B5CF6'
  }

  const accentColor = colorMap[color] || colorMap.gold

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden"
    >
      {/* Card */}
      <div className="luxury-card p-6 transition-all duration-300 space-y-4" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#A1A1AA] text-xs uppercase tracking-widest font-medium mb-2">
              {title}
            </p>
            <div 
              className="text-3xl font-bold"
              style={{ color: accentColor }}
            >
              <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="text-3xl transition-all duration-300"
          >
            {icon}
          </motion.div>
        </div>

        {/* Subtle bottom accent line */}
        <div 
          className="h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}00 100%)` }}
        ></div>
      </div>

      {/* Subtle glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-2 rounded opacity-0 group-hover:opacity-15 blur-xl -z-10 transition-opacity duration-300"
        style={{ background: accentColor }}
      />
    </motion.div>
  )
}

export default KPICard
