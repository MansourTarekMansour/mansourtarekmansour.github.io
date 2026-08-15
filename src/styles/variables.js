import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #090d16;
    --navy: #0f172a;
    --light-navy: #1e293b;
    --lightest-navy: #334155;
    --navy-shadow: rgba(15, 23, 42, 0.7);
    --dark-slate: #64748b;
    --slate: #94a3b8;
    --light-slate: #cbd5e1;
    --lightest-slate: #e2e8f0;
    --white: #f8fafc;
    --green: #5eead4;
    --green-tint: rgba(45, 212, 191, 0.1);
    --teal: #5eead4;
    --teal-tint: rgba(45, 212, 191, 0.1);

    --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 6px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

export default variables;

