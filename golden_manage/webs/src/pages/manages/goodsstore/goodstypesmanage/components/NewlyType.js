import { GoodsTypesInfo } from '../config/ManageConfig'
import { Select, Input } from 'antd'
import classNames from 'classnames'
import React from 'react'

const Option = Select.Option;

class NewlyType extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};

		this.hanldeTypesChange = this.hanldeTypesChange.bind( this );
		this.handleInputChange = this.handleInputChange.bind( this );
	}

	componentWillMount()
	{
		var typeID, type = GoodsTypesInfo && GoodsTypesInfo.length && GoodsTypesInfo[0] || {};
		typeID = type.typeID || "";

		this.setState({typeID});


	}

	hanldeTypesChange( typeID )
	{
		this.setState({typeID});
	}

	handleInputChange( e )
	{
		var val = e.target.value;

		this.setState({val})
	}

	render()
	{
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
						this.state.showBigTypes && 
						<div>
							<span>大类别：</span>
							<Select>
							</Select>
						</div>
					}

					<span className="item-name">类别名称：</span>
					<Input value={this.state.val || ""} onChange={this.handleInputChange}/>
				</div>
			</div>
		);
	}
}

module.exports = NewlyType;