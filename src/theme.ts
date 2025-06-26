import 'pretendard/dist/web/static/pretendard.css';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// 공통으로 사용할 테마 옵션을 정의합니다.
// 폰트, 컴포넌트 기본 스타일, 간격 등 모드에 상관없이 동일한 설정을 여기에 모아둡니다.
const commonSettings = (mode: PaletteMode): ThemeOptions => ({
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
        },
        button: {
            textTransform: 'none', // 버튼 텍스트 대문자 변환 비활성화
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                body: {
                    // 스크롤바 스타일링 (선택 사항)
                    scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.background.default}`,
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: 'transparent',
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: theme.palette.grey[400],
                        minHeight: 24,
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: theme.palette.grey[500],
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: theme.palette.grey[500],
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme.palette.grey[500],
                    },
                },
            }),
        },
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    '&:not(:first-of-type)': {
                        borderTop: 'none',
                    },
                    '&.Mui-expanded': {
                        margin: 0,
                    },
                    boxShadow: 'none',
                    '&:first-of-type': {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    },
                    '&:last-of-type': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    // Paper 컴포넌트의 기본 그림자를 좀 더 부드럽게 설정
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                },
            },
        },
    },
    spacing: 4, // 기본 간격 단위 (예: theme.spacing(2) === 8px)
});

// 라이트 모드 색상 팔레트
const lightPalette: ThemeOptions['palette'] = {
    mode: 'light',
    primary: {
        main: '#323F53', // 기존에 설정하신 메인 색상 유지
    },
    background: {
        default: '#ffffff', // 전체 배경색
        paper: '#ffffff', // 카드, 다이얼로그 등
    },
    text: {
        primary: '#1A2027',
        secondary: '#3E5060',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
};

// 다크 모드 색상 팔레트
const darkPalette: ThemeOptions['palette'] = {
    mode: 'dark',
    primary: {
        main: '#A8B0BC', // 라이트 모드의 메인 색상과 어울리는 밝은 톤
    },
    background: {
        default: '#121212', // 아주 어두운 배경
        paper: '#1e1e1e', // 카드 등은 배경보다 약간 밝게
    },
    text: {
        primary: '#E0E3E7',
        secondary: '#B0B8C4',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
};

// 최종 테마를 생성하는 함수
export const getTheme = (mode: PaletteMode) => {
    const palette = mode === 'light' ? lightPalette : darkPalette;
    return createTheme({
        ...commonSettings(mode),
        palette,
    });
};