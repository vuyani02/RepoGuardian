'use client'

import { Avatar, Card, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ITeamMember } from '@/Types/Profile/Types'
import { useStyles } from './styles/TeamProfileTab.style'

const { Title } = Typography

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

interface TeamProfileTabProps {
  teamName: string
  teamMembers: ITeamMember[]
  isPending: boolean
}

const columns: ColumnsType<ITeamMember> = [
  {
    title: '',
    key: 'avatar',
    width: 48,
    render: (_, record) => (
      <Avatar style={{ background: '#eef2ff', color: '#4f46e5', fontWeight: 600 }}>
        {record.name.charAt(0).toUpperCase()}
      </Avatar>
    ),
  },
  {
    title: 'Name',
    key: 'name',
    render: (_, record) => `${record.name} ${record.surname}`,
  },
  {
    title: 'Username',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Email',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
    responsive: ['md'],
  },
  {
    title: 'Joined',
    dataIndex: 'joinedAt',
    key: 'joinedAt',
    responsive: ['lg'],
    render: (val) => formatDate(val),
  },
]

const TeamProfileTab = ({ teamName, teamMembers, isPending }: TeamProfileTabProps) => {
  const { styles } = useStyles()

  return (
    <div className={styles.root}>
      <Card className={styles.teamNameCard}>
        <div className={styles.teamNameRow}>
          <Avatar size={56} className={styles.teamAvatar}>
            {teamName.charAt(0).toUpperCase()}
          </Avatar>
          <Title level={3} className={styles.teamNameText}>{teamName}</Title>
        </div>
      </Card>

      <Card className={styles.membersCard}>
        <Title level={5} className={styles.sectionTitle}>
          Members · {teamMembers.length}
        </Title>
        <Table
          dataSource={teamMembers}
          columns={columns}
          rowKey="id"
          loading={isPending}
          pagination={{ defaultPageSize: 4, showSizeChanger: true, pageSizeOptions: ['4', '10', '20'] }}
          size="small"
        />
      </Card>
    </div>
  )
}

export default TeamProfileTab
