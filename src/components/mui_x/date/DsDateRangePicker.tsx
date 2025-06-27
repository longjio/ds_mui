import React, { useState, useEffect } from 'react';
import { Box, Popover, TextField, Typography, Stack, Button, InputAdornment, IconButton, SxProps, Theme } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { CalendarIcon } from '@mui/x-date-pickers/icons';

dayjs.locale('ko');

interface DsDateRangePickerProps {
    label?: string;
    initialStartDate?: Dayjs | null;
    initialEndDate?: Dayjs | null;
    onChange?: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

// 커스텀 헤더
function CustomPickerHeader(props: any) {
    const { value } = props;
    return (
        <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', py: 1 }}>
            {value ? dayjs(value).format('M월 D일') : ''}
        </Typography>
    );
}

// 범위 하이라이트 Day 컴포넌트 팩토리
function createRangePickersDay(selectedStart: Dayjs | null, selectedEnd: Dayjs | null) {
    return function RangePickersDay(props: PickersDayProps) {
        const { day, outsideCurrentMonth, ...other } = props;

        const isStart = selectedStart && day.isSame(selectedStart, 'day');
        const isEnd = selectedEnd && day.isSame(selectedEnd, 'day');
        const isBetween =
            selectedStart &&
            selectedEnd &&
            day.isAfter(selectedStart, 'day') &&
            day.isBefore(selectedEnd, 'day');

        const isHighlighted = isStart || isEnd || isBetween;

        const sx: SxProps<Theme> = {
            // PickersDay ROOT styles:
            // 1. 간격 제거 및 중앙 정렬 (width/height는 MUI 기본 레이아웃에 맡김)
            margin: 0,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent', // 루트 배경은 투명
            color: 'inherit', // 기본 텍스트 색상

            // 2. 내부 MuiPickersDay-dayWithMargin 요소의 배경을 투명하게 만들어 루트 스타일이 보이도록 함
            '& .MuiPickersDay-dayWithMargin': {
                backgroundColor: 'transparent', // 내부 원형 배경 투명하게
                color: 'inherit', // 텍스트 색상 상속
                // 이외의 width, height, borderRadius 등은 기본값을 유지하여 PickersDay 루트의 스타일과 충돌하지 않도록 합니다.
            },
            // 실제 날짜 숫자를 감싸는 span (MuiPickersDay-day)도 중앙 정렬을 위해 flexbox 적용
            '& .MuiPickersDay-day': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },

            // 3. 조건부 스타일을 루트 요소에 직접 적용
            ...(isHighlighted && !outsideCurrentMonth && {
                // 모든 하이라이트된 날짜의 공통 스타일
                backgroundColor: '#1976d2', // 솔리드 primary 색상
                color: 'white', // 흰색 텍스트
                borderRadius: 0, // 하이라이트된 범위는 기본적으로 사각형

                // 시작일과 종료일 사이의 날짜 (반투명 배경)
                ...(isBetween && {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)', // 사용자 제공 반투명 색상
                    color: 'inherit', // 반투명 배경에는 기본 텍스트 색상
                }),

                // 시작일의 둥근 모서리 적용
                ...(isStart && {
                    borderTopLeftRadius: '50%',
                    borderBottomLeftRadius: '50%',
                    // 단일 날짜 선택 시 완벽한 원이 되도록 오른쪽도 둥글게
                    borderTopRightRadius: isEnd ? '50%' : '0',
                    borderBottomRightRadius: isEnd ? '50%' : '0',
                }),

                // 종료일의 둥근 모서리 적용 (단일 선택이 아닐 경우)
                ...(isEnd && !isStart && {
                    borderTopRightRadius: '50%',
                    borderBottomRightRadius: '50%',
                }),

                // 하이라이트된 날짜의 호버/포커스 효과
                '&:hover, &:focus': {
                    backgroundColor: '#1565c0', // Darker primary on hover
                },
            }),

            // 4. 현재 월 외의 날짜 스타일 (모든 하이라이트 덮어쓰기)
            ...(outsideCurrentMonth && {
                backgroundColor: 'transparent',
                color: 'text.disabled', // Muted text color
                '&:hover, &:focus': {
                    backgroundColor: 'transparent',
                },
            }),
        };

        return (
            <PickersDay
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
                {...other}
                sx={sx}
            />
        );
    };
}


