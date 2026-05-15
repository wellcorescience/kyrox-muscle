"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import {
  productCategories,
  products,
  productSortOptions,
  type ProductCategoryFilter,
  type ProductSortOption,
} from "@/constants/products";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

export function ShopBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategoryFilter>("all");
  const [sort, setSort] = useState<ProductSortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products
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
  }, [category, query, sort]);

  return (
    <section className="bg-carbon-900 py-8 md:py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/10 bg-white/[0.03] p-4 md:p-5"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search by product name</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-electric-300"
                aria-hidden
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product name"
                className="h-14 w-full border border-white/10 bg-black/70 pl-12 pr-4 text-sm font-semibold text-white outline-none placeholder:text-zinc-600 focus:border-electric-300/70"
              />
            </label>

            <label className="relative block lg:w-64">
              <span className="sr-only">Sort products</span>
              <SlidersHorizontal
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-metal-200"
                aria-hidden
              />
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as ProductSortOption)
                }
                className="h-14 w-full appearance-none border border-white/10 bg-black/70 pl-12 pr-10 text-sm font-bold uppercase text-white outline-none focus:border-metal-200/70"
              >
                {productSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-zinc-400" />
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
                    "relative min-h-11 shrink-0 border px-4 text-sm font-bold uppercase text-zinc-300",
                    isActive
                      ? "border-electric-300/60 text-white"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:text-white",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-shop-filter"
                      className="absolute inset-0 bg-electric-400/[0.12]"
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-bold uppercase text-zinc-500">
            {filteredProducts.length} Product
            {filteredProducts.length === 1 ? "" : "s"}
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-electric-300/30 to-transparent" />
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
            className="mt-8 border border-white/10 bg-white/[0.03] p-8 text-center"
          >
            <h2 className="text-4xl text-white">No products found.</h2>
            <p className="mt-3 text-sm text-zinc-500">
              Try a different search term or switch back to all products.
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
