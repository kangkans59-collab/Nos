import Button from '../../common/Button/Button.jsx'
import { rowsToCSV, downloadCSV } from '../../../utils/csv.js'
import './DownloadCsvButton.css'

function DownloadCsvButton({ rows, columns, filename }) {
  function handleDownload() {
    const csv = rowsToCSV(rows, columns)
    downloadCSV(filename, csv)
  }

  return (
    <div className="download-csv-button">
      <Button variant="secondary" onClick={handleDownload}>
        Download as CSV
      </Button>
    </div>
  )
}

export default DownloadCsvButton
