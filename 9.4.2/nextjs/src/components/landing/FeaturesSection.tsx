'use client'

import { Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ css }) => ({
  section: css`
    background: #ffffff;
    padding: 100px 48px;

    @media (max-width: 768px) {
      padding: 64px 20px;
    }
  `,
  inner: css`
    max-width: 1100px;
    margin: 0 auto;
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
    max-width: 560px;
    line-height: 1.7 !important;
    margin-bottom: 64px !important;

    @media (max-width: 768px) {
      max-width: none;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 28px;
  `,
  card: css`
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 36px 32px;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
      box-shadow: 0 8px 32px rgba(79, 70, 229, 0.1);
      border-color: #c7d2fe;
    }
  `,
  iconWrap: css`
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
  `,
  cardTitle: css`
    font-size: 20px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 12px !important;
  `,
  cardText: css`
    font-size: 15px !important;
    color: #6b7280 !important;
    line-height: 1.7 !important;
    margin-bottom: 0 !important;
  `,
  pill: css`
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    margin-top: 16px;
  `,
}));

const features = [
  {
    icon: "🔍",
    iconBg: "#eef2ff",
    title: "Deep Repository Scanning",
    text: "Instantly checks every public GitHub repository against 10 best-practice rules across documentation, testing, CI/CD, dependencies, and security.",
    pill: "10 Rules",
    pillBg: "#eef2ff",
    pillColor: "#4f46e5",
  },
  {
    icon: "✨",
    iconBg: "#f0fdf4",
    title: "AI-Powered Fix Recommendations",
    text: "For every failed rule, Gemini generates a clear explanation of the issue and a concrete, actionable suggestion to bring your repo into compliance.",
    pill: "Powered by Gemini",
    pillBg: "#f0fdf4",
    pillColor: "#059669",
  },
  {
    icon: "📊",
    iconBg: "#fff7ed",
    title: "Compliance Score Dashboard",
    text: "Get a breakdown score per category — Documentation, Testing, CI/CD, Dependencies, Security — so you always know exactly where to focus next.",
    pill: "5 Categories",
    pillBg: "#fff7ed",
    pillColor: "#d97706",
  },
];

export default function FeaturesSection() {
  const { styles } = useStyles();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionTag}>Features</div>

        <Title className={styles.heading}>
          Everything you need to keep repos healthy
        </Title>

        <Paragraph className={styles.subheading}>
          From first scan to AI-generated fix in seconds — no configuration needed.
        </Paragraph>

        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.iconWrap} style={{ background: f.iconBg }}>
                {f.icon}
              </div>
              <Title level={4} className={styles.cardTitle}>
                {f.title}
              </Title>
              <Paragraph className={styles.cardText}>{f.text}</Paragraph>
              <span
                className={styles.pill}
                style={{ background: f.pillBg, color: f.pillColor }}
              >
                {f.pill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
