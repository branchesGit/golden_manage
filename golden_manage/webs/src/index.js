'use strict';

require('./styles/app.scss');

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './pages/App'

var render = ReactDom.render;

var routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			path: 'manages/goodsstore/goodsmanage/goodsStoreOverview',
			getComponent:function( location,cb ){
				require.ensure( [], function(require){
					cb( null, require("./pages/manages/goodsstore/goodsmanage/GoodsStoreOverview") );
				})
			}
		},
		{
			path: 'mananges/soldGoods',
			getComponent:function( location,cb ){
				require.ensure( [], function(require){
					cb( null, require("./pages/manages/SoldGoods") );
				})
			}
		},
		{
			path: 'manages/goodsstore/goodstypesmanage/goodsTypesManagement',
			getComponent:function( location,cb ){
				require.ensure( [], function(require){
					cb( null, require("./pages/manages/goodsstore/goodstypesmanage/GoodsTypesManagement") );
				})
			}
		}
	]
};


//最终渲染
render( <Router history={hashHistory} routes={routes}/>, document.getElementById('app'));
