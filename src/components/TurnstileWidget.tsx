"use client";

import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  siteKey: string;
  onCallback: (token: string) => void;
}

export default function TurnstileWidget({
  siteKey,
  onCallback,
}: TurnstileWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);
  const callbackRef = useRef(onCallback);

  // Atualizar callback ref sem causar re-render
  callbackRef.current = onCallback;

  useEffect(() => {
    if (typeof window !== "undefined" && !isRendered.current) {
      // Criar callback único para este widget
      const callbackName = `turnstileCallback_${Date.now()}`;

      // Definir callback global
      (window as any)[callbackName] = (token: string) => {
        callbackRef.current(token);
      };

      // No modo implícito, executar o Turnstile automaticamente quando carregado
      const checkTurnstile = () => {
        if (
          (window as any).turnstile &&
          widgetRef.current &&
          !isRendered.current
        ) {
          try {
            (window as any).turnstile.render(widgetRef.current, {
              sitekey: String(siteKey),
              callback: (window as any)[callbackName],
              theme: "light",
              size: "compact",
            });
            isRendered.current = true;
          } catch (error) {
            console.warn("Turnstile render error:", error);
          }
        } else if (!isRendered.current) {
          setTimeout(checkTurnstile, 100);
        }
      };

      setTimeout(checkTurnstile, 500);

      // Cleanup
      return () => {
        if ((window as any)[callbackName]) {
          delete (window as any)[callbackName];
        }
        isRendered.current = false;
      };
    }
  }, [siteKey]);

  return (
    <div
      ref={widgetRef}
      className="cf-turnstile mx-auto"
      data-theme="dark"
      data-size="compact"
    ></div>
  );
}
