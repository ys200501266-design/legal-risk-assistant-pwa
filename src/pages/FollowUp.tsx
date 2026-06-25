import { ArrowLeft, Send } from 'lucide-react';

interface FollowUpProps {
  onBack: () => void;
}

const prompts = ['我还需要准备哪些证据？', '应该怎样和对方书面沟通？', '如果协商失败，下一步找谁？'];

export default function FollowUp({ onBack }: FollowUpProps) {
  return (
    <section className="phone-page follow-page">
      <header className="top-bar">
        <button className="icon-button" onClick={onBack} type="button" aria-label="返回结果页">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <div>
          <span>继续追问</span>
          <h1>围绕证据和法条继续问</h1>
        </div>
      </header>

      <div className="question-list">
        {prompts.map((prompt) => (
          <button key={prompt} type="button">
            {prompt}
          </button>
        ))}
      </div>

      <section className="reply-card">
        <span>模拟回复</span>
        <p>
          继续追问也应遵循同一规则：先补充事实，再回到已定位的法律条文，不直接下结论。建议把合同原文、沟通记录、付款凭证和时间线补齐后，再判断下一步是协商、投诉、调解还是咨询律师。
        </p>
      </section>

      <div className="ask-box">
        <input aria-label="输入追问" placeholder="继续输入你的问题" />
        <button type="button" aria-label="发送">
          <Send size={19} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
