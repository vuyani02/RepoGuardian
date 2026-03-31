'use client'

import { Progress, Skeleton, Typography } from 'antd'
import { ICategoryAverage } from '@/Types/Dashboard/Types'
import { useStyles } from './styles/CategoryBarChart.style'

const { Title, Text } = Typography

const SKELETON_KEYS = ['doc', 'test', 'cicd', 'dep', 'sec']

const scoreColor = (score: number): string => {
  if (score >= 80) return '#10b981'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

const ScoreLabel = ({ value, className }: { value?: number; className: string }) => (
  <span className={className}>{value}</span>
)

interface CategoryBarChartProps {
  categoryAverages: ICategoryAverage[]
  isPending: boolean
}

const renderContent = (
  isPending: boolean,
  categoryAverages: ICategoryAverage[],
  styles: ReturnType<typeof useStyles>['styles']
) => {
  if (isPending) {
    return (
      <div className={styles.skeletonWrap}>
        {SKELETON_KEYS.map((k) => (
          <Skeleton.Input key={k} active className={styles.skeleton} />
        ))}
      </div>
    )
  }

  if (categoryAverages.length === 0) {
    return <Text className={styles.empty}>No scan data available for this period.</Text>
  }

  return (
    <div className={styles.bars}>
      {categoryAverages.map((item) => (
        <div key={item.category} className={styles.row}>
          <Text className={styles.label}>{item.category}</Text>
          <Progress
            percent={item.averageScore}
            strokeColor={scoreColor(item.averageScore)}
            trailColor="#f3f4f6"
            size="small"
            format={(p) => <ScoreLabel value={p} className={styles.scoreLabel} />}
          />
        </div>
      ))}
    </div>
  )
}

const CategoryBarChart = ({ categoryAverages, isPending }: CategoryBarChartProps) => {
  const { styles } = useStyles()

  return (
    <div className={styles.card}>
      <Title className={styles.title}>Category Averages</Title>
      {renderContent(isPending, categoryAverages, styles)}
    </div>
  )
}

export default CategoryBarChart
