'use client';

import React from 'react';
import Link from 'next/link';
import { CHOCOLATES } from '@/lib/data';
import ChocolateCard from '@/components/ChocolateCard';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, Gift, Heart } from 'lucide-react';

export default function HomePage() {
  const featuredChocolates = CHOCOLATES.slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#23120b] text-[#f4eee2] overflow-hidden border-b-2 border-[#dfb15b]/30">
        {/* Decorative background aura */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#dfb15b] blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#996b1b] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3d1f14] border border-[#dfb15b]/40 text-[#dfb15b] text-xs font-semibold uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Art of Confectionery • Dubai</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#f4eee2] leading-tight">
                Indulge in Pure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfb15b] via-[#f7eed8] to-[#dfb15b]">
                  Artisanal Luxury
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#f4eee2]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Experience Dubai’s finest single-origin chocolates, infused with roasted pistachio kunafa, 24K edible gold, and heritage Emirati dates. Handcrafted fresh every morning with prices in AED.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#dfb15b] to-[#b3822b] text-[#23120b] font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Menu & Prices</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/cart"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#3d1f14] border border-[#dfb15b]/50 text-[#dfb15b] font-semibold text-sm uppercase tracking-wider hover:bg-[#4e291a] transition-all flex items-center justify-center gap-2"
                >
                  <span>View Shopping Bag</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-[#3d1f14] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#dfb15b]">8</div>
                  <div className="text-xs text-[#f4eee2]/70 font-medium">Boutique Flavors</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#dfb15b]">100%</div>
                  <div className="text-xs text-[#f4eee2]/70 font-medium">Pure Cocoa Butter</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#dfb15b]">Same-Day</div>
                  <div className="text-xs text-[#f4eee2]/70 font-medium">UAE Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl p-1 bg-gradient-to-b from-[#dfb15b] via-[#703f28] to-[#dfb15b] shadow-2xl">
                <div className="bg-[#2b1810] rounded-[22px] p-6 space-y-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop"
                      alt="Royal Dubai Pistachio Kunafa Bar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#23120b]/90 border border-[#dfb15b] px-3 py-1 rounded-full text-[11px] font-bold text-[#dfb15b] uppercase">
                      #1 Best Seller
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#f4eee2]">
                          Royal Dubai Pistachio Kunafa
                        </h3>
                        <p className="text-xs text-[#dfb15b]">
                          Toasted Kataifi & Roasted Pistachio Cream
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#dfb15b]">AED</span>
                        <div className="text-2xl font-serif font-bold text-[#dfb15b]">85</div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/menu"
                    className="block text-center w-full py-3 rounded-xl bg-[#dfb15b] text-[#23120b] font-bold text-xs uppercase tracking-wider hover:bg-[#edd59b] transition shadow"
                  >
                    Order from Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e7decb] shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfb15b]/30 text-[#c99839]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#23120b]">Master Chocolatier</h4>
              <p className="text-xs text-[#703f28] mt-1 leading-relaxed">
                Handcrafted each morning by culinary artisans using traditional European tempering.
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e7decb] shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfb15b]/30 text-[#c99839]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#23120b]">Ethical & Pure</h4>
              <p className="text-xs text-[#703f28] mt-1 leading-relaxed">
                100% pure cocoa butter, no hydrogenated palm oil, and sustainably harvested beans.
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e7decb] shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfb15b]/30 text-[#c99839]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#23120b]">Chilled Delivery</h4>
              <p className="text-xs text-[#703f28] mt-1 leading-relaxed">
                Insulated climate-controlled courier vehicles guarantee melting-free delivery across the UAE.
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#e7decb] shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfb15b]/30 text-[#c99839]">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#23120b]">Bespoke Gifting</h4>
              <p className="text-xs text-[#703f28] mt-1 leading-relaxed">
                Gold-embossed packaging with satin gold ribbon and personalized calligraphy cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#c99839] mb-1">
              Curated Selection
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#23120b]">
              Signature Delicacies
            </h2>
            <p className="text-sm text-[#703f28] mt-1">
              Sample our most revered artisan chocolates, priced in AED for direct delivery in UAE.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#c99839] hover:text-[#996b1b] transition"
          >
            <span>View All 8 Chocolates on Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredChocolates.map((choc) => (
            <ChocolateCard key={choc.id} chocolate={choc} />
          ))}
        </div>
      </section>

      {/* Emirati Heritage Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3d1f14] rounded-3xl p-8 sm:p-12 text-[#f4eee2] border-2 border-[#dfb15b]/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#dfb15b]">
                Heritage & Innovation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f4eee2]">
                Infused with Arabic Hospitality
              </h3>
              <p className="text-sm text-[#f4eee2]/80 leading-relaxed">
                At Chocolate Shop, we blend age-old Swiss and Belgian confectionery heritage with the rich aromatic palate of the Arabian Gulf. From saffron harvested from the mountains to Medjool dates and freshly roasted green cardamom, every bite tells a story of luxury.
              </p>
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfb15b] to-[#b3822b] text-[#23120b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow transition"
                >
                  <span>Explore The Heritage Flavors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#23120b] p-5 rounded-2xl border border-[#dfb15b]/20">
                <h5 className="font-serif font-bold text-lg text-[#dfb15b]">24K Edible Gold</h5>
                <p className="text-xs text-[#f4eee2]/70 mt-1">
                  Adorned with certified pure gold leaf for celebrations and VIP gifting.
                </p>
              </div>
              <div className="bg-[#23120b] p-5 rounded-2xl border border-[#dfb15b]/20">
                <h5 className="font-serif font-bold text-lg text-[#dfb15b]">Viral Kunafa</h5>
                <p className="text-xs text-[#f4eee2]/70 mt-1">
                  Crisp toasted phyllo strands smothered in rich pistachio butter.
                </p>
              </div>
              <div className="bg-[#23120b] p-5 rounded-2xl border border-[#dfb15b]/20">
                <h5 className="font-serif font-bold text-lg text-[#dfb15b]">Single-Estate</h5>
                <p className="text-xs text-[#f4eee2]/70 mt-1">
                  Traceable cacao beans sourced directly from certified fair cooperatives.
                </p>
              </div>
              <div className="bg-[#23120b] p-5 rounded-2xl border border-[#dfb15b]/20">
                <h5 className="font-serif font-bold text-lg text-[#dfb15b]">Express UAE</h5>
                <p className="text-xs text-[#f4eee2]/70 mt-1">
                  Instant ordering and same-day delivery across Dubai and Abu Dhabi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
