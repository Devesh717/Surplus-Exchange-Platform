import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../../../data/homeProducts';
import ProductCard from '../Product/ProductCard';
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Find useful surplus for less.</h2>
          <p className="mt-2 max-w-xl text-sm text-gray-500">Browse inventory that businesses no longer need and put it to work in yours.</p>
        </div>
        <Link
  to="/products"
  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
>
  View all products <ArrowRight size={15} />
</Link>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
