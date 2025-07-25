"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export interface CaptchWidgetProps {
  onVerify: (token: string) => void;
  action?: string;
}

export function CaptchWidget({
  onVerify,
  action = "contact_form",
}: CaptchWidgetProps) {
  useEffect(() => {
    if (!window.grecaptcha) {
      console.warn("reCaptcha not loaded");
      return;
    }

    window.grecaptcha.ready(() => {
      window
        .grecaptcha!.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
          action,
        })
        .then(onVerify)
        .catch((err) => {
          console.error("reCaptcha failed", err);
        });
    });
  }, [onVerify, action]);

  return null;
}
