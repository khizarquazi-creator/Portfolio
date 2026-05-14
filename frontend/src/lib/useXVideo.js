import { useEffect, useState } from "react";

const cache = new Map();

export const useXVideo = (user, id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !id) return;
    const key = `${user}/${id}`;
    if (cache.has(key)) {
      setData(cache.get(key));
      return;
    }
    let cancelled = false;
    fetch(`https://api.fxtwitter.com/${user}/status/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`fxtwitter ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        const tweet = json?.tweet || {};
        const videos = tweet?.media?.videos || [];
        if (!videos.length) throw new Error("Tweet has no video");
        const v = videos[0];
        const result = {
          mp4: v.url,
          thumbnail: v.thumbnail_url,
          width: v.width,
          height: v.height,
          author: tweet?.author?.screen_name || user,
        };
        cache.set(key, result);
        setData(result);
      })
      .catch((e) => !cancelled && setError(e));
    return () => {
      cancelled = true;
    };
  }, [user, id]);

  return { data, error };
};
