import React from 'react'
import { Button } from 'antd'
import GoodsTypesOverview from './components/GoodsTypesOverview'
import NewlyType from './components/NewlyType'
import { ajaxAsyn } from '../../../../utils/commonFunc'
/*
	主要内容：
	1，新增商品类型的编辑：
	2： 商品类型的展示：
	3： 商品类型的增删改查：
*/
class GoodsTypesManagement extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = { isNewlyStatus: false };

		this.showNewly = this.showNewly.bind( this );
	}


	componentWillMount()
	{
		var this_ = this;
		var promise = ajaxAsyn( '/goodsTypesManage', {} );

		var susHandler = function( goodsTypeList ){
			this_.setState( { goodsTypeList } )
		};

		var errHandler = function( err ){

		};

		promise.done( susHandler ).fail( errHandler );
	}

	showNewly()
	{
		this.setState({isNewlyStatus:true})
	}

	render()
	{
		var { isNewlyStatus, goodsTypeList} = this.state;

		return ( 
			<div className="goods-types-manage">
				<div className="head">
					<Button type="primary" onClick={this.showNewly}>新增商品类目</Button>
				</div>
				{ isNewlyStatus && <NewlyType /> }
				<GoodsTypesOverview data={goodsTypeList}/>
			</div>
		);
	}
}

module.exports = GoodsTypesManagement;