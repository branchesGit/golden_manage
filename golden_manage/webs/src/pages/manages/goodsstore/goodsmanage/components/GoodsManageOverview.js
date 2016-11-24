import React from 'react'
import { Table } from 'antd'
import classNames from 'classnames'

const GOODS_COLUMNS = [
	{
		name: '商品名称',
		key: 'goodsName',
	},
	{
		name: '商品类别',
		key: 'goodsType'
	},
	{
		name: '商品单价',
		key: 'goodsPrice'
	},
	{
		name: '商品进价',
		key: 'goodsPurPrice'
	},

	{
		name: '商品折后价',
		key: 'goodsOnSalePrice'
	},
	{
		name: '销售员',
		key: 'salesPerson',
	}
];

class GoodsManageOverview extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			pagination: {

			},

			goodsList: []
		}

	}

	getColumns()
	{
		var columns = [];
		
		GOODS_COLUMNS.map(function(column,idx){
			columns[ idx ] = {
				title: column.name,
				key: column.key,
				dataIndex: column.key
			};
		});

		return columns;
	}

	render()
	{
		var columns = this.getColumns();
		
		return (
			<div className={classNames({"goods-manage":true})}>
				<Table dataSource={this.state.goodsList}
				 columns={columns} pagination={this.state.pagination}/>
			</div>
		);
	}
}

module.exports = GoodsManageOverview;