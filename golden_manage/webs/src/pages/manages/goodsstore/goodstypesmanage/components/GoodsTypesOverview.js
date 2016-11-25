import React from 'react'
import { Table } from 'antd'

//商品类别的表格展示：
class GoodsTypesOverview extends React.Component
{
	constructor( props )
	{
		super( props );


	}


	getColumns()
	{
		var columns = [
			{
				title: '商品类别',
				key: 'goodsTypeName',
				dataIndex: 'goodsTypeName'
			},
			{
				title: '所属类别',
				key: 'superGoodsTypeName',
				dataIndex: 'superGoodsTypeName',
				render: function( val ){
					return val || '--';
				}
			},
			{
				title: '创建时间',
				key: 'cdate',
				dataIndex: 'cdate',
				render: function( time ){
					return time.replace(/T/ig,' ').replace(/\..*/,'');
				}
			}
		];

		return columns;
	}

	render()
	{

		var { data } = this.props;

		return (
			<div>
				{ data && <Table dataSource={data} columns={this.getColumns()} pagination={false} /> }
			</div>
		);	
	}
}

module.exports = GoodsTypesOverview;