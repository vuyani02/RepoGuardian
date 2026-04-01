import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css }) => ({
  outerCollapse: css`
    border: none !important;
    background: transparent !important;

    & > .ant-collapse-item {
      border: 1px solid #e5e7eb !important;
      border-radius: 10px !important;
      margin-bottom: 8px !important;
      overflow: hidden;
    }

    & > .ant-collapse-item:last-child {
      border-radius: 10px !important;
    }

    & > .ant-collapse-item > .ant-collapse-header {
      background: #f9fafb !important;
      border-left: 4px solid #4f46e5 !important;
      padding: 12px 16px !important;
      align-items: center !important;
    }

    & > .ant-collapse-item > .ant-collapse-content {
      border-top: 1px solid #e5e7eb !important;
    }
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
  toggle: css`
    &.ant-switch-checked {
      background: #4f46e5 !important;
    }

    &.ant-switch-checked:hover {
      background: #4338ca !important;
    }
  `,
  empty: css`
    text-align: center;
    padding: 32px;
    color: #9ca3af;
    font-size: 14px;
  `,
}))
