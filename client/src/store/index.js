import {
    createStore
} from 'redux';
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import storage from 'redux-persist/lib/storage'

let initialState = {
    walletId: '',
    nftContract: {},
    auctionContract: {},
}

function reducer(state, {
    type,
    payload
}) {
    switch (type) {
        case 'SET_WALLET':
            return {
                ...state,
                walletId: payload,
            };
        case 'REMOVE_WALLET':
            return {
                ...state,
                walletId: '',
            };
        case 'SET_CONTRACT':
            return {
                ...state,
                nftContract: payload.nftContract,
                    auctionContract: payload.auctionContract,
            };
        default:
            return {
                ...state
            };
    }
}

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const persistor = persistStore(store)


export {
    persistor,
    store
}

// const store = createStore(reducer, initialState);

// export {
//     store
// }