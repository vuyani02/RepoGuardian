import { createAction } from 'redux-actions'
import { IScanSummary } from '@/lib/definitions'
import { IScansStateContext } from './context'

export enum ScansActionEnums {
  getAllScansPending = 'GET_ALL_SCANS_PENDING',
  getAllScansSuccess = 'GET_ALL_SCANS_SUCCESS',
  getAllScansError   = 'GET_ALL_SCANS_ERROR',
}

export const getAllScansPending = createAction<Partial<IScansStateContext>>(
  ScansActionEnums.getAllScansPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)

export const getAllScansSuccess = createAction<Partial<IScansStateContext>, IScanSummary[]>(
  ScansActionEnums.getAllScansSuccess,
  (scans) => ({ isPending: false, isSuccess: true, isError: false, scans })
)

export const getAllScansError = createAction<Partial<IScansStateContext>>(
  ScansActionEnums.getAllScansError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)
