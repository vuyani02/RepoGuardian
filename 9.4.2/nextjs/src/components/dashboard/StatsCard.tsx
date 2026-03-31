'use client'

import { Skeleton, Typography } from 'antd'
import { useStyles } from './styles/StatsCard.style'

const { Title, Text } = Typography

interface StatsCardProps {
  label: string
  value: string | number | null
  isPending: boolean
  variant?: 'green' | 'amber' | 'red' | 'default'
}

const StatsCard = ({ label, value, isPending, variant = 'default' }: StatsCardProps) => {
  const { styles } = useStyles()

  const variantClass = styles[`value${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles]

  return (
    <div className={styles.card}>
      <Text className={styles.label}>{label}</Text>
      {isPending ? (
        <Skeleton.Input active className={styles.skeleton} />
      ) : (
        <Title className={`${styles.value} ${variantClass}`}>
          {value ?? '—'}
        </Title>
      )}
    </div>
  )
}

export default StatsCard
