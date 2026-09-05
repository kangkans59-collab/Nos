export function formatCurrency(amount) {
  const value = Number(amount) || 0
  return `₹${value.toLocaleString('en-IN')}`
}

export function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000)
}

// Returns a human label + a "tone" (used to color a Badge) for how close a
// listing is to its available-until time. Everything here is computed from
// mock data at render time — there is no backend clock to sync with.
export function getExpiryStatus(expiryISO, now = new Date()) {
  const expiry = new Date(expiryISO)
  const diffMs = expiry.getTime() - now.getTime()

  if (diffMs <= 0) {
    const hoursAgo = Math.max(1, Math.round(Math.abs(diffMs) / (60 * 60 * 1000)))
    return { label: `Expired ${hoursAgo}h ago`, tone: 'neutral', expired: true }
  }

  const totalMinutes = Math.round(diffMs / (60 * 1000))

  if (totalMinutes < 60) {
    return { label: `Expires in ${totalMinutes}m`, tone: 'danger', expired: false }
  }

  const hours = Math.round(totalMinutes / 60)

  if (hours <= 4) {
    return { label: `Expires in ${hours}h`, tone: 'danger', expired: false }
  }
  if (hours <= 24) {
    return { label: `Expires in ${hours}h`, tone: 'warning', expired: false }
  }

  const days = Math.round(hours / 24)
  return { label: `Expires in ${days}d`, tone: 'success', expired: false }
}

export function formatDateTime(isoOrDate) {
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}
