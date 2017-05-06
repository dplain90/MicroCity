export const UPDATE_CODE = "UPDATE_CODE";
export const REMOVE_CODE = "REMOVE_CODE";
export const RECEIVE_ARG = "RECEIVE_ARG";

export const updateCode = code => ({
  type: UPDATE_CODE,
  code
});
export const removeCode = id => ({
  type: REMOVE_CODE,
  id
});

export const addArg = (id, arg) => ({
  type: RECEIVE_ARG,
  id: id,
  arg: arg
});
