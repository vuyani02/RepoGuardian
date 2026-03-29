'use client'

import { Typography } from 'antd'
import { useStyles } from './style'

const { Title, Text } = Typography

const ScansPage = () => {
  const { styles } = useStyles()

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Title className={styles.title}>Scans</Title>
        <Text className={styles.subtitle}>All scan history across your repositories</Text>
      </div>
    </div>
  )
}

export default ScansPage
