export const setUser = (user, token) => {
    return dispatch => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
  
      dispatch({
        type: 'SET_USER',
        payload: { user, token }
      });
    };
  };