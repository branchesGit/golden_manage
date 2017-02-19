import React from 'react'
import classNames from 'classnames'
import { Input } from 'antd'

class SoldGoods extends React.Component
{
	constructor( props )
	{
		super( props );

	}

	render()
	{
		return (
			<div className="sold-goods-wrapper">
				<div className={classNames({'header':true})}>
					<div className="custom-name">
						<span className="print-hide">客户名称：</span>
						<Input />
					</div>
					<div className="sold-date">
						<span className="print-hide">销售日期:</span>
						<span></span>
					</div>
				</div>
				
			</div>
		);
	}
}


module.exports = SoldGoods;
