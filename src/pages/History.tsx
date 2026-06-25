import { ArrowLeft, ChevronRight } from 'lucide-react';
import type { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
  onBack: () => void;
  onOpen: (item: HistoryItem) => void;
}

export default function History({ items, onBack, onOpen }: HistoryProps) {
  return (
    <section className="phone-page">
      <header className="top-bar">
        <button className="icon-button" onClick={onBack} type="button" aria-label="返回结果页">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <div>
          <span>历史记录</span>
          <h1>最近检索记录</h1>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="empty-state">
          <h2>暂无历史记录</h2>
          <p>完成一次法律风险检索并保存后，可以在这里查看。</p>
        </section>
      ) : (
        <div className="history-list">
          {items.map((item) => (
            <article className="history-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.time}</span>
              </div>
              <button className="view-detail-button" onClick={() => onOpen(item)} type="button">
                查看详情
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
