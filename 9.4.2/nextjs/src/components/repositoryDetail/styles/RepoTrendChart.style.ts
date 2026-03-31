import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    padding: 24px 28px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      padding: 20px 16px;
    }
  `,
  title: css`
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin-bottom: 20px !important;
  `,
  svgWrap: css`
    width: 100%;
    overflow-x: auto;
  `,
  gridLine: css`
    stroke: #f3f4f6;
    stroke-width: 1;
  `,
  axisLine: css`
    stroke: #e5e7eb;
    stroke-width: 1;
  `,
  axisLabel: css`
    font-size: 11px;
    fill: #9ca3af;
  `,
  trendLine: css`
    stroke: #10b981;
    stroke-width: 2.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  `,
  trendArea: css`
    fill: #10b981;
    opacity: 0.08;
  `,
  dot: css`
    fill: #10b981;
  `,
  skeleton: css`
    width: 100% !important;
    height: 180px !important;
    border-radius: 8px !important;
  `,
  empty: css`
    font-size: 14px !important;
    color: #9ca3af !important;
  `,
}))
