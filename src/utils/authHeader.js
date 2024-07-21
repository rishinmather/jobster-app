const authHeader = (thunkAPI) => {
  return {
    headers: {
      Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};
