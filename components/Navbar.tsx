'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Sparkles, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Cart', href: '/cart' },
    { name: 'Checkout', href: '/checkout' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#23120b]/95 backdrop-blur-md border-b border-[#dfb15b]/30 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#b3822b] via-[#dfb15b] to-[#b3822b] text-[#23120b] py-1 text-xs font-semibold tracking-wider text-center uppercase px-4 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Complimentary Dubai & Abu Dhabi White-Glove Delivery on orders over 150 AED</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#dfb15b] to-[#996b1b] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#23120b] rounded-full flex items-center justify-center">
                <span className="text-[#dfb15b] font-serif font-bold text-xl tracking-tighter">C</span>
              </div>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-serif tracking-widest text-[#f4eee2] font-semibold group-hover:text-[#dfb15b] transition-colors">
                CHOCOLATE SHOP
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#dfb15b] uppercase font-medium">
                Artisanal Chocolatier • Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors font-medium py-1 relative ${
                    isActive
                      ? 'text-[#dfb15b] font-semibold'
                      : 'text-[#f4eee2]/80 hover:text-[#dfb15b]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Currency Tag & Cart Button */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3d1f14] text-[#dfb15b] border border-[#dfb15b]/30">
              AED (د.إ)
            </span>

            <Link
              href="/cart"
              className="relative p-2.5 rounded-full bg-[#3d1f14] border border-[#dfb15b]/40 text-[#dfb15b] hover:bg-[#4e291a] hover:border-[#dfb15b] transition-all group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#dfb15b] to-[#b3822b] text-[#23120b] text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#f4eee2] hover:text-[#dfb15b]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#23120b] border-b border-[#dfb15b]/30 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base uppercase tracking-wider ${
                pathname === link.href
                  ? 'text-[#dfb15b] font-bold'
                  : 'text-[#f4eee2]/90 hover:text-[#dfb15b]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#3d1f14] flex justify-between items-center text-xs text-[#dfb15b]">
            <span>Currency: UAE Dirham (AED)</span>
            <span>Items in Bag: {totalItems}</span>
          </div>
        </div>
      )}
    </header>
  );
}
