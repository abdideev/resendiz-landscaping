"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UsePortfolioPaginationOptions {
  scrollTargetId?: string;
}

export function usePortfolioPagination<T>(
  items: readonly T[],
  pageSize: number,
  options: UsePortfolioPaginationOptions = {},
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scrollTargetId } = options;

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  const initialPage = useMemo(() => {
    const raw = searchParams.get("page");
    const parsed = raw ? Number(raw) - 1 : 0;
    if (Number.isNaN(parsed)) return 0;
    return Math.min(Math.max(parsed, 0), pageCount - 1);
  }, [searchParams, pageCount]);

  const [page, setPage] = useState(initialPage);
  const [shouldScroll, setShouldScroll] = useState(false);

  const visibleItems = useMemo(() => {
    const start = page * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const canGoNext = page < pageCount - 1;
  const canGoPrev = page > 0;

  // Sincroniza la URL como efecto, no dentro del setState.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentInUrl = params.get("page");
    const target = String(page + 1);

    if (currentInUrl !== target) {
      params.set("page", target);
      router.replace(`/portfolio?${params.toString()}`, { scroll: false });
    }
  }, [page]);

  useEffect(() => {
    if (!shouldScroll || !scrollTargetId) return;
    const el = document.getElementById(scrollTargetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShouldScroll(false);
  }, [shouldScroll, page]);

  function next() {
    setPage((p) => Math.min(p + 1, pageCount - 1));
    setShouldScroll(true);
  }

  function prev() {
    setPage((p) => Math.max(p - 1, 0));
    setShouldScroll(true);
  }

  return {
    page,
    pageCount,
    visibleItems,
    canGoNext,
    canGoPrev,
    next,
    prev,
  };
}