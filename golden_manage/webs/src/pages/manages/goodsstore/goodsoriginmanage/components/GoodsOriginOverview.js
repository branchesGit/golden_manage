import React from 'react'

class GoodsOriginOverview extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			pagination: {
				current: 1,
				
			}
		}
	}

	getColumns()
	{

		var columns = [
			{
				title: '商品编码',
				key: 'goodsNO',
				dataIndex: 'goodsNO'
			},

			{
				title: '商品名称',
				key: 'goodsName',
				dataIndex: 'goodsName'
			},
			{
				title: '商品类型',
				key: 'goodsType',
				dataIndex: 'goodsType'
			},
			{
				title: '重量',
				key: 'goodsWeight',
				dataIndex: 'goodsWeight'
			},
			{
				title: '工费',
				key: 'unitFee',
				dataIndex: 'unitFee'
			},
			{
				title: '进价',
				key: 'originPrice',
				dataIndex: 'originPrice'
			},
			{
				title: '镶嵌工费',
				key: 'inlayFee',
				dataIndex: 'inlayFee'
			}
		];

		return columns;
	}
	render()
	{
		return (
			<Table dataSource={this.state.data} columns={columns} pagination={this.state.pagination} />
		);	
	}
}