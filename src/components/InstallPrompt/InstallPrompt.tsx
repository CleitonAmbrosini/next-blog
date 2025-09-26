'use client';
import { useEffect, useState } from 'react';

type BIP = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  // iOS
  if (typeof window === 'undefined') return false;
  // @ts-expect-error some error
  const iOSStandalone = window.navigator.standalone === true;
  // Padrão
  const displayMode = window.matchMedia?.(
    '(display-mode: standalone)',
  )?.matches;
  return iOSStandalone || displayMode;
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIP | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) return; // já instalado

    const handler = (e: Event) => {
      e.preventDefault?.(); // cancela o mini-infobar
      setDeferred(e as BIP);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () =>
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  if (isInStandaloneMode()) return null;

  // iOS: mostrar instruções em vez do prompt
  if (isIOS() && showBanner) {
    return (
      <div className='fixed inset-x-0 bottom-0 z-50 m-4 rounded-2xl border bg-white/90 p-4 shadow-xl backdrop-blur'>
        <p className='text-sm'>
          Para instalar, toque no botão <strong>Compartilhar</strong> do Safari
          e depois em <strong>“Adicionar à Tela de Início”</strong>.
        </p>
        <button
          className='mt-3 rounded-xl border px-3 py-2'
          onClick={() => setShowBanner(false)}
        >
          Entendi
        </button>
      </div>
    );
  }

  if (!deferred || !showBanner) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 z-50 m-4 rounded-2xl border bg-white/90 p-4 shadow-xl backdrop-blur'>
      <p className='text-sm'>Instalar este app no seu dispositivo?</p>
      <div className='mt-3 flex gap-2'>
        <button
          className='rounded-xl border px-3 py-2'
          onClick={async () => {
            setShowBanner(false);
            await deferred.prompt();
            try {
              const choice = await deferred.userChoice;
              console.log('User choice:', choice);
            } catch {}
            setDeferred(null);
          }}
        >
          Instalar
        </button>
        <button
          className='rounded-xl border px-3 py-2'
          onClick={() => setShowBanner(false)}
        >
          Agora não
        </button>
      </div>
    </div>
  );
}
