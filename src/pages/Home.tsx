import { Camera, FileText, Mic, SearchCheck } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';
import InstallPrompt from '../components/InstallPrompt';
import type { Scenario } from '../types';

const scenarios: Scenario[] = ['租房', '劳动', '消费', '合同'];

interface HomeProps {
  onStart: (scenario?: Scenario) => void;
}

export default function Home({ onStart }: HomeProps) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-mark">
          <SearchCheck size={28} aria-hidden="true" />
        </div>
        <p className="eyebrow">RAG · OCR · 语音输入 · 法条引用</p>
        <h1>法律风险识别助手</h1>
        <p className="hero-subtitle">拍照、语音或输入文字，快速识别生活场景中的法律风险</p>
      </section>

      <section className="entry-grid" aria-label="输入方式">
        <button className="entry-card" onClick={() => onStart()} type="button">
          <Camera size={24} aria-hidden="true" />
          <span>拍照识别</span>
        </button>
        <button className="entry-card" onClick={() => onStart()} type="button">
          <Mic size={24} aria-hidden="true" />
          <span>语音输入</span>
        </button>
        <button className="entry-card" onClick={() => onStart()} type="button">
          <FileText size={24} aria-hidden="true" />
          <span>文字咨询</span>
        </button>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>常见场景</h2>
          <span>先识别事实，再匹配依据</span>
        </div>
        <div className="scenario-list">
          {scenarios.map((scenario) => (
            <button key={scenario} className="scenario-chip" onClick={() => onStart(scenario)} type="button">
              {scenario === '租房' ? '租房押金' : scenario === '劳动' ? '劳动加班' : scenario === '消费' ? '消费退款' : '合同纠纷'}
            </button>
          ))}
        </div>
      </section>

      <section className="principle-panel">
        <h2>输出原则</h2>
        <ul>
          <li>不直接武断判断“合法/违法”</li>
          <li>没有法条依据时明确提示无法找到依据</li>
          <li>用风险等级、事实摘要和法条来源控制幻觉</li>
        </ul>
      </section>

      <InstallPrompt />
      <Disclaimer />
    </div>
  );
}
