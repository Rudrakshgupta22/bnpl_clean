import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function InfoTooltip({ metric, children }) {
  const [isOpen, setIsOpen] = useState(false)

  const metricsInfo = {
    total_outstanding: {
      title: 'Total Outstanding',
      what: 'The total remaining amount you owe across all active BNPL purchases.',
      how: 'Sum of all unpaid BNPL transaction amounts.',
      meaning: 'Higher outstanding means higher financial burden. Keeping this low improves financial flexibility.',
      healthy: 'Below ₹50,000 is generally manageable',
      risky: 'Above ₹100,000 may indicate over-borrowing'
    },
    monthly_emi: {
      title: 'Monthly EMI',
      what: 'The total amount you must pay monthly for your active BNPL commitments.',
      how: 'Sum of (transaction amount ÷ number of installments).',
      meaning: 'If this grows beyond 30% of your salary, you may face financial stress.',
      healthy: 'Less than 20% of your salary is ideal',
      risky: 'More than 30% of your salary indicates overleveraging'
    },
    risk_score: {
      title: 'Risk Score',
      what: 'A financial stress indicator based on your EMI-to-income ratio.',
      how: 'Calculated from your monthly EMI divided by salary, scaled to 0-100.',
      meaning: 'Shows how much financial stress you may be under.',
      healthy: 'Low (0-20): Safe borrowing level',
      risky: 'High (50-100): Overleveraged risk'
    },
    affordability_capacity: {
      title: 'Affordability Capacity',
      what: 'The additional EMI amount you can safely take without exceeding safe borrowing limits.',
      how: '30% of salary minus current EMI obligations.',
      meaning: 'Shows how much more BNPL you can safely afford.',
      healthy: 'Positive value means you have borrowing capacity',
      risky: 'Negative value means you are exceeding safe financial limits'
    },
    debt_ratio: {
      title: 'Debt-to-Income Ratio',
      what: 'The percentage of your monthly income going towards BNPL payments.',
      how: 'Monthly EMI divided by monthly salary, expressed as a percentage.',
      meaning: 'Lower ratio means more financial flexibility.',
      healthy: 'Below 20% is healthy',
      risky: 'Above 30% indicates financial stress'
    },
    disposable_income: {
      title: 'Disposable Income',
      what: 'Money remaining after paying rent, fixed expenses, and EMI.',
      how: 'Salary minus (rent + other expenses + monthly EMI).',
      meaning: 'This is your financial cushion for emergencies and savings.',
      healthy: 'Positive and above ₹10,000 is good',
      risky: 'Negative means you are spending more than you earn'
    },
    savings_ratio: {
      title: 'Savings Ratio',
      what: 'Percentage of income left after all expenses.',
      how: 'Disposable income divided by salary, expressed as a percentage.',
      meaning: 'Shows what percentage of your income you can save.',
      healthy: 'Above 20% is strong financial health',
      risky: 'Below 10% indicates limited savings capacity'
    },
    salary: {
      title: 'Monthly Salary',
      what: 'Your total monthly income.',
      how: 'The amount you entered during onboarding.',
      meaning: 'Used as the baseline for all financial calculations.',
      healthy: 'Ensure this is accurate for correct calculations',
      risky: 'Underreporting salary can lead to incorrect risk assessment'
    },
    monthly_rent: {
      title: 'Monthly Rent',
      what: 'Your monthly housing expense.',
      how: 'The amount you entered during onboarding.',
      meaning: 'Part of your fixed expenses that reduces disposable income.',
      healthy: 'Below 30% of salary is recommended',
      risky: 'Above 50% of salary may strain finances'
    },
    other_expenses: {
      title: 'Other Monthly Expenses',
      what: 'Your other fixed monthly expenses (utilities, food, etc.).',
      how: 'The amount you entered during onboarding.',
      meaning: 'Combined with rent, these form your fixed expense base.',
      healthy: 'Keep total fixed expenses below 50% of salary',
      risky: 'Above 60% of salary leaves little room for BNPL'
    },
    upcoming_dues: {
      title: 'Upcoming Dues',
      what: 'The total amount due within the next 30 days.',
      how: 'Sum of monthly installments for BNPL due within 30 days.',
      meaning: 'Shows your immediate payment obligations.',
      healthy: 'Ensure you have funds to cover upcoming dues',
      risky: 'If this exceeds your disposable income, you may face payment issues'
    },
    available_emi_capacity: {
      title: 'Available EMI Capacity',
      what: 'How much more monthly EMI you can safely take on.',
      how: '30% of salary minus your current monthly EMI.',
      meaning: 'Your safe borrowing headroom.',
      healthy: 'Positive value means you can take more BNPL if needed',
      risky: 'Negative means you should pay off existing BNPL'
    }
  }

  const info = metricsInfo[metric]

  if (!info) {
    return children
  }

  return (
    <div className="relative inline-block">
      <div
        className="cursor-help"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 w-80 p-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500/30 rounded-lg shadow-2xl"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 30px rgba(234, 179, 8, 0.2), 0 0 60px rgba(234, 179, 8, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Title */}
            <h4 className="text-lg font-bold text-yellow-400 mb-3">
              {info.title}
            </h4>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-yellow-500/20 via-yellow-500/50 to-yellow-500/20 mb-3" />

            {/* What it is */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                What it is
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {info.what}
              </p>
            </div>

            {/* How it's calculated */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                How it's calculated
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {info.how}
              </p>
            </div>

            {/* What it means */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                What it means for you
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {info.meaning}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-yellow-500/20 via-yellow-500/50 to-yellow-500/20 my-3" />

            {/* Healthy vs Risky */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">
                  ✓ Healthy
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {info.healthy}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">
                  ⚠ Risky
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {info.risky}
                </p>
              </div>
            </div>

            {/* Arrow pointer */}
            {/* Removed - using fixed positioning instead */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InfoTooltip
