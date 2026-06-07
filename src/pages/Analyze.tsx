import { ArrowLeft, Camera, FileAudio, Loader2, Mic, Send } from 'lucide-react';
import { useState } from 'react';
import type { AnalysisInput, Scenario } from '../types';

const scenarioOptions: Scenario[] = ['租房', '劳动', '消费', '合同', '其他'];

interface AnalyzeProps {
  initialScenario?: Scenario;
  onBack: () => void;
  onAnalyze: (input: AnalysisInput) => void;
}

export default function Analyze({ initialScenario = '租房', onBack, onAnalyze }: AnalyzeProps) {
  const [text, setText] = useState('');
  const [scenario, setScenario] = useState<Scenario>(initialScenario);
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const submit = () => {
    if (!text.trim() && !imageName) {
      setError('请先上传图片或输入一段问题描述，再开始分析。');
      return;
    }

    setError('');
    setIsAnalyzing(true);
    window.setTimeout(() => {
      onAnalyze({ text: text.trim(), scenario, imageName: imageName || undefined });
    }, 420);
  };

  return (
    <div className="page analyze-page">
      <header className="top-bar">
        <button className="icon-button" onClick={onBack} type="button" aria-label="返回首页">
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
        <div>
          <p>问题输入</p>
          <h1>描述你的法律场景</h1>
        </div>
      </header>

      <section className="upload-zone">
        <Camera size={28} aria-hidden="true" />
        <div>
          <h2>上传图片材料</h2>
          <p>支持合同、票据、聊天记录截图等，Demo 中先展示 OCR 入口。</p>
        </div>
        <label className="file-trigger">
          选择图片
          <input
            accept="image/*"
            capture="environment"
            type="file"
            onChange={(event) => setImageName(event.target.files?.[0]?.name ?? '')}
          />
        </label>
        {imageName && <span className="file-name">{imageName}</span>}
      </section>

      <section className="form-card">
        <label htmlFor="scenario">场景类型</label>
        <div className="segmented-control" id="scenario">
          {scenarioOptions.map((option) => (
            <button
              className={option === scenario ? 'active' : ''}
              key={option}
              onClick={() => setScenario(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="form-card">
        <label htmlFor="question">文字描述</label>
        <textarea
          id="question"
          maxLength={600}
          onChange={(event) => setText(event.target.value)}
          placeholder="例如：房东拒绝退押金，只说墙面有磨损，但没有给维修票据。"
          value={text}
        />
        <div className="textarea-meta">
          <span>{text.length}/600</span>
          <button className="voice-placeholder" type="button">
            <Mic size={16} aria-hidden="true" />
            语音输入
          </button>
        </div>
      </section>

      <section className="voice-card">
        <FileAudio size={22} aria-hidden="true" />
        <div>
          <h2>语音输入占位</h2>
          <p>后续可接入 Web Speech API 或移动端录音上传。</p>
        </div>
      </section>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="bottom-action">
        <button className="primary-button" disabled={isAnalyzing} onClick={submit} type="button">
          {isAnalyzing ? <Loader2 className="spin" size={20} aria-hidden="true" /> : <Send size={20} aria-hidden="true" />}
          {isAnalyzing ? '分析中' : '开始分析'}
        </button>
      </div>
    </div>
  );
}
