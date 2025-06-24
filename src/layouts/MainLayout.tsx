// D:/ds_mui/src/layouts/MainLayout.tsx

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { menuGroups, MenuItem } from '../app-routes'; // app-routes에서 메뉴 정보만 가져옴

const drawerWidth = 240;

// 탭에 저장될 데이터 타입 (children 제외)
type OpenTabInfo = Omit<MenuItem, 'children'>;

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // MDI 탭 상태 관리
    const [openTabs, setOpenTabs] = useState<OpenTabInfo[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    // URL 변경 감지하여 탭 상태 동기화
    useEffect(() => {
        const currentPath = location.pathname;
        // 현재 경로가 탭 목록에 있으면 해당 탭을 활성화
        if (openTabs.some(tab => tab.path === currentPath)) {
            setActiveTabId(currentPath);
        } else if (currentPath === '/') {
            // 홈 경로이면 활성 탭 없음
            setActiveTabId(null);
        }
    }, [location.pathname, openTabs]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // 메뉴 아이템 클릭 핸들러
    const handleMenuClick = (menuItem: MenuItem) => {
        if (!menuItem.path) return;

        // 이미 열린 탭이 아니면 새로 추가
        if (!openTabs.some((tab: OpenTabInfo) => tab.id === menuItem.id)) {
            const newTab: OpenTabInfo = {
                id: menuItem.id,
                text: menuItem.text,
                path: menuItem.path,
            };
            setOpenTabs(prevTabs => [...prevTabs, newTab]);
        }

        // 클릭된 탭으로 이동 및 활성화
        navigate(menuItem.path);
        setActiveTabId(menuItem.path);

        // 모바일에서는 메뉴를 닫음
        if (isMobile) {
            handleDrawerToggle();
        }
    };

    // 탭 변경 핸들러
    const handleTabChange = (event: React.SyntheticEvent, newTabId: string) => {
        setActiveTabId(newTabId);
        navigate(newTabId); // 탭 변경 시 URL도 변경
    };

    // 탭 닫기 핸들러
    const handleCloseTab = (e: React.MouseEvent, tabIdToClose: string) => {
        e.stopPropagation(); // 탭 클릭 이벤트 전파 방지

        const newTabs = openTabs.filter(tab => tab.path !== tabIdToClose);
        setOpenTabs(newTabs);

        // 닫힌 탭이 활성 탭이었을 경우
        if (activeTabId === tabIdToClose) {
            if (newTabs.length > 0) {
                // 남은 탭 중 마지막 탭을 활성화
                const newActiveTab = newTabs[newTabs.length - 1];
                setActiveTabId(newActiveTab.path!);
                navigate(newActiveTab.path!);
            } else {
                // 모든 탭이 닫혔을 경우
                setActiveTabId(null);
                navigate('/'); // 홈으로 이동
            }
        }
    };

    const drawerContent = (
        <>
            <Toolbar />
            {menuGroups.map((group) => (
                <Accordion key={group.id} disableGutters elevation={0} defaultExpanded sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)', '&:before': { display: 'none' }, '&:last-child': { borderBottom: '1px solid rgba(0, 0, 0, 0.12)' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${group.id}-content`} id={`${group.id}-header`}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{group.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List disablePadding>
                            {group.items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <ListItemButton onClick={() => handleMenuClick(item)} sx={{ pl: item.children ? 3 : 4 }}>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                    {item.children?.map((subItem) => (
                                        <ListItemButton key={subItem.id} onClick={() => handleMenuClick(subItem)} sx={{ pl: 6 }}>
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
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar disableGutters sx={{ paddingLeft: '25px' }}>
                    {isMobile && (
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => { setOpenTabs([]); setActiveTabId(null); navigate('/'); }}
                        sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                    >
                        SI Design System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex', flexGrow: 1, mt: { xs: '56px', sm: '64px' } /* AppBar 높이만큼 */ }}>
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={isMobile ? mobileOpen : true}
                    onClose={isMobile ? handleDrawerToggle : undefined}
                    ModalProps={{ keepMounted: true }}
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

                <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    {/* MDI 탭 바 */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={activeTabId || false}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            {openTabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    value={tab.path}
                                    label={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {tab.text}
                                            <IconButton size="small" component="span" onClick={(e) => handleCloseTab(e, tab.path!)} sx={{ ml: 1.5 }}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                />
                            ))}
                        </Tabs>
                    </Box>

                    {/* MDI 탭 컨텐츠 영역 */}
                    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
                        {openTabs.length > 0 ? (
                            <Outlet />
                        ) : (
                            <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                                메뉴를 클릭하여 페이지를 열어주세요.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;