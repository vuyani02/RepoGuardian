'use client'

import { Typography } from 'antd'
import LogoutButton from './LogoutButton'
import { useStyles } from './style'

const { Title, Text } = Typography

const DashboardContent = ({ userId }: { userId: number }) => {
  const { styles } = useStyles()

  return (
    <div className={styles.page}>
      <Title level={2}>Dashboard</Title>
      <Text type="secondary">User ID: {userId}</Text>
      <div className={styles.actions}>
        <LogoutButton />
      </div>
    </div>
  )
}

export default DashboardContent
