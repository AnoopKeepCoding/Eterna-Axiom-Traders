import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOption, SortDirection, TableFilter } from '@/types/token';

interface TableState {
    filters: {
        [columnId: string]: TableFilter; // Per-column filters (New Pairs, Final Stretch, Migrated)
    };
    globalTimeRange: 'm5' | 'h1' | 'h6' | 'h24';
}

const initialState: TableState = {
    filters: {
        new: { sort: 'age', direction: 'asc', timeRange: 'm5' },
        final: { sort: 'marketCap', direction: 'desc', timeRange: 'm5' },
        migrated: { sort: 'marketCap', direction: 'desc', timeRange: 'm5' },
    },
    globalTimeRange: 'm5',
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setColumnFilter: (
            state,
            action: PayloadAction<{ columnId: string; filter: Partial<TableFilter> }>
        ) => {
            const { columnId, filter } = action.payload;
            if (state.filters[columnId]) {
                state.filters[columnId] = { ...state.filters[columnId], ...filter };
            }
        },
        setGlobalTimeRange: (state, action: PayloadAction<'m5' | 'h1' | 'h6' | 'h24'>) => {
            state.globalTimeRange = action.payload;
        },
    },
});

export const { setColumnFilter, setGlobalTimeRange } = tableSlice.actions;
export default tableSlice.reducer;
