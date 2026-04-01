import { NextRequest, NextResponse } from 'next/server'
import { abpApiWithToken } from '@/lib/abp'
import { verifySession } from '@/lib/dal'

export const POST = async (req: NextRequest) => {
  const { accessToken } = await verifySession()
  const { userId } = await req.json()
  try {
    await abpApiWithToken(accessToken).delete(
      `/api/services/app/Team/DeleteTenantUser?userId=${userId}`
    )
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const axiosErr = err as { response?: { status?: number; data?: unknown } }
    const status = axiosErr.response?.status ?? 500
    return NextResponse.json(axiosErr.response?.data ?? {}, { status })
  }
}
