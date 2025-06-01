// Initial state for transaction status
const initialState = {
  status: null, // null | 'pending' | 'confirmed' | 'success' | 'failed'
};

const handleTransaction = (state = initialState, action) => {
  switch (action.type) {
    case "TRANSACTION_PENDING":
      return { ...state, status: "pending" };
    case "TRANSACTION_CONFIRMED":
      return { ...state, status: "confirmed" };
    case "TRANSACTION_SUCCESS":
      return { ...state, status: "success" };
    case "TRANSACTION_FAILED":
      return { ...state, status: "failed" };
    default:
      return state;
  }
};

export default handleTransaction;
