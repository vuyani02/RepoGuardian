export interface IDashboardStats {
  totalRepositories: number
  totalScans: number
  averageComplianceScore: number | null
}

export interface IDashboardFilters {
  daysBack: number | null
  latestPerRepo: boolean
}
