'use client'

import { Typography } from "antd";
import { useStyles } from './styles/FeaturesSection.style'

const { Title, Paragraph } = Typography;

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

const FeaturesSection = () => {
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

export default FeaturesSection