const DsDateRangePicker: React.FC<DsDateRangePickerProps> = ({
                                                                 label = "날짜 범위 선택",
                                                                 initialStartDate = null,
                                                                 initialEndDate = null,
                                                                 onChange,
                                                             }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [tempStartDate, setTempStartDate] = useState<Dayjs | null>(initialStartDate);
    const [tempEndDate, setTempEndDate] = useState<Dayjs | null>(initialEndDate);
    // 왼쪽 달력의 표시 월을 제어하기 위한 상태
    const [leftCalendarMonth, setLeftCalendarMonth] = useState<Dayjs>(initialStartDate || dayjs());

    useEffect(() => {
        if (anchorEl) {
            setTempStartDate(initialStartDate);
            setTempEndDate(initialEndDate);
            // 팝업이 열릴 때 왼쪽 달력의 표시 월 초기화
            setLeftCalendarMonth(initialStartDate || dayjs());
        }
    }, [anchorEl, initialStartDate, initialEndDate]);


    const handleClick = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLDivElement);
    };

    const handleConfirm = () => {
        setAnchorEl(null);
        if (onChange) {
            onChange(tempStartDate, tempEndDate);
        }
    };

    const handleCancel = () => {
        setAnchorEl(null);
    };

    // 통합된 날짜 변경 핸들러
    const handleDateChange = (newValue: Dayjs | null) => {
        // Case 1: 시작일과 종료일이 모두 선택된 경우, 새로 선택하고 초기화
        if (tempStartDate && tempEndDate) {
            setTempStartDate(newValue);
            setTempEndDate(null);
            return;
        }

        // Case 2: 시작일이 아직 없는 경우, 시작일로 설정
        if (!tempStartDate) {
            setTempStartDate(newValue);
            return;
        }

        // Case 3: 시작일은 있지만 종료일이 없는 경우
        if (tempStartDate && !tempEndDate) {
            // 새로 선택한 날짜가 시작일보다 이전이면, 두 날짜를 교체
            if (newValue && newValue.isBefore(tempStartDate, 'day')) {
                setTempEndDate(tempStartDate);
                setTempStartDate(newValue);
            } else {
                // 그렇지 않으면 종료일로 설정
                setTempEndDate(newValue);
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'date-range-popover' : undefined;

    const displayValue = (initialStartDate && initialEndDate)
        ? `${initialStartDate.locale('ko').format('M월 D일')} ~ ${initialEndDate.locale('ko').format('M월 D일')}`
        : (initialStartDate
                ? `${initialStartDate.locale('ko').format('M월 D일')} ~`
                : (initialEndDate
                    ? `~ ${initialEndDate.locale('ko').format('M월 D일')}`
                    : '')
        );

    const RangeDay = createRangePickersDay(tempStartDate, tempEndDate);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <TextField
                label={label}
                value={displayValue}
                onClick={handleClick}
                sx={{ cursor: 'pointer' }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="날짜 범위 선택 열기"
                                onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
                                edge="end"
                            >
                                <CalendarIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleCancel}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>시작 날짜</Typography>
                            <StaticDatePicker
                                value={tempStartDate}
                                onChange={handleDateChange}
                                onMonthChange={(newMonth) => setLeftCalendarMonth(newMonth)}
                                slots={{
                                    actionBar: () => null,
                                    toolbar: CustomPickerHeader,
                                    day: RangeDay,
                                }}
                                // referenceDate를 StaticDatePicker에 직접 전달
                                referenceDate={leftCalendarMonth}
                                localeText={{ calendarWeekNumberHeaderText: '주' }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>종료 날짜</Typography>
                            <StaticDatePicker
                                value={tempEndDate}
                                onChange={handleDateChange}
                                onMonthChange={(newMonth) => setLeftCalendarMonth(newMonth.subtract(1, 'month'))}
                                slots={{
                                    actionBar: () => null,
                                    toolbar: CustomPickerHeader,
                                    day: RangeDay,
                                }}
                                // referenceDate를 StaticDatePicker에 직접 전달
                                referenceDate={leftCalendarMonth.add(1, 'month')}
                                localeText={{ calendarWeekNumberHeaderText: '주' }}
                            />
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                            color="inherit"
                        >
                            취소
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            variant="contained"
                            disabled={!tempStartDate || !tempEndDate}
                        >
                            선택 완료
                        </Button>
                    </Stack>
                </Box>
            </Popover>
        </LocalizationProvider>
    );
};

export default DsDateRangePicker;