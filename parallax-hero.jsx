// parallax-hero.jsx — Hero épico con paisaje parallax + Steve animado
// Steve walks when scrolling, idles when still. Multiple parallax layers.

const { useState: useState_ph, useEffect: useEffect_ph, useRef: useRef_ph } = React;

/* ════════════════════════════════════════════════════════════
   STEVE — pixel character (CSS-only, all colored boxes)
   - props: walking (bool), facing ('right'/'left')
   ════════════════════════════════════════════════════════════ */
function Steve({ walking, facing = 'right', size = 1 }) {
  const s = (n) => `${n * size}px`;
  return (
    <div
      className={`pixelated steve ${walking ? 'steve--walk' : 'steve--idle'}`}
      style={{
        position: 'relative',
        width: s(56),
        height: s(140),
        transform: facing === 'left' ? 'scaleX(-1)' : 'none',
        transformOrigin: 'center bottom',
      }}
    >
      {/* Body group bobs */}
      <div className="steve-body" style={{ position: 'absolute', inset: 0 }}>
        {/* Head */}
        <div style={{
          position: 'absolute', left: s(12), top: 0, width: s(32), height: s(32),
          background: '#a87539', border: `${s(2)} solid #0e0f12`,
          boxShadow: `inset ${s(3)} ${s(3)} 0 #c89968, inset ${s(-3)} ${s(-3)} 0 #6b4423`,
        }}>
          {/* hair */}
          <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: s(7), background: '#3b2310' }} />
          {/* eyes */}
          <div style={{ position: 'absolute', top: s(12), left: s(6), width: s(6), height: s(8), background: '#fff', border: `${s(1)} solid #0e0f12` }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: '#3a5dd6' }} />
          </div>
          <div style={{ position: 'absolute', top: s(12), right: s(6), width: s(6), height: s(8), background: '#fff', border: `${s(1)} solid #0e0f12` }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: '#3a5dd6' }} />
          </div>
          {/* nose */}
          <div style={{ position: 'absolute', top: s(20), left: s(13), width: s(6), height: s(4), background: '#8b5a2b' }} />
          {/* mouth */}
          <div style={{ position: 'absolute', top: s(26), left: s(10), width: s(12), height: s(2), background: '#3b2310' }} />
          {/* beard pixel */}
          <div style={{ position: 'absolute', bottom: s(2), left: s(10), width: s(12), height: s(3), background: '#3b2310' }} />
        </div>

        {/* Torso */}
        <div style={{
          position: 'absolute', left: s(14), top: s(34), width: s(28), height: s(40),
          background: '#3a8fc4', border: `${s(2)} solid #0e0f12`,
          boxShadow: `inset ${s(3)} ${s(3)} 0 #6cb6e0, inset ${s(-3)} ${s(-3)} 0 #1f5d8a`,
        }}>
          {/* shirt detail stripe */}
          <div style={{ position: 'absolute', left: 0, top: s(16), right: 0, height: s(4), background: '#1f5d8a' }} />
        </div>

        {/* Arms */}
        <div className="steve-arm-l" style={{
          position: 'absolute', left: s(2), top: s(34), width: s(12), height: s(38),
          background: '#a87539', border: `${s(2)} solid #0e0f12`,
          boxShadow: `inset ${s(2)} ${s(2)} 0 #c89968, inset ${s(-2)} ${s(-2)} 0 #6b4423`,
          transformOrigin: 'top center',
        }} />
        <div className="steve-arm-r" style={{
          position: 'absolute', right: s(2), top: s(34), width: s(12), height: s(38),
          background: '#a87539', border: `${s(2)} solid #0e0f12`,
          boxShadow: `inset ${s(2)} ${s(2)} 0 #c89968, inset ${s(-2)} ${s(-2)} 0 #6b4423`,
          transformOrigin: 'top center',
        }} />

        {/* Legs */}
        <div className="steve-leg-l" style={{
          position: 'absolute', left: s(15), top: s(74), width: s(12), height: s(38),
          background: '#3a3a8a', border: `${s(2)} solid #0e0f12`,
          boxShadow: `inset ${s(2)} ${s(2)} 0 #5a5ab0, inset ${s(-2)} ${s(-2)} 0 #1f1f5a`,
          transformOrigin: 'top center',
        }} />
        <div className="steve-leg-r" style={{
          position: 'absolute', left: s(28), top: s(74), width: s(12), height: s(38),
          background: '#3a3a8a', border: `${s(2)} solid #0e0f12`,
          boxShadow: `inset ${s(2)} ${s(2)} 0 #5a5ab0, inset ${s(-2)} ${s(-2)} 0 #1f1f5a`,
          transformOrigin: 'top center',
        }} />

        {/* Held sword */}
        <div className="steve-arm-r" style={{
          position: 'absolute', right: s(-4), top: s(56), width: s(4), height: s(28),
          background: '#7af0e8', border: `${s(2)} solid #0e0f12`,
          transformOrigin: 'top center',
        }}>
          <div style={{ position: 'absolute', top: s(20), left: s(-4), width: s(12), height: s(4), background: '#a87539', border: `${s(1)} solid #0e0f12` }} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Mini particle layer — sparkles around the player
   ════════════════════════════════════════════════════════════ */
