'use client'

import { useEffect, useState } from 'react'
import { Skeleton, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { MostRecentScanStripProps } from '@/Types/Dashboard/Types'
import { useStyles } from './styles/MostRecentScanStrip.style'

const { Text } = Typography

const formatRelativeTime = (isoDate: string, now: number): string => {
  const diff = now - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const scoreVariantKey = (score: number | null): 'scoreGreen' | 'scoreAmber' | 'scoreRed' | 'scoreDefault' => {
  if (score === null) return 'scoreDefault'
  if (score >= 80) return 'scoreGreen'
  if (score >= 50) return 'scoreAmber'
  return 'scoreRed'
}

const renderScore = (score: number | null) =>
  score !== null ? `${score}%` : 'N/A'

const MostRecentScanStrip = ({ mostRecentScan, isPending }: MostRecentScanStripProps) => {
  const { styles } = useStyles()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const renderContent = () => {
    if (isPending) return <Skeleton.Input active className={styles.skeleton} />
    if (mostRecentScan === null || mostRecentScan === undefined) return <Text className={styles.empty}>No scans yet.</Text>
    return (
      <>
        <Text className={styles.repoName}>
          {mostRecentScan.owner}/{mostRecentScan.repositoryName}
        </Text>
        <span className={styles.dot}>•</span>
        <span className={`${styles.scoreBadge} ${styles[scoreVariantKey(mostRecentScan.overallScore)]}`}>
          {renderScore(mostRecentScan.overallScore)}
        </span>
        <span className={styles.dot}>•</span>
        <Text className={styles.time}>{formatRelativeTime(mostRecentScan.triggeredAt, now)}</Text>
      </>
    )
  }

  return (
    <div className={styles.strip}>
      <Text className={styles.label}>
        <ClockCircleOutlined /> Most Recent Scan
      </Text>
      {renderContent()}
    </div>
  )
}

export default MostRecentScanStrip
