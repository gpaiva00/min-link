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
  return (
    <div
      className="cf-turnstile"
      data-callback="onCallback"
      data-sitekey={siteKey}
    ></div>
  );
}
