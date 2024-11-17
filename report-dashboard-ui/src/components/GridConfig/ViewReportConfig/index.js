

/**
 * Column definitions for the AG Grid in the ViewReport component.
 */
export const columnDefs = [
    { headerName: 'Stock', field: 'Stock', sortable: true, filter: true, enableRowGroup: true },
    { headerName: 'Date', field: 'Date', sortable: true, filter: true, enableRowGroup: true },
    { headerName: 'Open', field: 'Open', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'High', field: 'High', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Low', field: 'Low', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Close', field: 'Close', sortable: true, filter: 'agNumberColumnFilter' },
    {
        headerName: 'Volume',
        field: 'Volume',
        sortable: true,
        filter: 'agNumberColumnFilter',
        aggFunc: 'sum',
    },
    {
        headerName: 'Price Range',
        field: 'PriceRange',
        valueGetter: (params) => params?.data?.High - params?.data?.Low,
    },
    {
        headerName: 'Price Change',
        field: 'PriceChange',
        valueGetter: (params) => params?.data?.Close - params?.data?.Open,
    },
    {
        headerName: 'Price Change (%)',
        field: 'PriceChangePercentage',
        valueGetter: (params) =>
            ((params?.data?.Close - params?.data?.Open) / params?.data?.Open) * 100,
        cellStyle: (params) => ({ color: params.value >= 0 ? 'green' : 'red' }),
    },
];

/**
 * Default column definition for AG Grid.
 */
export const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
    sortable: true,
    filter: true,
    enableRowGroup: true,
};

/**
 * Auto group column definition for AG Grid.
 */
export const autoGroupColumnDef = {
    headerName: 'Grouped Data',
    minWidth: 300,
    cellRendererParams: {
        suppressCount: true, // Optionally hide count
    },
};
