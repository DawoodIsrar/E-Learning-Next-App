import { isProduction } from "@/utils/common";
import { useEffect } from "react";

function code() {
  function setTheme(newTheme) {
    window.__theme = newTheme;
    document.documentElement.dataset.theme = newTheme;
  }

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };

  // Defer theme setting to ensure the page is responsive
  requestAnimationFrame(() => {
    let preferredTheme;
    try {
      preferredTheme = localStorage.getItem("theme");
    } catch (err) {}

    let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const selectedTheme =
      preferredTheme || (darkQuery.matches ? "dark" : "light");

    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);

    let currentTheme = window.__theme;

    Object.defineProperty(window, "__theme", {
      get() {
        return currentTheme;
      },
      set(value) {
        currentTheme = value;
        const event = new Event("themeChange");
        window.dispatchEvent(event);
      },
      configurable: true,
      enumerable: true,
    });
  });
}

export default function ThemeScript() {
  useEffect(() => {
    let script1;
    let script2;
    const script = document.createElement("script");
    script.innerHTML = `(${code})();`;
    document.head.appendChild(script);
    if (isProduction) {
      script1 = document.createElement("script");
      script1.src =
        "https://fundingchoicesmessages.google.com/i/pub-4131796306735122?ers=1";
      script1.async = true;
      script1.nonce = "0irSLe2RGpwKFvqOiCLHuA";
      document.head.appendChild(script1);
      script2 = document.createElement("script");
      script2.nonce = "0irSLe2RGpwKFvqOiCLHuA";
      script2.innerHTML = (function () {
        function signalGooglefcPresent() {
          if (!window.frames["googlefcPresent"]) {
            if (document.body) {
              const iframe = document.createElement("iframe");
              iframe.style =
                "width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;";
              iframe.style.display = "none";
              iframe.name = "googlefcPresent";
              document.body.appendChild(iframe);
            } else {
              setTimeout(signalGooglefcPresent, 0);
            }
          }
        }
        signalGooglefcPresent();
      })();
      document.head.appendChild(script2);
      document.head.appendChild(script1);
    }
    return () => {
      document.head.removeChild(script);
      if (isProduction) {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      }
    };
  }, []);

  return null;
}
