// D:/ds_mui/src/layouts/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom'; // Outlet과 Link 임포트
import {
    AppBar, Toolbar, Typography, Box, CssBaseline, Drawer,
    IconButton, List, ListItemButton, ListItemText,
    useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

interface MenuItem {
    text: string;
    path: string;
    children?: MenuItem[]; // 하위 메뉴 아이템
}

interface MenuGroup {
    title: string;
    items: MenuItem[];
}

// 메뉴 구조 정의 (경로 및 그룹핑 수정)
const menuGroups: MenuGroup[] = [
    {
        title: 'Button',
        items: [
            { text: 'Button', path: '/button' },
            { text: 'ButtonGroup', path: '/button-group' },
        ],
    },
    {
        title: 'Components',
        items: [
            { text: 'Autocomplete', path: '/inputs/autocomplete' },
            {
                text: 'Input', // Autocomplete 하위 기능으로 포함 또는 별도 그룹
                path: '/inputs/autocomplete/combo', // 기본 Combo 페이지 경로
                children: [
                    { text: 'Textfield', path: '/textfield' },
                    { text: 'Checkbox', path: '/checkbox' },
                    { text: 'Radio Group', path: '/radio-group' },
                    { text: 'Rating', path: '/rating' },
                    { text: 'Slider', path: '/slider' },
                    { text: 'Switch', path: '/switch' },
                ],
            },

        ],
    },
    {
        title: 'Surface',
        items: [
            { text: 'Accordion', path: '/accordion' },
            { text: 'Appbar', path: '/appbar' }, // 이 Appbar는 레이아웃의 Appbar와 다른 컴포넌트 예시일 수 있음
            { text: 'Card', path: '/card' },
        ],
    },
    {
        title: 'Layout',
        items: [
            { text: 'Grid', path: '/grid' },
        ],
    },
    {
        title: 'Foundations',
        items: [
            { text: 'Typography', path: '/typography' },
        ],
    },
    {
        title: 'MUI X',
        items: [
            { text: 'Data Grid', path: '/data-grid' },
        ],
    },

];

// MainLayoutProps는 Outlet을 사용하므로 children prop이 필요 없어졌습니다.
// const MainLayout = ({ children }: MainLayoutProps) => {
const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <>
            <Toolbar /> {/* AppBar 높이만큼 공간 확보 */}
            {menuGroups.map((group) => ( // index 대신 group.title을 key로 사용 (고유하다면)
                <Accordion
                    key={group.title} // 그룹 제목이 고유하다고 가정
                    disableGutters
                    elevation={0}
                    defaultExpanded // 기본적으로 열려있게 하거나, 특정 조건에 따라 제어 가능
                    sx={{
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        '&:before': { display: 'none' }, // 아코디언 기본 상단 선 제거
                        '&:last-child': { borderBottom: '1px solid rgba(0, 0, 0, 0.12)' } // 마지막 아코디언 하단 선 추가
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${group.title.replace(/\s+/g, '-').toLowerCase()}-content`}
                        id={`${group.title.replace(/\s+/g, '-').toLowerCase()}-header`}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {group.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}> {/* AccordionDetails의 기본 패딩 제거 */}
                        <List disablePadding>
                            {group.items.map((item) => (
                                <React.Fragment key={item.path}> {/* item.text 대신 고유한 item.path를 key로 사용 */}
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        onClick={isMobile ? handleDrawerToggle : undefined} // 모바일에서 클릭 시 드로어 닫기
                                        sx={{ pl: item.children ? 3 : 4 }} // 하위 메뉴가 있으면 들여쓰기 조정
                                    >
                                        <ListItemText primary={item.text} />
                                        {/* 하위 메뉴가 있다면 펼침/닫힘 아이콘 등을 추가할 수도 있음 */}
                                    </ListItemButton>
                                    {item.children?.map((subItem) => (
                                        <ListItemButton
                                            key={subItem.path} // subItem.text 대신 고유한 subItem.path를 key로 사용
                                            component={Link}
                                            to={subItem.path}
                                            onClick={isMobile ? handleDrawerToggle : undefined} // 모바일에서 클릭 시 드로어 닫기
                                            sx={{ pl: 6 }} // 하위 메뉴 들여쓰기
                                        >
                                            <ListItemText primary={subItem.text} />
                                        </ListItemButton>
                                    ))}
                                </React.Fragment>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1, // Drawer 위에 AppBar가 오도록 설정
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
                        My Design System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={isMobile ? handleDrawerToggle : undefined}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 6, py: 5,
                    width: { sm: `calc(100% - ${drawerWidth}px)` } // 데스크탑에서 Drawer 너비만큼 제외
                }}
            >
                <Toolbar /> {/* AppBar와 같은 높이의 공간을 만들어 콘텐츠가 AppBar 뒤에 가려지지 않도록 함 */}
                <Outlet /> {/* 중첩된 라우트의 컴포넌트가 여기에 렌더링됨 */}
            </Box>
        </Box>
    );
};

export default MainLayout;