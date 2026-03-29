import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
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
}))
