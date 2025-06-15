// src/routes.tsx
import React from 'react';
import { RouteObject } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import TypographyPage from './pages/TypographyPage';
import ButtonPage from './pages/ButtonPage';

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // Foundations
            { path: 'button', element: <ButtonPage /> },
            { path: 'typography', element: <TypographyPage /> },
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
