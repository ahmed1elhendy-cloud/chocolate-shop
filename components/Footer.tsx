'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#23120b] text-[#f4eee2] border-t-2 border-[#c99839]/40 mt-auto">
      {/* Newsletter / Club Bar */}
      <div className="bg-[#3d1f14] py-8 border-b border-[#dfb15b]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#dfb15b] flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-[#dfb15b]" />
                Join The Connoisseur Club
              </h3>
              <p className="text-sm text-[#f4eee2]/80 mt-1">
                Receive invitations to private chocolate tastings and seasonal collections in Dubai.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 rounded-lg bg-[#23120b] border border-[#dfb15b]/40 text-[#f4eee2] placeholder-[#f4eee2]/40 focus:outline-none focus:border-[#dfb15b] text-sm"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#dfb15b] to-[#b3822b] text-[#23120b] font-semibold text-sm rounded-lg hover:brightness-110 transition shrink-0 shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Story */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold tracking-wider text-[#dfb15b]">
              CHOCOLATE SHOP
            </h4>
            <p className="text-sm text-[#f4eee2]/70 leading-relaxed">
              Handcrafting the most luxurious confectioneries in the United Arab Emirates. Single-origin cocoa beans blended with authentic Middle Eastern spices and gold leaf.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#dfb15b]">
              <span>★ 100% Pure Cocoa Butter</span>
              <span>•</span>
              <span>Palm Oil Free</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#dfb15b]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#f4eee2]/80">
              <li>
                <Link href="/" className="hover:text-[#dfb15b] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#dfb15b] transition">
                  Chocolate Collection (Menu)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#dfb15b] transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#dfb15b] transition">
                  Express Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* UAE Boutiques */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#dfb15b]">
              Boutique & Delivery
            </h4>
            <ul className="space-y-2.5 text-sm text-[#f4eee2]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dfb15b] shrink-0 mt-0.5" />
                <span>The Dubai Mall, Fashion Avenue, Downtown Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#dfb15b] shrink-0" />
                <span>+971 4 800 2462 (CHOC)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#dfb15b] shrink-0" />
                <span>concierge@chocolateshop.ae</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#dfb15b] shrink-0" />
                <span>Open Daily: 10:00 AM – 11:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Emirates Coverage */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#dfb15b]">
              Express Delivery In
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#f4eee2]/70">
              <span className="p-2 rounded bg-[#3d1f14]/60 border border-[#dfb15b]/20">Dubai (Same-Day)</span>
              <span className="p-2 rounded bg-[#3d1f14]/60 border border-[#dfb15b]/20">Abu Dhabi</span>
              <span className="p-2 rounded bg-[#3d1f14]/60 border border-[#dfb15b]/20">Sharjah</span>
              <span className="p-2 rounded bg-[#3d1f14]/60 border border-[#dfb15b]/20">Ajman & RAK</span>
            </div>
            <p className="text-xs text-[#dfb15b]/80 pt-1">
              Chilled luxury temperature-controlled courier delivery.
            </p>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-12 pt-6 border-t border-[#3d1f14] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f4eee2]/60">
          <p>© {new Date().getFullYear()} Chocolate Shop UAE. All rights reserved. Prices in AED.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#dfb15b] fill-[#dfb15b]" /> for chocolate lovers in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
