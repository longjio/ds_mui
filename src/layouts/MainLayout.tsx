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
import { menuGroups, MenuItem } from '../app-routes';

const drawerWidth = 240;

type OpenTabInfo = Omit<MenuItem, 'children'>;

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 모바일인 경우 MDI TAB 숨기기
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [openTabs, setOpenTabs] = useState<OpenTabInfo[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    useEffect(() => {
        const currentPath = location.pathname;
        if (openTabs.some(tab => tab.path === currentPath)) {
            setActiveTabId(currentPath);
        } else if (currentPath === '/') {
            setActiveTabId(null);
        }
    }, [location.pathname, openTabs]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (menuItem: MenuItem) => {
        if (!menuItem.path) return;

        // 데스크톱 환경에서만 탭 추가 로직 실행
        if (!isMobile && !openTabs.some((tab: OpenTabInfo) => tab.id === menuItem.id)) {
            const newTab: OpenTabInfo = {
                id: menuItem.id,
                text: menuItem.text,
                path: menuItem.path,
            };
            setOpenTabs(prevTabs => [...prevTabs, newTab]);
        }

        navigate(menuItem.path);
        setActiveTabId(menuItem.path);

        if (isMobile) {
            handleDrawerToggle();
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newTabId: string) => {
        setActiveTabId(newTabId);
        navigate(newTabId);
    };

    const handleCloseTab = (e: React.MouseEvent, tabIdToClose: string) => {
        e.stopPropagation();

        const newTabs = openTabs.filter(tab => tab.path !== tabIdToClose);
        setOpenTabs(newTabs);

        if (activeTabId === tabIdToClose) {
            if (newTabs.length > 0) {
                const newActiveTab = newTabs[newTabs.length - 1];
                setActiveTabId(newActiveTab.path!);
                navigate(newActiveTab.path!);
            } else {
                setActiveTabId(null);
                navigate('/');
            }
        }
    };

    const drawerContent = (
        <Box sx={{ overflow: 'auto', height: '100%' }}>
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
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar disableGutters sx={{ paddingLeft: '25px' }}>
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

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={isMobile ? handleDrawerToggle : undefined}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        top: { xs: '56px', sm: '64px' },
                        height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: { xs: '56px', sm: '64px' },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* 핵심 수정 사항 1: 모바일이 아닐 때만 MDI 탭 바를 렌더링 */}
                {!isMobile && (
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
                )}

                {/* MDI 탭 컨텐츠 영역 */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
                    {/* 핵심 수정 사항 2: 콘텐츠 표시 조건을 URL 경로 기준으로 변경 */}
                    {location.pathname !== '/' ? (
                        <Outlet />
                    ) : (
                        <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                            메뉴를 클릭하여 페이지를 열어주세요.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;