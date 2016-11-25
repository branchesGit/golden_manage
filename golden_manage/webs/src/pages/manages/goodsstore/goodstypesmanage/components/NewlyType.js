import { GoodsTypesInfo, SUPER_TYPE_ID } from '../../../../config/ManageConfig'
import { Select, Input, Button ,Modal} from 'antd'
import classNames from 'classnames'
import React from 'react'
import { ajaxAsyn } from '../../../../../utils/commonFunc'

const Option = Select.Option;

class NewlyType extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};

		this.hanldeTypesChange = this.hanldeTypesChange.bind( this );
		this.handleInputChange = this.handleInputChange.bind( this );
		this.incrementNewlyType = this.incrementNewlyType.bind( this );
		this.cancleNewlyType = this.cancleNewlyType.bind( this );
		this.handleGoodsTypeChange = this.handleGoodsTypeChange.bind( this );
	}

	componentWillMount()
	{
		this.querySuperTypes();

		var typeID, type = GoodsTypesInfo && GoodsTypesInfo.length && GoodsTypesInfo[0] || {};
		typeID = type.typeID || "";

		this.setState({typeID});
	}

	hanldeTypesChange( typeID )
	{
		var isSubType = SUPER_TYPE_ID !== typeID;

		this.setState({typeID, isSubType});

		var { goodsTypeID } = this.state;

		if( isSubType && !goodsTypeID )
		{
			Modal.info({
				title: '系统通知',
				conent: '对不起，系统暂缺没有大类目~'
			});
		}

	}

	querySuperTypes()
	{
		var promise = ajaxAsyn('/goodsTypesManage/getSuperTypes', {} );

		//promise.then();

		var cb = function( data ){
			debugger;

			var len = data && data.length || 0;
			var goodsType = len && data[ 0 ] || null;
			var goodsTypeId;

			if( goodsType )
			{
				goodsTypeId = goodsType.goodsTypeId;
			}

			this.setState({goodsTypes: data, goodsTypeId});
		};

		promise.done( cb );

		//cb.call(this, TYPES );
	}

	handleInputChange( e )
	{
		var val = e.target.value;

		this.setState({val})
	}

	incrementNewlyType()
	{
		var { typeID, val, goodsTypeId } = this.state;

		var promise = ajaxAsyn('/goodsTypesManage/incrementType', {typeID, val}, 'post' );

		promise.then(function(data){
			console.log( data, 'back insert typeQ...' );
		});
	}

	cancleNewlyType()
	{
		var cancleNewlyType = this.props.cancleNewlyType;

		cancleNewlyType && cancleNewlyType();
	}

	handleGoodsTypeChange( goodsTypeID )
	{
		this.setState({goodsTypeID});
	}

	render()
	{

		var { goodsTypes, goodsTypeId, isSubType } = this.state;

		return (	
			<div className="brh-manage-wrapper">
				<h3>新增类别</h3>
				<div className={classNames({"brh-manage-types":true, "manage-card":true})}>
					<span>类别类型：</span>
					<Select value={this.state.typeID} onChange={this.hanldeTypesChange}>
					{
						GoodsTypesInfo.map((type,idx) => {
							return <Option key={idx} value={type.typeID}>{type.name}</Option> 
						})
					}
					</Select>
					{
						isSubType && goodsTypeID && 
						<div className="type-item">
							<span>选择类别：</span>
							<Select value={goodsTypeId} onChange={this.handleGoodsTypeChange}>
							{
								goodsTypes.map(function(type,idx){
									return <Option value={type.goodsTypeId} key={type.goodsTypeId}>{type.goodsTypeName}</Option>
								})
							}
							</Select>
						</div>
					}

					<span className="item-name">类别名称：</span>
					<Input value={this.state.val || ""} onChange={this.handleInputChange}/>
				</div>
				<div className="right-btns">
					<div className="btns">
						<Button onClick={this.cancleNewlyType} type="ghost">取消</Button>
						<Button onClick={this.incrementNewlyType} type="primary"  >确定</Button>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = NewlyType;