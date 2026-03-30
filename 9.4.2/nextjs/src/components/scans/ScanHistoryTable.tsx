'use client'

import { Button, Table, Tag } from 'antd'
import { IScanSummary } from '@/lib/definitions'
import { useScansState } from '@/providers/scans'
import { useStyles } from './styles/ScanHistoryTable.style'

interface ScanHistoryTableProps {
  onView: (scanRunId: string) => void
}

const scoreVariant = (score: number | null) => {
  if (score === null) return 'pending'
  if (score >= 80) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

const ScanHistoryTable = ({ onView }: ScanHistoryTableProps) => {
  const { styles } = useStyles()
  const { scans, isPending } = useScansState()

  const columns = [
    {
      title: 'Repository',
      key: 'repository',
      minWidth: 180,
      render: (_: unknown, row: IScanSummary) => (
        <div>
          <div className={styles.repoName}>{row.repositoryName}</div>
          <div className={styles.owner}>{row.owner}</div>
        </div>
      ),
    },
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
    <Table
      dataSource={scans ?? []}
      columns={columns}
      rowKey="scanRunId"
      loading={isPending}
      pagination={{ pageSize: 20 }}
      scroll={{ x: 'max-content' }}
      locale={{ emptyText: 'No scans yet. Run your first scan to get started.' }}
    />
  )
}

export default ScanHistoryTable
