export interface ICategoryAverage {
  category: string
  averageScore: number
}

export interface IDashboardStats {
  totalRepositories: number
  totalScans: number
  averageComplianceScore: number | null
  categoryAverages: ICategoryAverage[]
}

export interface IDashboardFilters {
  daysBack: number | null
  latestPerRepo: boolean
}
