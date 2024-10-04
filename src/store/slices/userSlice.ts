import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployees, fetchMyTasks, fetchUser, userLogin, userSignup } from "../actions/userActions";


const initialState = {

    user: {
        loading: false,
        data: null,
        error: null as string | null
    },
    addModal: {
        isOpen: false
    },
    editModal: {
        isOpen: false,
        currentTask: null
    },
    selectedDate: null,
    employees: {
        loading: false,
        data: null,
        error: null as string | null
    },
    myTasks: {
        loading: false,
        data: null,
        error: null as string | null
    },

}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        handleAddModal: (state, action) => {
            state.addModal.isOpen = action?.payload
        },
        handleEditModal: (state, action) => {
            state.editModal.isOpen = action?.payload?.status
            state.editModal.currentTask = action.payload.task
        },
        handleSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.user.loading = true
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.data = action?.payload;
                state.user.error = null
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action?.error?.message || 'Somthing went wrong'
            })
            .addCase(userLogin.pending, (state) => {
                state.user.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.data = action.payload?.data
                state.user.error = null
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action?.error?.message || 'Something went wrong'
            })
            .addCase(fetchUser.pending, (state) => {
                state.user.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.data = action?.payload?.data;
                state.user.error = null
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action?.error?.message || 'Something went wrong';
                state.user.data = null;
            })
            .addCase(fetchEmployees.pending, (state) => {
                state.employees.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.employees.loading = false;
                state.employees.data = action.payload.data;
                state.employees.error = null
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.employees.loading = false;
                state.employees.error = action.error.message || 'Something went wrong'
            })
            .addCase(fetchMyTasks.pending, (state,) => {
                state.myTasks.loading = true
            })
            .addCase(fetchMyTasks.fulfilled, (state, action) => {
                state.myTasks.loading = false;
                state.myTasks.data = action.payload.data;
                state.myTasks.error = null
            })
            .addCase(fetchMyTasks.rejected, (state, action) => {
                state.myTasks.loading = false;
                state.myTasks.error = action.error.message || 'Something went wrong'
            })
    }
})


export const { handleAddModal, handleSelectedDate, handleEditModal } = userSlice.actions;

export default userSlice.reducer;    