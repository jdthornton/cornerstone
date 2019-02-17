export const UPDATE_INPUT = 'UPDATE_INPUT';

export const handleInputChange = payload => ({type: UPDATE_INPUT, payload})

const reducer = (prevState = '', { type, payload }) =>
  type === UPDATE_INPUT ? payload : prevState;

export default reducer;
