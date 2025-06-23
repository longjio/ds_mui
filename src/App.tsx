import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // createTheme은 theme.ts에서 사용되므로 여기서는 제거
import CssBaseline from '@mui/material/CssBaseline';

import { routesConfig } from './routes'; // 분리된 라우트 설정 임포트
// import theme from './theme';
import { getTheme } from './theme';

// AppRoutes 컴포넌트 (useRoutes 훅 사용)
const AppRoutes = () => {
  const element = useRoutes(routesConfig);
  return element;
};

function App() {
  return (
      <ThemeProvider theme={getTheme('light')}>
          <CssBaseline />
          <Router basename={process.env.PUBLIC_URL}>
              <AppRoutes />
          </Router>
      </ThemeProvider>
  );
}

export default App;