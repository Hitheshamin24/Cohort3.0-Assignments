const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl">
            W
          </div>
          <span className="text-2xl font-bold text-text-primary tracking-tight">Walletly</span>
        </div>

        {/* card */}
        <div className="bg-surface rounded-2xl border border-border shadow-sm p-8">
          {children}
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Personal Finance Tracker · Learning Project
        </p>
      </div>
    </div>
  )
}

export default AuthLayout
