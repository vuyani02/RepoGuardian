import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  modalTitle: css`
    font-weight: 700;
    font-size: 16px;
  `,
  header: css`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  `,
  overallScore: css`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `,
  scoreGreen: css`
    background: #f0fdf4;
    border: 2px solid #10b981;
  `,
  scoreAmber: css`
    background: #fffbeb;
    border: 2px solid #f59e0b;
  `,
  scoreRed: css`
    background: #fef2f2;
    border: 2px solid #ef4444;
  `,
  scoreNumber: css`
    font-size: 22px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    margin-bottom: 0 !important;
  `,
  scoreNumberGreen: css`color: #10b981 !important;`,
  scoreNumberAmber: css`color: #f59e0b !important;`,
  scoreNumberRed:   css`color: #ef4444 !important;`,
  scoreLabel: css`
    font-size: 11px !important;
    color: #9ca3af !important;
  `,
  overallTitle: css`
    margin: 0 !important;
    font-weight: 700 !important;
  `,
  rulesPassedText: css`
    color: #6b7280 !important;
    font-size: 14px !important;
  `,
  sectionTitle: css`
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #6b7280 !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px !important;
  `,
  categoryGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  `,
  categoryCard: css`
    background: #f9fafb;
    border-radius: 10px;
    padding: 12px 16px;
  `,
  categoryName: css`
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
  `,
  progressLabelGreen: css`font-size: 12px; font-weight: 700; color: #10b981;`,
  progressLabelAmber: css`font-size: 12px; font-weight: 700; color: #f59e0b;`,
  progressLabelRed:   css`font-size: 12px; font-weight: 700; color: #ef4444;`,
  rulesTableWrap: css`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    @media (max-width: 768px) {
      margin: 0 -16px;
      padding: 0 16px;
    }
  `,
  rulesTable: css`margin-bottom: 24px;`,
  ruleName: css`
    font-weight: 600;
    font-size: 13px;
    color: #111827;
  `,
  ruleId: css`
    font-size: 12px;
    color: #9ca3af;
  `,
  categoryTag: css`border-radius: 6px;`,
  passText: css`
    font-size: 13px !important;
    color: #10b981 !important;
    font-weight: 600 !important;
  `,
  failText: css`
    font-size: 13px !important;
    color: #ef4444 !important;
    font-weight: 600 !important;
  `,
  detailsText: css`
    font-size: 13px !important;
    color: #6b7280 !important;
  `,
  recCollapseLabel: css`
    font-weight: 600;
    font-size: 14px;
  `,
  recommendationCard: css`
    background: #f9fafb;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 8px;
  `,
  recLabel: css`
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 8px;
    margin-bottom: 2px;
  `,
  recText: css`
    font-size: 13px !important;
    color: #374151 !important;
    margin-bottom: 0 !important;
  `,
}))
