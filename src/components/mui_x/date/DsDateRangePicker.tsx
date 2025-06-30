import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Popover,
    TextField,
    Typography,
    Stack,
    Button,
    InputAdornment,
    IconButton,
    SxProps,
    Theme,
    GlobalStyles,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// [수정 1] DatePickerToolbarProps 타입을 import 합니다.
import { StaticDatePicker, PickersDay, PickersDayProps, DatePickerToolbarProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// dayjs의 로케일을 한국어로 설정합니다.
dayjs.locale('ko');

/**
 * DsDateRangePicker 컴포넌트의 Props 인터페이스
 */
interface DsDateRangePickerProps {
    label?: string;
    initialStartDate?: Dayjs | null;
    initialEndDate?: Dayjs | null;
    onChange?: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

/**
 * 달력 상단의 헤더를 커스텀 렌더링하는 컴포넌트
 * [수정 2] Props 타입을 DatePickerToolbarProps와 커스텀 value prop을 모두 포함하도록 변경합니다.
 */
function CustomPickerHeader(props: DatePickerToolbarProps & { value: Dayjs | null }) {
    const { value } = props;
    return (
        <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', py: 1 }}>
            {value ? value.format('YYYY년 M월') : ''}
        </Typography>
    );
}

/**
 * 날짜 범위 스타일을 적용하기 위한 커스텀 Day 렌더링 함수를 생성하는 고차 함수
 * @param selectedStart 선택된 시작일
 * @param selectedEnd 선택된 종료일
 * @returns 커스텀 PickersDay 컴포넌트
 */
function createRangePickersDay(selectedStart: Dayjs | null, selectedEnd: Dayjs | null) {
    // [수정 3] Props 타입과 반환 타입을 수정합니다.
    return function RangePickersDay(props: PickersDayProps): React.ReactElement {
        const { day, outsideCurrentMonth, ...other } = props;

        const isStart = selectedStart && day.isSame(selectedStart, 'day');
        const isEnd = selectedEnd && day.isSame(selectedEnd, 'day');
        const isBetween =
            selectedStart &&
            selectedEnd &&
            day.isAfter(selectedStart, 'day') &&
            day.isBefore(selectedEnd, 'day');

        const isSelected = isStart || isEnd;

        const wrapperStyle: SxProps<Theme> = {
            backgroundColor: isBetween ? '#f6f6f6' : 'transparent',
            borderTopLeftRadius: isStart ? '50%' : 0,
            borderBottomLeftRadius: isStart ? '50%' : 0,
            borderTopRightRadius: isEnd ? '50%' : 0,
            borderBottomRightRadius: isEnd ? '50%' : 0,
            width: 40,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        const dayStyle: SxProps<Theme> = {
            ...(isSelected && {
                backgroundColor: '#2e3a50',
                color: '#fff',
                borderRadius: '50%',
                width: 36,
                height: 36,
            }),
            ...(isBetween && {
                color: '#000',
            }),
        };

        return (
            <Box sx={wrapperStyle}>
                <PickersDay
                    day={day}
                    outsideCurrentMonth={outsideCurrentMonth}
                    {...other}
                    sx={dayStyle}
                />
            </Box>
        );
    };
}

/**
 * 두 개의 달력을 사용하여 날짜 범위를 선택하는 커스텀 Date Range Picker 컴포넌트
 */
const DsDateRangePicker: React.FC<DsDateRangePickerProps> = ({
                                                                 label = "날짜 범위 선택",
                                                                 initialStartDate = null,
                                                                 initialEndDate = null,
                                                                 onChange,
                                                             }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [tempStartDate, setTempStartDate] = useState<Dayjs | null>(initialStartDate);
    const [tempEndDate, setTempEndDate] = useState<Dayjs | null>(initialEndDate);
    const [leftCalendarMonth, setLeftCalendarMonth] = useState<Dayjs>(initialStartDate || dayjs());

    // Popover가 열릴 때마다 부모로부터 받은 초기값으로 임시 상태를 리셋합니다.
    useEffect(() => {
        if (anchorEl) {
            setTempStartDate(initialStartDate);
            setTempEndDate(initialEndDate);
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

    const handleDateChange = (newValue: Dayjs | null) => {
        // 시작일과 종료일이 모두 선택된 상태에서 다시 선택하는 경우, 새로 시작
        if (tempStartDate && tempEndDate) {
            setTempStartDate(newValue);
            setTempEndDate(null);
            return;
        }

        // 시작일이 없는 경우, 시작일로 설정
        if (!tempStartDate) {
            setTempStartDate(newValue);
            return;
        }

        // 시작일만 있는 경우, 종료일로 설정
        if (tempStartDate && !tempEndDate) {
            // 만약 새로 선택한 날짜가 시작일보다 이전이면, 두 날짜를 교체
            if (newValue && newValue.isBefore(tempStartDate, 'day')) {
                setTempEndDate(tempStartDate);
                setTempStartDate(newValue);
            } else {
                setTempEndDate(newValue);
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'date-range-popover' : undefined;

    const displayValue = useMemo(() => {
        if (initialStartDate && initialEndDate) {
            return `${initialStartDate.format('YYYY.MM.DD')} ~ ${initialEndDate.format('YYYY.MM.DD')}`;
        }
        return '';
    }, [initialStartDate, initialEndDate]);

    const RangeDay = useMemo(() => createRangePickersDay(tempStartDate, tempEndDate), [tempStartDate, tempEndDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            {/* 요일 셀(월,화,수...)의 정렬을 날짜 셀과 맞추기 위한 글로벌 스타일 */}
            <GlobalStyles styles={{
                '.MuiDayCalendar-weekDayLabel': {
                    width: 40, // PickersDay의 wrapper Box 너비와 맞춤
                    height: 36,
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }} />

            <TextField
                fullWidth
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
                                <CalendarMonthIcon />
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
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Box>
                            <StaticDatePicker
                                value={tempStartDate}
                                onChange={handleDateChange}
                                onMonthChange={(newMonth) => setLeftCalendarMonth(newMonth)}
                                slots={{
                                    actionBar: () => null, // 액션바 제거
                                    toolbar: CustomPickerHeader,
                                    day: RangeDay,
                                }}
                                slotProps={{
                                    // [수정 4] 'as any' 타입 단언을 제거합니다.
                                    toolbar: { value: leftCalendarMonth },
                                }}
                                referenceDate={leftCalendarMonth}
                            />
                        </Box>
                        <Box>
                            <StaticDatePicker
                                value={tempEndDate}
                                onChange={handleDateChange}
                                // 오른쪽 달력은 왼쪽 달력보다 1달 뒤를 보여줌
                                referenceDate={leftCalendarMonth.add(1, 'month')}
                                slots={{
                                    actionBar: () => null, // 액션바 제거
                                    toolbar: CustomPickerHeader,
                                    day: RangeDay,
                                }}
                                slotProps={{
                                    // [수정 5] 'as any' 타입 단언을 제거합니다.
                                    toolbar: { value: leftCalendarMonth.add(1, 'month') },
                                }}
                            />
                        </Box>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
                        <Button onClick={handleCancel}>취소</Button>
                        <Button variant="contained" onClick={handleConfirm}>확인</Button>
                    </Stack>
                </Box>
            </Popover>
        </LocalizationProvider>
    );
};

export default DsDateRangePicker;