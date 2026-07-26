const StatCard = ({ title, value, icon: Icon, color, sub }) => {
  return (
    <div className="bg-surface rounded-2xl border border-border p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-text-muted font-medium">{title}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
    </div>
  )
}

export default StatCard
