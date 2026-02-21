import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

function RiskGauge({ score, level }) {
  const getRiskColor = (score) => {
    if (score < 20) return '#10b981'
    if (score < 50) return '#f59e0b'
    return '#ef4444'
  }

  const data = [
    { name: 'Risk', value: score },
    { name: 'Safe', value: 100 - score }
  ]

  const color = getRiskColor(score)

  return (
    <div className="flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-4"
      >
        <div className="text-4xl font-bold" style={{ color }}>
          {score}
        </div>
        <div className="text-sm text-gray-400 mt-1">{level} Risk</div>
      </motion.div>
    </div>
  )
}

export default RiskGauge
