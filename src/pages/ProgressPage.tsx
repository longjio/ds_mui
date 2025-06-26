import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import DsProgress from '../components/feedback/DsProgress';

const ProgressPage = () => {
    // Determinate (확정적) 프로그레스 예제를 위한 상태
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Progress
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Progress indicator(진행 표시기)는 지정되지 않은 대기 시간을 알리거나 작업의 진행률을 표시합니다.
            </Typography>

            {/* --- 예제 1: 원형 프로그레스 (Circular) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Circular Progress
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <DsProgress />
                <DsProgress color="secondary" />
                <DsProgress color="success" />
                <DsProgress color="error" />
            </Stack>

            {/* --- 예제 2: 확정적 원형 프로그레스 (Circular Determinate) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Circular Determinate
            </Typography>
            <Stack spacing={2} direction="row">
                <DsProgress variant="circular" value={progress} />
                <DsProgress variant="circular" withLabel value={progress} color="success" />
            </Stack>

            {/* --- 예제 3: 선형 프로그레스 (Linear) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Linear Progress
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <DsProgress variant="linear" />
            </Stack>

            {/* --- 예제 4: 확정적 선형 프로그레스 (Linear Determinate) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Linear Determinate
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <DsProgress variant="linear" value={progress} />
                <DsProgress variant="linear" withLabel value={progress} color="success" />
            </Stack>

            {/* --- 예제 5: 커스텀 크기 및 두께 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Custom Size & Thickness
            </Typography>
            <Stack spacing={2} direction="row" alignItems="center">
                <DsProgress size={60} />
                <DsProgress size={80} thickness={5} color="secondary" />
                <DsProgress variant="circular" withLabel value={75} size={100} thickness={2} />
            </Stack>
        </Box>
    );
};

export default ProgressPage;