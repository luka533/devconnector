import { removeAlert, setAlert } from "../state/alert/alertSlice";

export const showAlert = (dispatch, msg, type = "success") => {
  const id = crypto.randomUUID();

  dispatch(setAlert({ msg, type, id }));

  setTimeout(() => dispatch(removeAlert(id)), 5000);
};
