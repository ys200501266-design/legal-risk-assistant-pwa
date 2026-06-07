import { ArrowLeft, BookOpenText, CheckCircle2, FileSearch, Lightbulb, Scale, ShieldAlert } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';
import type { LegalCase, RiskLevel } from '../types';

const riskClass: Record<RiskLevel, string> = {
  低风险: 'risk-low',
  中风险: 'risk-medium',
  高风险: 'risk-high',
  无法判断: 'risk-unknown',
};

interface ResultProps {
  caseData: LegalCase;
  onBackHome: () => void;
}

export default function Result({ caseData, onBackHome }: ResultProps) {
  return (
    <div className="page result-page">
      <header className="top-bar">
        <button className="icon-button" onClick={onBackHome} type="button" aria-label="返回首页">
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
        <div>
          <p>风险提示结果</p>
          <h1>基于事实与法条的提示</h1>
        </div>
      </header>

      <section className="result-summary">
        <div>
          <span className="summary-label">识别到的问题</span>
          <h2>{caseData.userInput}</h2>
        </div>
        <div className={`risk-badge ${riskClass[caseData.riskLevel]}`}>
          <ShieldAlert size={18} aria-hidden="true" />
          {caseData.riskLevel}
        </div>
      </section>

      <section className="result-card">
        <div className="card-heading">
          <FileSearch size={20} aria-hidden="true" />
          <h2>事实摘要</h2>
        </div>
        <ul className="fact-list">
          {caseData.extractedFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section className="result-card">
        <div className="card-heading">
          <BookOpenText size={20} aria-hidden="true" />
          <h2>相关法律依据</h2>
        </div>
        {caseData.relatedLaws.length > 0 ? (
          <div className="law-list">
            {caseData.relatedLaws.map((law) => (
              <article className="law-card" key={`${law.lawName}-${law.article}`}>
                <div>
                  <h3>{law.lawName}</h3>
                  <span>{law.article}</span>
                </div>
                <p>{law.summary}</p>
                <a href={law.sourceUrl} rel="noreferrer" target="_blank">
                  查看来源
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-law">未找到明确法律依据，建议补充信息或咨询专业人士。</p>
        )}
      </section>

      <section className="result-card">
        <div className="card-heading">
          <Scale size={20} aria-hidden="true" />
          <h2>AI 解释</h2>
        </div>
        <p>{caseData.explanation}</p>
      </section>

      <section className="result-card">
        <div className="card-heading">
          <Lightbulb size={20} aria-hidden="true" />
          <h2>下一步建议</h2>
        </div>
        <ul className="suggestion-list">
          {caseData.suggestions.map((suggestion) => (
            <li key={suggestion}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </section>

      <Disclaimer />

      <div className="bottom-action">
        <button className="primary-button" onClick={onBackHome} type="button">
          <ArrowLeft size={20} aria-hidden="true" />
          返回首页
        </button>
      </div>
    </div>
  );
}
