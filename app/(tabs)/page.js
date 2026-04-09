
'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
      greetingEl.innerText = 
        hour < 12 ? "Good Morning" : 
        hour < 17 ? "Good Afternoon" : "Good Evening";
    }
  }, []);

  return (
    <>
      <header style={{ margin: '24px 0' }}>
        <h1 id="greeting" style={{ fontSize: '1.75rem', fontWeight: 500 }}>
          Skylie
        </h1>
        <p style={{ color: 'var(--text-sub)' }}>
          Share data and earn
        </p>
      </header>

      {/* Paste the rest of your home.html content here (cards, activity, etc.) */}
      {/* You can copy the HTML directly and it will work */}
    </>
  );
}