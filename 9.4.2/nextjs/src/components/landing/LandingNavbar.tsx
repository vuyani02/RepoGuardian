'use client'

import { Button, Space } from "antd";
import { createStyles } from "antd-style";
import Link from "next/link";

const useStyles = createStyles(({ css }) => ({
  navbar: css`
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #f0f0f0;
    padding: 0 48px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  logo: css`
    font-size: 20px;
    font-weight: 800;
    color: #4f46e5;
    letter-spacing: -0.5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      color: #111827;
    }
  `,
  dot: css`
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    display: inline-block;
  `,
}));

export default function LandingNavbar() {
  const { styles } = useStyles();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <span className={styles.dot} />
        Repo<span>Guardian</span>
      </Link>
      <Space size="middle">
        <Link href="/login">
          <Button type="text" size="large">
            Log in
          </Button>
        </Link>
        <Link href="/register">
          <Button type="primary" size="large" style={{ background: "#4f46e5", borderColor: "#4f46e5" }}>
            Get Started Free
          </Button>
        </Link>
      </Space>
    </nav>
  );
}
