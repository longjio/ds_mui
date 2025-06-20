import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // createTheme은 theme.ts에서 사용되므로 여기서는 제거
import CssBaseline from '@mui/material/CssBaseline';

import { routesConfig } from './routes'; // 분리된 라우트 설정 임포트
import theme from './theme'; // 분리된 theme.ts 파일에서 테마 객체 임포트

// AppRoutes 컴포넌트 (useRoutes 훅 사용)
const AppRoutes = () => {
  const element = useRoutes(routesConfig);
  return element;
};

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI의 기본 CSS 리셋 및 스타일 적용 */}
        {/*<Router>*/}
        {/*  <AppRoutes /> /!* 라우트 렌더링 *!/*/}
        {/*</Router>*/}
          <Router basename={process.env.PUBLIC_URL}>
              <AppRoutes /> {/* 라우트 렌더링 */}
          </Router>
      </ThemeProvider>
  );
}

export default App;