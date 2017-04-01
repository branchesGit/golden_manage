webpackJsonp([2],{

/***/ 1025:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(337);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _antd = __webpack_require__(244);
	
	var _configTemplateConfig = __webpack_require__(1026);
	
	var TabPane = _antd.Tabs.TabPane;
	
	var SoldGoods = (function (_React$Component) {
		_inherits(SoldGoods, _React$Component);
	
		function SoldGoods(props) {
			_classCallCheck(this, SoldGoods);
	
			_get(Object.getPrototypeOf(SoldGoods.prototype), 'constructor', this).call(this, props);
	
			this.state = {};
	
			this.changeTempalte = this.changeTempalte.bind(this);
		}
	
		_createClass(SoldGoods, [{
			key: 'changeTempalte',
			value: function changeTempalte(activeKey) {
				this.setState({ activeKey: activeKey });
			}
		}, {
			key: 'getTemplates',
			value: function getTemplates() {
				var tabs = [];
				var activeKey = this.state.activeKey;
	
				for (var name in _configTemplateConfig.TemplageConfig) {
					if (!activeKey) {
						activeKey = _configTemplateConfig.TemplageConfig[name].name;
					}
	
					tabs.push(_configTemplateConfig.TemplageConfig[name]);
				}
	
				return _react2['default'].createElement(
					_antd.Tabs,
					{ activeKey: activeKey, onChange: this.changeTempalte },
					tabs.map(function (tabInfo) {
						return _react2['default'].createElement(
							TabPane,
							{ tab: tabInfo.name, key: tabInfo.name },
							_react2['default'].createElement(tabInfo.child)
						);
					})
				);
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2['default'].createElement(
					'div',
					{ className: 'sold-goods-wrapper' },
					this.getTemplates()
				);
			}
		}]);
	
		return SoldGoods;
	})(_react2['default'].Component);
	
	module.exports = SoldGoods;

/***/ },

/***/ 1026:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _componentsGeneralTemplate = __webpack_require__(1027);
	
	var _componentsGeneralTemplate2 = _interopRequireDefault(_componentsGeneralTemplate);
	
	var _componentsGoldTemplate = __webpack_require__(1029);
	
	var _componentsGoldTemplate2 = _interopRequireDefault(_componentsGoldTemplate);
	
	var GOLDEN = 'golden';
	exports.GOLDEN = GOLDEN;
	var GOLDEN_TO_NEW = 'golden_to_new';
	exports.GOLDEN_TO_NEW = GOLDEN_TO_NEW;
	var SILVERY_BOWLDER = 'SILVERY_BOWLDER';
	exports.SILVERY_BOWLDER = SILVERY_BOWLDER;
	var GENERAL_TEMPLATE = 'GENERAL_TEMPLATE';
	
	exports.GENERAL_TEMPLATE = GENERAL_TEMPLATE;
	var TemplateConfigTemp = {};
	
	TemplateConfigTemp[GOLDEN] = {
	    name: "黄金",
	    child: _componentsGoldTemplate2['default']
	};
	
	TemplateConfigTemp[GENERAL_TEMPLATE] = {
	    name: '通用模板',
	    child: _componentsGeneralTemplate2['default']
	};
	
	var TemplageConfig = TemplateConfigTemp;
	exports.TemplageConfig = TemplageConfig;

/***/ },

/***/ 1027:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _antd = __webpack_require__(244);
	
	var _TemplateColumnUtil = __webpack_require__(1028);
	
	var GeneralTemplate = (function (_React$Component) {
	    _inherits(GeneralTemplate, _React$Component);
	
	    function GeneralTemplate(props) {
	        _classCallCheck(this, GeneralTemplate);
	
	        _get(Object.getPrototypeOf(GeneralTemplate.prototype), 'constructor', this).call(this, props);
	    }
	
	    _createClass(GeneralTemplate, [{
	        key: 'render',
	        value: function render() {
	            return _react2['default'].createElement(
	                'div',
	                { className: 'general-template' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'head' },
	                    _react2['default'].createElement('h3', null),
	                    _react2['default'].createElement('span', null)
	                ),
	                _react2['default'].createElement(_antd.Table, { columns: _TemplateColumnUtil.generalTemplateCols })
	            );
	        }
	    }]);
	
	    return GeneralTemplate;
	})(_react2['default'].Component);
	
	module.exports = GeneralTemplate;

/***/ },

/***/ 1028:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var goldTemplateColumns = [{
	    title: '编号',
	    dataIndex: 'goodsNO',
	    key: 'goodsNO'
	}, {
	    title: '品名',
	    dataIndex: 'goodsTypeName',
	    key: 'goodsTypeName'
	
	}, {}];
	
	exports.goldTemplateColumns = goldTemplateColumns;
	var generalTemplateCols = [{
	    title: '编号',
	    dataIndex: 'goodsNO',
	    key: 'goodsNO'
	}, {
	    title: '品名',
	    dataIndex: 'goodsTypeName',
	    key: 'goodsTypeName'
	
	}, {
	    "title": '件数',
	    dataIndex: 'num',
	    key: 'num'
	}, {
	    title: "质量（g）",
	    dataIndex: "weight",
	    key: "weight"
	}, {
	    title: '单价',
	    dataIndex: 'price',
	    key: 'price'
	}, {
	    title: "工费",
	    dataIndex: 'labourCost',
	    key: 'labourCost'
	}, {
	    title: '金额',
	    dataIndex: 'amountMoney',
	    key: 'amountMoney'
	}];
	exports.generalTemplateCols = generalTemplateCols;

/***/ },

/***/ 1029:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _antd = __webpack_require__(244);
	
	//黄金模板
	
	var GoldTemplate = (function (_React$Component) {
	    _inherits(GoldTemplate, _React$Component);
	
	    function GoldTemplate(props) {
	        _classCallCheck(this, GoldTemplate);
	
	        _get(Object.getPrototypeOf(GoldTemplate.prototype), 'constructor', this).call(this, props);
	    }
	
	    _createClass(GoldTemplate, [{
	        key: 'render',
	        value: function render() {
	            var columns = [];
	
	            return _react2['default'].createElement(
	                'div',
	                null,
	                'golden'
	            );
	        }
	    }]);
	
	    return GoldTemplate;
	})(_react2['default'].Component);
	
	module.exports = GoldTemplate;

/***/ }

});
//# sourceMappingURL=2.bundle.js.map