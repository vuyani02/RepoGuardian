import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css }) => ({
  page: css`
    background: #ffffff;
    min-height: 100vh;
    overflow-x: hidden;
  `,
}));
