'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // UAE Delivery rules
  const freeShippingThreshold = 150;
  const shippingCost = totalPrice >= freeShippingThreshold || totalPrice === 0 ? 0 : 20;
  const discountAmount = discountApplied ? Math.round(totalPrice * 0.1) : 0;
  const vatAmount = Math.round((totalPrice - discountAmount) * 0.05);
  const grandTotal = totalPrice - discountAmount + vatAmount + (totalPrice > 0 ? shippingCost : 0);
  const progressPercent = Math.min(100, Math.round((totalPrice / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'DUBAI10' || promoCode.trim().toUpperCase() === 'GOLD') {
      setDiscountApplied(true);
    } else {
      setPromoError('Invalid coupon. Try code "DUBAI10" for 10% off.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 border border-[#e7decb] shadow-sm space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#faf7f2] border-2 border-[#dfb15b]/40 flex items-center justify-center text-[#c99839]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#23120b]">
              Your Chocolate Bag is Empty
            </h2>
            <p className="text-sm text-[#703f28] max-w-md mx-auto">
              You haven&apos;t added any handcrafted chocolates to your bag yet. Explore our Dubai boutique menu to begin.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#dfb15b] to-[#b3822b] text-[#23120b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition"
          >
            <span>Explore 8 Sample Chocolates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#e7decb] gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#c99839]">
            Order Review
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#23120b]">
            Your Shopping Bag
          </h1>
          <p className="text-xs text-[#703f28] mt-1">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your bespoke selection (Prices in AED)
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-800 hover:text-rose-900 underline self-start sm:self-auto"
        >
          Clear Entire Bag
        </button>
      </div>

      {/* Free Delivery Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#e7decb] shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#23120b]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#c99839]" />
            {totalPrice >= freeShippingThreshold ? (
              <span className="text-emerald-700 font-bold">
                Congratulations! You unlocked FREE Chilled Express UAE Delivery!
              </span>
            ) : (
              <span>
                Add <strong className="text-[#c99839]">{freeShippingThreshold - totalPrice} AED</strong> more for Free Chilled Express UAE Delivery
              </span>
            )}
          </span>
          <span className="text-[#703f28]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#faf7f2] h-2.5 rounded-full overflow-hidden border border-[#e7decb]">
          <div
            className="bg-gradient-to-r from-[#dfb15b] to-[#b3822b] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Two Column Grid: Items & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-[#e7decb] divide-y divide-[#f4eee2] shadow-sm overflow-hidden">
            {items.map(({ chocolate, quantity }) => (
              <div
                key={chocolate.id}
                className="p-5 flex flex-col sm:flex-row items-center gap-4 hover:bg-[#faf7f2]/50 transition"
              >
                {/* Product Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#f4eee2] shrink-0 border border-[#e7decb]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chocolate.image}
                    alt={chocolate.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c99839]">
                    {chocolate.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#23120b]">
                    {chocolate.name}
                  </h3>
                  <p className="text-xs text-[#703f28] line-clamp-1">
                    {chocolate.subtitle} • {chocolate.weight}
                  </p>
                  <div className="mt-1 text-xs font-semibold text-[#3d1f14]">
                    Unit Price: <span className="text-[#c99839]">{chocolate.price} AED</span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-[#e7decb] rounded-lg bg-[#faf7f2] px-2 py-1 gap-3">
                  <button
                    onClick={() => updateQuantity(chocolate.id, quantity - 1)}
                    className="p-1 text-[#23120b] hover:text-[#c99839] transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center text-[#23120b]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(chocolate.id, quantity + 1)}
                    className="p-1 text-[#23120b] hover:text-[#c99839] transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-center sm:text-right min-w-[90px]">
                  <div className="text-[10px] text-gray-500 uppercase">Subtotal</div>
                  <div className="text-base font-serif font-bold text-[#23120b]">
                    {chocolate.price * quantity}{' '}
                    <span className="text-xs font-sans text-[#c99839]">AED</span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(chocolate.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 transition"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              href="/menu"
              className="text-xs font-bold uppercase tracking-wider text-[#703f28] hover:text-[#23120b] flex items-center gap-1.5"
            >
              ← Add More Chocolates From Menu
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#dfb15b]/40 p-6 shadow-md space-y-5">
            <h3 className="font-serif font-bold text-lg text-[#23120b] pb-3 border-b border-[#e7decb]">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[11px] font-bold text-[#703f28] uppercase tracking-wider block">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code 'DUBAI10'"
                  disabled={discountApplied}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7decb] text-xs uppercase font-medium focus:outline-none focus:border-[#dfb15b]"
                />
                <button
                  type="submit"
                  disabled={discountApplied}
                  className="px-4 py-2 bg-[#3d1f14] text-[#dfb15b] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#23120b] disabled:opacity-50 shrink-0"
                >
                  {discountApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
              {discountApplied && (
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Tag className="w-3 h-3" /> 10% VIP Connoisseur Discount Applied
                </p>
              )}
            </form>

            {/* Costs Breakdown */}
            <div className="space-y-3 pt-3 border-t border-[#f4eee2] text-xs">
              <div className="flex justify-between text-[#703f28]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#23120b]">{totalPrice} AED</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>VIP Discount (10%)</span>
                  <span>-{discountAmount} AED</span>
                </div>
              )}

              <div className="flex justify-between text-[#703f28]">
                <span>Chilled Courier Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">Free</span>
                  ) : (
                    `${shippingCost} AED`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[#703f28]">
                <span>Estimated UAE VAT (5%)</span>
                <span className="font-semibold text-[#23120b]">{vatAmount} AED</span>
              </div>

              <div className="pt-3 border-t-2 border-[#e7decb] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#23120b]">Grand Total</span>
                <div className="text-right">
                  <span className="text-xs text-[#c99839] font-medium mr-1">AED</span>
                  <span className="text-2xl font-serif font-bold text-[#3d1f14]">
                    {grandTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Action Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#dfb15b] via-[#c99839] to-[#b3822b] text-[#23120b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#703f28]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Insulated Temperature-Safe Packaging Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
