import { showAlert } from "./showAlert";

export const createAlertHandler =
  (successMsg, errorMsg) =>
  async (arg, { dispatch, queryFulfilled }) => {
    try {
      await queryFulfilled;
      showAlert(dispatch, successMsg);
    } catch (err) {
      showAlert(dispatch, err.error?.data?.message ?? errorMsg, "danger");
    }
  };
