import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from  './data/posts';

// create an object for the default data es6 grammar
const defaultState = {
    posts,
    comments
};

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
    );

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);//创建一个增强版的history来结合store同步导航事件

if(module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
} //When using Webpack and React, redux reducers do not keep state during hot reloads. 
//Enable Webpack hot module replacement for reducers
//HMR(hot moduel repalcement is the most useful function provided by webpack)
//(1) replaceReducer(nextReducer)
// replaceReducer(nextReducer)是redux的api中的 store 的一个函数

// 作用：替换 store 当前用来计算 state 的 reducer。
// 这是一个高级 API。只有在你需要实现代码分隔，而且需要立即加载一些 reducer 的时候才可能会用到它。在实现 Redux 热加载机制的时候也可能会用到。
// ( 我的理解是： 实时更新的reducer )


export default store;
