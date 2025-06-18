// src/pages/DataGridPage.tsx

import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { DsDataGrid } from '../components/mui_x/datagrid/DsDataGrid';
// Import GridValueGetterParams if you need more specific typing for valueGetter params,
// but often, typing GridColDef with the row type is sufficient.
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// 1. Define an interface for your row data
interface RowData {
    id: number;
    firstName: string | null; // Allow null if firstName can be missing
    lastName: string;
    age: number | null;      // Allow null if age can be missing
}

// 2. Use the RowData interface with GridColDef
const columns: GridColDef<RowData>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: '이름 (First name)',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: '성 (Last name)',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: '나이 (Age)',
        type: 'number',
        width: 110,
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'fullName',
        headerName: '전체 이름 (Full name)',
        description: '이 열은 valueGetter를 사용하며 정렬할 수 없습니다.',
        sortable: false,
        width: 180,
        // Now 'params.row' will be correctly typed as RowData
        valueGetter: (params: GridValueGetterParams<RowData>) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

// 3. Use the RowData interface for your rows array for consistency
const rows: RowData[] = [
    { id: 1, lastName: '스노우', firstName: '존', age: 35 },
    { id: 2, lastName: '래니스터', firstName: '세르세이', age: 42 },
    { id: 3, lastName: '래니스터', firstName: '제이미', age: 42 },
    { id: 4, lastName: '스타크', firstName: '아리아', age: 25 },
    { id: 5, lastName: '타르가르옌', firstName: '대너리스', age: null },
    { id: 6, lastName: '멜리산드레', firstName: null, age: 150 },
    { id: 7, lastName: '클리포드', firstName: '페라라', age: 44 },
    { id: 8, lastName: '프란시스', firstName: '로시니', age: 36 },
    { id: 9, lastName: '록시', firstName: '하비', age: 65 },
];

const DataGridPage = () => {
    return (
        <Stack spacing={4} sx={{ p: 3, maxWidth: '1000px', margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                DsDataGrid 컴포넌트 데모 페이지
            </Typography>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    기본 DsDataGrid 예시
                </Typography>
                <DsDataGrid
                    rows={rows}
                    columns={columns}
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    페이지 크기 옵션 변경 및 자동 높이 조절 예시
                </Typography>
                <DsDataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    autoHeight
                    checkboxSelection={false}
                />
            </Box>
        </Stack>
    );
};

export default DataGridPage;