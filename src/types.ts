export type Route = 'home' | 'input' | 'processing' | 'result' | 'followup' | 'history';

export type Scenario = '合同' | '租房' | '劳动' | '消费' | '聊天记录' | '其他';

export type RiskLevel = '低风险' | '中风险' | '高风险' | '无法判断';

export interface AnalysisInput {
  text: string;
  scenario: Scenario;
  imageName?: string;
  sourceLinks?: string;
}

export interface LegalSource {
  title: string;
  url: string;
  purpose: string;
}

export interface RelatedLaw {
  lawName: string;
  article: string;
  articleTitle?: string;
  summary: string;
  sourceUrl: string;
  relevance: string;
}

export interface LegalAnalysis {
  recognizedQuestion: string;
  scenario: Scenario;
  searchSources: LegalSource[];
  extractedFacts: string[];
  riskLevel: RiskLevel;
  relatedLaws: RelatedLaw[];
  reasoning: string;
  solutionPlan: string[];
  nextEvidence: string[];
  noBasisMessage?: string;
  disclaimer: string;
}

export interface HistoryItem {
  id: string;
  scenario: Scenario;
  riskLevel: RiskLevel;
  title: string;
  time: string;
  inputText?: string;
  imageName?: string;
  sourceLinks?: string;
}
