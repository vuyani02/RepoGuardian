export interface IComplianceScore {
  category: string
  score: number
}

export interface IRuleResult {
  ruleId: string
  ruleName: string
  category: string
  passed: boolean
  details: string
}

export interface IRecommendation {
  ruleResultId: string
  ruleId: string
  issueDescription: string
  explanation: string
  suggestedFix: string
}

export interface IScanSummary {
  scanRunId: string
  repositoryId: string
  repositoryName: string
  owner: string
  status: string
  overallScore: number | null
  branch: string | null
  triggeredAt: string
  completedAt: string | null
}

export interface ScanHistoryTableProps {
  onView: (scanRunId: string) => void
}

export interface ScanResultModalProps {
  scanResult: IScanResult
  onClose: () => void
}

export interface StartScanModalProps {
  open: boolean
  onClose: () => void
  onScanComplete: (result: IScanResult) => void
  onScanStart?: () => void
  onScanEnd?: () => void
}

export interface IScanResult {
  scanRunId: string
  status: string
  overallScore: number | null
  branch: string | null
  triggeredAt: string
  completedAt: string | null
  errorMessage: string | null
  categoryScores: IComplianceScore[]
  ruleResults: IRuleResult[]
  recommendations: IRecommendation[]
}
