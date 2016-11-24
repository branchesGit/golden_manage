import React from 'react'
import GoodsSearchCard from './components/GoodsSearchCard'
import GoodsManageOverview from './components/GoodsManageOverview'
import { ajaxAsyn } from '../../../../utils/commonFunc'

class GoodsStoreOverview extends React.Component
{
	constructor( props )
	{
		super( props );
	}

	componentWillMount()
	{
		var promise = ajaxAsyn('/goodsManage', {} );

		promise.then(function( data ){
			
		});

		
	}

	render()
	{
		return (
			<div>
				<GoodsSearchCard />
				<GoodsManageOverview />
			</div>
		)
	}
}

module.exports = GoodsStoreOverview;