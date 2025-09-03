import { useEffect } from 'react';

declare global {
  interface Window {
    onTurnstileCallback?: (token: string) => void;
  }
}

type Props = {
  siteKey: string;
  onCallback: (token: string) => void;
};

export default function TurnstileWidget({ siteKey, onCallback }: Props) {
  useEffect(() => {
    window.onTurnstileCallback = (token: string) => {
      onCallback(token);
    };

    return () => {
      window.onTurnstileCallback = undefined;
    };
  }, [onCallback]);

  return (
    <div
      className="cf-turnstile"
      data-sitekey={siteKey}
      data-callback="onTurnstileCallback"
    ></div>
  );
}
