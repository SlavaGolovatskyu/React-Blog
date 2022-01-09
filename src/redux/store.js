import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/user';
import { postsReducer } from './reducers/posts';
import { commentsReducer } from './reducers/comments';
import { loadingReducer } from './reducers/loading';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
