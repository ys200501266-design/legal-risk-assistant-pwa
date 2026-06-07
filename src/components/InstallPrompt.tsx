import { useEffect, useState } from 'react';
import { Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed || dismissed) {
    return null;
  }

  const handleInstall = async () => {
    if (!installEvent) {
      return;
    }

    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted' || choice.outcome === 'dismissed') {
      setInstallEvent(null);
    }
  };

  return (
    <section className="install-prompt" aria-label="PWA 安装提示">
      <div className="install-copy">
        <Smartphone size={20} aria-hidden="true" />
        <div>
          <strong>{installEvent ? '添加到手机桌面' : '可通过浏览器菜单添加到主屏幕'}</strong>
          <p>{installEvent ? '安装后以 App 形式打开，无需下载原生应用。' : '在 Safari 或部分浏览器中，请使用分享或菜单按钮添加。'}</p>
        </div>
      </div>
      {installEvent ? (
        <button className="install-button" onClick={handleInstall} type="button">
          <Download size={18} aria-hidden="true" />
          添加
        </button>
      ) : (
        <button className="ghost-icon-button" onClick={() => setDismissed(true)} type="button" aria-label="关闭安装说明">
          知道了
        </button>
      )}
    </section>
  );
}
