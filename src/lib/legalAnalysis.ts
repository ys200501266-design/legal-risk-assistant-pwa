import defaultCases from '../data/legal_cases.json';
import type { AnalysisInput, LegalAnalysis, LegalSource, Scenario } from '../types';

const OFFICIAL_SOURCES: LegalSource[] = [
  {
    title: '国家法律法规数据库',
    url: 'https://flk.npc.gov.cn/',
    purpose: '检索法律、行政法规及条文原文',
  },
  {
    title: '全国人大法律法规检索',
    url: 'https://www.npc.gov.cn/',
    purpose: '核验法律名称、修订状态和公开发布信息',
  },
];

function parseUserSources(sourceLinks?: string): LegalSource[] {
  if (!sourceLinks?.trim()) {
    return [];
  }

  return sourceLinks
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((url, index) => ({
      title: `用户提供来源 ${index + 1}`,
      url,
      purpose: '根据用户提供链接核验相关规则',
    }));
}

function inferScenario(input: AnalysisInput): Scenario {
  const text = `${input.scenario} ${input.text}`;
  if (/加班|工资|劳动|公司|员工|离职|劳动合同/.test(text)) return '劳动';
  if (/租房|房东|押金|租赁|退租|租房合同/.test(text)) return '租房';
  if (/退款|退货|商家|消费者|网购|七天/.test(text)) return '消费';
  if (/合同|违约|条款|签字|履行/.test(text)) return '合同';
  if (/聊天|微信|记录|截图/.test(text)) return '聊天记录';
  return input.scenario || '其他';
}

function matchAnalysis(input: AnalysisInput): LegalAnalysis {
  const scenario = inferScenario(input);
  const cases = defaultCases as LegalAnalysis[];
  const matched = cases.find((item) => item.scenario === scenario) ?? cases.find((item) => item.scenario === '合同');
  const searchSources = [...parseUserSources(input.sourceLinks), ...OFFICIAL_SOURCES];

  if (!matched) {
    return {
      recognizedQuestion: input.text || '用户尚未提供足够清晰的问题描述',
      scenario,
      searchSources,
      extractedFacts: ['当前输入不足，无法稳定提取事实。'],
      riskLevel: '无法判断',
      relatedLaws: [],
      reasoning: '未找到明确法律依据，建议补充信息或咨询专业人士。',
      solutionPlan: ['补充合同、付款记录、聊天记录、时间线和对方主体信息。', '确认发生地和争议金额。', '咨询专业人士进行个案判断。'],
      nextEvidence: ['合同或订单', '付款凭证', '沟通记录', '发生时间线'],
      noBasisMessage: '未找到明确法律依据，建议补充信息或咨询专业人士。',
      disclaimer: '本工具仅提供法律信息检索与风险提示，不构成法律意见，不替代律师或司法机关判断。',
    };
  }

  return {
    ...matched,
    recognizedQuestion: input.text.trim() || matched.recognizedQuestion,
    scenario,
    searchSources,
    extractedFacts: input.imageName
      ? [`已上传材料：${input.imageName}，需先做 OCR 或人工核验文字内容。`, ...matched.extractedFacts]
      : matched.extractedFacts,
  };
}

export function analyzeLegalQuestion(input: AnalysisInput): LegalAnalysis {
  const result = matchAnalysis(input);

  if (!result.relatedLaws.length) {
    return {
      ...result,
      riskLevel: '无法判断',
      noBasisMessage: '未找到明确法律依据，建议补充信息或咨询专业人士。',
    };
  }

  return result;
}

export const defaultSourceLinks = OFFICIAL_SOURCES.map((source) => source.url).join('\n');
