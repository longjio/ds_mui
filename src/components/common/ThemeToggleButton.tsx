// src/components/common/ThemeToggleButton.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useThemeContext } from '../../contexts/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon

export const ThemeToggleButton = () => {
    // 1. Context에서 상태와 함수를 가져온다. (MUI 사이트도 동일)
    const { mode, toggleTheme } = useThemeContext();

    return (
        // 2. Tooltip으로 사용자에게 정보를 제공한다. (MUI 사이트도 동일)
        <Tooltip title={mode === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}>
            {/* 3. IconButton으로 클릭 이벤트를 처리한다. (MUI 사이트도 동일) */}
            <IconButton onClick={toggleTheme} color="inherit">
                {/* 4. 현재 모드에 따라 다른 아이콘을 보여준다. (MUI 사이트도 동일) */}
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Tooltip>
    );
};