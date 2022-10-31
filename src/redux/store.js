  import { createStore, combineReducers, applyMiddleware, compose } from "redux"
  import thunk from "redux-thunk"
  import * as reducers from "./ducks"

  import { persistReducer } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  // import { useShopify } from "../hooks"

  const persistConfig = {
    key: 'root',
    storage,
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const rootReducer = combineReducers(reducers)
  const enhancer = composeEnhancers(applyMiddleware(thunk))

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  const store = createStore(persistedReducer, enhancer)
  
  export default store