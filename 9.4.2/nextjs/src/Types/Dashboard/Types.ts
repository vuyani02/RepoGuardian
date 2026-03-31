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

export interface IDailyAverage {
  date: string
  averageScore: number
}

export interface IDashboardStats {
  totalRepositories: number
  totalScans: number
  averageComplianceScore: number | null
  categoryAverages: ICategoryAverage[]
  reposBelowThreshold: number
  mostRecentScan: IMostRecentScan | null
  mostFailingRule: IMostFailingRule | null
  trendData: IDailyAverage[]
}

export interface IDashboardFilters {
  daysBack: number | null
  latestPerRepo: boolean
}

export interface MostRecentScanStripProps {
  mostRecentScan: IMostRecentScan | null
  isPending: boolean
}

export interface MostFailingRuleCardProps {
  mostFailingRule: IMostFailingRule | null
  isPending: boolean
}
