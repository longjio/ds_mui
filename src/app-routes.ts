// src/app-routes.ts

// 메뉴 타입 정의는 그대로 유지
export interface MenuItem {
    text: string;
    path?: string;
    id: string;
    children?: MenuItem[];
}

export interface MenuGroup {
    title: string;
    id: string;
    items: MenuItem[];
}

// 메뉴 구조 정의 (이곳이 메뉴의 유일한 출처)
// 페이지 컴포넌트 맵은 여기서 제거합니다.
export const menuGroups: MenuGroup[] = [
    {
        title: 'Button',
        id: 'group-button',
        items: [
            { text: 'Button', path: '/button', id: 'item-button' },
            { text: 'ButtonGroup', path: '/button-group', id: 'item-button-group' },
        ],
    },
    {
        title: 'Components',
        id: 'group-components',
        items: [
            {
                text: 'Input',
                id: 'item-input-parent',
                children: [
                    { text: 'Autocomplete', path: '/autocomplete', id: 'item-autocomplete' },
                    { text: 'Textfield', path: '/textfield', id: 'item-textfield' },
                    { text: 'Select', path: '/select', id: 'item-select'},
                    { text: 'Checkbox', path: '/checkbox', id: 'item-checkbox' },
                    { text: 'Radio Group', path: '/radio-group', id: 'item-radio-group' },
                    { text: 'Rating', path: '/rating', id: 'item-rating' },
                    { text: 'Slider', path: '/slider', id: 'item-slider' },
                    { text: 'Switch', path: '/switch', id: 'item-switch' },
                ],
            },
        ],
    },
    {
        title: 'Surface',
        id: 'group-surface',
        items: [
            { text: 'Accordion', path: '/accordion', id: 'item-accordion' },
            { text: 'Appbar', path: '/appbar', id: 'item-appbar' },
            { text: 'Card', path: '/card', id: 'item-card' },
        ],
    },
    {
        title: 'Layout',
        id: 'group-layout',
        items: [
            { text: 'Grid', path: '/grid', id: 'item-grid' },
        ],
    },
    {
        title: 'Foundations',
        id: 'group-foundations',
        items: [
            { text: 'Typography', path: '/typography', id: 'item-typography' },
        ],
    },
    {
        title: 'MUI X',
        id: 'group-mui-x',
        items: [
            { text: 'Data Grid', path: '/data-grid', id: 'item-data-grid' },
        ],
    },
];