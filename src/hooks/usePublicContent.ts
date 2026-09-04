import { useEffect, useRef, useState, type DependencyList } from "react";

type State<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function usePublicContent<T>(
  loader: () => Promise<T>,
  deps: DependencyList = [],
  initialData: T | null = null,
) {
  const [state, setState] = useState<State<T>>({
    data: initialData,
    error: null,
    loading: initialData === null,
  });
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    setState({
      data: initialData,
      error: null,
      loading: initialData === null,
    });
  }, [initialData]);

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
  }, deps);

  return state;
}
