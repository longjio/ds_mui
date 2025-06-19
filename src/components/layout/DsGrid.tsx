// src/components/layout/DsGrid.tsx
import React from 'react';
import Grid, { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// BasicGrid 예제의 Item 스타일을 DsGrid 내부 또는 외부에 둘 수 있습니다.
// 여기서는 DsGrid와 함께 사용될 가능성이 높으므로 내부에 Item을 정의하거나,
// 혹은 별도의 스타일 파일로 분리 후 가져올 수 있습니다.
// 우선은 DsGrid 파일 내에 Item을 정의하는 예시입니다.
export const DsGridItemStyled = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// DsGridProps는 MUI의 GridProps를 그대로 확장합니다.
// 특별히 추가하거나 변경할 prop이 없다면 이대로 사용하거나,
// GridProps를 직접 사용해도 무방합니다.
export interface DsGridProps extends GridProps {}

const DsGrid: React.FC<DsGridProps> = (props) => {
    // props를 그대로 MUI Grid에 전달합니다.
    return <Grid {...props} />;
};

export default DsGrid;