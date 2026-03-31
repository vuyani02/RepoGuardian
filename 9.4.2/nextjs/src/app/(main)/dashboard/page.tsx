'use client'

import { useEffect, useState } from 'react'
import { Button, Select, Typography } from 'antd'
import { RadarChartOutlined } from '@ant-design/icons'
import { useDashboardState, useDashboardActions } from '@/providers/dashboard'
import StatsCard from '@/components/dashboard/StatsCard'
import CategoryBarChart from '@/components/dashboard/CategoryBarChart'
import MostRecentScanStrip from '@/components/dashboard/MostRecentScanStrip'
import MostFailingRuleCard from '@/components/dashboard/MostFailingRuleCard'
import TrendChart from '@/components/dashboard/TrendChart'
import StartScanModal from '@/components/scans/StartScanModal'
import ScanResultModal from '@/components/repositories/ScanResultModal'
import { IScanResult } from '@/Types/Scan/Types'
import { IDashboardFilters } from '@/Types/Dashboard/Types'
import { useStyles } from './style'

const { Title, Text } = Typography

const DAYS_OPTIONS = [
  { label: 'Past 7 days', value: 7 },
  { label: 'Past 30 days', value: 30 },
  { label: 'Past 90 days', value: 90 },
  { label: 'All time', value: null },
]

const SCOPE_OPTIONS = [
  { label: 'Latest scan per repo', value: true },
  { label: 'All scans', value: false },
]

const DEFAULT_FILTERS: IDashboardFilters = { daysBack: 7, latestPerRepo: true }

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

  const [filters, setFilters] = useState<IDashboardFilters>(DEFAULT_FILTERS)
  const [scanOpen, setScanOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [viewedResult, setViewedResult] = useState<IScanResult | null>(null)

  useEffect(() => {
    getDashboardStats(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleScanComplete = (result: IScanResult) => {
    getDashboardStats(filters)
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

      <div className={styles.filters}>
        <Select
          options={DAYS_OPTIONS}
          value={filters.daysBack}
          onChange={(val) => setFilters((f) => ({ ...f, daysBack: val }))}
          className={styles.filterSelect}
        />
        <Select
          options={SCOPE_OPTIONS}
          value={filters.latestPerRepo}
          onChange={(val) => setFilters((f) => ({ ...f, latestPerRepo: val }))}
          className={styles.filterSelect}
        />
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
        <StatsCard
          label="Repos Below 50%"
          value={stats?.reposBelowThreshold ?? null}
          isPending={isPending}
          variant={stats?.reposBelowThreshold ? 'red' : 'green'}
        />
      </div>

      <MostRecentScanStrip
        mostRecentScan={stats?.mostRecentScan ?? null}
        isPending={isPending}
      />

      <CategoryBarChart
        categoryAverages={stats?.categoryAverages ?? []}
        isPending={isPending}
      />

      <MostFailingRuleCard
        mostFailingRule={stats?.mostFailingRule ?? null}
        isPending={isPending}
      />

      <TrendChart
        trendData={stats?.trendData ?? []}
        isPending={isPending}
        period={DAYS_OPTIONS.find((o) => o.value === filters.daysBack)?.label ?? 'All time'}
      />

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
