'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'antd'

const LogoutButton = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <Button danger loading={loading} onClick={handleLogout}>
      Sign Out
    </Button>
  )
}

export default LogoutButton
