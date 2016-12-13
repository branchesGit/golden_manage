import { GoodsTypesInfo, SUPER_TYPE_ID, SUB_TYPE_ID } from '../../../../config/ManageConfig'
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
		this.editGoodsType = this.editGoodsType.bind( this );
	}

	componentWillMount()
	{
		this.querySuperTypes();

		var idx = 0;
		var typeID, type = GoodsTypesInfo && GoodsTypesInfo.length && GoodsTypesInfo[idx] || {};
		typeID = type.typeID || "";

		this.setState({typeID, GoodsTypesInfo});
	}

	hanldeTypesChange( typeID )
	{
		var isSubType = SUPER_TYPE_ID !== typeID;

		this.setState({typeID, isSubType});

		var { superGoodsTypeId } = this.state;

		if( isSubType && !superGoodsTypeId )
		{
			Modal.info({
				title: '系统通知',
				content: '对不起，系统暂缺没有大类目~'
			});
		}

	}

	querySuperTypes()
	{
		var this_ = this;
		var promise = ajaxAsyn('/goodsTypesManage/getSuperTypes', {} );

		var cb = function( data ){
			var len = data && data.length || 0;
			var goodsType = len && data[ 0 ] || null;

			var superGoodsTypeId;

			superGoodsTypeId = goodsType.goodsTypeId + "";

			this_.setState({superGoodsTypes: data, superGoodsTypeId});
		};

		promise.done( cb );
	}

	handleInputChange( e )
	{
		var goodsTypeName = e.target.value;
		var editGoodsType = this.props.editGoodsType;

		if( editGoodsType )
		{
			editGoodsType.goodsTypeName = goodsTypeName;
		}

		this.setState({goodsTypeName})
	}

	incrementNewlyType()
	{
		var this_ = this;

		var { goodsTypeName, superGoodsTypeId, isSubType } = this.state;
		superGoodsTypeId = isSubType ? superGoodsTypeId : "";

		var promise = ajaxAsyn('/goodsTypesManage/incrementType', { goodsTypeName, superGoodsTypeId}, 'post' );

		promise.done(function( goodsType ){
			var gooodsType = {
				goodsTypeId: goodsType.goodsTypeId,
				suerGoodsTypeId: superGoodsTypeId || "",
				goodsTypeName: goodsTypeName
			};

			this_.props.closeNewlyCardGoodsType(goodsType);
		}).fial( function(){
			
		});
	}

	cancleNewlyType()
	{
		var showNewly = this.props.showNewly;

		showNewly && showNewly( false );
	}

	handleGoodsTypeChange( superGoodsTypeId )
	{
		this.setState({superGoodsTypeId});
	}

	editGoodsType( )
	{
		var this_ = this;
		var { editGoodsType } = this.props;
	
		var susHandler = function(){
			this_.props.closeNewlyCardGoodsType();
		};

		var errHandler = function( err ){

		};

		var promise = ajaxAsyn( '/goodsTypesManage/editGoodsType', { goodsTypeId: editGoodsType.goodsTypeId, goodsTypeName: this.state.goodsTypeName }, 'post' );
		
		promise.done( susHandler ).fail( errHandler )		
	}	

	render()
	{

		var { GoodsTypesInfo, typeID, goodsTypeName, superGoodsTypes, superGoodsTypeId, isSubType } = this.state;
		var { editGoodsType } = this.props;
		//开始处理编辑商品类型：
		//goodsName;
		if( editGoodsType )
		{
			isSubType = editGoodsType.superGoodsTypeId ? true : false;
			typeID = isSubType ? SUB_TYPE_ID : SUPER_TYPE_ID;
			superGoodsTypeId = editGoodsType.superGoodsTypeId || superGoodsTypeId;
			superGoodsTypeId += "";

			goodsTypeName = editGoodsType.goodsTypeName;
		
		}

		return (	
			<div className="brh-manage-wrapper">
				<h3> {editGoodsType ? "编辑" :"新增" }类别</h3>
				<div className={classNames({"brh-manage-types":true, "manage-card":true})}>
					<span>类别类型：</span>
					<Select value={typeID} onChange={this.hanldeTypesChange}>
					{
						GoodsTypesInfo.map((type,idx) => {
							return <Option key={'type'+idx} value={type.typeID}>{type.name}</Option> 
						})
					}
					</Select>
					{
						isSubType && superGoodsTypeId && 
						<div className="type-item">
							<span>选择类别：</span>
							<Select value={superGoodsTypeId} onChange={this.handleGoodsTypeChange}>
							{
								superGoodsTypes && superGoodsTypes.length && superGoodsTypes.map(function(goodsType,idx){
									return <Option value={goodsType.goodsTypeId + ""} key={goodsType.goodsTypeId + "supe"}>{goodsType.goodsTypeName}</Option>
								})
							}
							</Select>
						</div>
					}

					<span className="item-name">类别名称：</span>
					<Input value={goodsTypeName || ""} onChange={this.handleInputChange}/>
				</div>
				<div className="right-btns">
					<div className="btns">
						<Button onClick={this.cancleNewlyType} type="ghost">取消</Button>
						<Button onClick={ !editGoodsType ? this.incrementNewlyType : this.editGoodsType } type="primary"  >确定</Button>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = NewlyType;