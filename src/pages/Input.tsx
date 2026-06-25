import { ArrowLeft, Camera, FileText, Link2 } from 'lucide-react';
import { useState } from 'react';
import { defaultSourceLinks } from '../lib/legalAnalysis';
import type { AnalysisInput } from '../types';

interface InputProps {
  initialInput: AnalysisInput;
  onBack: () => void;
  onStart: (input: AnalysisInput) => void;
}

export default function Input({ initialInput, onBack, onStart }: InputProps) {
  const [text, setText] = useState(
    initialInput.text ||
      '例如：公司要求我每天加班到晚上十点，但是没有加班费，也没有安排调休。劳动合同里只写了标准工时。',
  );
  const [imageName, setImageName] = useState(initialInput.imageName || '');
  const [sourceLinks, setSourceLinks] = useState(initialInput.sourceLinks || defaultSourceLinks);
  const [error, setError] = useState('');

  const start = () => {
    if (!text.trim() && !imageName) {
      setError('请先提出具体问题，或上传合同/聊天记录等材料。');
      return;
    }

    if (!sourceLinks.trim()) {
      setError('请至少保留一个法律来源链接，系统必须先查找来源再生成方案。');
      return;
    }

    setError('');
    onStart({ text, scenario: '其他', imageName, sourceLinks });
  };

  return (
    <section className="phone-page">
      <header className="top-bar">
        <button className="icon-button" onClick={onBack} type="button" aria-label="返回首页">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <div>
          <span>提出问题</span>
          <h1>先给问题，再给来源链接</h1>
        </div>
      </header>

      <label className="upload-box">
        <Camera size={26} aria-hidden="true" />
        <strong>上传合同或证据材料</strong>
        <p>支持租房合同、劳动合同、票据、聊天记录截图。Demo 会记录文件名，正式版可接入 OCR。</p>
        <input
          accept="image/*"
          type="file"
          onChange={(event) => setImageName(event.target.files?.[0]?.name || '')}
        />
        <span>{imageName || '选择图片'}</span>
      </label>

      <section className="form-block">
        <div className="field-title">
          <FileText size={18} aria-hidden="true" />
          <label htmlFor="case-text">你的问题</label>
        </div>
        <textarea
          id="case-text"
          maxLength={700}
          onChange={(event) => setText(event.target.value)}
          placeholder="请描述发生了什么、对方怎么说、合同怎么约定、你想解决什么问题。"
          value={text}
        />
        <p className="helper-text">系统会严格按“提出问题 → 查找链接 → 定位法条 → 思考方案”的顺序生成结果。</p>
      </section>

      <section className="form-block">
        <div className="field-title">
          <Link2 size={18} aria-hidden="true" />
          <label htmlFor="source-links">法律来源链接</label>
        </div>
        <textarea
          className="source-textarea"
          id="source-links"
          maxLength={800}
          onChange={(event) => setSourceLinks(event.target.value)}
          placeholder="每行一个链接。建议使用国家法律法规数据库、全国人大等权威来源。"
          value={sourceLinks}
        />
        <p className="helper-text">结果页会先展示已查找的链接；没有明确法条依据时，不给确定方案。</p>
      </section>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="sticky-action">
        <button className="primary-button" onClick={start} type="button">
          开始严谨检索
        </button>
      </div>
    </section>
  );
}
