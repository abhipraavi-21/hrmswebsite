import { useEffect, useRef, useState } from "react";

type State<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function usePublicContent<T>(loader: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({
    data: null,
    error: null,
    loading: true,
  });
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const data = await loaderRef.current();

        if (!cancelled) {
          setState({
            data,
            error: null,
            loading: false,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            error: error instanceof Error ? error.message : "Unable to load content",
            loading: false,
          });
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
