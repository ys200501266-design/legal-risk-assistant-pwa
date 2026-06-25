import {
  BookOpenText,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  History,
  Link2,
  MessageCircle,
  RefreshCcw,
  Save,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { analyzeLegalQuestion } from '../lib/legalAnalysis';
import type { AnalysisInput } from '../types';

interface ResultProps {
  input: AnalysisInput;
  isSaved: boolean;
  onAsk: () => void;
  onHistory: () => void;
  onRestart: () => void;
  onSave: () => void;
}

export default function Result({ input, isSaved, onAsk, onHistory, onRestart, onSave }: ResultProps) {
  const [saved, setSaved] = useState(isSaved);
  const [showToast, setShowToast] = useState(false);
  const analysis = useMemo(() => analyzeLegalQuestion(input), [input]);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved, input.text, input.scenario]);

  const save = () => {
    if (!saved) {
      onSave();
      setSaved(true);
    }
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 1600);
  };

  return (
    <section className="phone-page result-page">
      <header className="result-header">
        <span>检索结果</span>
        <button className="text-button" onClick={onHistory} type="button">
          <History size={16} aria-hidden="true" />
          历史记录
        </button>
      </header>

      <section className="content-card chain-card">
        <div className="chain-step-label">1. 提出问题</div>
        <h2>用户原问题</h2>
        <p className="lead-text">{analysis.userQuestion}</p>
        <ul className="fact-list">
          {analysis.extractedFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section className="content-card chain-card">
        <div className="card-title-row">
          <Link2 size={19} aria-hidden="true" />
          <h2>2. 查找链接</h2>
        </div>
        <p className="helper-text no-margin">系统先从用户原问题中提取关键词，再到下列来源中定位法条。Demo 使用内置法规索引模拟检索；正式版应实时抓取用户提供链接正文。</p>
        {analysis.searchKeywords.length ? (
          <div className="keyword-row" aria-label="命中关键词">
            {analysis.searchKeywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        ) : null}
        <div className="source-list">
          {analysis.searchSources.map((source) => (
            <a className="source-item" href={source.url} key={`${source.title}-${source.url}`} rel="noreferrer" target="_blank">
              <div>
                <strong>{source.title}</strong>
                <span>{source.purpose}</span>
              </div>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="content-card law-card compact-card">
        <div className="card-title-row">
          <BookOpenText size={19} aria-hidden="true" />
          <h2>3. 定位相关法律条文</h2>
        </div>

        {analysis.relatedLaws.length ? (
          <div className="law-list">
            {analysis.relatedLaws.map((law) => (
              <article className="precise-law-card" key={`${law.lawName}-${law.article}`}>
                <div className="law-title-row">
                  <div>
                    <strong>{law.lawName}</strong>
                    <span>
                      {law.article}
                      {law.articleTitle ? `：${law.articleTitle}` : ''}
                    </span>
                  </div>
                  <a href={law.sourceUrl} rel="noreferrer" target="_blank" aria-label="查看来源">
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </div>
                <div className="quote-box compact-quote">
                  <strong>来源原文摘录（未改写）</strong>
                  <p>{law.originalExcerpt}</p>
                </div>
                <p className="law-summary-text">
                  <strong>系统摘要：</strong>
                  {law.summary}
                </p>
                <p className="relevance-text">
                  <strong>与本问题的关系：</strong>
                  {law.relevance}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="law-warning">未找到明确法律依据，建议补充信息或咨询专业人士。</p>
        )}
      </section>

      <section className="content-card chain-card">
        <div className="card-title-row">
          <FileSearch size={19} aria-hidden="true" />
          <h2>4. 思考解决问题</h2>
        </div>
        <p>{analysis.reasoning}</p>
        {analysis.noBasisMessage ? <p className="law-warning">{analysis.noBasisMessage}</p> : null}
      </section>

      <section className="content-card first-action">
        <h2>解决方案</h2>
        <ol className="action-list">
          {analysis.solutionPlan.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </section>

      <section className="content-card">
        <h2>还需要补充的材料</h2>
        <ul className="evidence-list">
          {analysis.nextEvidence.map((item) => (
            <li key={item}>
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="result-disclaimer">{analysis.disclaimer}</p>

      {showToast ? (
        <div className="save-toast" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          已保存到历史记录
        </div>
      ) : null}

      <div className="result-actions">
        <button className="secondary-button" onClick={onAsk} type="button">
          <MessageCircle size={18} aria-hidden="true" />
          继续追问
        </button>
        <button className={saved ? 'secondary-button saved-button' : 'secondary-button'} onClick={save} type="button">
          {saved ? <CheckCircle2 size={18} aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
          {saved ? '已保存' : '保存结果'}
        </button>
        <button className="secondary-button" onClick={onRestart} type="button">
          <RefreshCcw size={18} aria-hidden="true" />
          重新检索
        </button>
      </div>
    </section>
  );
}
