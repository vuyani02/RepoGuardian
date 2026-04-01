'use client'

import { Button, Space, Typography } from "antd";
import Link from "next/link";
import { useStyles } from './styles/HeroSection.style'

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  const { styles } = useStyles();

  return (
    <section className={styles.section}>
      <div>
        <div className={styles.badge}>
          ✦ AI-Powered Repository Compliance
        </div>

        <Title className={styles.headline}>
          Your repos,{" "}
          <span className={styles.accent}>always compliant.</span>
        </Title>

        <Paragraph className={styles.subtitle}>
          RepoGuardian scans your GitHub repositories against best-practice rules,
          scores your compliance, and delivers AI-generated fix recommendations —
          in seconds.
        </Paragraph>

        <Space size="middle" wrap className={styles.ctaSpace}>
          <Link href="/register">
            <Button
              type="primary"
              size="large"
              className={styles.primaryBtn}
            >
              Start Scanning Free →
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="large"
              className={styles.secondaryBtn}
            >
              Log in
            </Button>
          </Link>
        </Space>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>17+</div>
            <div className={styles.statLabel}>Compliance Rules</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>5</div>
            <div className={styles.statLabel}>Categories Checked</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>AI</div>
            <div className={styles.statLabel}>Fix Recommendations</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Repos Per Team</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection
