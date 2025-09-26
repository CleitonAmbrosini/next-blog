'use client';
import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const isIOS = () =>
  typeof navigator !== 'undefined' &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);
type NavigatorWithStandalone = Navigator & { standalone?: boolean };

const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  // iOS Safari
  const iOSStandalone =
    (window.navigator as NavigatorWithStandalone).standalone === true;
  // Padrão
  const displayMode = window.matchMedia?.(
    '(display-mode: standalone)',
  )?.matches;
  return iOSStandalone || displayMode;
};

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    const handler = (e: Event) => {
      (e as BeforeInstallPromptEvent).preventDefault?.();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () =>
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  if (isStandalone() || !show) return null;

  // iOS não suporta beforeinstallprompt: mostrar instruções
  if (isIOS()) {
    return (
      <div className='fixed inset-x-0 bottom-0 z-50 m-4 rounded-2xl border bg-white/90 p-4 shadow-xl backdrop-blur'>
        <p className='text-sm'>
          Para instalar: toque em <b>Compartilhar</b> no Safari e depois em{' '}
          <b>Adicionar à Tela de Início</b>.
        </p>
        <button
          className='mt-3 rounded-xl border px-3 py-2'
          onClick={() => setShow(false)}
        >
          Entendi
        </button>
      </div>
    );
  }

  if (!deferred) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 z-50 m-4 rounded-2xl border bg-white/90 p-4 shadow-xl backdrop-blur'>
      <p className='text-sm'>Instalar este app no seu dispositivo?</p>
      <div className='mt-3 flex gap-2'>
        <button
          className='rounded-xl border px-3 py-2'
          onClick={async () => {
            setShow(false);
            await deferred.prompt();
            try {
              await deferred.userChoice;
            } catch {}
            setDeferred(null);
          }}
        >
          Instalar
        </button>
        <button
          className='rounded-xl border px-3 py-2'
          onClick={() => setShow(false)}
        >
          Agora não
        </button>
      </div>
    </div>
  );
}
