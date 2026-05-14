import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
    axios
      .get(`${API}/x-video/${user}/${id}`)
      .then((res) => {
        if (cancelled) return;
        cache.set(key, res.data);
        setData(res.data);
      })
      .catch((e) => !cancelled && setError(e));
    return () => {
      cancelled = true;
    };
  }, [user, id]);

  return { data, error };
};
