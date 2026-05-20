"use client";

import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import Image from "next/image";
import { getDbProducts } from "@/app/actions/product";
import type { Product } from "@/types/product";
import {
  productCategories,
  productSortOptions,
  type ProductCategoryFilter,
  type ProductSortOption,
} from "@/constants/products";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

export function ShopBrowser() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategoryFilter>("all");
  const [sort, setSort] = useState<ProductSortOption>("featured");

  useEffect(() => {
    async function load() {
      const res = await getDbProducts();
      if (res.success && res.products) {
        setDbProducts(res.products);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return dbProducts
      .filter((product) => {
        const matchesQuery = product.name
          .toLowerCase()
          .includes(normalizedQuery);
        const matchesCategory =
          category === "all" ? true : product.category === category;

        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "newest") {
          return b.releaseOrder - a.releaseOrder;
        }

        if (sort === "highest-protein") {
          return b.proteinGrams - a.proteinGrams;
        }

        if (sort === "highest-calories") {
          return b.calories - a.calories;
        }

        return Number(b.isFeatured) - Number(a.isFeatured);
      });
  }, [dbProducts, category, query, sort]);

  return (
    <section className="relative overflow-hidden py-8 md:py-12 bg-[#F8F4EE]">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EE] via-white/80 to-[#F8F4EE]" />
      </div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="border border-ivory-200 bg-white p-4 md:p-5 shadow-sm rounded-2xl"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search by product name</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-500"
                aria-hidden
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product name"
                className="h-14 w-full border border-ivory-200 bg-ivory-50 pl-12 pr-4 text-sm font-semibold text-foreground outline-none placeholder:text-muted focus:border-gold-300 focus:bg-white rounded-xl transition-colors"
              />
            </label>

            <label className="relative block lg:w-64">
              <span className="sr-only">Sort products</span>
              <SlidersHorizontal
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-400"
                aria-hidden
              />
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as ProductSortOption)
                }
                className="h-14 w-full appearance-none border border-ivory-200 bg-ivory-50 pl-12 pr-10 text-sm font-bold uppercase text-foreground outline-none focus:border-gold-300 focus:bg-white rounded-xl transition-colors"
              >
                {productSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-muted" />
            </label>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {productCategories.map((item) => {
              const isActive = category === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setCategory(item.value)}
                  className={cn(
                    "relative min-h-11 shrink-0 border px-5 py-2 text-[11px] tracking-[0.1em] font-semibold uppercase rounded-full transition-all duration-200 overflow-hidden group active:scale-[0.97] hover:scale-[1.02]",
                    isActive
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "border-[#d1d1d1] bg-transparent text-[#666] hover:border-[#1a1a1a] hover:text-[#1a1a1a]",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-shop-filter"
                      className="absolute inset-0 bg-[#1a1a1a]"
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    />
                  ) : null}
                  <span className={cn("relative z-10", isActive && "text-white")}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {loading ? (
          <div className="mt-12 h-64 flex items-center justify-center border border-ivory-200 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Loader2 className="animate-spin text-gold-500 h-8 w-8" />
          </div>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="text-sm font-bold uppercase text-muted">
                {filteredProducts.length} Product
                {filteredProducts.length === 1 ? "" : "s"}
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-ivory-200 via-gold-200 to-transparent" />
            </div>

            <motion.div
              layout
              className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 border border-ivory-200 bg-white p-8 text-center rounded-2xl shadow-sm"
              >
                <h2 className="text-4xl text-foreground font-bold">No products found.</h2>
                <p className="mt-3 text-sm text-muted">
                  Try a different search term or switch back to all products.
                </p>
              </motion.div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
