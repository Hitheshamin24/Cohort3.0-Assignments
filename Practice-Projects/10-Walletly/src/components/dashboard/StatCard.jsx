const StatCard = ({ title, value, icon: Icon, color, sub }) => {
  return (
    <div className="bg-surface rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">{title}</p>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="text-2xl font-extrabold text-text-primary tracking-tight">{value}</p>
      {sub && <p className="text-xs text-text-muted mt-1 font-medium">{sub}</p>}
    </div>
  )
}

export default StatCard
