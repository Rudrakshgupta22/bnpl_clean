import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

function KPICard({ title, value, icon, prefix = '', suffix = '', color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/30 hover:border-blue-500/60',
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:border-purple-500/60',
    green: 'from-green-500/10 to-green-600/10 border-green-500/30 hover:border-green-500/60',
    yellow: 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 hover:border-yellow-500/60',
    red: 'from-red-500/10 to-red-600/10 border-red-500/30 hover:border-red-500/60'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <div className="text-3xl font-bold text-white">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          </div>
        </div>
        <div className="text-4xl opacity-50 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl" 
           style={{ background: `linear-gradient(135deg, var(--color-start), var(--color-end))` }} />
    </motion.div>
  )
}

export default KPICard
