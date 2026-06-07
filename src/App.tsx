import { useMemo, useState } from 'react';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Result from './pages/Result';
import legalCases from './data/legal_cases.json';
import type { AnalysisInput, LegalCase } from './types';

type Route = 'home' | 'analyze' | 'result';

const cases = legalCases as LegalCase[];

function pickMockResult(input: AnalysisInput): LegalCase {
  const normalized = `${input.text} ${input.scenario}`.toLowerCase();
  const matched =
    cases.find((item) => item.scenario === input.scenario) ??
    cases.find((item) => normalized.includes(item.scenario.toLowerCase()));

  if (matched) {
    return {
      ...matched,
      userInput: input.text || matched.userInput,
      extractedFacts: input.imageName
        ? [`已上传图片材料：${input.imageName}`, ...matched.extractedFacts]
        : matched.extractedFacts,
    };
  }

  return {
    userInput: input.text || '用户上传了待识别材料，但文字信息不足。',
    scenario: input.scenario,
    extractedFacts: ['当前信息不足，尚不能稳定提取关键事实。'],
    riskLevel: '无法判断',
    relatedLaws: [],
    explanation: '未找到明确法律依据，建议补充信息或咨询专业人士。',
    suggestions: ['补充合同、票据、聊天记录、时间线等材料', '说明所在地区、发生时间、对方主体和诉求', '咨询律师或相关主管部门获取个案判断'],
    disclaimer: '本工具仅提供法律信息检索与风险提示，不构成法律意见，不替代律师或司法机关判断。',
  };
}

export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const [analysisInput, setAnalysisInput] = useState<AnalysisInput | null>(null);

  const result = useMemo(() => {
    if (!analysisInput) {
      return cases[0];
    }

    return pickMockResult(analysisInput);
  }, [analysisInput]);

  const startAnalyze = (scenario?: AnalysisInput['scenario']) => {
    setAnalysisInput(scenario ? { text: '', scenario } : null);
    setRoute('analyze');
  };

  return (
    <main className="app-shell">
      {route === 'home' && <Home onStart={startAnalyze} />}
      {route === 'analyze' && (
        <Analyze
          initialScenario={analysisInput?.scenario}
          onBack={() => setRoute('home')}
          onAnalyze={(input) => {
            setAnalysisInput(input);
            setRoute('result');
          }}
        />
      )}
      {route === 'result' && <Result caseData={result} onBackHome={() => setRoute('home')} />}
    </main>
  );
}
