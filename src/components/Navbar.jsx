import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { connectWallet, disconnectWallet, networkChanged } from '../redux/action'

const Navbar = () => {
    const cartState = useSelector(state => state.handleCart)
    const walletState = useSelector(state => state.handleWallet)
    const transactionState = useSelector(state => state.handleTransaction)
    const dispatch = useDispatch()

    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

    useEffect(() => {
        if (window.ethereum) {
            setIsMetaMaskInstalled(true)

            // Check if already connected
            window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
                if (accounts.length > 0) {
                    const address = accounts[0]
                    window.ethereum.request({ method: 'net_version' }).then(networkId => {
                        dispatch(connectWallet(address, networkId))
                    })
                }
            })

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    dispatch(disconnectWallet())
                } else {
                    const address = accounts[0]
                    dispatch(connectWallet(address, walletState.network))
                }
            })

            // Listen for network changes
            window.ethereum.on('chainChanged', (chainId) => {
                // chainId is in hex, convert to decimal string
                const networkId = parseInt(chainId, 16).toString()
                dispatch(networkChanged(networkId))
            })
        }
    }, [dispatch, walletState.network])

    const handleConnectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install it to connect your wallet.')
            return
        }
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            if (accounts.length > 0) {
                const address = accounts[0]
                const networkId = await window.ethereum.request({ method: 'net_version' })
                dispatch(connectWallet(address, networkId))
            }
        } catch (error) {
            console.error('User rejected wallet connection', error)
        }
    }

    const handleDisconnectWallet = () => {
        dispatch(disconnectWallet())
    }

    const shortenAddress = (address) => {
        if (!address) return ''
        return address.slice(0, 6) + '...' + address.slice(-4)
    }

    const getNetworkName = (networkId) => {
        switch (networkId) {
            case '1':
                return 'Ethereum Mainnet'
            case '137':
                return 'Polygon'
            case '3':
                return 'Ropsten'
            case '4':
                return 'Rinkeby'
            case '5':
                return 'Goerli'
            case '42':
                return 'Kovan'
            default:
                return 'Unknown'
        }
    }

    const renderTransactionStatus = () => {
        switch (transactionState.status) {
            case 'pending':
                return <span className="btn btn-warning m-2">Transaction Pending... <span className="spinner-border spinner-border-sm"></span></span>
            case 'confirmed':
                return <span className="btn btn-info m-2">Confirm in Wallet</span>
            case 'success':
                return <span className="btn btn-success m-2">Minted!</span>
            case 'failed':
                return <span className="btn btn-danger m-2">Transaction Failed</span>
            default:
                return null
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> React Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {!walletState.connected && (
                            <button onClick={handleConnectWallet} className="btn btn-outline-primary m-2">
                                Connect Wallet
                            </button>
                        )}
                        {walletState.connected && (
                            <>
                                <span className="btn btn-outline-success m-2" title={walletState.address}>
                                    {shortenAddress(walletState.address)} ({getNetworkName(walletState.network)})
                                </span>
                                <button onClick={handleDisconnectWallet} className="btn btn-outline-danger m-2">
                                    Disconnect
                                </button>
                            </>
                        )}
                        {renderTransactionStatus()}
                        <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({cartState.length}) </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
