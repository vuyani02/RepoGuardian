'use client'

import { useState } from 'react'
import { Button, Input, Select, Table, Tag } from 'antd'
import { IScanSummary, ScanHistoryTableProps } from '@/Types/Scan/Types'
import { useScansState } from '@/providers/scans'
import { useStyles } from './styles/ScanHistoryTable.style'


const scoreVariant = (score: number | null) => {
  if (score === null) return 'pending'
  if (score >= 80) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Running', value: 'Running' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Pending', value: 'Pending' },
]

const SCORE_OPTIONS = [
  { label: 'All scores', value: '' },
  { label: 'Good (≥ 80)', value: 'green' },
  { label: 'Fair (50 – 79)', value: 'amber' },
  { label: 'Poor (< 50)', value: 'red' },
  { label: 'Pending', value: 'pending' },
]

const ScanHistoryTable = ({ onView }: ScanHistoryTableProps) => {
  const { styles } = useStyles()
  const { scans, isPending } = useScansState()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [scoreFilter, setScoreFilter] = useState('')

  const filtered = (scans ?? []).filter((row) => {
    const matchesSearch =
      !search ||
      row.repositoryName.toLowerCase().includes(search.toLowerCase()) ||
      row.owner.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = !statusFilter || row.status === statusFilter

    const matchesScore = !scoreFilter || scoreVariant(row.overallScore) === scoreFilter

    return matchesSearch && matchesStatus && matchesScore
  })

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
      title: 'Branch',
      key: 'branch',
      minWidth: 100,
      render: (_: unknown, row: IScanSummary) =>
        row.branch ?? <span className={styles.owner}>—</span>,
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
    <div>
      <div className={styles.toolbar}>
        <Input.Search
          placeholder="Search by repo or owner…"
          allowClear
          className={styles.searchInput}
          onSearch={setSearch}
          onChange={(e) => { if (!e.target.value) setSearch('') }}
        />
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={setStatusFilter}
          className={styles.filterSelect}
        />
        <Select
          options={SCORE_OPTIONS}
          value={scoreFilter}
          onChange={setScoreFilter}
          className={styles.filterSelect}
        />
      </div>

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="scanRunId"
        loading={isPending}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '50'] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'No scans match your filters.' }}
      />
    </div>
  )
}

export default ScanHistoryTable
