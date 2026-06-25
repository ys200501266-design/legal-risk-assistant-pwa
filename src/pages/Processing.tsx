import { CheckCircle2, Loader2, Scale } from 'lucide-react';
import { useEffect } from 'react';

interface ProcessingProps {
  onDone: () => void;
}

const steps = ['提出问题：提取用户事实和诉求', '查找链接：读取用户提供和默认权威来源', '定位法条：精确到法律名称和条文编号', '思考方案：只基于已定位条文给建议'];

export default function Processing({ onDone }: ProcessingProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1500);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <section className="phone-page processing-page">
      <div className="processing-mark" aria-hidden="true">
        <Scale size={34} />
      </div>
      <h1>正在按法条检索</h1>
      <p>系统不会先给结论，而是按固定顺序：提出问题、查找链接、定位相关法律条文、再思考解决方案。</p>

      <div className="process-card">
        {steps.map((step, index) => (
          <div className="process-step" key={step}>
            <span className={index === steps.length - 1 ? 'step-icon loading' : 'step-icon done'}>
              {index === steps.length - 1 ? <Loader2 size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
