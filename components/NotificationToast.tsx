'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

export default function NotificationToast() {
  const { notification, dismissNotification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#23120b] border-2 border-[#dfb15b] rounded-xl shadow-2xl p-4 text-[#f4eee2] animate-bounce-short transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-[#dfb15b] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#f4eee2]">{notification}</p>
            <Link
              href="/cart"
              onClick={dismissNotification}
              className="inline-block mt-1 text-xs font-semibold text-[#dfb15b] hover:underline"
            >
              View Shopping Bag & Checkout →
            </Link>
          </div>
        </div>
        <button
          onClick={dismissNotification}
          className="text-[#f4eee2]/60 hover:text-[#dfb15b] transition p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
