export const UPDATE_CODE = "UPDATE_CODE";
export const REMOVE_CODE = "REMOVE_CODE";

export const updateCode = code => ({
  type: UPDATE_CODE,
  code
});
export const removeCode = id => ({
  type: REMOVE_CODE,
  id
});
