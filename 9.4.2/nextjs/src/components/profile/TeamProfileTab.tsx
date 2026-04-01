'use client'

import { Avatar, Badge, Button, Card, Popconfirm, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CrownOutlined, DeleteOutlined } from '@ant-design/icons'
import { ITeamMember } from '@/Types/Profile/Types'
import { useProfileActions } from '@/providers/profile'
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
  currentUserIsAdmin: boolean
  currentUserId: number
  isPending: boolean
}

const TeamProfileTab = ({ teamName, teamMembers, currentUserIsAdmin, currentUserId, isPending }: TeamProfileTabProps) => {
  const { styles } = useStyles()
  const { makeAdmin, deleteMember } = useProfileActions()

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
      render: (_, record) => (
        <span>
          {record.name} {record.surname}
          {record.isAdmin && (
            <Badge
              count={<CrownOutlined style={{ color: '#f59e0b', fontSize: 12 }} />}
              style={{ marginLeft: 6 }}
            />
          )}
        </span>
      ),
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
      title: 'Role',
      key: 'role',
      render: (_, record) => (
        <span className={record.isAdmin ? styles.roleAdmin : styles.roleMember}>
          {record.isAdmin ? 'Admin' : 'Member'}
        </span>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      responsive: ['lg'],
      render: (val) => formatDate(val),
    },
    ...(currentUserIsAdmin ? [{
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ITeamMember) => {
        const isSelf = record.id === currentUserId
        return (
          <div className={styles.actions}>
            {!record.isAdmin && (
              <Popconfirm
                title="Make this user an admin?"
                onConfirm={() => makeAdmin(record.id)}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ style: { background: '#4f46e5', borderColor: '#4f46e5' } }}
              >
                <Button size="small" icon={<CrownOutlined />} className={styles.makeAdminBtn}>
                  Make Admin
                </Button>
              </Popconfirm>
            )}
            {!isSelf && (
              <Popconfirm
                title="Remove this user from the team?"
                description="This cannot be undone."
                onConfirm={() => deleteMember(record.id)}
                okText="Remove"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <Button size="small" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            )}
          </div>
        )
      },
    }] : []),
  ]

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
