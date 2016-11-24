import React from 'react'
import { DatePicker, Select } from 'antd'
import { goods_types } from '../../../../../../data/GoldenManagementData'
import { searchInObject } from '../../../../../utils/commonFunc'

const Option = Select.Option;

class GoldenSearchCard extends React.Component
{
	constructor( props )
	{
		super( props );


	}

	componentWillMount()
	{
		var type = searchInObject( goods_types, "result" );
		
		this.setState({
			type
		});
	}

	handleChangeSelectIdx( type,  typeID )
	{
		var { types } = type;
		var len = types && types.length || 0;

		if( len )
		{
			var idx = types.findIndex(function(type, idx){
				return type.typeID == typeID;
			});

			type.selectIdx = idx;
		}

		this.setState(this.state);
	}	

	renderType( type, idx , ary)
	{
		if( !type )
		{
			return '';
		}

		var selectIdx = type && type.selectIdx || 0;
		var { types } = type;
		var len = types && types.length || 0;
		var parentSelect;

		if( len )
		{
			var targetType = types[ selectIdx ];
			var { typeID } = targetType;

			parentSelect = (<div className="brh-select" key={idx}>
					<Select value={typeID+""} key={idx} onChange={this.handleChangeSelectIdx.bind(this, type)}>
					{
						types.map(function( type, idx ){
							return <Option value={type.typeID + ""} key={idx}>{type.name}</Option>
						})
					}
					</Select>
				</div>);

			ary.push( parentSelect );

			if( targetType )
			{
				this.renderType( targetType.subType, ++idx, ary ) ;
			}
		}	
	}

	render()
	{
		var { type } = this.state;
		var ary = [];
		this.renderType( type, 0, ary );

		return (
			<div>
				<div>
					<span>类目：</span>
					{ ary }
					<span>起始日：</span>
					<DatePicker />
					<span>截止日：</span>
					<DatePicker />
				</div>
			</div>
		);
	}
}

module.exports = GoldenSearchCard;
