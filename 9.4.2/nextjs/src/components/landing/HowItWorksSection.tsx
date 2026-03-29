'use client'

import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ css }) => ({
  section: css`
    background: #f9fafb;
    padding: 100px 48px;

    @media (max-width: 768px) {
      padding: 64px 20px;
    }
  `,
  inner: css`
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  `,
  sectionTag: css`
    display: inline-block;
    background: #eef2ff;
    color: #4f46e5;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 14px;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  `,
  heading: css`
    font-size: clamp(30px, 4vw, 48px) !important;
    font-weight: 800 !important;
    color: #111827 !important;
    letter-spacing: -1px !important;
    margin-bottom: 16px !important;
  `,
  subheading: css`
    font-size: 18px !important;
    color: #6b7280 !important;
    max-width: 520px;
    margin: 0 auto 64px !important;
    line-height: 1.7 !important;
  `,
  steps: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 0;
    position: relative;
  `,
  connector: css`
    display: none;

    @media (min-width: 768px) {
      display: block;
      position: absolute;
      top: 36px;
      left: calc(33.3% + 36px);
      width: calc(33.3% - 72px);
      height: 2px;
      background: linear-gradient(90deg, #c7d2fe, #a5b4fc);
      z-index: 0;
    }
  `,
  connector2: css`
    display: none;

    @media (min-width: 768px) {
      display: block;
      position: absolute;
      top: 36px;
      left: calc(66.6% + 36px);
      width: calc(33.3% - 72px);
      height: 2px;
      background: linear-gradient(90deg, #a5b4fc, #818cf8);
      z-index: 0;
    }
  `,
  step: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 32px 48px;
    position: relative;
    z-index: 1;
  `,
  stepNumber: css`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    font-size: 26px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
  `,
  stepTitle: css`
    font-size: 20px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 12px !important;
  `,
  stepText: css`
    font-size: 15px !important;
    color: #6b7280 !important;
    line-height: 1.7 !important;
    margin-bottom: 0 !important;
    max-width: 280px;
  `,
}));

const steps = [
  {
    number: "1",
    title: "Add a Repository",
    text: "Paste your GitHub repo URL. No OAuth or private access required — RepoGuardian works entirely with the public GitHub API.",
  },
  {
    number: "2",
    title: "Trigger a Scan",
    text: "Hit Scan and RepoGuardian evaluates your repo against all 10 rules across 5 compliance categories in seconds.",
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
