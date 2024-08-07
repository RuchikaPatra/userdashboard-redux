import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUser: null,
    error: null,
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = state.users.find(user => user.id === action.payload);
    },
    removeUser: (state, action) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { selectUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;