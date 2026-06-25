import { Camera, FileText, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onImageInput: () => void;
  onTextInput: () => void;
}

export default function Home({ onImageInput, onTextInput }: HomeProps) {
  return (
    <section className="phone-page home-page">
      <div className="status-copy">AI 法律风险检索助手</div>

      <header className="home-hero">
        <div className="product-mark" aria-hidden="true">
          <ShieldCheck size={30} />
        </div>
        <h1>法律风险识别助手</h1>
        <p>提出问题，查找来源链接，定位具体法条，再生成解决方案。</p>
      </header>

      <div className="entry-actions" aria-label="选择输入方式">
        <button className="entry-button primary-entry" onClick={onImageInput} type="button">
          <Camera size={22} aria-hidden="true" />
          上传合同/截图
        </button>
        <button className="entry-button" onClick={onTextInput} type="button">
          <FileText size={22} aria-hidden="true" />
          输入法律问题
        </button>
      </div>

      <section className="quiet-panel">
        <h2>严谨检索流程</h2>
        <div className="mini-grid">
          <span>提出问题</span>
          <span>查找链接</span>
          <span>定位法条</span>
          <span>形成方案</span>
          <span>证据清单</span>
          <span>免责声明</span>
        </div>
      </section>

      <p className="bottom-note">本工具只提供法律信息检索与风险提示，不直接作出“违法/合法”的绝对判断。</p>
    </section>
  );
}
