// src/routes.tsx
import React from 'react';
import { RouteObject } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import TypographyPage from './pages/TypographyPage';
import ButtonPage from './pages/ButtonPage';
import ButtonGroupPage from './pages/ButtonGroupPage';
import TextFieldPage from './pages/TextFieldPage';
import CheckboxPage from './pages/CheckboxPage';
import RadioGroupPage from './pages/RadioGroupPage';
import SelectPage from './pages/SelectPage';
import RatingPage from './pages/RatingPage';
import SliderPage from './pages/SliderPage';
import SwitchPage from './pages/SwitchPage';
import DataGridPage from './pages/DataGridPage';
/// Layout
import GridPage from './pages/GridPage';
/// Surface
import AccordionPage from './pages/AccordionPage';
import AppBarPage from "./pages/AppBarPage";
import CardPage from "./pages/CardPage";


export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // buttons
            { path: 'button', element: <ButtonPage /> },
            { path: 'button-group', element: <ButtonGroupPage /> },
            // inputs
            { path: 'typography', element: <TypographyPage /> },
            { path: 'checkbox', element: <CheckboxPage /> },
            { path: 'radio-group', element: <RadioGroupPage /> },
            { path: 'textfield', element: <TextFieldPage /> },
            { path: 'select', element: <SelectPage /> },
            { path: 'rating', element: <RatingPage /> },
            { path: 'slider', element: <SliderPage /> },
            { path: 'switch', element: <SwitchPage /> },
            // surface
            { path: 'accordion', element: <AccordionPage /> },
            { path: 'appbar', element: <AppBarPage /> },
            { path: 'card', element: <CardPage /> },
            // layout
            { path: 'grid', element: <GridPage /> },
            //MUI X
            { path: 'data-grid', element: <DataGridPage /> },
            // { path: '*', element: <NotFoundPage /> } // 404 페이지
        ],
    },
    // 다른 최상위 라우트 그룹 (예: 인증 레이아웃)
    // {
    //   path: '/auth',
    //   element: <AuthLayout />,
    //   children: [
    //     { path: 'login', element: <LoginPage /> },
    //   ]
    // }
];
