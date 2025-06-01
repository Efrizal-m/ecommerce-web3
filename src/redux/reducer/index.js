import handleCart from './handleCart'
import handleWallet from './handleWallet'
import handleTransaction from './handleTransaction'
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleCart,
    handleWallet,
    handleTransaction,
});

export default rootReducers;
