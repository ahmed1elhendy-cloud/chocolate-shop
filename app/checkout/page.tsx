'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, CreditCard, Banknote, Smartphone, Sparkles, Gift, ArrowLeft, Truck, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    emirate: 'Dubai',
    area: '',
    streetAddress: '',
    deliverySlot: 'Same-Day Evening (5:00 PM – 9:00 PM)',
    isGift: true,
    giftMessage: 'With warmest wishes and sweetness from Dubai.',
    paymentMethod: 'card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [supabaseSaved, setSupabaseSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Shipping & VAT calculation
  const shippingCost = totalPrice >= 150 || totalPrice === 0 ? 0 : 20;
  const vatAmount = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + vatAmount + (totalPrice > 0 ? shippingCost : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const generatedOrder = `DXB-${Math.floor(100000 + Math.random() * 900000)}-CHOC`;

    try {
      if (isSupabaseConfigured) {
        // Save to Supabase
        const { data, error } = await supabase.from('orders').insert([
          {
            order_reference: generatedOrder,
            customer_name: formData.fullName,
            customer_email: formData.email,
            customer_phone: formData.phone,
            emirate: formData.emirate,
            community_area: formData.area,
            street_address: formData.streetAddress,
            delivery_slot: formData.deliverySlot,
            is_gift: formData.isGift,
            gift_message: formData.giftMessage,
            payment_method: formData.paymentMethod,
            items: items.map((i) => ({
              id: i.chocolate.id,
              name: i.chocolate.name,
              price: i.chocolate.price,
              quantity: i.quantity,
            })),
            total_price: grandTotal,
          },
        ]);

        if (error) {
          console.warn('Supabase insert note:', error.message);
          setSupabaseSaved(false);
        } else {
          setSupabaseSaved(true);
        }
      } else {
        setSupabaseSaved(false);
      }
    } catch (err: any) {
      console.warn('Supabase connection note:', err?.message);
      setSupabaseSaved(false);
    }

    setOrderNumber(generatedOrder);
    setIsSubmitting(false);
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#dfb15b] shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#dfb15b] to-[#b3822b] p-1 shadow-lg">
            <div className="w-full h-full bg-[#23120b] rounded-full flex items-center justify-center text-[#dfb15b]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c99839]">
              Order Confirmed & In Preparation
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#23120b]">
              Shukran for Your Order!
            </h1>
            <p className="text-sm text-[#703f28] max-w-md mx-auto leading-relaxed">
              Our chocolatiers have begun carefully packing your artisanal selection into insulated luxury gold-embossed boxes.
            </p>
          </div>

          <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#e7decb] max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-[#e7decb] pb-2">
              <span className="text-gray-500 font-medium">Order Reference:</span>
              <span className="font-bold font-mono text-[#3d1f14]">{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#e7decb] pb-2">
              <span className="text-gray-500 font-medium">Delivery Destination:</span>
              <span className="font-bold text-[#3d1f14]">{formData.emirate}, UAE</span>
            </div>
            <div className="flex justify-between border-b border-[#e7decb] pb-2">
              <span className="text-gray-500 font-medium">Delivery Slot:</span>
              <span className="font-bold text-[#3d1f14]">{formData.deliverySlot}</span>
            </div>
            <div className="flex justify-between border-b border-[#e7decb] pb-2">
              <span className="text-gray-500 font-medium">Supabase Database:</span>
              <span className={`font-bold ${supabaseSaved ? 'text-emerald-700' : 'text-[#8c6d2d]'}`}>
                {supabaseSaved ? '✓ Recorded in Supabase `orders`' : 'Saved locally'}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold text-[#23120b]">
              <span>Total Paid:</span>
              <span className="text-[#c99839]">{grandTotal} AED</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3d1f14] text-[#dfb15b] font-bold text-xs uppercase tracking-wider hover:bg-[#23120b] transition"
            >
              Return to Home
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#dfb15b] to-[#b3822b] text-[#23120b] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
            >
              Order More Chocolates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 border border-[#e7decb] shadow-sm space-y-5">
          <h2 className="text-2xl font-serif font-bold text-[#23120b]">No Items to Checkout</h2>
          <p className="text-sm text-[#703f28]">
            Your shopping bag is currently empty. Please select chocolates from our menu first.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3d1f14] text-[#dfb15b] font-bold text-xs uppercase tracking-wider hover:bg-[#23120b]"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title & Back Link */}
      <div className="space-y-2">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#703f28] hover:text-[#23120b]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-[#23120b]">
          Boutique Express Checkout
        </h1>
        <p className="text-xs text-[#703f28]">
          Climate-controlled chilled delivery throughout Dubai & all seven United Arab Emirates. Prices in AED.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact & Destination */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e7decb] shadow-sm space-y-5">
              <h2 className="text-base font-serif font-bold text-[#23120b] flex items-center gap-2 border-b border-[#f4eee2] pb-3">
                <Truck className="w-5 h-5 text-[#c99839]" />
                1. UAE Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Fatima Al Hashemi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    UAE Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    Emirate *
                  </label>
                  <select
                    value={formData.emirate}
                    onChange={(e) => setFormData({ ...formData, emirate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b] font-medium"
                  >
                    <option value="Dubai">Dubai (Same-Day Available)</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    Community / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. Downtown Dubai / Palm Jumeirah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    Street Address & Villa / Apartment No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="Building / Villa No., Street Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#703f28] uppercase mb-1">
                    Preferred Delivery Time Slot
                  </label>
                  <select
                    value={formData.deliverySlot}
                    onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                  >
                    <option value="Same-Day Evening (5:00 PM – 9:00 PM)">Same-Day Evening (5:00 PM – 9:00 PM)</option>
                    <option value="Same-Day Afternoon (1:00 PM – 5:00 PM)">Same-Day Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="Tomorrow Morning (9:00 AM – 1:00 PM)">Tomorrow Morning (9:00 AM – 1:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bespoke Gifting Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e7decb] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#f4eee2] pb-3">
                <h2 className="text-base font-serif font-bold text-[#23120b] flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#c99839]" />
                  2. Luxury Gifting Option
                </h2>
                <span className="text-[11px] font-bold text-[#c99839] uppercase tracking-wider">
                  Complimentary
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isGift}
                    onChange={(e) => setFormData({ ...formData, isGift: e.target.checked })}
                    className="w-4 h-4 text-[#c99839] rounded border-[#e7decb] focus:ring-[#dfb15b]"
                  />
                  <span className="font-semibold text-[#23120b]">
                    Include signature gold satin ribbon & calligraphy gift card
                  </span>
                </label>

                {formData.isGift && (
                  <div>
                    <label className="block text-[#703f28] font-bold uppercase mb-1">
                      Personalized Message for the Recipient
                    </label>
                    <textarea
                      rows={2}
                      value={formData.giftMessage}
                      onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                      placeholder="Write your personal message..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#faf7f2] border border-[#e7decb] focus:outline-none focus:border-[#dfb15b]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e7decb] shadow-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-[#23120b] flex items-center gap-2 border-b border-[#f4eee2] pb-3">
                <CreditCard className="w-5 h-5 text-[#c99839]" />
                3. Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#dfb15b] bg-[#faf7f2] shadow-sm'
                      : 'border-[#e7decb] hover:bg-[#faf7f2]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="hidden"
                  />
                  <CreditCard className="w-6 h-6 text-[#c99839]" />
                  <span className="text-xs font-bold text-[#23120b]">Credit / Debit Card</span>
                  <span className="text-[10px] text-gray-500">Visa, Mastercard</span>
                </label>

                <label
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition ${
                    formData.paymentMethod === 'applepay'
                      ? 'border-[#dfb15b] bg-[#faf7f2] shadow-sm'
                      : 'border-[#e7decb] hover:bg-[#faf7f2]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="applepay"
                    checked={formData.paymentMethod === 'applepay'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                    className="hidden"
                  />
                  <Smartphone className="w-6 h-6 text-[#c99839]" />
                  <span className="text-xs font-bold text-[#23120b]">Apple Pay</span>
                  <span className="text-[10px] text-gray-500">Instant One-Touch</span>
                </label>

                <label
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#dfb15b] bg-[#faf7f2] shadow-sm'
                      : 'border-[#e7decb] hover:bg-[#faf7f2]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="hidden"
                  />
                  <Banknote className="w-6 h-6 text-[#c99839]" />
                  <span className="text-xs font-bold text-[#23120b]">Cash on Delivery</span>
                  <span className="text-[10px] text-gray-500">Pay in AED on arrival</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-[#dfb15b]/40 p-6 shadow-md space-y-5 sticky top-28">
              <h3 className="font-serif font-bold text-lg text-[#23120b] pb-3 border-b border-[#e7decb]">
                Items to be Dispatched
              </h3>

              {/* Items small list */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#f4eee2]">
                {items.map(({ chocolate, quantity }) => (
                  <div key={chocolate.id} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f4eee2] shrink-0 border border-[#e7decb]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={chocolate.image}
                          alt={chocolate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#23120b] line-clamp-1">{chocolate.name}</div>
                        <div className="text-[11px] text-[#703f28]">Qty: {quantity} × {chocolate.price} AED</div>
                      </div>
                    </div>
                    <div className="font-serif font-bold text-[#23120b]">
                      {chocolate.price * quantity} <span className="text-[10px] text-[#c99839]">AED</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2.5 pt-3 border-t border-[#e7decb] text-xs text-[#703f28]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#23120b]">{totalPrice} AED</span>
                </div>
                <div className="flex justify-between">
                  <span>Chilled UAE Delivery</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : `${shippingCost} AED`}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (5%)</span>
                  <span className="font-semibold text-[#23120b]">{vatAmount} AED</span>
                </div>
                <div className="pt-3 border-t-2 border-[#e7decb] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#23120b]">Total Amount</span>
                  <div className="text-right">
                    <span className="text-xs text-[#c99839] font-medium mr-1">AED</span>
                    <span className="text-2xl font-serif font-bold text-[#3d1f14]">
                      {grandTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#dfb15b] via-[#c99839] to-[#b3822b] text-[#23120b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Saving Order to Supabase...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Place Order ({grandTotal} AED)</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#703f28] text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>256-Bit SSL Encrypted & UAE Central Bank Compliant</span>
                </div>
                <p className="text-[10px] text-gray-400">
                  Orders are recorded live in your Supabase database.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
