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
        button: {
            textTransform: 'none',
        },
    },
    spacing: 4,
});

export default theme;

