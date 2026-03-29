'use client'

import { Typography } from 'antd'
import { useStyles } from './style'

const { Title, Text } = Typography

const DashboardPage = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.content}>
      <Title level={2} className={styles.title}>Dashboard</Title>
      <Text className={styles.subtitle}>Welcome to RepoGuardian</Text>
    </div>
  )
}

export default DashboardPage
