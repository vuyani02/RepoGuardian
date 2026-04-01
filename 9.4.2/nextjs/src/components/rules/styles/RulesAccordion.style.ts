import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  section: css`
    margin-bottom: 32px;
  `,
  sectionHeader: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  `,
  sectionTitle: css`
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    margin: 0 !important;
  `,
  sectionCount: css`
    font-size: 13px !important;
    color: #6b7280 !important;
  `,
  ruleHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
  `,
  ruleLeft: css`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  `,
  ruleName: css`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  categoryTag: css`
    flex-shrink: 0;

    @media (max-width: 480px) {
      display: none;
    }
  `,
  explanationGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,
  explanationCard: css`
    background: #f9fafb;
    border-radius: 10px;
    padding: 16px;
  `,
  explanationLabel: css`
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280 !important;
    margin-bottom: 6px !important;
  `,
  explanationText: css`
    font-size: 13px;
    color: #374151;
    line-height: 1.6;
    margin: 0;
  `,
  empty: css`
    text-align: center;
    padding: 32px;
    color: #9ca3af;
    font-size: 14px;
  `,
}))
