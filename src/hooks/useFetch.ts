import {useEffect, useState} from 'react';

export function useFetch<T>(
  promiseFactory: () => Promise<T>,
  deps: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    promiseFactory()
      .then(d => mounted && setData(d))
      .catch(e => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, deps);

  return {data, loading, error} as const;
}
