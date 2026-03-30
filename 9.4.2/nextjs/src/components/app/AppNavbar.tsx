'use client'

import { useState } from 'react'
import { Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { useStyles } from './styles/AppNavbar.style'

const ShieldIcon = () => {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="appNavShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path d="M16 3L5 7.5V15c0 6.075 4.667 11.742 11 13 6.333-1.258 11-6.925 11-13V7.5L16 3Z" fill="url(#appNavShield)" />
      <path d="M11 16l3.5 3.5L21 12" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/repositories', label: 'Repositories' },
  { href: '/scans', label: 'Scans' },
]

const AppNavbar = () => {
  const { styles } = useStyles()
  const pathname = usePathname()
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = async () => {
    await axios.post('/api/auth/logout')
    router.push('/login')
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/dashboard" className={styles.logo}>
        <ShieldIcon />
        <span className={styles.logoText}>
          <span className="repo">Repo</span>
          <span className="guardian">Guardian</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div className={styles.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop right */}
      <div className={styles.right}>
        <Button
          type="text"
          size="small"
          onClick={handleLogout}
          className={styles.logoutBtn}
        >
          Log out
        </Button>
      </div>

      {/* Mobile hamburger */}
      <Button
        type="text"
        className={styles.hamburger}
        icon={<MenuOutlined />}
        onClick={() => setDrawerOpen(true)}
      />

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={240}
        closeIcon={<CloseOutlined />}
        title={
          <Link href="/dashboard" className={styles.logo} onClick={() => setDrawerOpen(false)}>
            <ShieldIcon />
            <span className={styles.logoText}>
              <span className="repo">Repo</span>
              <span className="guardian">Guardian</span>
            </span>
          </Link>
        }
        styles={{ body: { padding: '16px 0' } }}
      >
        <div className={styles.drawerNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.drawerDivider} />
          <Button
            type="text"
            onClick={() => { setDrawerOpen(false); handleLogout() }}
            className={styles.drawerLogout}
          >
            Log out
          </Button>
        </div>
      </Drawer>
    </nav>
  )
}

export default AppNavbar
