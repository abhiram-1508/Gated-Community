import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export default function useApiData(url, fallback, options = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const load = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await api.get(url);
      setData(response.data.data ?? fallback);
      setOffline(false);
    } catch {
      setData(fallback);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { load(); }, [load]);
  return { data, setData, loading, offline, reload: load, ...options };
}
