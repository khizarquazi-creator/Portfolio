import { useEffect, useRef, useState } from "react";

let twitterScriptPromise = null;
const loadTwitterScript = () => {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.twttr && window.twttr.widgets) return Promise.resolve(window.twttr);
  if (twitterScriptPromise) return twitterScriptPromise;
  twitterScriptPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.charset = "utf-8";
    s.onload = () => resolve(window.twttr);
    document.head.appendChild(s);
  });
  return twitterScriptPromise;
};

export const YouTubeEmbed = ({ id }) => (
  <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
    <iframe
      title="YouTube video"
      src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ width: "100%", height: "100%", border: 0, borderRadius: 12 }}
    />
  </div>
);

export const TwitterEmbed = ({ id, user = "x" }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadTwitterScript().then((twttr) => {
      if (cancelled || !ref.current || !twttr || !twttr.widgets) return;
      twttr.widgets
        .createTweet(id, ref.current, {
          theme: "dark",
          align: "center",
          conversation: "none",
          dnt: true,
        })
        .then(() => !cancelled && setReady(true));
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={ref}
        className="w-full flex justify-center"
        style={{ minHeight: ready ? "auto" : 320 }}
      />
      {!ready && (
        <p className="muted text-[13px] mt-3">Loading tweet…</p>
      )}
      <a
        href={`https://x.com/${user}/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow mt-4"
        style={{ fontSize: 10 }}
      >
        Open on X ↗
      </a>
    </div>
  );
};
