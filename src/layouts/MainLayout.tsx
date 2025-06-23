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
    path?: string; // path를 선택적으로 변경하여 링크가 없는 메뉴 아이템을 허용
    id: string; // 고유 ID 추가
    children?: MenuItem[]; // 하위 메뉴 아이템
}

interface MenuGroup {
    title: string;
    id: string; // 고유 ID 추가
    items: MenuItem[];
}

// 메뉴 구조 정의 (경로 및 그룹핑 수정, 고유 ID 추가)
const menuGroups: MenuGroup[] = [
    {
        title: 'Button',
        id: 'group-button',
        items: [
            { text: 'Button', path: '/button', id: 'item-button' },
            { text: 'ButtonGroup', path: '/button-group', id: 'item-button-group' },
        ],
    },
    {
        title: 'Components',
        id: 'group-components',
        items: [
            {
                text: 'Input', // 이 항목은 링크 없이 하위 메뉴만 펼치는 역할
                id: 'item-input-parent', // Input 자체의 path 제거
                children: [
                    { text: 'Autocomplete', path: '/autocomplete', id: 'item-autocomplete' },
                    { text: 'Textfield', path: '/textfield', id: 'item-textfield' },
                    { text: 'Select', path: '/select', id: 'item-select'},
                    { text: 'Checkbox', path: '/checkbox', id: 'item-checkbox' },
                    { text: 'Radio Group', path: '/radio-group', id: 'item-radio-group' },
                    { text: 'Rating', path: '/rating', id: 'item-rating' },
                    { text: 'Slider', path: '/slider', id: 'item-slider' },
                    { text: 'Switch', path: '/switch', id: 'item-switch' },
                ],
            },
        ],
    },
    {
        title: 'Surface',
        id: 'group-surface',
        items: [
            { text: 'Accordion', path: '/accordion', id: 'item-accordion' },
            { text: 'Appbar', path: '/appbar', id: 'item-appbar' },
            { text: 'Card', path: '/card', id: 'item-card' },
        ],
    },
    {
        title: 'Layout',
        id: 'group-layout',
        items: [
            { text: 'Grid', path: '/grid', id: 'item-grid' },
        ],
    },
    {
        title: 'Foundations',
        id: 'group-foundations',
        items: [
            { text: 'Typography', path: '/typography', id: 'item-typography' },
        ],
    },
    {
        title: 'MUI X',
        id: 'group-mui-x',
        items: [
            { text: 'Data Grid', path: '/data-grid', id: 'item-data-grid' },
        ],
    },
];

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
            {menuGroups.map((group) => (
                <Accordion
                    key={group.id} // 그룹 ID를 key로 사용
                    disableGutters
                    elevation={0}
                    defaultExpanded
                    sx={{
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        '&:before': { display: 'none' },
                        '&:last-child': { borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${group.id}-content`}
                        id={`${group.id}-header`}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {group.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List disablePadding>
                            {group.items.map((item) => (
                                <React.Fragment key={item.id}> {/* 아이템 ID를 key로 사용 */}
                                    <ListItemButton
                                        component={item.path ? Link : 'div'}
                                        to={item.path} // path가 없으면 undefined
                                        onClick={
                                            item.path && isMobile ? handleDrawerToggle : undefined
                                        }
                                        sx={{ pl: item.children ? 3 : 4 }}
                                    >
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                    {item.children?.map((subItem) => (
                                        <ListItemButton
                                            key={subItem.id} // 하위 아이템 ID를 key로 사용
                                            component={subItem.path ? Link : 'div'} // Apply conditional logic here
                                            to={subItem.path} // Safe: to is only passed if component is Link
                                            onClick={
                                                subItem.path && isMobile ? handleDrawerToggle : undefined // Consistent onClick
                                            }
                                            sx={{ pl: 6 }}
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
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar disableGutters
                         sx={{ paddingLeft: '25px' }}>
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
                        SI Design System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={isMobile ? handleDrawerToggle : undefined}
                ModalProps={{
                    keepMounted: true,
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
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;