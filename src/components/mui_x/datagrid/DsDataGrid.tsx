// src/components/mui_x/datagrid/DsDataGrid.tsx

import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'; // Import BoxProps for sx
// DataGrid 관련 타입 및 컴포넌트를 임포트합니다.
import { DataGrid, GridColDef, GridRowsProp, DataGridProps as MuiDataGridProps } from '@mui/x-data-grid'; // Renamed to avoid conflict if needed

// DsDataGridProps 인터페이스를 정의합니다.
// MUI의 DataGridProps를 확장하여 DataGrid가 받는 모든 prop을 그대로 받을 수 있게 합니다.
export interface DsDataGridProps extends MuiDataGridProps {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     * This will be applied to the wrapping Box component.
     */
    sx?: BoxProps['sx']; // Explicitly add sx for the Box wrapper
    // 필요하다면 여기에 디자인 시스템에 특화된 prop을 추가할 수 있습니다.
    // 예: defaultHeight?: number; // Box wrapper의 기본 높이를 설정하는 prop
}

export function DsDataGrid({
                               rows,
                               columns,
                               initialState,
                               pageSizeOptions,
                               checkboxSelection,
                               disableRowSelectionOnClick,
                               sx, // Now explicitly typed in DsDataGridProps
                               ...restProps
                           }: DsDataGridProps) {

    const defaultInitialState = initialState ?? {
        pagination: {
            paginationModel: {
                pageSize: 5,
            },
        },
    };

    const defaultPageSizeOptions = pageSizeOptions ?? [5];
    const defaultCheckboxSelection = checkboxSelection ?? true;
    const defaultDisableRowSelectionOnClick = disableRowSelectionOnClick ?? true;

    const defaultBoxSx = { height: 400, width: '100%' };
    const combinedBoxSx = sx ? { ...defaultBoxSx, ...sx } : defaultBoxSx;

    return (
        <Box sx={combinedBoxSx}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={defaultInitialState}
                pageSizeOptions={defaultPageSizeOptions}
                checkboxSelection={defaultCheckboxSelection}
                disableRowSelectionOnClick={defaultDisableRowSelectionOnClick}
                {...restProps} // sx from restProps will be passed to DataGrid if not destructured earlier
            />
        </Box>
    );
}