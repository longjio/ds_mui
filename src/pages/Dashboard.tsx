// D:/ds_mui/src/pages/Dashboard.tsx

import React from 'react';
import { Paper, Typography, Box, Card, useTheme, Stack } from '@mui/material';
import { People, ListAlt } from '@mui/icons-material';
import { LineChart, RadarChart, Gauge, gaugeClasses, ScatterChart, PieChart } from '@mui/x-charts';
import DsGrid from '../components/layout/DsGrid';

interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

// 대시보드 요약 카드 컴포넌트
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, height: '100%' }}>
        <Box sx={{
            mr: 2,
            p: 1.5,
            borderRadius: '50%',
            backgroundColor: color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </Box>
        <Box>
            <Typography color="text.secondary" gutterBottom>{title}</Typography>
            <Typography variant="h5" component="div">{value}</Typography>
        </Box>
    </Card>
);

/**
 * 메인 화면에 표시될 가상 대시보드 컴포넌트
 */
const Dashboard: React.FC = () => {
    const theme = useTheme();

    // 차트 데이터
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

    // ScatterChart를 위한 데이터셋
    const dataset = [
        { version: 'data-0', a1: 329.39, a2: 391.29, b1: 443.28, b2: 153.9 },
        { version: 'data-1', a1: 96.94, a2: 139.6, b1: 110.5, b2: 217.8 },
        { version: 'data-2', a1: 336.35, a2: 282.34, b1: 175.23, b2: 286.32 },
        { version: 'data-3', a1: 159.44, a2: 384.85, b1: 195.97, b2: 325.12 },
        { version: 'data-4', a1: 188.86, a2: 182.27, b1: 351.77, b2: 144.58 },
        { version: 'data-5', a1: 143.86, a2: 360.22, b1: 43.253, b2: 146.51 },
        { version: 'data-6', a1: 202.02, a2: 209.5, b1: 376.34, b2: 309.69 },
        { version: 'data-7', a1: 384.41, a2: 258.93, b1: 31.514, b2: 236.38 },
        { version: 'data-8', a1: 256.76, a2: 70.571, b1: 231.31, b2: 440.72 },
        { version: 'data-9', a1: 143.79, a2: 419.02, b1: 108.04, b2: 20.29 },
    ];

    return (
        <Stack
            spacing={3}
            sx={(theme) => ({
                padding: theme.spacing(5),
                bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
                minHeight: '100%',
            })}
        >
            {/* 페이지 제목 */}
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* 상단 행 */}
            <DsGrid container spacing={3}>
                {/* Gauge Chart */}
                <DsGrid size={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Server Load
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Gauge
                                width={180}
                                height={180}
                                value={60}
                                cornerRadius="50%"
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: { fontSize: 40 },
                                    // ✅ [수정] 다른 차트와 색상 통일
                                    [`& .${gaugeClasses.valueArc}`]: { fill: theme.palette.charts.main },
                                    [`& .${gaugeClasses.referenceArc}`]: { fill: theme.palette.divider },
                                })}
                            />
                        </Box>
                    </Paper>
                </DsGrid>

                {/* PieChart */}
                <DsGrid size={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Traffic Source
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            // ✅ [수정] 각 데이터에 테마 색상 적용
                                            { id: 0, value: 40, label: 'Search', color: theme.palette.charts.main },
                                            { id: 1, value: 35, label: 'Social', color: theme.palette.charts.secondary },
                                            { id: 2, value: 25, label: 'Direct', color: theme.palette.info.main },
                                        ],
                                        innerRadius: 40,
                                        outerRadius: 80,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                    },
                                ]}
                                height={180}
                                legend={{ hidden: true }} // 범례 숨기기
                                margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
                            />
                        </Box>
                    </Paper>
                </DsGrid>

                {/* RadarChart */}
                <DsGrid size={4}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Performance Radar
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <RadarChart
                                height={180}
                                series={[{
                                    data: [120, 98, 86, 99, 85, 65],
                                    label: 'Lisa',
                                    color: theme.palette.charts.main,
                                    area: true,
                                }]}
                                radar={{
                                    metrics: [
                                        { name: 'Math', max: 120 }, { name: 'Chinese', max: 120 },
                                        { name: 'English', max: 120 }, { name: 'Geography', max: 120 },
                                        { name: 'Physics', max: 120 }, { name: 'History', max: 120 },
                                    ],
                                }}
                                grid={{ stroke: theme.palette.charts.axis }}
                                margin={{ top: 25, bottom: 25, left: 25, right: 25 }}
                                legend={{ hidden: true }}
                            />
                        </Box>
                    </Paper>
                </DsGrid>
            </DsGrid>

            {/* 하단 행 */}
            <DsGrid container spacing={3}>
                {/* Line Chart */}
                <DsGrid size={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Sales Overview
                        </Typography>
                        <LineChart
                            height={300}
                            series={[
                                { data: pData, label: 'pv', yAxisId: 'leftAxisId', color: theme.palette.charts.main },
                                { data: uData, label: 'uv', yAxisId: 'rightAxisId', color: theme.palette.charts.secondary },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels, stroke: theme.palette.charts.axis }]}
                            yAxis={[
                                { id: 'leftAxisId', stroke: theme.palette.charts.axis },
                                { id: 'rightAxisId', position: 'right', stroke: theme.palette.charts.axis },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 40 }}
                        />
                    </Paper>
                </DsGrid>

                {/* ScatterChart */}
                <DsGrid size={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Data Distribution
                        </Typography>
                        <ScatterChart
                            height={300}
                            dataset={dataset}
                            series={[
                                {
                                    label: 'Series A',
                                    datasetKeys: {
                                        id: 'version',
                                        x: 'a1',
                                        y: 'a2',
                                    },
                                    color: theme.palette.charts.main
                                },
                                {
                                    label: 'Series B',
                                    datasetKeys: {
                                        id: 'version',
                                        x: 'b1',
                                        y: 'b2',
                                    },
                                    color: theme.palette.charts.secondary
                                },
                            ]}
                            xAxis={[{ stroke: theme.palette.charts.axis }]}
                            yAxis={[{ label: 'rainfall (mm)', stroke: theme.palette.charts.axis, width: 60 }]}
                        />
                    </Paper>
                </DsGrid>
            </DsGrid>
        </Stack>
    );
};

export default Dashboard;