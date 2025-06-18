// src/pages/CheckboxPage.tsx
import * as React from 'react';
// DsCheckboxProps를 사용하지 않으므로 아래 줄에서 제거합니다.
import DsCheckbox from '../components/input/DsCheckbox'; // DsCheckbox 컴포넌트 경로
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ... 나머지 코드는 동일 ...

export default function CheckboxPage() {
    // 첫 번째 체크박스 상태 관리
    const [isChecked1, setIsChecked1] = React.useState<boolean>(false);
    // 두 번째 체크박스 상태 (기본값 true, 비활성화)
    const [isChecked2, setIsChecked2] = React.useState<boolean>(true);

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsChecked1(checked);
        console.log('Checkbox 1 new state:', checked);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        // 이 체크박스는 비활성화되어 있으므로, 실제로는 호출되지 않아야 합니다.
        setIsChecked2(checked);
        console.log('Checkbox 2 new state:', checked);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Checkbox Page
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Basic Checkbox
            </Typography>
            <DsCheckbox
                label="동의합니다 (Option 1)"
                checked={isChecked1}
                onChange={handleChange1}
                id="checkbox-option-1"
                name="agreement"
                color="primary"
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {isChecked1 ? 'Yes' : 'No'}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Disabled Checkbox (Checked by default)
            </Typography>
            <DsCheckbox
                label="이메일 수신 동의 (Option 2 - Disabled)"
                checked={isChecked2}
                onChange={handleChange2} // 비활성화 상태이므로 이 핸들러는 호출되지 않습니다.
                disabled={true}
                id="checkbox-option-2"
                name="emailSubscription"
                color="secondary"
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Checkbox without Label
            </Typography>
            <DsCheckbox
                checked={false} // 예시로 false로 설정
                onChange={(event, checked) => console.log('Checkbox 3 (no label) new state:', checked)}
                id="checkbox-option-3"
                aria-label="Standalone checkbox" // 라벨이 없을 경우 접근성을 위해 aria-label 제공
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Small Size Checkbox
            </Typography>
            <DsCheckbox
                label="작은 크기 (Small Size)"
                checked={true} // 예시로 true로 설정
                onChange={(event, checked) => console.log('Checkbox 4 (small) new state:', checked)}
                id="checkbox-option-4"
                size="small"
            />
        </Box>
    );
}