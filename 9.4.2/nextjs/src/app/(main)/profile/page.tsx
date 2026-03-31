'use client'

import { useEffect } from 'react'
import { Tabs, Typography } from 'antd'
import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useProfileState, useProfileActions } from '@/providers/profile'
import TeamProfileTab from '@/components/profile/TeamProfileTab'
import MyProfileTab from '@/components/profile/MyProfileTab'
import { useStyles } from './style'

const { Title } = Typography

const ProfilePage = () => {
  const { styles } = useStyles()
  const { profile, isPending } = useProfileState()
  const { getProfile } = useProfileActions()

  useEffect(() => {
    if (!profile) getProfile()
  }, [])

  const tabItems = [
    {
      key: 'team',
      label: (
        <span>
          <TeamOutlined />
          Team Profile
        </span>
      ),
      children: (
        <TeamProfileTab
          teamName={profile?.teamName ?? ''}
          teamMembers={profile?.teamMembers ?? []}
          isPending={isPending}
        />
      ),
    },
    {
      key: 'my',
      label: (
        <span>
          <UserOutlined />
          My Profile
        </span>
      ),
      children: (
        <MyProfileTab
          user={profile?.user}
          isPending={isPending}
        />
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <Title level={3} className={styles.heading}>Profile</Title>
      <Tabs defaultActiveKey="team" items={tabItems} className={styles.tabs} />
    </div>
  )
}

export default ProfilePage
