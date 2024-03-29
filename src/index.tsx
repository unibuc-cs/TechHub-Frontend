import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./store/user/user.reducer";
import categoriesReducer from "./store/categories/categories.reducer";
import threadsReducer from "./store/threads/threads.reducer";
import postsReducer from "./store/posts/posts.reducer";
import userDetailsReducer from "./store/userDetails/userDetails.reducer";
import leaderboardReducer from "./store/leaderboard/leaderboard.reducer";
import discountsReducer from "./store/discounts/discounts.reducer";
import purchasedDiscountsReducer from "./store/purchasedDiscounts/purchasedDiscounts.reducer";
import reportsReducer from "./store/reports/reports.reducer";
import raffleReducer from "./store/raffle/raffle.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import rootSaga from "./store/rootSaga";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  threads: threadsReducer,
  posts: postsReducer,
  userDetails: userDetailsReducer,
  leaderboard: leaderboardReducer,
  discounts: discountsReducer,
  purchasedDiscounts: purchasedDiscountsReducer,
  reports: reportsReducer,
  raffle: raffleReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default connect()(App);
