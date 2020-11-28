import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import racingReducer from './Reducers/RacingReducer';

const rootReducer = combineReducers({
	racingReducer: racingReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;