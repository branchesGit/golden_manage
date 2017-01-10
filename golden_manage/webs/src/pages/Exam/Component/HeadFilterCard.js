import React from 'react'
import ScoreAnalysisFilter from './ScoreAnalysisFilter'
import { Button } from 'antd'
import classNames from 'classnames'
//遮罩层的组件入口：
class HeadFilterCard extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};

		this.handleMarkLaer = this.handleMarkLaer.bind( this );
	}

	handleMarkLaer( markFlag )
	{	

		//alert('hddd')
		//改变了查询条件时，弹出遮罩层：
		if( markFlag )
		{
			var $div = $("#mark-layer");

			if( $div.length )
			{	
				//是隐藏的话：
				if( $div.hasClass("brh-hide") )
				{
					$div.removeClass("brh-hide");

				}
			}
			else
			{
				$div = $('<div id="mark-layer" class="mark-layer"></div>');
				$("body").append($div);

			}
		}
		else
		{
			//触发了查询：
		}

		this.setState({markLayer: markFlag})
	}

	render()
	{
		var {config} = this.props;
		var handleMarkLaer = this.handleMarkLaer;

		var { markLayer } = this.state;

		return (
			<div className={classNames({"mark-layer-wrapper": markLayer})}>
				<ScoreAnalysisFilter {...{config, finishedChooseSubjs: true, handleMarkLaer}} />
				<div className="analysis-btns">
					<Button className="">立即分析</Button>
					<Button>取消</Button>
				</div>
			</div>
		)
	}
}

module.exports = HeadFilterCard;