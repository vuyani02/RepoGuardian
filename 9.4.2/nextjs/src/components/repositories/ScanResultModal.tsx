'use client'

import { Badge, Modal, Progress, Table, Tag, Typography, Collapse } from 'antd'
import { createStyles } from 'antd-style'
import { IRecommendation, IRuleResult, IScanResult } from '@/lib/definitions'
import { useRepositoryActions, useRepositoryState } from '@/providers/repositories'

const { Title, Text, Paragraph } = Typography

const useStyles = createStyles(({ css }) => ({
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
  scoreNumber: css`
    font-size: 22px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    margin-bottom: 0 !important;
  `,
  scoreLabel: css`
    font-size: 11px !important;
    color: #9ca3af !important;
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
  recommendationCard: css`
    background: #f9fafb;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 8px;
  `,
  recommendationRule: css`
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #4f46e5 !important;
    margin-bottom: 8px !important;
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

function scoreColor(score: number): string {
  if (score >= 80) return '#10b981'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

function scoreBg(score: number): string {
  if (score >= 80) return '#f0fdf4'
  if (score >= 50) return '#fffbeb'
  return '#fef2f2'
}

export default function ScanResultModal() {
  const { scanResult } = useRepositoryState()
  const { clearScanResult } = useRepositoryActions()

  if (!scanResult) return null

  const overall = scanResult.overallScore ?? 0
  const ruleColumns = [
    {
      title: 'Rule',
      dataIndex: 'ruleName',
      key: 'ruleName',
      render: (name: string, row: IRuleResult) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{row.ruleId}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag style={{ borderRadius: 6 }}>{cat}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'passed',
      key: 'passed',
      render: (passed: boolean) =>
        passed
          ? <Badge status="success" text={<Text style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Pass</Text>} />
          : <Badge status="error" text={<Text style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>Fail</Text>} />,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (d: string) => <Text style={{ fontSize: 13, color: '#6b7280' }}>{d}</Text>,
    },
  ]

  // Map ruleResultId → ruleName for recommendation headers
  const ruleNameMap = Object.fromEntries(
    scanResult.ruleResults.map((r) => [r.ruleId, r.ruleName])
  )

  const recItems = scanResult.recommendations.map((rec: IRecommendation, i) => {
    const ruleName = ruleNameMap[rec.ruleResultId] ?? rec.ruleResultId
    return {
      key: String(i),
      label: <span style={{ fontWeight: 600, fontSize: 14 }}>{ruleName}</span>,
      children: <RecommendationBody rec={rec} />,
    }
  })

  return (
    <Modal
      open
      onCancel={clearScanResult}
      footer={null}
      width={780}
      title={
        <span style={{ fontWeight: 700, fontSize: 16 }}>Scan Result</span>
      }
    >
      <ScanResultBody
        scanResult={scanResult}
        overall={overall}
        ruleColumns={ruleColumns}
        recItems={recItems}
      />
    </Modal>
  )
}

function ScanResultBody({
  scanResult, overall, ruleColumns, recItems,
}: {
  scanResult: IScanResult
  overall: number
  ruleColumns: object[]
  recItems: object[]
}) {
  const { styles } = useStyles()

  return (
    <>
      <div className={styles.header}>
        <div
          className={styles.overallScore}
          style={{ background: scoreBg(overall), border: `2px solid ${scoreColor(overall)}` }}
        >
          <Title className={styles.scoreNumber} style={{ color: scoreColor(overall) }}>
            {overall}
          </Title>
          <Text className={styles.scoreLabel}>/ 100</Text>
        </div>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>Overall Compliance Score</Title>
          <Text style={{ color: '#6b7280', fontSize: 14 }}>
            {scanResult.ruleResults.filter((r) => r.passed).length} of {scanResult.ruleResults.length} rules passed
          </Text>
        </div>
      </div>

      <Title className={styles.sectionTitle}>Category Scores</Title>
      <div className={styles.categoryGrid}>
        {scanResult.categoryScores.map((cs) => (
          <div key={cs.category} className={styles.categoryCard}>
            <div className={styles.categoryName}>{cs.category}</div>
            <Progress
              percent={cs.score}
              strokeColor={scoreColor(cs.score)}
              trailColor="#e5e7eb"
              size="small"
              format={(p) => <span style={{ fontSize: 12, fontWeight: 700, color: scoreColor(cs.score) }}>{p}</span>}
            />
          </div>
        ))}
      </div>

      <Title className={styles.sectionTitle}>Rule Results</Title>
      <Table
        dataSource={scanResult.ruleResults}
        columns={ruleColumns as Parameters<typeof Table>[0]['columns']}
        rowKey="ruleId"
        pagination={false}
        size="small"
        style={{ marginBottom: 24 }}
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

function RecommendationBody({ rec }: { rec: IRecommendation }) {
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
