
'use client';

import Link from 'next/link';

export default function Titlebar() {
  return (
    <nav className="top-nav">
      <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
        CarriagePatch
      </div>
      <div className="wallet-pill">
        <span style={{ fontWeight: 700 }}>₹ 8,420</span>
        <Link href="/withdraw">
          <button className="payout-btn">
            <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
              account_balance_wallet
            </span>
          </button>
        </Link>
      </div>
    </nav>
  );
}