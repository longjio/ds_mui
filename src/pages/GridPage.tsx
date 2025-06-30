// src/pages/DsGridPage.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DsGrid, { DsGridItemStyled } from '../components/layout/DsGrid';

const DsGridPage = () => {
    return (
        // Container의 maxWidth 제한을 비활성화하여 전체 너비를 사용하도록 설정
        <Container maxWidth={false}>
            <Typography variant="h1" component="h1" gutterBottom>
                Grid
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Basic DsGrid 예제 (MUI Grid 직접 사용과 동일)
                </Typography>
                {/* DsGrid를 container로 사용 */}
                <DsGrid container spacing={2}>
                    {/* DsGrid를 item으로 사용하고, xs, sm, md 등의 prop 전달 */}
                    <DsGrid size={8}>
                        <DsGridItemStyled>xs=8</DsGridItemStyled>
                    </DsGrid>
                    <DsGrid size={4}>
                        <DsGridItemStyled>xs=4</DsGridItemStyled>
                    </DsGrid>
                    <DsGrid size={4}>
                        <DsGridItemStyled>xs=4</DsGridItemStyled>
                    </DsGrid>
                    <DsGrid size={8}>
                        <DsGridItemStyled>xs=8</DsGridItemStyled>
                    </DsGrid>
                </DsGrid>
            </Box>

            <Box sx={{ flexGrow: 1, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    다양한 크기의 DsGrid 아이템
                </Typography>
                <DsGrid container spacing={3}>
                    <DsGrid size="grow">
                        <DsGridItemStyled>size=grow</DsGridItemStyled>
                    </DsGrid>
                    <DsGrid size={6}>
                        <DsGridItemStyled>size=6</DsGridItemStyled>
                    </DsGrid>
                    <DsGrid size="grow">
                        <DsGridItemStyled>size=grow</DsGridItemStyled>
                    </DsGrid>
                </DsGrid>
            </Box>
        </Container>
    );
};

export default DsGridPage;