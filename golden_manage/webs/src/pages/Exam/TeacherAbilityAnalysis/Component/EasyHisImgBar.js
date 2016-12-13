import React from 'react'
import { Icon } from 'antd'
import { tween  } from '../../EasyTween'
//这里先做个简单的处理。
//支持简单的画背景图的柱状图
const UP_IMG_URL = './src/images/up.png';
const DOWN_IMG_URL = './src/images/down.png'
const BAR_WIDTH = 240;
const { easeIn, strongEaseIn } = tween;
const DURATION = 300; //默认动画执行时间：
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60 );
  };
})();


class EasyHisImgBar extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			pageIdx: 0
		}

		this.nextPage = this.nextPage.bind( this );
		this.upImg = null;
		this.downImg = null;

	}

	componentWillMount()
	{
		var this_ = this;

		var upImg = new Image();
		upImg.onload = function(){ this_.upImg = upImg; }
		upImg.src = UP_IMG_URL ;

		var downImg = new Image();
		downImg.onload = function(){ this_.downImg = downImg; };
		downImg.src = DOWN_IMG_URL;
	}

	handleList( list )
	{
		var len = list && list.length  || 0;

		if( len )
		{
			var names = [], values = [];

			list.map(function(item,idx){
				names[ idx ] = item.teacherName;
				values[ idx ] = item.score;
			});

			return {
				names,
				values
			}
		}

		return null;
	}

	getBoundaryReact( values )
	{
		var min = 0, max = 0;

		values.map(function(value,idx){
			min = Math.min( value, min );
			max = Math.max( value, max );
		});

		return {
			min,
			max
		}
	}

	//给出一个值来定柱子的高度点问题：
	getHisPointByValue( value )
	{
		var boundH = this.canvasH * 0.8;
		var { min, max } = this.bound;	
		var dis = max - min;

		var h = Math.abs( value - max ) / dis * boundH;

		h += this.canvasH * 0.1;
		
		return h;
	}

	getBarRound( barIdx, barLen )
	{
		var boundW = this.canvasW;
		var barW = this.props.barWidth || BAR_WIDTH ||  Math.floor( boundW / barLen );
		var startX = barIdx * barW;
		startX += barW * 0.2;
		var endX = ( barIdx + 1 ) * barW;
		endX -= barW * 0.2;

		return { startX, endX };
	}

	getElementStyle( elem ){
		return window.getComputedStyle( elem, null );
	}

	componentDidMount()
	{
		var h = this.props.height || 400;
		h += 'px';

		var rootElem = this.refs.root;
		rootElem.style.height = h;

		this.initCanvas();

		var data = this.handleList( this.props.data );

		if( data )
		{
			var boundW = this.getElementStyle( rootElem,null ).width;
			boundW = parseInt( boundW, 10 );
			var barW = this.props.barWidth || BAR_WIDTH ||  Math.floor( boundW / barLen );
			var barLen = Math.floor( boundW / barW );

			var pageSize = barLen;

			this.setState({pageSize, source: data, pageIdx: 0});
			
		}
		
	}


	drawBar( name,value, barIdx, barLen )
	{
		var this_ = this;

		var barRound = this.getBarRound( barIdx, barLen );
		var { startX, endX } = barRound;

		var startH = this.getHisPointByValue( 0 );
		var endH = this.getHisPointByValue( value );

		var context = this.context;

		var isUp = value > 0 ?  true : false;

		if( context )
		{
			var animate = (function(){
				var startTime = +new Date;
				var barW = endX - startX;

				return function(){
					var curTime = +new Date;
					var img = isUp ? this_.upImg : this_.downImg;

					if( !img )
					{
						startTime = +new Date;
						requestAnimFrame( animate );	
						return;
					}

					var duration = curTime - startTime;

					if( duration > DURATION )
					{
						return;
					}

					var curEndH = easeIn( curTime - startTime, startH, endH - startH, DURATION );
					var curBarH = curEndH - startH;
					
					var imgW = img.width, imgH = img.height;
					var xCount = Math.floor( barW / imgW ), yCount = Math.floor( Math.abs( curBarH ) / imgH ) ;

					if( ( DURATION - duration ) < DURATION / 10 && !yCount )
					{
						yCount = 1;
					}

					if( yCount )
					{
						context.clearRect( startX,  isUp ? startH - 1 : startH + 1, barW, curBarH);
					}
					
					for( var i = 0; i < xCount; i++ )
					{
						for( var j = 0; j < yCount; j++ )
						{
							var startx  =  startX + i * imgW ;
							var starty = isUp ? startH - ( j + 1) * imgH : startH + j * imgH ;

							context.drawImage( img, startx, starty, imgW, imgH );
						}
					}

					requestAnimFrame( animate );	
				}
			})();

			requestAnimFrame( animate );

			//画出底部的lable, 与value。
			context.font = "24px serif";
			context.textAlign = "center";
			
			if( isUp )
			{
				//startH
				var txt = context.measureText( name );
				var width = txt.width;
				var barW = endX - startX;

				var txtStartX = ( barW - width ) / 2 + startX;
				context.fillText( name, txtStartX, startH + 30 );

				txt = context.measureText( value );
				width = txt.width;

				var txtStartX = ( barW - width ) / 2 + startX;
				context.fillText( value, txtStartX, endH - 20 );
			}
			else
			{
				//startH
				var txt = context.measureText( name );
				var width = txt.width;
				var height = txt.height;
				var barW = endX - startX;

				var txtStartX = ( barW - width ) / 2 + startX;
				context.fillText( name, txtStartX, startH - 20 );

				txt = context.measureText( value );
				width = txt.width;
				height = txt.height;

				var txtStartX = ( barW - width ) / 2 + startX;
				context.fillText( value, txtStartX, endH + 10  );
			}
			
		}

	}

	//画出0刻度线：
	drawZeroLine()
	{
		var zeroH = this.getHisPointByValue( 0 );
		var context = this.context;
		var w = this.canvasW;

		if( context )
		{
			context.beginPath();
   			context.moveTo(0, zeroH);
			context.lineTo(w, zeroH);
			context.stroke();
		}
	}

	initCanvas()
	{
		var rootElem = this.refs.root;
		var rootStyle = window.getComputedStyle( rootElem, null );
		var h = rootStyle.height;
		var w = rootStyle.width;
		h  = parseInt( h, 10 );
		w = parseInt( w, 10 );

		rootElem.innerHTML = '<canvas width="' + w + '" height="' + h + '"></canvas>';
		var canvas = rootElem.getElementsByTagName('canvas');
		canvas = canvas && canvas.length && canvas[ 0 ] || null;

		this.context = canvas && canvas.getContext && canvas.getContext('2d');

		this.canvasH = h;
		this.canvasW = w;

	}

	componentWillReceiveProps( newProps )
	{
		var list = this.handleList( newProps.data );
	}

	drawBarLabels()
	{
		var { pageIdx, pageSize, source } = this.state;
		var sIdx = pageIdx * pageSize;
		var eIdx = ++pageIdx * pageSize;

		var this_ = this;

		if( source )
		{

			var context = this.context;
			context && context.clearRect(0, 0, this.canvasW, this.canvasH);

			var { names, values } = source;

			var targetNmaes = names.slice( sIdx, eIdx );
			var targetValues = values.slice( sIdx, eIdx );

			this.bound = this.getBoundaryReact( targetValues );
			this.drawZeroLine();

			this.bound = this.getBoundaryReact( targetValues );		
			this.drawZeroLine();

			targetValues.map(function(value,idx){
				this_.drawBar( targetNmaes[idx], value, idx, pageSize )
			});

		}

	}

	nextPage()
	{
		var { pageIdx, pageSize, source } = this.state;
		var len = source.names && source.names.length || 0;

		var maxPageIdx = Math.ceil( len / pageSize );

		pageIdx = ++pageIdx >= maxPageIdx ? 0 : pageIdx;

		this.setState({pageIdx});
	}

	render()
	{
		this.drawBarLabels();

		return (
			<div className="img-bar-wrapper">
				<div ref="root"></div>
				<Icon type="right" onClick={this.nextPage}/>
			</div>
		);

	}
}

module.exports = EasyHisImgBar;