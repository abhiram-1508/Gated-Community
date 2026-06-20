import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const savedUser = JSON.parse(localStorage.getItem('community_user') || 'null');

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data.data;
  } catch (error) {
    if (import.meta.env.VITE_DEMO_MODE !== 'false') {
      const role = credentials.demoRole || 'Resident';
      return {
        accessToken: `demo-${role}`,
        refreshToken: 'demo-refresh',
        user: {
          id: `demo-${role.toLowerCase()}`,
          name: role === 'Resident' ? 'Abhiram Rao' : role === 'Guard' ? 'Ravi Kumar' : role === 'Staff' ? 'Manoj Reddy' : 'Priya Sharma',
          email: credentials.email,
          role,
        },
        demo: true,
      };
    }
    return rejectWithValue(error.response?.data?.message || 'Unable to sign in');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: savedUser, token: localStorage.getItem('access_token'), loading: false, error: null },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('community_user');
    },
    switchDemoRole(state, action) {
      const names = { Resident: 'Abhiram Rao', Admin: 'Priya Sharma', Guard: 'Ravi Kumar', Staff: 'Manoj Reddy' };
      state.user = { ...state.user, role: action.payload, name: names[action.payload] };
      localStorage.setItem('community_user', JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => builder
    .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      localStorage.setItem('access_token', action.payload.accessToken);
      localStorage.setItem('refresh_token', action.payload.refreshToken);
      localStorage.setItem('community_user', JSON.stringify(action.payload.user));
    })
    .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; }),
});

export const { logout, switchDemoRole } = authSlice.actions;
export default authSlice.reducer;
