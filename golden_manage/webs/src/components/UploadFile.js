import React from 'react'
import { Upload, Button, Icon, Modal } from 'antd'
import jQuery from 'jquery'


const CONTENT_TYPE_EXCEL_LOW_07 = 'application/vnd.ms-excel';
const CONTENT_TYPE_EXCEL_HEIGHT_10 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const indexOf = Array.prototype.indexOf;
//目前就配置了excel的file.type。
const FILE_FILTERS_MAP = {
	excel: [CONTENT_TYPE_EXCEL_LOW_07,CONTENT_TYPE_EXCEL_HEIGHT_10]
};

const DEFAULT_UPLOAD_FILE_CONFIG = {
	maxSize: 0,
	filters:['excel'],
	action:"/uploadGoods",
	uploadText: '选择文件',
	uploadWarning: '文件限定：',
	completed: function(){},
	className:'',
	uploadMultiple: false,
	hideRemoveIcon: true
};

const MB_SIZE = 1024 * 1024;

class UploadFile extends React.Component{
	constructor( props ){
		super( props );

		this.state = {};

		//设定config对象
		this.config;
	}

	componentWillMount(){
		this.setStateByUpdateProps( this.props );
	}

	componentWillReceiveProps( newProps ){
		this.setStateByUpdateProps( newProps );
	}

	setStateByUpdateProps( props ){

		this.setUploadConfig( props.config );

		this.setState({
			updateConfig: true,
		});
	}

	setUploadConfig( config ){
		var config = jQuery.extend( true, DEFAULT_UPLOAD_FILE_CONFIG, config );
		var t = this;

		config.beforeUpload = function( file ){
			var maxSize = config.maxSize;

			if( maxSize )
			{
				var fileSize = file.size;
				var size = maxSize * MB_SIZE;

				if( fileSize > size )
				{
					
					Modal.info({
						title:'系统提示：',
						content: <div>您上传的文件大于<b>{maxSize}</b>MB~</div>
					});
					return false;
				}
			}

			var filters = config.filters;
			var i = 0, len = filters && filters.length || 0;
			var bFileType = len ? false : true;

			if( len )
			{
				var type = file.type;
				var targetFileTypes;
				var index = -1;

				for( ; i < len; i++ )
				{
					if( bFileType )
					{
						break;
					}

					targetFileTypes = FILE_FILTERS_MAP[filters[i]];

					if( targetFileTypes && targetFileTypes.length )
					{
						index = indexOf.call( targetFileTypes, type );

						if( index !== -1 )
						{
							bFileType = true;
						}
						
					} else 
					{
						if( targetFileTypes === type )
						{
							bFileType = true;
						}
					}
				}
			}

			if( !bFileType )
			{
				Modal.info({
					title: '系统提示：',
					content: '对不起，您选择上传的文件格式不符合要求~'
				});
			}

			return bFileType;
		};

		//这个事件会重复调用，在上传的过程中。
		config.onChange = config.onChange || function( response ){
			if (response.file.status === 'done') 
			{
				var uploadMultiple = config.uploadMultiple;

				if( !uploadMultiple ){
					var fileList = response.fileList;

					if( fileList && fileList.length >= 2 )
					{
						//目前还没做后台的删除功能。
						fileList.shift();

						t.setState({
							updateConfig: true
						});
					}
				}
				
				var serverData = response.file.response || {}; 
				var fileUrl = serverData.result.relativeUrl || "";
				var completed = config.completed;

				completed && completed(fileUrl);

			} else if (response.file.status === 'error') 
			{
				Modal.info({
					title: '系统提示：',
					content: <div>您选择的文件<b>{response.file.name}</b>上传失败~</div>
				});
			}
		}

		this.config = config;
	}

	render(){
		var t = this;
		var config = t.config;
		var kls = "brh-upload-file-wrapper";
		var className = config.className ? " " + config.className : "";
		kls += className ;

		if( config.hideRemoveIcon ){
			kls += " hide-remove-icon";
		};
		
		return (
			<div className={kls}>
				<Upload {...config}  className="brh-upload"> 
					<Button type="primary">
						<Icon type="upload" />{config.uploadText}
					</Button>
				</Upload> 
				<div className="brh-upload-suffix">
					<span className="brh-upload-warning">{config.uploadWarning || ""}</span>
				</div>
				<form method="get" ref="excelTemplate" className="excel-template">
				</form>
			</div>
		);
	}
}

module.exports = UploadFile;