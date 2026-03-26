"use client";

import { memo, useState, useEffect } from "react";

const TypingText = memo(({ words }: { words: string[] }) => {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const word = words[wi];
    const delay = del ? 55 : ci === word.length ? 1800 : 88;
    const t = setTimeout(() => {
      if (!del) {
        if (ci < word.length) {
          setTxt(word.slice(0, ci + 1));
          setCi((c) => c + 1);
        } else setDel(true);
      } else {
        if (ci > 0) {
          setTxt(word.slice(0, ci - 1));
          setCi((c) => c - 1);
        } else {
          setDel(false);
          setWi((i) => (i + 1) % words.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);

  return (
    <span>
      <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{txt}</span>
      <span className="typing-cursor" />
    </span>
  );
});

TypingText.displayName = "TypingText";

export default TypingText;
