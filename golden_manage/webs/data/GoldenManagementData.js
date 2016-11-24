
var goods_types = {
	code: 0,
	result: {
		types: [
			{
				name: '黄金',
				typeID: 1,
				subType: {
					types:[
						{
							name: "黄金手链",
							typeID: 11
						}
					],
					selectIdx: 0
				}
				,
			},
			{
				name: '玉器',
				typeID: 2,
				
			},
			{
				name: '手表',
				typeID: 3,
				subType: {
					types: [
						{
							name: '瑞尼达',
							typeID: 31
						},
						{
							name: '劳卡丹',
							typeID: 32
						}
					],
					selectIdx: 0
				}
			}
		],
		selectIdx: 0
	}
};


module.exports = {
	goods_types
}