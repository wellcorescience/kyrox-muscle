import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { getDbProductBySlug, getDbProducts } from "@/app/actions/product";
import { siteConfig } from "@/constants/site";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getDbProductBySlug(slug);

  if (!res.success || !res.product) {
    return {
      title: "Product Not Found",
    };
  }

  const product = res.product;
  const title = `${product.name} | ${siteConfig.name}`;
  const description = product.description;
  const url = `${siteConfig.url}/product/${product.slug}`;

  return {
    title: product.name,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${product.name} product preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const res = await getDbProductBySlug(slug);

  if (!res.success || !res.product) {
    notFound();
  }

  const product = res.product;

  // Load related products from database
  const allRes = await getDbProducts();
  const allProducts = allRes.products || [];
  const relatedProducts = allProducts.filter((item) => item.id !== product.id);

  return (
    <ProductDetailView product={product} relatedProducts={relatedProducts} />
  );
}
