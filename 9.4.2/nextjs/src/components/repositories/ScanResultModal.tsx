'use client'

import { Badge, Collapse, Modal, Progress, Table, Tag, Typography } from 'antd'
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
    label: <span className={styles.recCollapseLabel}>{ruleNameMap[rec.ruleId] ?? rec.ruleId}</span>,
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
      <div className={styles.rulesTableWrap}>
        <Table
          dataSource={scanResult.ruleResults}
          columns={ruleColumns as Parameters<typeof Table>[0]['columns']}
          rowKey="ruleId"
          pagination={false}
          size="small"
          scroll={{ x: 'max-content' }}
          className={styles.rulesTable}
        />
      </div>

      {recItems.length > 0 && (
        <>
          <Title className={styles.sectionTitle}>AI Recommendations</Title>
          <Collapse items={recItems as Parameters<typeof Collapse>[0]['items']} size="small" />
        </>
      )}
    </>
  )
}

const RecommendationBody = ({ rec }: { rec: IRecommendation }) => {
  const { styles } = useStyles()
  return (
    <div className={styles.recommendationCard}>
      <div className={styles.recLabel}>Issue</div>
      <Paragraph className={styles.recText}>{rec.issueDescription}</Paragraph>
      <div className={styles.recLabel}>Explanation</div>
      <Paragraph className={styles.recText}>{rec.explanation}</Paragraph>
      <div className={styles.recLabel}>Suggested Fix</div>
      <Paragraph className={styles.recText}>{rec.suggestedFix}</Paragraph>
    </div>
  )
}
