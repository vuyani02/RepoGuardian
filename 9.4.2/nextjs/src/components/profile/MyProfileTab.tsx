'use client'

import { Avatar, Card, Typography } from 'antd'
import { IUserProfile } from '@/Types/Profile/Types'
import { useStyles } from './styles/MyProfileTab.style'

const { Title, Text } = Typography

interface MyProfileTabProps {
  user: IUserProfile | undefined
  isPending: boolean
}

const MyProfileTab = ({ user, isPending }: MyProfileTabProps) => {
  const { styles } = useStyles()

  if (isPending || !user) return null

  const fields = [
    { label: 'First Name', value: user.name },
    { label: 'Last Name', value: user.surname },
    { label: 'Username', value: user.userName },
    { label: 'Email Address', value: user.emailAddress },
  ]

  return (
    <Card className={styles.card}>
      <div className={styles.avatarRow}>
        <Avatar size={72} className={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <Title level={4} className={styles.fullName}>
            {user.name} {user.surname}
          </Title>
          <Text className={styles.username}>@{user.userName}</Text>
        </div>
      </div>

      <div className={styles.fieldList}>
        {fields.map((f) => (
          <div key={f.label} className={styles.fieldRow}>
            <Text className={styles.fieldLabel}>{f.label}</Text>
            <Text className={styles.fieldValue}>{f.value}</Text>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default MyProfileTab
