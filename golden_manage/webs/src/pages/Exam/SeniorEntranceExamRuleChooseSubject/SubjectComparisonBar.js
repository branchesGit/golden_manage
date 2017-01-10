import React from 'react'
import { subjectComparisonResponse, LEGEND_TITILE } from '../../AjaxData/Exam/BasicExam'
import { tween } from '../EasyTween'
import classNames from 'classnames'

const { easeIn } = tween;

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


class SubjectComparisonBar extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {duration: 500};
	}

	componentWillMount()
	{
		this.setStateAccordingProps( this.props );
	}

	setStateAccordingProps( props )
	{
		var comparisonInfos = props.comparisonInfos || subjectComparisonResponse.result.comparisonInfos;
		var examsLen = comparisonInfos && comparisonInfos.length || 0;

		var { height } = this.props;
		height = height || 500;

		var maxBestInfo = 0;

		if( examsLen )
		{
			comparisonInfos.map(function(info,idx){
				var { bestInfo } = info;
				var max = 0;

				bestInfo && bestInfo.length && bestInfo.map(function(subjectInfo,idx){
					max += subjectInfo.score;
				});

				maxBestInfo = Math.max( maxBestInfo, max );

			});
		}

		var unit = height * 0.6 / maxBestInfo;

		this.setState({comparisonInfos,examsLen, unit, startAnimateTime: +new Date});

		this.startAnimate();
	}

	getComputedStyle( elem )
	{
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	}

	getColorBySubjectID( subjectID )
	{
		var color;
		var idx = LEGEND_TITILE.findIndex(function(subject,idx){
			var subjectIDs = subject.subjectID;

			if( typeof subjectIDs != 'number' ){
				return subjectIDs.findIndex(function(id){
					return id === subjectID;
				}) !== -1;
			} else {
				return subject.subjectID === subjectID;
			}
			
		});

		if( idx !== -1 )
		{
			color = LEGEND_TITILE[ idx ].color;
		}

		return color;
	}

	//开启动画功能：
	startAnimate()
	{
		var this_ = this;
		var { startAnimateTime, duration } = this.state;
		var now = +new Date;
		startAnimateTime = startAnimateTime || now;
		var d = now - startAnimateTime;

		if( d <= duration )
		{
			requestAnimFrame(function(){
				this_.setState({animate:true});
				this_.startAnimate();
			});
		}
	}

	componentWillReceiveProps( newProps )
	{
		this.setStateAccordingProps( newProps );
	}

	componentDidMount()
	{
		var rootElem = this.refs.root;
		var style = this.getComputedStyle( rootElem );
		var width = style.width;

		this.width = parseInt( width, 10 );
	}

	render()
	{
		var this_ = this;
		var { examsLen, comparisonInfos, unit, startAnimateTime, duration } = this.state;

		return ( 
			<div ref="root">
				<h3>选择科目和最优科目对比</h3>
				<div className="legend">
					<ul>
					{
						LEGEND_TITILE.map(function(subject,idx){
							var styles = {"overflow":"hidden", "position":"relative"};
							var barWidth = '0';

							if( this_.width ){
								var width = this_.width / 2;
								var w = easeIn( +new Date - startAnimateTime, 0, width, duration );
								w = w < width ? w : width;
								styles["width"] = w + 'px';

								barWidth = w - 100;
								barWidth += 'px';

							} 
							return (
								<li key={idx} width="50%">
									<div style={styles}>
										<div className="title-bar" style={{width: barWidth,"backgroundColor": subject.color}}></div>
										<span className={classNames({"subj-name":true})}>{subject.title}</span>
									</div>
								</li>
							);
						})
					}
					</ul>
				</div>
				<div className="comparison-content">
				{
					examsLen ?
					comparisonInfos.map(function(comparisonInfo,idx){
						var { bestInfo, targetInfo } = comparisonInfo;
						var w = 100 / examsLen;
						w += '%'

						var renderComparisonInfo = function( subjectInfos, classes ){
							subjectInfos.sort(function(a,b){
								return a.score - b.score;
							});

							var children = subjectInfos.map(function(subjectInfo,idx){
								var { score, subjectID } = subjectInfo;
								var style = {};
								var h = unit * score;
								h += 'px';
								style["height"] = h;
								style["margintLeft"] = "10px";
								style["marginRight"] = "10px";
								style["overflow"] = "hidden";

								var childStyle = {};
								childStyle["backgroundColor"] = this_.getColorBySubjectID( subjectID );
								var childH = easeIn( +new Date - startAnimateTime, 0, parseInt(h, 10), duration );
								childH += 'px';
								childStyle["height"] = childH;
							
								var klass = {"subject-info":true};
								klass[classes] = !!classes;

								return (
									<div key={idx} className={classNames(klass)} style={style}>
										<div className="animate-subject" style={childStyle} >
											<div className="subject-detail-info">
												<span className="subject-score">{subjectInfo.subjectShortName + subjectInfo.score}</span>
											</div>
										</div>
									</div>
								)
							});

							children.unshift(<div>80%</div>);

							return children;
						}
						return (
							<div key={idx} style={{width: w, marginTop: "20px"}}>
								<div style={{width:"50%", display:"inline-block"}} >
								{
									renderComparisonInfo( bestInfo, 'best-subjects' )
								}

								</div>
								<div style={{width:"50%", display:"inline-block"}}>
								{
									renderComparisonInfo( targetInfo, 'target-subjects' )
								}
								</div>
								<div className="exam-name">{comparisonInfo.examName}</div>
							</div>
						);
					})
					: ""
				}
				</div>
			</div>
		);
	}
}

module.exports = SubjectComparisonBar;