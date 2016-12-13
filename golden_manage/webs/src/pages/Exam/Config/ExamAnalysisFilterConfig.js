
//基本分析 排名类型
export const rankType = [
    {
        rankTypeID:"1",
        rankTypeName:"年级排名",
    },
    {
        rankTypeID:"2",
        rankTypeName:"班级排名",
    }
];
//映射分的enum值
export const mappingScoreID = "2";
//基本分析  原始分 映射分  标准分
export const scoreMapType = [
    {
        scoreMapTypeID:"1",
        scoreMapTypeName:"原始分"
    },
    {
        scoreMapTypeID:mappingScoreID,
        scoreMapTypeName:"映射分"
    },
    {
        scoreMapTypeID:"3",
        scoreMapTypeName:"标准分"
    }
];

//增量分析  原始分  标准分
export const incrementScoreMapType = [
    {
        scoreMapTypeID:"3",
        scoreMapTypeName:"标准分"
    },
    {
        scoreMapTypeID:mappingScoreID,
        scoreMapTypeName:"映射分"
    },

]

export const genderMap = {
	male:1,
	female:0,
	other:-1
};


export const newSeniorScoreMap = [
     {
        scoreMapTypeID:"3",
        scoreMapTypeName:"标准分"
    },
    {
        scoreMapTypeID:"2",
        scoreMapTypeName:"映射分"
    },
    {
        scoreMapTypeID:"1",
        scoreMapTypeName:"原始分"
    }
]



//教师能力分析：
export const TeacherAbilityType = [
    {
        scoreMapTypeID:"3",
        scoreMapTypeName:"标准分"
    },
    {
        scoreMapTypeID:"1",
        scoreMapTypeName:"原始分"
    }
]