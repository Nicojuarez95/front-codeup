import { createSlice } from '@reduxjs/toolkit';

// Inicializa el estado con datos del localStorage, si están disponibles
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

// Exporta las acciones
export const { setUser, clearUser } = userSlice.actions;

// Exporta el reducer para la configuración del store
export default userSlice.reducer;