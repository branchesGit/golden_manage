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
		this.closeNewlyCardGoodsType = this.closeNewlyCardGoodsType.bind( this );
		this.modifyGoodsType = this.modifyGoodsType.bind( this );
	}


	componentWillMount()
	{
		this.quqeryGoodsTypesList();
	}

	quqeryGoodsTypesList()
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

	showNewly( flag )
	{
		this.setState({isNewlyStatus:flag})
	}

	//关闭新增，编辑界面时：商品类型成功Handler.
	closeNewlyCardGoodsType(  )
	{
		this.quqeryGoodsTypesList();	
		this.showNewly( false );
	}

	modifyGoodsType( goodsType )
	{
		this.setState({
			isNewlyStatus: true,
			editGoodsType: goodsType
		});
	}

	render()
	{
		var { isNewlyStatus, goodsTypeList, editGoodsType} = this.state;

		var closeNewlyCardGoodsType = this.closeNewlyCardGoodsType;
		var showNewly = this.showNewly;
		var modifyGoodsType = this.modifyGoodsType;

		return ( 
			<div className="goods-types-manage">
				<div className="head">
					<Button type="primary" onClick={this.showNewly.bind(this, true)}>新增商品类目</Button>
				</div>
				{ isNewlyStatus && <NewlyType  {...{closeNewlyCardGoodsType, showNewly,  editGoodsType}}/> }
				<GoodsTypesOverview data={goodsTypeList} {...{modifyGoodsType}}/>
			</div>
		);
	}
}

module.exports = GoodsTypesManagement;