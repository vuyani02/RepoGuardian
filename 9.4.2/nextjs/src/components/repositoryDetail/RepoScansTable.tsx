'use client'

import { Button, Table, Tag, Typography } from 'antd'
import { IScanSummary } from '@/Types/Scan/Types'
import { useStyles } from './styles/RepoScansTable.style'

const { Title } = Typography

const scoreVariant = (score: number | null) => {
  if (score === null) return 'pending'
  if (score >= 80) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

interface RepoScansTableProps {
  scans: IScanSummary[]
  isPending: boolean
  onView: (scanRunId: string) => void
}

const RepoScansTable = ({ scans, isPending, onView }: RepoScansTableProps) => {
  const { styles } = useStyles()

  const columns = [
    {
      title: 'Date',
      key: 'triggeredAt',
      minWidth: 160,
      render: (_: unknown, row: IScanSummary) =>
        new Date(row.triggeredAt).toLocaleString(),
    },
    {
      title: 'Score',
      key: 'overallScore',
      minWidth: 80,
      render: (_: unknown, row: IScanSummary) => {
        const v = scoreVariant(row.overallScore)
        const cls = styles[`score${v.charAt(0).toUpperCase() + v.slice(1)}` as keyof typeof styles]
        return <span className={cls}>{row.overallScore ?? '—'}</span>
      },
    },
    {
      title: 'Status',
      key: 'status',
      minWidth: 100,
      render: (_: unknown, row: IScanSummary) => {
        const colorMap: Record<string, string> = {
          Completed: 'green',
          Running: 'blue',
          Failed: 'red',
          Pending: 'default',
        }
        return <Tag color={colorMap[row.status] ?? 'default'}>{row.status}</Tag>
      },
    },
    {
      title: '',
      key: 'actions',
      width: 90,
      render: (_: unknown, row: IScanSummary) => (
        <Button
          size="small"
          className={styles.viewBtn}
          disabled={row.status !== 'Completed'}
          onClick={() => onView(row.scanRunId)}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div className={styles.card}>
      <Title className={styles.title}>Scan History</Title>
      <Table
        dataSource={scans}
        columns={columns}
        rowKey="scanRunId"
        loading={isPending}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '50'] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'No scans yet for this repository.' }}
      />
    </div>
  )
}

export default RepoScansTable
