'use client'

import { useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import axios from 'axios'
import { IScanResult } from '@/lib/definitions'
import { useScansActions } from '@/providers/scans'
import ScanHistoryTable from '@/components/scans/ScanHistoryTable'
import StartScanModal from '@/components/scans/StartScanModal'
import ScanResultModal from '@/components/repositories/ScanResultModal'
import { useStyles } from './style'

const { Title, Text } = Typography

const ScansPage = () => {
  const { styles } = useStyles()
  const { getAllScans } = useScansActions()

  const [startScanOpen, setStartScanOpen] = useState(false)
  const [viewedResult, setViewedResult] = useState<IScanResult | null>(null)

  useEffect(() => {
    getAllScans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleView = async (scanRunId: string) => {
    const { data } = await axios.get(`/api/scans/${scanRunId}`)
    setViewedResult(data)
  }

  const handleScanComplete = (result: IScanResult) => {
    getAllScans()
    setViewedResult(result)
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Title className={styles.title}>Scans</Title>
          <Text className={styles.subtitle}>All scan history across your repositories</Text>
        </div>
        <Button
          type="primary"
          size="large"
          className={styles.scanBtn}
          onClick={() => setStartScanOpen(true)}
        >
          + Scan
        </Button>
      </div>

      <div className={styles.tableWrap}>
        <ScanHistoryTable onView={handleView} />
      </div>

      <StartScanModal
        open={startScanOpen}
        onClose={() => setStartScanOpen(false)}
        onScanComplete={handleScanComplete}
      />

      {viewedResult && (
        <ScanResultModal
          scanResult={viewedResult}
          onClose={() => setViewedResult(null)}
        />
      )}
    </div>
  )
}

export default ScansPage
