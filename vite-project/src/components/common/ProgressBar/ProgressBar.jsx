import './ProgressBar.css'

function ProgressBar({ value, max, tone = 'brand' }) {
  const safeMax = max > 0 ? max : 1
  const percent = Math.max(0, Math.min(100, (value / safeMax) * 100))

  return (
    <div className="progress-bar">
      {/* Width is the one value that has to be computed at runtime — every
          other style here lives in ProgressBar.css. */}
      <div
        className={`progress-bar__fill progress-bar__fill--${tone}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar
