'use client'

import { useState } from 'react'
import { Badge, Collapse, Input, Modal, Progress, Select, Table, Tag, Typography } from 'antd'
import { BulbOutlined, CloseCircleOutlined, ToolOutlined } from '@ant-design/icons'
import { IRecommendation, IRuleResult, IScanResult, ScanResultModalProps } from '@/Types/Scan/Types'
import { useStyles } from './styles/ScanResultModal.style'

const { Title, Text, Paragraph } = Typography


const ProgressLabel = ({ value, className }: { value?: number; className: string }) => (
  <span className={className}>{value}</span>
)

const scoreVariant = (score: number): 'green' | 'amber' | 'red' => {
  if (score >= 80) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

const scoreHex = (score: number): string => {
  if (score >= 80) return '#10b981'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

const ScanResultModal = ({ scanResult, onClose }: ScanResultModalProps) => {
  const { styles } = useStyles()

  const overall = scanResult.overallScore ?? 0
  const variant = scoreVariant(overall)

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const scoreBadgeKey = ('score' + cap(variant)) as keyof typeof styles
  const scoreNumKey   = ('scoreNumber' + cap(variant)) as keyof typeof styles
  const scoreBadgeClass = `${styles.overallScore} ${styles[scoreBadgeKey]}`
  const scoreNumClass   = `${styles.scoreNumber} ${styles[scoreNumKey]}`

  const ruleColumns = [
    {
      title: 'Rule',
      dataIndex: 'ruleName',
      key: 'ruleName',
      render: (name: string, row: IRuleResult) => (
        <div>
          <div className={styles.ruleName}>{name}</div>
          <div className={styles.ruleId}>{row.ruleId}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag className={styles.categoryTag}>{cat}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'passed',
      key: 'passed',
      render: (passed: boolean) =>
        passed
          ? <Badge status="success" text={<Text className={styles.passText}>Pass</Text>} />
          : <Badge status="error"   text={<Text className={styles.failText}>Fail</Text>} />,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (d: string) => <Text className={styles.detailsText}>{d}</Text>,
    },
  ]

  const ruleNameMap = Object.fromEntries(
    scanResult.ruleResults.map((r) => [r.ruleId, r.ruleName])
  )

  const recItems = scanResult.recommendations.map((rec: IRecommendation, i) => ({
    key: String(i),
    label: (
      <span className={styles.recCollapseLabel}>
        {ruleNameMap[rec.ruleId] ?? rec.ruleId}
        <span className={styles.recFailBadge}>
          <CloseCircleOutlined /> Failed
        </span>
      </span>
    ),
    children: <RecommendationBody rec={rec} />,
  }))

  return (
    <Modal
      open
      onCancel={onClose}
      footer={null}
      width={780}
      title={<span className={styles.modalTitle}>Scan Result</span>}
    >
      <ScanResultBody
        scanResult={scanResult}
        overall={overall}
        scoreBadgeClass={scoreBadgeClass}
        scoreNumClass={scoreNumClass}
        ruleColumns={ruleColumns}
        recItems={recItems}
      />
    </Modal>
  )
}

export default ScanResultModal

const CATEGORY_OPTIONS = [
  { label: 'All categories', value: '' },
  { label: 'Documentation', value: 'Documentation' },
  { label: 'Testing', value: 'Testing' },
  { label: 'CiCd', value: 'CiCd' },
  { label: 'Dependencies', value: 'Dependencies' },
  { label: 'Security', value: 'Security' },
]

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'Passed', value: 'passed' },
  { label: 'Failed', value: 'failed' },
]

const ScanResultBody = ({
  scanResult, overall, scoreBadgeClass, scoreNumClass, ruleColumns, recItems,
}: {
  scanResult: IScanResult
  overall: number
  scoreBadgeClass: string
  scoreNumClass: string
  ruleColumns: object[]
  recItems: object[]
}) => {
  const { styles } = useStyles()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredRules = scanResult.ruleResults
    .filter((r) => {
      const matchesSearch = !search ||
        r.ruleName.toLowerCase().includes(search.toLowerCase()) ||
        r.ruleId.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !categoryFilter || r.category === categoryFilter
      const statusMatch = statusFilter === 'passed' ? r.passed : !r.passed
      const matchesStatus = !statusFilter || statusMatch
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => (a.passed === b.passed ? 0 : a.passed ? 1 : -1))

  return (
    <>
      <div className={styles.header}>
        <div className={scoreBadgeClass}>
          <Title className={scoreNumClass}>{overall}</Title>
          <Text className={styles.scoreLabel}>/ 100</Text>
        </div>
        <div>
          <Title level={4} className={styles.overallTitle}>Overall Compliance Score</Title>
          <Text className={styles.rulesPassedText}>
            {scanResult.ruleResults.filter((r) => r.passed).length} of {scanResult.ruleResults.length} rules passed
          </Text>
        </div>
      </div>

      <Title className={styles.sectionTitle}>Category Scores</Title>
      <div className={styles.categoryGrid}>
        {scanResult.categoryScores.map((cs) => {
          const v = scoreVariant(cs.score)
          const labelClass = styles[`progressLabel${v.charAt(0).toUpperCase() + v.slice(1)}` as keyof typeof styles]
          return (
            <div key={cs.category} className={styles.categoryCard}>
              <div className={styles.categoryName}>{cs.category}</div>
              <Progress
                percent={cs.score}
                strokeColor={scoreHex(cs.score)}
                trailColor="#e5e7eb"
                size="small"
                format={(p) => <ProgressLabel value={p} className={labelClass} />}
              />
            </div>
          )
        })}
      </div>

      <Title className={styles.sectionTitle}>Rule Results</Title>
      <div className={styles.rulesToolbar}>
        <Input.Search
          placeholder="Search rules…"
          allowClear
          className={styles.rulesSearch}
          onSearch={setSearch}
          onChange={(e) => { if (!e.target.value) setSearch('') }}
        />
        <Select
          options={CATEGORY_OPTIONS}
          value={categoryFilter}
          onChange={setCategoryFilter}
          className={styles.rulesFilter}
        />
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={setStatusFilter}
          className={styles.rulesFilter}
        />
      </div>
      <div className={styles.rulesTableWrap}>
        <Table
          dataSource={filteredRules}
          columns={ruleColumns as Parameters<typeof Table>[0]['columns']}
          rowKey="ruleId"
          pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10'] }}
          size="small"
          scroll={{ x: 'max-content' }}
          className={styles.rulesTable}
        />
      </div>

      {recItems.length > 0 && (
        <>
          <Title className={styles.sectionTitle}>AI Recommendations</Title>
          <Collapse
            items={recItems as Parameters<typeof Collapse>[0]['items']}
            className={styles.recCollapse}
          />
        </>
      )}
    </>
  )
}

const RecommendationBody = ({ rec }: { rec: IRecommendation }) => {
  const { styles } = useStyles()

  const sections = [
    {
      label: 'Issue',
      text: rec.issueDescription,
      icon: <CloseCircleOutlined style={{ color: '#ef4444', fontSize: 14 }} />,
      iconClass: `${styles.recIconWrap} ${styles.recIconIssue}`,
    },
    {
      label: 'Explanation',
      text: rec.explanation,
      icon: <BulbOutlined style={{ color: '#3b82f6', fontSize: 14 }} />,
      iconClass: `${styles.recIconWrap} ${styles.recIconExplanation}`,
    },
    {
      label: 'Suggested Fix',
      text: rec.suggestedFix,
      icon: <ToolOutlined style={{ color: '#10b981', fontSize: 14 }} />,
      iconClass: `${styles.recIconWrap} ${styles.recIconFix}`,
    },
  ]

  return (
    <>
      {sections.map((s) => (
        <div key={s.label} className={styles.recSection}>
          <div className={s.iconClass}>{s.icon}</div>
          <div className={styles.recSectionContent}>
            <Text className={styles.recSectionLabel}>{s.label}</Text>
            <Paragraph className={styles.recSectionText}>{s.text}</Paragraph>
          </div>
        </div>
      ))}
    </>
  )
}
