// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// Wallet connect action
export const connectWallet = (address, network) => {
    return {
        type: "CONNECT_WALLET",
        payload: { address, network }
    }
}

// Wallet disconnect action
export const disconnectWallet = () => {
    return {
        type: "DISCONNECT_WALLET"
    }
}

// Network changed action
export const networkChanged = (network) => {
    return {
        type: "NETWORK_CHANGED",
        payload: { network }
    }
}

// Transaction lifecycle actions
export const transactionPending = () => {
    return {
        type: "TRANSACTION_PENDING"
    }
}

export const transactionConfirmed = () => {
    return {
        type: "TRANSACTION_CONFIRMED"
    }
}

export const transactionSuccess = () => {
    return {
        type: "TRANSACTION_SUCCESS"
    }
}

export const transactionFailed = () => {
    return {
        type: "TRANSACTION_FAILED"
    }
}
