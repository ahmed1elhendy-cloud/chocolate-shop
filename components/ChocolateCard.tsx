'use client';

import React, { useState } from 'react';
import { Chocolate } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, Sparkles, Plus, Check } from 'lucide-react';

interface ChocolateCardProps {
  chocolate: Chocolate;
}

export default function ChocolateCard({ chocolate }: ChocolateCardProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(chocolate, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group bg-[#ffffff] rounded-2xl overflow-hidden border border-[#e7decb] hover:border-[#dfb15b] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative h-60 w-full overflow-hidden bg-[#f4eee2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chocolate.image}
          alt={chocolate.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Tag badge */}
        {chocolate.tag && (
          <div className="absolute top-3 left-3 bg-[#23120b]/90 backdrop-blur-sm border border-[#dfb15b] text-[#dfb15b] text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 text-[#dfb15b]" />
            {chocolate.tag}
          </div>
        )}

        {/* Weight badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#3d1f14] text-[11px] font-medium px-2 py-0.5 rounded-md shadow-sm">
          {chocolate.weight}
        </div>

        {/* Price Tag in Gold on Image bottom right */}
        <div className="absolute bottom-3 right-3 bg-[#23120b]/95 backdrop-blur-sm border border-[#dfb15b]/80 px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-xs text-[#dfb15b]/90 font-medium mr-1">AED</span>
          <span className="text-lg font-serif font-bold text-[#dfb15b]">{chocolate.price}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[#8c6d2d] mb-1.5">
            <div className="flex items-center text-[#dfb15b]">
              <Star className="w-3.5 h-3.5 fill-[#dfb15b]" />
            </div>
            <span className="font-semibold text-[#23120b]">{chocolate.rating}</span>
            <span className="text-gray-400">({chocolate.reviewsCount} reviews)</span>
          </div>

          {/* Name & Subtitle */}
          <h3 className="font-serif font-bold text-lg text-[#23120b] group-hover:text-[#4e291a] transition-colors leading-snug">
            {chocolate.name}
          </h3>
          <p className="text-xs text-[#703f28] font-medium mt-0.5">
            {chocolate.subtitle}
          </p>

          <p className="text-xs text-[#54311c]/80 mt-2.5 line-clamp-2 leading-relaxed">
            {chocolate.description}
          </p>

          {/* Tasting notes */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chocolate.tastingNotes.map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-[#faf7f2] text-[#4e291a] border border-[#e7decb] px-2 py-0.5 rounded-full font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-[#f4eee2] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Total Price</div>
            <div className="text-base font-serif font-bold text-[#3d1f14]">
              {chocolate.price} <span className="text-xs font-sans text-[#c99839]">AED</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#3d1f14] text-[#dfb15b] hover:bg-[#23120b] border border-[#dfb15b]/40 hover:border-[#dfb15b]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
