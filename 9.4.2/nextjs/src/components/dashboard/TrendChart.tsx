'use client'

import { Skeleton, Typography } from 'antd'
import { IDailyAverage } from '@/Types/Dashboard/Types'
import { useStyles } from './styles/TrendChart.style'

const { Title, Text } = Typography

// SVG canvas dimensions
const VIEW_W = 600
const VIEW_H = 200
const PAD = { top: 16, right: 20, bottom: 36, left: 40 }
const PLOT_W = VIEW_W - PAD.left - PAD.right
const PLOT_H = VIEW_H - PAD.top - PAD.bottom

const Y_TICKS = [0, 25, 50, 75, 100]
const MAX_X_LABELS = 8

const toX = (i: number, total: number) =>
  PAD.left + (total === 1 ? PLOT_W / 2 : (i / (total - 1)) * PLOT_W)

const toY = (score: number) =>
  PAD.top + PLOT_H - (score / 100) * PLOT_H

interface TrendChartProps {
  trendData: IDailyAverage[]
  isPending: boolean
}

const TrendChart = ({ trendData, isPending }: TrendChartProps) => {
  const { styles } = useStyles()

  if (isPending) {
    return (
      <div className={styles.card}>
        <Skeleton.Input active className={styles.skeleton} />
      </div>
    )
  }

  if (trendData.length === 0) {
    return (
      <div className={styles.card}>
        <Title className={styles.title}>Compliance Trend</Title>
        <Text className={styles.empty}>No trend data available yet.</Text>
      </div>
    )
  }

  const n = trendData.length

  const points = trendData.map((d, i) => ({ x: toX(i, n), y: toY(d.averageScore), d }))

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  // Closed path for the area fill: line + back along bottom
  const areaPoints = [
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[n - 1].x},${PAD.top + PLOT_H}`,
    `${points[0].x},${PAD.top + PLOT_H}`,
  ].join(' ')

  // X-axis: show up to MAX_X_LABELS evenly spaced date labels
  const step = Math.ceil(n / MAX_X_LABELS)
  const xLabels = points.filter((_, i) => i % step === 0 || i === n - 1)

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS[d.getMonth()]}`
  }

  return (
    <div className={styles.card}>
      <Title className={styles.title}>Compliance Trend</Title>
      <div className={styles.svgWrap}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          width="100%"
          preserveAspectRatio="none"
          aria-label="Compliance trend chart"
        >
          {/* Y-axis grid lines and labels */}
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

          {/* X-axis baseline */}
          <line
            x1={PAD.left} y1={PAD.top + PLOT_H}
            x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H}
            className={styles.axisLine}
          />

          {/* X-axis date labels */}
          {xLabels.map((p) => (
            <text
              key={p.d.date}
              x={p.x}
              y={VIEW_H - 6}
              textAnchor="middle"
              className={styles.axisLabel}
            >
              {formatDate(p.d.date)}
            </text>
          ))}

          {/* Area fill */}
          <polygon points={areaPoints} className={styles.trendArea} />

          {/* Trend line */}
          <polyline points={polylinePoints} className={styles.trendLine} />

          {/* Data dots — only when points are sparse enough to be readable */}
          {n <= 30 && points.map((p) => (
            <circle key={p.d.date} cx={p.x} cy={p.y} r={3} className={styles.dot} />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default TrendChart
