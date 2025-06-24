// src/components/layout/DsGrid.tsx

import React from 'react';
// MUI v7의 Grid와 그 타입을 정확히 가져옵니다.
import Grid, { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// 이 스타일 컴포넌트는 그대로 유지합니다.
export const DsGridItemStyled = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// MUI v7의 GridProps를 직접 확장하여 모든 prop을 완벽하게 상속받습니다.
export interface DsGridProps extends GridProps {}

// forwardRef를 사용하여 ref와 모든 props를 내부의 MUI Grid로 전달합니다.
const DsGrid = React.forwardRef<React.ElementRef<typeof Grid>, DsGridProps>(
    (props, ref) => {
        return <Grid ref={ref} {...props} />;
    }
);

DsGrid.displayName = 'DsGrid';

export default DsGrid;