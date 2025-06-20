import 'pretendard/dist/web/static/pretendard.css';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A3C65',
        },
        // secondary: { // secondary 색상도 필요하다면 여기에 정의할 수 있습니다.
        //   main: '#dc004e',
        // },
        // error: {
        //   main: '#f44336',
        // },
        // warning: {
        //   main: '#ff9800',
        // },
        // info: {
        //   main: '#2196f3',
        // },
        // success: {
        //   main: '#4caf50',
        // },
    },
    typography: {
        fontFamily: [
            'Pretendard',
            '-apple-system',
            'BlinkMacSystemFont',
            'system-ui',
            'Roboto',
            '"Helvetica Neue"',
            '"Apple SD Gothic Neo"',
            '"Noto Sans KR"',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.25rem',
            fontWeight: 600,
            // ... 다른 h1 스타일
        },
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: { // Accordion의 루트 요소
                    '&.Mui-expanded': { // 확장되었을 때
                        margin: 0,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { // AppBar의 루트 요소에 대한 스타일
                    boxShadow: 'none', // 기본 그림자를 제거합니다.
                    // 또는 elevation={0}에 해당하는 MUI의 그림자 값을 직접 사용할 수도 있습니다.
                    // 예: boxShadow: theme.shadows[0] (theme 객체 접근이 가능하다면)
                },
            },
        },
    },
    spacing: 4,
});

export default theme;

