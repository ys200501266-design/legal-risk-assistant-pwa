import { ShieldAlert } from 'lucide-react';

export default function Disclaimer() {
  return (
    <aside className="disclaimer">
      <ShieldAlert size={18} aria-hidden="true" />
      <p>本工具仅提供法律信息检索与风险提示，不构成法律意见，不替代律师或司法机关判断。</p>
    </aside>
  );
}
