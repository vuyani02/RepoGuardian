export interface ICategoryAverage {
  category: string
  averageScore: number
}

export interface IMostRecentScan {
  repositoryName: string
  owner: string
  triggeredAt: string
  overallScore: number | null
}

export interface IMostFailingRule {
  ruleId: string
  ruleName: string
  failCount: number
}

export interface IDashboardStats {
  totalRepositories: number
  totalScans: number
  averageComplianceScore: number | null
  categoryAverages: ICategoryAverage[]
  reposBelowThreshold: number
  mostRecentScan: IMostRecentScan | null
  mostFailingRule: IMostFailingRule | null
}

export interface IDashboardFilters {
  daysBack: number | null
  latestPerRepo: boolean
}
