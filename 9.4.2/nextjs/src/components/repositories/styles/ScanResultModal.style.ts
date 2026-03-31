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
  rulesToolbar: css`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  `,
  rulesSearch: css`
    flex: 1;
    min-width: 140px;
  `,
  rulesFilter: css`
    width: 150px;

    @media (max-width: 600px) {
      width: 100%;
    }
  `,
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
  recCollapse: css`
    border: none !important;
    background: transparent !important;

    .ant-collapse-item {
      border: 1px solid #e5e7eb !important;
      border-radius: 10px !important;
      margin-bottom: 8px !important;
      overflow: hidden;
    }

    .ant-collapse-item:last-child {
      border-radius: 10px !important;
    }

    .ant-collapse-header {
      background: #fef2f2 !important;
      border-left: 4px solid #ef4444 !important;
      padding: 12px 16px !important;
      align-items: center !important;
    }

    .ant-collapse-content {
      border-top: 1px solid #e5e7eb !important;
    }

    .ant-collapse-content-box {
      padding: 0 !important;
    }
  `,
  recCollapseLabel: css`
    font-weight: 600;
    font-size: 14px;
    color: #111827;
  `,
  recFailBadge: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #ef4444;
    margin-left: 8px;
  `,
  recSection: css`
    display: flex;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
    }
  `,
  recIconWrap: css`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  `,
  recIconIssue: css`background: #fef2f2;`,
  recIconExplanation: css`background: #eff6ff;`,
  recIconFix: css`background: #f0fdf4;`,
  recSectionContent: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,
  recSectionLabel: css`
    font-size: 11px !important;
    font-weight: 700 !important;
    color: #9ca3af !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 !important;
  `,
  recSectionText: css`
    font-size: 13px !important;
    color: #374151 !important;
    margin: 0 !important;
  `,
}))
