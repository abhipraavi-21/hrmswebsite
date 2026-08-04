import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import type { ContentRecord, ContentType, SeoRecord } from "@/admin/types";
import {
  PUBLIC_SITE_STATE_UPDATED_EVENT,
  PUBLIC_SITE_STATE_VERSION_KEY,
} from "@/lib/siteStateEvents";
import { fetchPublicSiteState, type PublicSiteState } from "@/lib/siteStateApi";
import { normalizePath } from "@/routes/routeConfig.js";

type PublicSiteDataContextValue = {
  data: PublicSiteState | null;
  isLoading: boolean;
  error: string;
};

const PublicSiteDataContext = createContext<PublicSiteDataContextValue | null>(null);

function normalizePublicPath(value: string) {
  if (!value) {
    return "/";
  }

  try {
    if (/^https?:/i.test(value)) {
      return normalizePath(new URL(value).pathname);
    }

    return normalizePath(value);
  } catch {
    return normalizePath(value);
  }
}

export function PublicSiteDataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<PublicSiteState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const isMountedRef = useRef(true);

  const loadSiteState = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const nextState = await fetchPublicSiteState();
      if (!isMountedRef.current) {
        return;
      }

      setData(nextState);
      setError("");
    } catch (requestError) {
      if (!isMountedRef.current) {
        return;
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load published site data.",
      );
    } finally {
      if (showLoading && isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    void loadSiteState(true);

    return () => {
      isMountedRef.current = false;
    };
  }, [loadSiteState]);

  useEffect(() => {
    const handleSiteStateUpdated = () => {
      void loadSiteState();
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === PUBLIC_SITE_STATE_VERSION_KEY &&
        event.newValue &&
        event.newValue !== event.oldValue
      ) {
        void loadSiteState();
      }
    };

    window.addEventListener(
      PUBLIC_SITE_STATE_UPDATED_EVENT,
      handleSiteStateUpdated as EventListener,
    );
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        PUBLIC_SITE_STATE_UPDATED_EVENT,
        handleSiteStateUpdated as EventListener,
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadSiteState]);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      error,
    }),
    [data, error, isLoading],
  );

  return (
    <PublicSiteDataContext.Provider value={value}>
      {children}
    </PublicSiteDataContext.Provider>
  );
}

export function usePublicSiteData() {
  const context = useContext(PublicSiteDataContext);

  if (!context) {
    throw new Error("usePublicSiteData must be used within PublicSiteDataProvider.");
  }

  return context;
}

export function usePublicSeoRecord(path?: string) {
  const { data } = usePublicSiteData();
  const normalizedPath = useMemo(
    () =>
      normalizePublicPath(
        path || (typeof window !== "undefined" ? window.location.pathname : "/"),
      ),
    [path],
  );

  return useMemo(
    () =>
      data?.seo.find((item) => normalizePublicPath(item.slug) === normalizedPath) ?? null,
    [data?.seo, normalizedPath],
  );
}

export function usePublicContentRecord(path: string, type?: ContentType) {
  const { data } = usePublicSiteData();
  const normalizedPath = useMemo(() => normalizePublicPath(path), [path]);

  return useMemo(
    () =>
      data?.content.find((item) => {
        if (type && item.type !== type) {
          return false;
        }

        return normalizePublicPath(item.slug) === normalizedPath;
      }) ?? null,
    [data?.content, normalizedPath, type],
  );
}

export function usePublishedContent(type?: ContentType) {
  const { data } = usePublicSiteData();

  return useMemo(() => {
    const records = data?.content ?? [];
    return type ? records.filter((item) => item.type === type) : records;
  }, [data?.content, type]);
}

export function resolveLinkedSeoRecord(
  seoRecords: SeoRecord[] | undefined,
  contentRecord: ContentRecord | null,
) {
  if (!seoRecords?.length || !contentRecord) {
    return null;
  }

  return (
    seoRecords.find((item) => item.entityId === contentRecord.id) ??
    seoRecords.find((item) => normalizePublicPath(item.slug) === normalizePublicPath(contentRecord.slug)) ??
    null
  );
}
