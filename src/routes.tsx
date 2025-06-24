// src/routes.tsx
import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Layouts
import MainLayout from './layouts/MainLayout';

// 로딩 중에 보여줄 컴포넌트
const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
    </Box>
);

// React.lazy를 사용하여 페이지 컴포넌트를 동적으로 import
const AccordionPage = lazy(() => import('./pages/AccordionPage'));
const AppBarPage = lazy(() => import('./pages/AppBarPage'));
const AutocompletePage = lazy(() => import('./pages/AutocompletePage'));
const ButtonPage = lazy(() => import('./pages/ButtonPage'));
const ButtonGroupPage = lazy(() => import('./pages/ButtonGroupPage'));
const CardPage = lazy(() => import('./pages/CardPage'));
const CheckboxPage = lazy(() => import('./pages/CheckboxPage'));
const DataGridPage = lazy(() => import('./pages/DataGridPage'));
const GridPage = lazy(() => import('./pages/GridPage'));
const RadioGroupPage = lazy(() => import('./pages/RadioGroupPage'));
const RatingPage = lazy(() => import('./pages/RatingPage'));
const SelectPage = lazy(() => import('./pages/SelectPage'));
const SliderPage = lazy(() => import('./pages/SliderPage'));
const SwitchPage = lazy(() => import('./pages/SwitchPage'));
const TextFieldPage = lazy(() => import('./pages/TextFieldPage'));
const TypographyPage = lazy(() => import('./pages/TypographyPage'));

// 각 페이지를 Suspense로 감싸서 라우트 객체 생성
const createSuspendedRoute = (path: string, element: React.ReactNode): RouteObject => ({
    path,
    element: <Suspense fallback={<Loading />}>{element}</Suspense>,
});

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            createSuspendedRoute('accordion', <AccordionPage />),
            createSuspendedRoute('appbar', <AppBarPage />),
            createSuspendedRoute('autocomplete', <AutocompletePage />),
            createSuspendedRoute('button', <ButtonPage />),
            createSuspendedRoute('button-group', <ButtonGroupPage />),
            createSuspendedRoute('card', <CardPage />),
            createSuspendedRoute('checkbox', <CheckboxPage />),
            createSuspendedRoute('data-grid', <DataGridPage />),
            createSuspendedRoute('grid', <GridPage />),
            createSuspendedRoute('radio-group', <RadioGroupPage />),
            createSuspendedRoute('rating', <RatingPage />),
            createSuspendedRoute('select', <SelectPage />),
            createSuspendedRoute('slider', <SliderPage />),
            createSuspendedRoute('switch', <SwitchPage />),
            createSuspendedRoute('textfield', <TextFieldPage />),
            createSuspendedRoute('typography', <TypographyPage />),
        ],
    },
];