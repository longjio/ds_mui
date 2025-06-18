import * as React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField'; // TextField 임포트
// TextField에 필요한 props를 정의합니다.
// MUI의 TextFieldProps를 확장하여 필요한 props를 추가하거나 Omit으로 제외할 수 있습니다.
export interface DsTextFieldProps extends Omit<TextFieldProps, 'variant'> {
    // label, value, onChange 등은 TextFieldProps에 이미 포함되어 있습니다.
    // DsTextField만의 고유한 variant를 사용하거나,
    // 외부에서 variant를 받지 않도록 Omit 할 수 있습니다.
    // 필요에 따라 추가적인 props를 정의할 수 있습니다.
}

export function DsTextField({
                                label,
                                value,
                                onChange,
                                id = 'ds-text-field', // 기본 id 변경
                                name = 'text-field',  // 기본 name 변경
                                ...rest // 나머지 TextFieldProps를 받습니다.
                            }: DsTextFieldProps) {
    return (
        <TextField
            id={id}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            variant="outlined" // 기본 variant 설정 (예: outlined, filled, standard)
            {...rest} // 나머지 props 전달 (예: disabled, error, helperText, fullWidth 등)
        />
    );
}