function SparkleLayer() {
  const sparkles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="pixelated" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {sparkles.map((i) => {
        const left = (i * 8.3 + 7) % 100;
        const delay = (i * 0.6) % 4.5;
        const size = 4 + (i % 3) * 2;
        const colors = ['#f4c430', '#7af0e8', '#fff', '#54e6c0'];
        return (
          <div key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              bottom: `${20 + (i * 7) % 50}%`,
              width: size,
              height: size,
              background: colors[i % colors.length],
              border: '1px solid #0e0f12',
              animation: `sparkle-rise 4.2s ${delay}s ease-out infinite`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PARALLAX HERO — multiple z-layers, scroll-driven offsets
   ════════════════════════════════════════════════════════════ */
function HeroParallax({ players, peak, showCounter }) {
  const [scrollY, setScrollY] = useState_ph(0);
  const [walking, setWalking] = useState_ph(false);
  const lastScroll = useRef_ph(0);
  const stopTimer = useRef_ph(null);

  useEffect_ph(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const delta = Math.abs(y - lastScroll.current);
      lastScroll.current = y;
      if (delta > 0.5) {
        setWalking(true);
        if (stopTimer.current) clearTimeout(stopTimer.current);
        stopTimer.current = setTimeout(() => setWalking(false), 180);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  // Parallax offsets — each layer translates at a different rate
  const layer = (rate) => `translateY(${scrollY * rate}px)`;
  const layerX = (rate) => `translateX(${scrollY * rate}px)`;

  const HERO_H = 760;

  // Steve "walk" facing — based on last scroll direction
  const facing = scrollY > lastScroll.current ? 'right' : 'right';

  return (
    <section
      id="inicio"
      data-screen-label="01 Hero"
      style={{
        position: 'relative',
        height: HERO_H,
        overflow: 'hidden',
        borderBottom: '4px solid var(--stone-1)',
        background: 'linear-gradient(180deg, #b6e2f0 0%, #88c5e8 35%, #c8e4f5 60%, #88c5e8 60%)',
      }}
    >
      {/* ── Layer 0: sky gradient + sun ───────────────────── */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #b6e2f0 0%, #88c5e8 50%, #d0e8f3 75%)' }} />

      <div
        className="sun sun-anim pixelated"
        style={{
          position: 'absolute',
          right: '12%',
          top: 80,
          width: 38,
          height: 38,
          transform: layer(0.08),
        }}
      />

      {/* ── Layer 1: distant clouds (slow) ────────────────── */}
      <div className="cloud-row" style={{ top: 60, transform: layer(-0.05) }}>
        <Cloud x="8%" />
        <Cloud x="34%" />
        <Cloud x="62%" />
        <Cloud x="86%" />
      </div>
      <div className="cloud-row" style={{ top: 130, transform: layer(-0.12) }}>
        <Cloud x="20%" big />
        <Cloud x="55%" />
        <Cloud x="78%" big />
      </div>

      {/* ── Layer 2: far mountains ────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, transform: layer(0.18) }}>
        <FarMountains />
      </div>

      {/* ── Layer 3: mid mountains + biome ridge ──────────── */}
      <div style={{ position: 'absolute', inset: 0, transform: layer(0.32) }}>
        <MidMountains />
      </div>

      {/* ── Layer 4: trees / shrubs ───────────────────────── */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 200, transform: layer(0.55), pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '4%', bottom: 0 }}><PixelTree /></div>
        <div style={{ position: 'absolute', left: '18%', bottom: 0 }}><PixelTree variant="small" /></div>
        <div style={{ position: 'absolute', right: '8%', bottom: 0 }}><PixelTree /></div>
        <div style={{ position: 'absolute', right: '22%', bottom: 0 }}><PixelTree variant="small" /></div>
      </div>

      {/* ── Layer 5: ground (grass + dirt strata) ─────────── */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 220,
        background: `
          linear-gradient(180deg,
            #7cba3c 0 14%,
            #5d9c2e 14% 28%,
            #a87539 28% 38%,
            #8b5a2b 38% 56%,
            #6b4423 56% 100%)`,
        borderTop: '3px solid #0e0f12',
        boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.18)',
      }}>
        {/* grass tufts */}
        {[10, 24, 38, 52, 66, 80, 92].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${p}%`, top: -6, width: 12, height: 8,
            background: '#7cba3c', borderTop: '2px solid #0e0f12',
          }} />
        ))}
        {/* pebbles */}
        {[20, 45, 70, 88].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${p}%`, bottom: 22 + (i % 2) * 6, width: 10, height: 10,
            background: '#5a5f6c', border: '2px solid #0e0f12',
          }} />
        ))}
      </div>

      {/* ── Layer 6: STEVE (foreground actor) ─────────────── */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: 130,
        transform: `translateX(-50%) translateX(${Math.sin(scrollY * 0.012) * 80}px) ${layer(0.0)}`,
        zIndex: 4,
      }}>
        <SparkleLayer />
        <Steve walking={walking} facing="right" size={1} />
        {/* Steve's shadow */}
        <div className="pixelated" style={{
          position: 'absolute', left: '50%', bottom: -8,
          transform: 'translateX(-50%)',
          width: 80, height: 8,
          background: 'rgba(0,0,0,0.35)',
          borderRadius: 0,
          filter: 'blur(2px)',
        }} />
      </div>

      {/* ── Layer 7: Floating ornament blocks ─────────────── */}
      <div style={{ position: 'absolute', left: '8%', top: 200, transform: layer(-0.08), zIndex: 3 }}>
        <div className="float-bob"><PixelBlock palette="diamond" size={56} /></div>
      </div>
      <div style={{ position: 'absolute', right: '10%', top: 240, transform: layer(-0.14), zIndex: 3 }}>
        <div className="float-bob-r"><PixelBlock palette="emerald" size={48} /></div>
      </div>
      <div style={{ position: 'absolute', left: '14%', top: 380, transform: layer(-0.05), zIndex: 3 }}>
        <div className="float-bob-r"><PixelBlock palette="gold" size={40} /></div>
      </div>
      <div style={{ position: 'absolute', right: '18%', top: 410, transform: layer(-0.10), zIndex: 3 }}>
        <div className="float-bob"><PixelBlock palette="redstone" size={44} /></div>
      </div>

      {/* ── Foreground: hero copy + IP card ───────────────── */}
      <div className="wrap" style={{ position: 'relative', zIndex: 5, paddingTop: 100, height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18, maxWidth: 600 }}>
          <span className="tag tag--gold">★ TEMPORADA 4 — ABIERTA</span>

          <h1 className="h-disp" style={{
            fontSize: 'clamp(26px, 4.6vw, 50px)',
            color: '#fff',
            lineHeight: 1.25,
            textShadow: '4px 4px 0 var(--stone-1), -2px 2px 0 var(--stone-1), 2px -2px 0 var(--stone-1), -2px -2px 0 var(--stone-1)',
            margin: 0,
          }}>
            EL SERVIDOR<br />
            <span style={{ color: 'var(--gold)' }}>HONDUREÑO</span><br />
            MÁS ÉPICO DE LATAM
          </h1>

          <p style={{
            fontSize: 17,
            color: '#fff',
            lineHeight: 1.5,
            background: 'rgba(14,15,18,0.72)',
            padding: '12px 16px',
            border: '3px solid var(--stone-1)',
            boxShadow: '4px 4px 0 var(--stone-1)',
            margin: 0,
            maxWidth: 480,
          }}>
            Survival, Skyblock, BedWars, Factions, Lifesteal y más — todo en un mismo
            mundo. Java <strong>1.21.x</strong> + Bedrock unificados.
          </p>

          <IpCard size="lg" />

          {showCounter && <PlayerStrip players={players} peak={peak} />}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#tienda" className="btn btn--lg btn--gold">★ Ver tienda</a>
            <a href="#conectar" className="btn btn--lg" style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--stone-1)' }}>Cómo conectarse</a>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 18, zIndex: 6,
        transform: 'translateX(-50%)',
        opacity: scrollY > 80 ? 0 : 1,
        transition: 'opacity 0.3s',
        textAlign: 'center',
      }}>
        <div className="h-disp" style={{ fontSize: 9, color: '#fff', textShadow: '2px 2px 0 var(--stone-1)', marginBottom: 6 }}>SCROLL</div>
        <div style={{ width: 16, height: 16, background: 'var(--gold)', border: '2px solid var(--stone-1)', margin: '0 auto', animation: 'float-bob 1.4s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

/* ── Cloud ─────────────────────────────────────────────────── */
function Cloud({ x, big }) {
  return (
    <div className="pixelated" style={{
      position: 'absolute',
      left: x,
      width: big ? 80 : 60,
      height: big ? 32 : 24,
      background: '#fff',
      border: '3px solid #0e0f12',
      boxShadow: `${big ? 16 : 12}px ${big ? -12 : -8}px 0 -2px #fff, ${big ? -16 : -12}px ${big ? -8 : -6}px 0 -2px #fff`,
    }} />
  );
}

/* ── Far mountains ─────────────────────────────────────────── */
function FarMountains() {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 200, height: 280 }}>
      {[
        { left: '-2%', w: 240, h: 220, c: '#7d8a9a' },
        { left: '14%', w: 320, h: 260, c: '#6e7c8a' },
        { left: '40%', w: 280, h: 230, c: '#7d8a9a' },
        { left: '64%', w: 360, h: 280, c: '#6e7c8a' },
        { left: '88%', w: 240, h: 220, c: '#7d8a9a' },
      ].map((m, i) => (
        <div key={i} className="pixelated" style={{
          position: 'absolute',
          left: m.left,
          bottom: 0,
          width: m.w,
          height: m.h,
          background: `linear-gradient(180deg, ${m.c} 0 18%, color-mix(in srgb, ${m.c} 70%, #1d1f24) 18% 100%)`,
          clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
        }}>
          {/* snow cap */}
          <div style={{ position: 'absolute', left: '38%', right: '38%', top: 0, height: '20%', background: '#e8eef5', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
        </div>
      ))}
    </div>
  );
}

/* ── Mid mountains (more detailed, larger) ──────────────────── */
function MidMountains() {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 180, height: 320 }}>
      {[
        { left: '-6%', w: 380, h: 280, c: '#3b3f49' },
        { left: '24%', w: 480, h: 340, c: '#2b2e36' },
        { left: '58%', w: 420, h: 300, c: '#3b3f49' },
        { left: '85%', w: 320, h: 260, c: '#2b2e36' },
      ].map((m, i) => (
        <div key={i} className="pixelated" style={{
          position: 'absolute',
          left: m.left,
          bottom: 0,
          width: m.w,
          height: m.h,
          background: `linear-gradient(180deg, ${m.c} 0 22%, color-mix(in srgb, ${m.c} 60%, #0e0f12) 22% 100%)`,
          clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
        }}>
          <div style={{ position: 'absolute', left: '40%', right: '40%', top: 0, height: '24%', background: '#fff', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
        </div>
      ))}
    </div>
  );
}

