import GeneralTemplate  from '../components/GeneralTemplate'
import GoldTemplage from '../components/GoldTemplate'


export const GOLDEN = 'golden';
export const GOLDEN_TO_NEW = 'golden_to_new';
export const SILVERY_BOWLDER = 'SILVERY_BOWLDER';
export const GENERAL_TEMPLATE = 'GENERAL_TEMPLATE';


const TemplateConfigTemp = {};

TemplateConfigTemp[GOLDEN] = {
    name:"黄金",
    child:GoldTemplage
};

TemplateConfigTemp[GENERAL_TEMPLATE] = {
    name:'通用模板',
    child:GeneralTemplate
};

export const TemplageConfig = TemplateConfigTemp;





