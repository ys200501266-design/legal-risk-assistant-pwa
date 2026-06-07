export type Scenario = '租房' | '劳动' | '消费' | '合同' | '其他';

export type RiskLevel = '低风险' | '中风险' | '高风险' | '无法判断';

export interface RelatedLaw {
  lawName: string;
  article: string;
  summary: string;
  sourceUrl: string;
}

export interface LegalCase {
  userInput: string;
  scenario: Scenario;
  extractedFacts: string[];
  riskLevel: RiskLevel;
  relatedLaws: RelatedLaw[];
  explanation: string;
  suggestions: string[];
  disclaimer: string;
}

export interface AnalysisInput {
  text: string;
  scenario: Scenario;
  imageName?: string;
}
