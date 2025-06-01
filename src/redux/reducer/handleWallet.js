// Retrieve initial wallet state from localStorage if available
const getInitialWalletState = () => {
  const storedWallet = localStorage.getItem("wallet");
  if (storedWallet) {
    try {
      return JSON.parse(storedWallet);
    } catch {
      return {
        connected: false,
        address: null,
        network: null,
      };
    }
  } else {
    return {
      connected: false,
      address: null,
      network: null,
    };
  }
};

const handleWallet = (state = getInitialWalletState(), action) => {
  switch (action.type) {
    case "CONNECT_WALLET":
      const connectState = {
        connected: true,
        address: action.payload.address,
        network: action.payload.network,
      };
      localStorage.setItem("wallet", JSON.stringify(connectState));
      return connectState;

    case "DISCONNECT_WALLET":
      const disconnectState = {
        connected: false,
        address: null,
        network: null,
      };
      localStorage.setItem("wallet", JSON.stringify(disconnectState));
      return disconnectState;

    case "NETWORK_CHANGED":
      const networkChangedState = {
        ...state,
        network: action.payload.network,
      };
      localStorage.setItem("wallet", JSON.stringify(networkChangedState));
      return networkChangedState;

    default:
      return state;
  }
};

export default handleWallet;
