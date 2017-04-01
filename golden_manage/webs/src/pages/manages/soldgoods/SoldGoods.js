import React from 'react'
import classNames from 'classnames'
import { Input, Tabs } from 'antd'

import { TemplageConfig } from './config/TemplateConfig'

const TabPane = Tabs.TabPane;

class SoldGoods extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};

		this.changeTempalte = this.changeTempalte.bind( this );
	}

	changeTempalte(activeKey)
	{
		this.setState({activeKey})
	}

	getTemplates()
	{
		var tabs = [];
		var { activeKey } = this.state;

		for( var name in TemplageConfig )
		{
			if( !activeKey )
			{
				activeKey = TemplageConfig[name].name;
			}

			tabs.push( TemplageConfig[name] );
		}

		return <Tabs activeKey={activeKey} onChange={this.changeTempalte}>{tabs.map(tabInfo => 
				<TabPane tab={tabInfo.name} key={tabInfo.name}>{React.createElement(tabInfo.child)}</TabPane>
			)}</Tabs>
	}

	render()
	{
		return (
			<div className="sold-goods-wrapper">
			{
				this.getTemplates()
			}
			</div>
		);
	}
}


module.exports = SoldGoods;