/* ── Pixel tree ─────────────────────────────────────────────── */
function PixelTree({ variant = 'large' }) {
  const isSmall = variant === 'small';
  const lh = isSmall ? 56 : 80;
  const lw = isSmall ? 56 : 80;
  const tw = isSmall ? 14 : 20;
  const th = isSmall ? 32 : 50;
  return (
    <div className="pixelated" style={{ position: 'relative', width: lw, height: lh + th, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* leaves */}
      <div style={{
        width: lw, height: lh,
        background: '#3a6a18',
        border: '3px solid #0e0f12',
        boxShadow: 'inset 4px 4px 0 #5d9c2e, inset -4px -4px 0 #234410',
        position: 'relative',
      }}>
        {/* leaf detail squares */}
        <div style={{ position: 'absolute', top: 8, left: 12, width: 12, height: 12, background: '#5d9c2e' }} />
        <div style={{ position: 'absolute', top: 24, right: 16, width: 14, height: 12, background: '#5d9c2e' }} />
        <div style={{ position: 'absolute', bottom: 14, left: 22, width: 10, height: 10, background: '#234410' }} />
      </div>
      {/* trunk */}
      <div style={{
        width: tw, height: th,
        background: '#6b4423',
        border: '3px solid #0e0f12',
        borderTop: 'none',
        boxShadow: 'inset 3px 0 0 #8b5a2b, inset -3px 0 0 #4a2f1a',
      }} />
    </div>
  );
}

Object.assign(window, { HeroParallax, Steve, Cloud, FarMountains, MidMountains, PixelTree });
