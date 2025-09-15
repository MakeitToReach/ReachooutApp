import { useEffect, useState } from "react";

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);

    // iPadOS 13+ reports as Mac, so we need to check for touch support
    const isIPadOS =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

    setIsIOS(isIOSDevice || isIPadOS);
  }, []);

  return isIOS;
}
