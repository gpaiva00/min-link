type Props = {
  siteKey: string;
  onCallback: (token: string) => void;
};

export default function TurnstileWidget({ siteKey, onCallback }: Props) {
  return (
    <div
      className="cf-turnstile"
      data-callback="onCallback"
      data-sitekey={siteKey}
    ></div>
  );
}
