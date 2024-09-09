"use client";

import { useEffect } from "react";
import Prism from "prismjs";

Prism.languages.custom = {
  line: {
    pattern: /(.*)(\r?\n|$)/,
    inside: {
      prompt: /^\$.*/,
    },
  },
};

const PrismClient = () => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return null;
};

export default PrismClient;
