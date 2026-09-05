function escapeCSVValue(value) {
  const str = String(value ?? '')
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

// columns: [{ label: string, accessor: (row) => value }]
export function rowsToCSV(rows, columns) {
  const header = columns.map((c) => escapeCSVValue(c.label)).join(',')
  const lines = rows.map((row) => columns.map((c) => escapeCSVValue(c.accessor(row))).join(','))
  return [header, ...lines].join('\r\n')
}

export function downloadCSV(filename, csvString) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
