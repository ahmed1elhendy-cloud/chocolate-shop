'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CHOCOLATES, Chocolate, getChocolates } from '@/lib/data';
import ChocolateCard from '@/components/ChocolateCard';
import { Sparkles, Search, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function MenuPage() {
  const [chocolatesList, setChocolatesList] = useState<Chocolate[]>(CHOCOLATES);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  useEffect(() => {
    async function loadMenu() {
      try {
        setIsLoading(true);
        const fetched = await getChocolates();
        setChocolatesList(fetched);
      } catch (err) {
        console.error('Failed to load chocolates from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMenu();
  }, []);

  const categories = ['All', 'Signature', 'Truffles', 'Heritage', 'Specialty'];

  const filteredChocolates = useMemo(() => {
    return chocolatesList.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tastingNotes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [chocolatesList, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#23120b] rounded-3xl p-8 sm:p-12 text-[#f4eee2] border-2 border-[#dfb15b]/30 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3d1f14] border border-[#dfb15b]/40 text-[#dfb15b] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Artisan Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#f4eee2]">
            Chocolate Menu
          </h1>
          <p className="text-sm sm:text-base text-[#f4eee2]/80 leading-relaxed font-light">
            Explore our complete handcrafted collection. Every confection is crafted fresh in the UAE using single-origin cacao. Prices shown in AED.
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <div className="w-80 h-80 rounded-full border-[30px] border-[#dfb15b]" />
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-6 rounded-2xl border border-[#e7decb] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#3d1f14] text-[#dfb15b] shadow-md border border-[#dfb15b]/40'
                    : 'bg-[#faf7f2] text-[#4e291a] hover:bg-[#f4eee2] border border-[#e7decb]'
                }`}
              >
                {cat === 'All' ? `All Chocolates (${chocolatesList.length})` : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#703f28] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flavor, nut, or spice..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#faf7f2] border border-[#e7decb] text-xs text-[#23120b] focus:outline-none focus:border-[#dfb15b]"
            />
          </div>
        </div>

        {/* Sub-bar: Count & Sort */}
        <div className="pt-3 border-t border-[#f4eee2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#703f28] gap-3">
          <div className="flex items-center gap-2">
            {isLoading && <Loader2 className="w-3.5 h-3.5 text-[#c99839] animate-spin" />}
            <span>
              Showing <span className="font-bold text-[#23120b]">{filteredChocolates.length}</span> of {chocolatesList.length} handcrafted items in AED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#c99839]" />
            <span className="font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#faf7f2] border border-[#e7decb] rounded-lg px-2.5 py-1 text-xs text-[#23120b] focus:outline-none focus:border-[#dfb15b]"
            >
              <option value="featured">Featured / Signature</option>
              <option value="price-asc">Price: Low to High (AED)</option>
              <option value="price-desc">Price: High to Low (AED)</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chocolates Grid */}
      {filteredChocolates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredChocolates.map((chocolate) => (
            <ChocolateCard key={chocolate.id} chocolate={chocolate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#e7decb] space-y-4">
          <p className="text-base text-[#703f28]">No chocolates match your search query &ldquo;{searchQuery}&rdquo;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#3d1f14] text-[#dfb15b] text-xs font-bold uppercase tracking-wider hover:bg-[#23120b]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
