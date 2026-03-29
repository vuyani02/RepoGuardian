'use client'

import { Badge, Collapse, Modal, Progress, Table, Tag, Typography } from 'antd'
import { createStyles } from 'antd-style'
import { IRecommendation, IRuleResult, IScanResult } from '@/lib/definitions'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'

const { Title, Text, Paragraph } = Typography

const useStyles = createStyles(({ css }) => ({
  modalTitle: css`
    font-weight: 700;
    font-size: 16px;
  `,
  header: css`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  `,
  overallScore: css`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `,
  scoreGreen: css`
    background: #f0fdf4;
    border: 2px solid #10b981;
  `,
  scoreAmber: css`
    background: #fffbeb;
    border: 2px solid #f59e0b;
  `,
  scoreRed: css`
    background: #fef2f2;
    border: 2px solid #ef4444;
  `,
  scoreNumber: css`
    font-size: 22px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    margin-bottom: 0 !important;
  `,
  scoreNumberGreen: css`color: #10b981 !important;`,
  scoreNumberAmber: css`color: #f59e0b !important;`,
  scoreNumberRed:   css`color: #ef4444 !important;`,
  scoreLabel: css`
    font-size: 11px !important;
    color: #9ca3af !important;
  `,
  overallTitle: css`
    margin: 0 !important;
    font-weight: 700 !important;
  `,
  rulesPassedText: css`
    color: #6b7280 !important;
    font-size: 14px !important;
  `,
  sectionTitle: css`
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #6b7280 !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px !important;
  `,
  categoryGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  `,
  categoryCard: css`
    background: #f9fafb;
    border-radius: 10px;
    padding: 12px 16px;
  `,
  categoryName: css`
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
  `,
  progressLabelGreen: css`font-size: 12px; font-weight: 700; color: #10b981;`,
  progressLabelAmber: css`font-size: 12px; font-weight: 700; color: #f59e0b;`,
  progressLabelRed:   css`font-size: 12px; font-weight: 700; color: #ef4444;`,
  rulesTable: css`margin-bottom: 24px;`,
  ruleName: css`
    font-weight: 600;
    font-size: 13px;
    color: #111827;
  `,
  ruleId: css`
    font-size: 12px;
    color: #9ca3af;
  `,
  categoryTag: css`border-radius: 6px;`,
  passText: css`
    font-size: 13px !important;
    color: #10b981 !important;
    font-weight: 600 !important;
  `,
  failText: css`
    font-size: 13px !important;
    color: #ef4444 !important;
    font-weight: 600 !important;
  `,
  detailsText: css`
    font-size: 13px !important;
    color: #6b7280 !important;
  `,
  recCollapseLabel: css`
    font-weight: 600;
    font-size: 14px;
  `,
  recommendationCard: css`
    background: #f9fafb;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 8px;
  `,
  recLabel: css`
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 8px;
    margin-bottom: 2px;
  `,
  recText: css`
    font-size: 13px !important;
    color: #374151 !important;
    margin-bottom: 0 !important;
  `,
}))

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

const ScanResultModal = () => {
  const { styles } = useStyles()
  const { scanResult } = useRepositoryState()
  const { clearScanResult } = useRepositoryActions()

  if (!scanResult) return null

  const overall = scanResult.overallScore ?? 0
  const variant = scoreVariant(overall)

  const scoreBadgeClass = `${styles.overallScore} ${styles[`score${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles]}`
  const scoreNumClass = `${styles.scoreNumber} ${styles[`scoreNumber${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles]}`

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
    label: <span className={styles.recCollapseLabel}>{ruleNameMap[rec.ruleResultId] ?? rec.ruleResultId}</span>,
    children: <RecommendationBody rec={rec} />,
  }))

  return (
    <Modal
      open
      onCancel={clearScanResult}
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
                format={(p) => <span className={labelClass as string}>{p}</span>}
              />
            </div>
          )
        })}
      </div>

      <Title className={styles.sectionTitle}>Rule Results</Title>
      <Table
        dataSource={scanResult.ruleResults}
        columns={ruleColumns as Parameters<typeof Table>[0]['columns']}
        rowKey="ruleId"
        pagination={false}
        size="small"
        className={styles.rulesTable}
      />

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
