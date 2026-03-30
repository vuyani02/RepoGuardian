'use client'

import { useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import { RadarChartOutlined } from '@ant-design/icons'
import { useDashboardState, useDashboardActions } from '@/providers/dashboard'
import StatsCard from '@/components/dashboard/StatsCard'
import StartScanModal from '@/components/scans/StartScanModal'
import ScanResultModal from '@/components/repositories/ScanResultModal'
import { IScanResult } from '@/Types/Scan/Types'
import { useStyles } from './style'

const { Title, Text } = Typography

const scoreVariant = (score: number | null): 'green' | 'amber' | 'red' | 'default' => {
  if (score === null) return 'default'
  if (score >= 80) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

const DashboardPage = () => {
  const { styles } = useStyles()
  const { stats, isPending } = useDashboardState()
  const { getDashboardStats } = useDashboardActions()

  const [scanOpen, setScanOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [viewedResult, setViewedResult] = useState<IScanResult | null>(null)

  useEffect(() => {
    getDashboardStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScanComplete = (result: IScanResult) => {
    getDashboardStats()
    setViewedResult(result)
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Title className={styles.title}>Dashboard</Title>
          <Text className={styles.subtitle}>Your compliance overview at a glance</Text>
        </div>
        <Button
          type="primary"
          size="large"
          className={styles.scanBtn}
          onClick={() => setScanOpen(true)}
        >
          <RadarChartOutlined spin={isScanning} /> Scan
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <StatsCard
          label="Total Repositories"
          value={stats?.totalRepositories ?? null}
          isPending={isPending}
        />
        <StatsCard
          label="Total Scans"
          value={stats?.totalScans ?? null}
          isPending={isPending}
        />
        <StatsCard
          label="Avg Compliance Score"
          value={stats?.averageComplianceScore ?? null}
          isPending={isPending}
          variant={scoreVariant(stats?.averageComplianceScore ?? null)}
        />
      </div>

      <StartScanModal
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onScanComplete={handleScanComplete}
        onScanStart={() => setIsScanning(true)}
        onScanEnd={() => setIsScanning(false)}
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

export default DashboardPage
