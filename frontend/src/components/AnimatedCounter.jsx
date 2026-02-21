import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      setDisplayValue(Math.floor(value * progress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
