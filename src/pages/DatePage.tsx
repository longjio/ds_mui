
import React, { useState } from 'react';
import { Dayjs } from 'dayjs';
import { DsDatePicker } from '../components/mui_x/date/DsDatePicker'; // 우리가 만든 컴포넌트 임포트

export function SomePage() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    return (
        <div>
            <h1>컴포넌트 테스트 페이지</h1>
            <DsDatePicker
                label="시작일"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
            />
        </div>
    );
}