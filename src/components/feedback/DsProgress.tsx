import React from 'react';
import {
    Box,
    CircularProgress,
    LinearProgress,
    Typography,
    CircularProgressProps,
    LinearProgressProps,
} from '@mui/material';

// Circular와 Linear의 공통 Props와 우리만의 커스텀 Props를 결합합니다.
interface DsProgressProps extends Omit<CircularProgressProps & LinearProgressProps, 'variant'> {
    /**
     * 프로그레스의 모양을 결정합니다.
     * @default 'circular'
     */
    variant?: 'circular' | 'linear';
    /**
     * `true`일 경우, determinate 프로그레스 옆에 퍼센트 라벨을 표시합니다.
     * @default false
     */
    withLabel?: boolean;
}

/**
 * 작업의 진행 상태를 시각적으로 나타내는 재사용 가능한 컴포넌트입니다.
 * 원형(circular) 및 선형(linear) 스타일과 라벨 표시 여부를 선택할 수 있습니다.
 */
const DsProgress: React.FC<DsProgressProps> = ({
                                                   variant = 'circular',
                                                   withLabel = false,
                                                   value = 0, // withLabel 사용 시 value가 필요하므로 기본값 설정
                                                   ...props
                                               }) => {
    if (variant === 'linear') {
        if (withLabel) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={value} {...props} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(
                            value,
                        )}%`}</Typography>
                    </Box>
                </Box>
            );
        }
        return <LinearProgress value={value} {...props} />;
    }

    // Circular (default)
    if (withLabel) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={value} {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >{`${Math.round(value)}%`}</Typography>
                </Box>
            </Box>
        );
    }
    return <CircularProgress value={value} {...props} />;
};

export default DsProgress;