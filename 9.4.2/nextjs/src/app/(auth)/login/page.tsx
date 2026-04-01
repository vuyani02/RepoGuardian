'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { useStyles } from './style'

type LoginValues = {
  username: string
  password: string
}

const ShieldIcon = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="loginShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
        </linearGradient>
      </defs>
      <path d="M16 3L5 7.5V15c0 6.075 4.667 11.742 11 13 6.333-1.258 11-6.925 11-13V7.5L16 3Z" fill="url(#loginShield)" />
      <path d="M11 16l3.5 3.5L21 12" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get('registered') === 'true'
  const { styles } = useStyles()

  const onFinish = async (values: LoginValues) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.message)
        return
      }
      router.push('/dashboard')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Left branding panel */}
      <div className={styles.leftPanel}>
        <Link href="/" className={styles.logoWrap}>
          <ShieldIcon />
          <span className={styles.logoText}>RepoGuardian</span>
        </Link>

        <div className={styles.leftHeading}>Welcome back.</div>
        <div className={styles.leftSub}>
          Sign in to view your compliance scores, scan history, and AI-generated fix recommendations.
        </div>

        <div className={styles.features}>
          {[
            '17 compliance rules across 5 categories',
            'AI-generated fix recommendations',
            'Instant scan results',
            'Team-wide repo visibility',
          ].map((f) => (
            <div key={f} className={styles.featureItem}>
              <span className={styles.featureDot} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <Link href="/" className={styles.backLink}>
            ← Back to home
          </Link>

          <Typography.Title level={2} className={styles.heading}>
            Sign in
          </Typography.Title>
          <Typography.Paragraph className={styles.subheading}>
            Enter your credentials to access your dashboard.
          </Typography.Paragraph>

          {justRegistered && (
            <Alert
              type="success"
              message="Account created successfully. Please sign in."
              showIcon
              className={styles.alert}
            />
          )}
          {error && (
            <Alert type="error" message={error} showIcon className={styles.alert} />
          )}

          <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
            <Form.Item
              label={<span className={styles.label}>Username</span>}
              name="username"
              rules={[{ required: true, message: 'Username is required' }]}
            >
              <Input size="large" placeholder="Enter your username" style={{ borderRadius: 10 }} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Password</span>}
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password size="large" placeholder="Enter your password" style={{ borderRadius: 10 }} />
            </Form.Item>

            <Form.Item className={styles.submitItem}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                className={styles.submitBtn}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.footer}>
            Don&apos;t have an account? <Link href="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
