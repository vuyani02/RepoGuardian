'use client'

import { Skeleton, Typography } from 'antd'
import { IScanSummary } from '@/Types/Scan/Types'
import { useStyles } from './styles/RepoTrendChart.style'

const { Title, Text } = Typography

const VIEW_W = 500
const VIEW_H = 180
const PAD = { top: 16, right: 20, bottom: 36, left: 44 }
const PLOT_W = VIEW_W - PAD.left - PAD.right
const PLOT_H = VIEW_H - PAD.top - PAD.bottom

const Y_TICKS = [0, 25, 50, 75, 100]

const toX = (i: number, total: number) =>
  PAD.left + (total === 1 ? PLOT_W / 2 : (i / (total - 1)) * PLOT_W)

const toY = (score: number) =>
  PAD.top + PLOT_H - (score / 100) * PLOT_H

interface RepoTrendChartProps {
  scans: IScanSummary[]
  isPending: boolean
}

const RepoTrendChart = ({ scans, isPending }: RepoTrendChartProps) => {
  const { styles } = useStyles()

  const completed = scans
    .filter((s) => s.status === 'Completed' && s.overallScore !== null && s.overallScore !== undefined)
    .slice(0, 7)
    // Reverse so oldest scan is on the left
    .reverse()

  if (isPending) {
    return (
      <div className={styles.card}>
        <Skeleton.Input active className={styles.skeleton} />
      </div>
    )
  }

  if (completed.length === 0) {
    return (
      <div className={styles.card}>
        <Title className={styles.title}>Score Trend (Last 7 Scans)</Title>
        <Text className={styles.empty}>No completed scans yet.</Text>
      </div>
    )
  }

  const n = completed.length
  const points = completed.map((s, i) => ({
    x: toX(i, n),
    y: toY(s.overallScore as number),
    scan: s,
    label: `#${n - i}`,
  }))

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPoints = [
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[n - 1].x},${PAD.top + PLOT_H}`,
    `${points[0].x},${PAD.top + PLOT_H}`,
  ].join(' ')

  return (
    <div className={styles.card}>
      <Title className={styles.title}>Score Trend (Last 7 Scans)</Title>
      <div className={styles.svgWrap}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          width="100%"
          preserveAspectRatio="none"
          aria-label="Repository score trend"
        >
          {Y_TICKS.map((tick) => {
            const y = toY(tick)
            return (
              <g key={tick}>
                <line
                  x1={PAD.left} y1={y}
                  x2={PAD.left + PLOT_W} y2={y}
                  className={tick === 0 ? styles.axisLine : styles.gridLine}
                />
                <text x={PAD.left - 6} y={y + 4} textAnchor="end" className={styles.axisLabel}>
                  {tick}
                </text>
              </g>
            )
          })}

          <line
            x1={PAD.left} y1={PAD.top + PLOT_H}
            x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H}
            className={styles.axisLine}
          />

          {points.map((p) => (
            <text key={p.scan.scanRunId} x={p.x} y={VIEW_H - 6} textAnchor="middle" className={styles.axisLabel}>
              {p.label}
            </text>
          ))}

          <polygon points={areaPoints} className={styles.trendArea} />
          <polyline points={polylinePoints} className={styles.trendLine} />

          {points.map((p) => (
            <circle key={p.scan.scanRunId} cx={p.x} cy={p.y} r={4} className={styles.dot} />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default RepoTrendChart
