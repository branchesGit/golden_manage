import React from 'react'
import { Table, Icon } from 'antd'
import { ajaxAsyn } from '../../../../../utils/commonFunc'

//商品类别的表格展示：
class GoodsTypesOverview extends React.Component
{
	constructor( props )
	{
		super( props );

	}


	getColumns()
	{
		var this_ = this;

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
			},
			{
				title: '操作',
				key: 'goodsTypeId',
				dataIndex: 'goodsTypeId',
				render: function( goodsTypeId ){
					return (
						<div className="brh-opers">
							<Icon type="delete" title="删除" onClick={this_.deleteGoodsType.bind(this_,goodsTypeId)} />
							<Icon type="edit" title="修改" onClick={this_.modifyGoodsType.bind(this_,goodsTypeId)}/>
						</div>
					)
				}
			}
		];

		return columns;
	}

	deleteGoodsType( goodsTypeId )
	{	
		var this_ = this;
		var promise = ajaxAsyn( '/goodsTypesManage/deleteGoodsType', {goodsTypeId}, 'post' );

		promise.done(function(){
			this_.props.queryGoodsTypeList();
		}).fail(function(){

		});

	}

	modifyGoodsType( goodsTypeId )
	{
		var { data } = this.props;
		var len = data && data.length || 0;

		var goodsType;

		if( len )
		{
			var idx = data.findIndex(function(goodsType,idx){
				return goodsTypeId == goodsType.goodsTypeId
			});

			if( idx !== -1 )
			{
				goodsType = data[ idx ];
			}
		}

		if( goodsType )
		{
			this.props.modifyGoodsType( goodsType );
		}
	}

	render()
	{
		var { data } = this.props;

		return (
			<div className="brh-overview-wrapper">
				{ data && <Table dataSource={data} columns={this.getColumns()} pagination={false} /> }
			</div>
		);	
	}
}

module.exports = GoodsTypesOverview;