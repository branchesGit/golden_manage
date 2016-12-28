

export const ruleTypeMapGrade = ['总分','新中考总分','预选科总分'];
export const ruleTypeMapClass = ['所有科目成绩','新中考成绩','预选科成绩'];

export function handleRankData(data)
	{
		var rankData = data&&data;
		if(rankData)
		{
			var rankDataMap = [];
			var columnData = [];
			var totalScoreData = [];
			var newEntranceScoreData = [];
			var preChooseSubjsScoreData = [];	
					
			for(var i=0;i<rankData.length;i+=10)
			{
				let section = rankData.slice(i,i+10)
				rankDataMap.push(section);
			}

			for(var j=0;j<rankDataMap.length;j++)
			{
				columnData[j] = [];
				totalScoreData[j] = [];
				newEntranceScoreData[j] = [];
				preChooseSubjsScoreData[j] = [];
				rankDataMap[j].map(function(value){
					columnData[j].push({
						className:value.className||value.studentName,
						classID:value.classID||value.studentID
					})
					totalScoreData[j].push(value.totalScore)
					newEntranceScoreData[j].push(value.newEntranceScore);
					preChooseSubjsScoreData[j].push(value.preChooseSubjsScore);
				})
			}

			var res = {
				columnData:columnData,
				totalScoreData:totalScoreData,
				newEntranceScoreData:newEntranceScoreData,
				preChooseSubjsScoreData:preChooseSubjsScoreData
			}

			return res;
		}
	}

export function handleSelectChange(item,value)
	{
		switch(item)
		{
			case 'grade':
			{
				this.setState({
					grade:value
				})
				break;
			}
			case 'class':
			{
				this.setState({
					class:value
				})
				break;
			}
			case 'exam':
			{
				this.setState({
					exam:value
				})
				break;
			}
			case 'computeWay':
			{
				this.setState({
					computeWay:value
				})
			}
		}
	}