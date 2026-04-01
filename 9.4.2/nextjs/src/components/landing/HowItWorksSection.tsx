'use client'

import { Typography } from "antd";
import { useStyles } from './styles/HowItWorksSection.style'

const { Title, Paragraph } = Typography;

const steps = [
  {
    number: "1",
    title: "Add a Repository",
    text: "Paste your GitHub repo URL. No OAuth or private access required — RepoGuardian works entirely with the public GitHub API.",
  },
  {
    number: "2",
    title: "Trigger a Scan",
    text: "Hit Scan and RepoGuardian evaluates your repo against all 17 rules across 5 compliance categories in seconds.",
  },
  {
    number: "3",
    title: "Get Your Score & Fixes",
    text: "Review your compliance score per category, see exactly which rules failed, and read AI-generated recommendations for every issue.",
  },
];

const HowItWorksSection = () => {
  const { styles } = useStyles();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionTag}>How It Works</div>

        <Title className={styles.heading}>Up and running in 30 seconds</Title>

        <Paragraph className={styles.subheading}>
          No setup, no config files, no integrations. Just paste a repo and go.
        </Paragraph>

        <div className={styles.steps}>
          <div className={styles.connector} />
          <div className={styles.connector2} />
          {steps.map((s) => (
            <div key={s.number} className={styles.step}>
              <div className={styles.stepNumber}>{s.number}</div>
              <Title level={4} className={styles.stepTitle}>
                {s.title}
              </Title>
              <Paragraph className={styles.stepText}>{s.text}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection
