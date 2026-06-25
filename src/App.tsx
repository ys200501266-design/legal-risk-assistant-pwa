import { useEffect, useState } from 'react';
import FollowUp from './pages/FollowUp';
import History from './pages/History';
import Home from './pages/Home';
import Input from './pages/Input';
import Processing from './pages/Processing';
import Result from './pages/Result';
import { defaultSourceLinks } from './lib/legalAnalysis';
import type { AnalysisInput, HistoryItem, Route } from './types';

const HISTORY_KEY = 'legal-risk-assistant-history';

const defaultInput: AnalysisInput = {
  text: '',
  scenario: '其他',
  sourceLinks: defaultSourceLinks,
};

function loadHistory(): HistoryItem[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

function getSaveTime() {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

function createHistoryItem(input: AnalysisInput): HistoryItem {
  return {
    id: `risk-${Date.now()}`,
    scenario: input.scenario,
    riskLevel: input.text ? '中风险' : '无法判断',
    title: input.text ? '法律条文检索结果' : '信息不足的法律检索结果',
    time: getSaveTime(),
    inputText: input.text,
    imageName: input.imageName,
    sourceLinks: input.sourceLinks,
  };
}

export default function App() {
  const [route, setRoute] = useState<Route>('home');
  const [input, setInput] = useState<AnalysisInput>(defaultInput);
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const goInput = () => setRoute('input');

  const saveResult = () => {
    const item = createHistoryItem(input);
    setHistory((current) => [item, ...current.filter((record) => record.title !== item.title)].slice(0, 12));
  };

  const openHistoryItem = (item: HistoryItem) => {
    setInput({
      text: item.inputText || '',
      scenario: item.scenario,
      imageName: item.imageName,
      sourceLinks: item.sourceLinks || defaultSourceLinks,
    });
    setRoute('result');
  };

  return (
    <main className="app-shell">
      {route === 'home' && <Home onImageInput={goInput} onTextInput={goInput} />}
      {route === 'input' && (
        <Input
          initialInput={input}
          onBack={() => setRoute('home')}
          onStart={(nextInput) => {
            setInput(nextInput);
            setRoute('processing');
          }}
        />
      )}
      {route === 'processing' && <Processing onDone={() => setRoute('result')} />}
      {route === 'result' && (
        <Result
          input={input}
          isSaved={history.some((item) => item.inputText === input.text && item.scenario === input.scenario)}
          onAsk={() => setRoute('followup')}
          onHistory={() => setRoute('history')}
          onRestart={goInput}
          onSave={saveResult}
        />
      )}
      {route === 'followup' && <FollowUp onBack={() => setRoute('result')} />}
      {route === 'history' && <History items={history} onBack={() => setRoute('result')} onOpen={openHistoryItem} />}
    </main>
  );
}
