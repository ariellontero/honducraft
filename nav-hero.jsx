// nav-hero.jsx — top navigation + hero (2 variants)

const { useState: useState_nh, useEffect: useEffect_nh, useRef: useRef_nh } = React;

/* ════════════════════════════════════════════════════════════
   TOP MARQUEE — pixel ticker like Minecraft splash text
   ════════════════════════════════════════════════════════════ */
function TopMarquee() {
  const items = [
    '★ TEMPORADA 4: TIERRAS DEL CACAO',
    'NUEVO MAPA SKYBLOCK 1.21',
    'BEDROCK + JAVA UNIFICADO',
    '−25% EN PASES HASTA EL 31 DE MAYO',
    'EVENTO: GUERRA DE FACCIONES — VIERNES 8PM',
    '★ TEMPORADA 4: TIERRAS DEL CACAO',
    'NUEVO MAPA SKYBLOCK 1.21',
    'BEDROCK + JAVA UNIFICADO',
    '−25% EN PASES HASTA EL 31 DE MAYO',
    'EVENTO: GUERRA DE FACCIONES — VIERNES 8PM',
  ];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, background: '#f4c430', display: 'inline-block' }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NAV BAR
   ════════════════════════════════════════════════════════════ */
function NavBar({ onTienda }) {
  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Modos', href: '#modos' },
    { label: 'Tienda', href: '#tienda' },
    { label: 'Ranking', href: '#ranking' },
    { label: 'Conectar', href: '#conectar' },
    { label: 'Reglas', href: '#reglas' },
    { label: 'FAQ', href: '#faq' },
  ];
  return (
    <header
      className="nav-shadow"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--paper)',
        borderBottom: '4px solid var(--stone-1)',
      }}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76, gap: 24 }}>
        {/* Logo */}
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
          <PixelBlock palette="grass" size={40} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="h-disp" style={{ fontSize: 16, color: 'var(--stone-1)' }}>HONDUCRAFT</span>
            <span className="h-disp" style={{ fontSize: 8, color: 'var(--grass-2)', marginTop: 4, letterSpacing: '0.18em' }}>.NET — SMP &amp; MINIJUEGOS</span>
          </div>
        </a>

        {/* Center links */}
        <nav style={{ display: 'flex', gap: 22, alignItems: 'center' }} className="nav-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="h-disp"
              style={{
                fontSize: 10,
                color: 'var(--stone-2)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                padding: '6px 0',
                borderBottom: '3px solid transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = 'var(--grass-3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = 'transparent'; }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="https://discord.gg/5wkG7hJvad" className="btn btn--sm btn--ghost" style={{ display: 'inline-flex' }}>
            <span style={{ width: 10, height: 10, background: '#5865f2', display: 'inline-block', border: '2px solid var(--stone-1)' }} /> Discord
          </a>
          <a href="#tienda" className="btn btn--sm btn--gold" onClick={onTienda}>
            Tienda →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
}

/* ════════════════════════════════════════════════════════════
   IP CARD — copy-to-clipboard, central to both heroes
   ════════════════════════════════════════════════════════════ */
function IpCard({ size = 'md' }) {
  const [copied, setCopied] = useState_nh(false);
  const ip = 'play.honducraft.net';
  const onCopy = () => {
    try { navigator.clipboard?.writeText(ip); } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const isLg = size === 'lg';
  return (
    <div
      className="block block--cream"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        padding: 0,
        boxShadow: 'inset 3px 3px 0 rgba(255,255,255,.6), inset -3px -3px 0 rgba(0,0,0,.18), 6px 6px 0 var(--stone-1)',
        background: 'var(--cream)',
      }}
    >
      <div style={{ padding: isLg ? '18px 22px' : '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, flex: 1 }}>
        <span className="h-disp" style={{ fontSize: 8, color: 'var(--stone-4)', letterSpacing: '0.14em' }}>SERVIDOR — JAVA 1.21.X / BEDROCK</span>
        <span className="h-disp" style={{ fontSize: isLg ? 22 : 18, color: 'var(--stone-1)' }}>{ip}</span>
      </div>
      <button
        onClick={onCopy}
        className={`btn ${isLg ? 'btn--lg' : ''} ${copied ? 'btn--emerald' : 'btn--grass'}`}
        style={{ borderRadius: 0, marginLeft: 0, alignSelf: 'stretch' }}
      >
        {copied ? '✓ Copiado' : 'Copiar IP'}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PIXEL LANDSCAPE — backdrop scenery for hero A
   ════════════════════════════════════════════════════════════ */
function PixelLandscape() {
  return (
    <div className="landscape pixelated" style={{ position: 'absolute', inset: 0 }}>
      {/* Sun */}
      <div className="sun" style={{ left: '12%', top: '14%', width: 32, height: 32 }} />
      {/* Clouds */}
      <div className="cloud" style={{ left: '32%', top: '18%' }} />
      <div className="cloud" style={{ left: '62%', top: '10%' }} />
      <div className="cloud" style={{ left: '78%', top: '24%' }} />
      {/* Far mountains */}
      <div className="mountain" style={{ left: '5%', width: 280, height: 200, opacity: 0.7 }} />
      <div className="mountain" style={{ left: '22%', width: 360, height: 260, opacity: 0.85 }} />
      <div className="mountain" style={{ right: '8%', width: 320, height: 230, opacity: 0.8 }} />
      <div className="mountain" style={{ right: '26%', width: 240, height: 180, opacity: 0.7 }} />
      {/* Trees */}
      <div className="tree-leaves" style={{ left: '8%', bottom: '24%', width: 64, height: 64 }} />
      <div className="tree-trunk" style={{ left: '8%', bottom: '17%', width: 16, height: 32, marginLeft: 24 }} />
      <div className="tree-leaves" style={{ left: '78%', bottom: '24%', width: 56, height: 56 }} />
      <div className="tree-trunk" style={{ left: '78%', bottom: '18%', width: 16, height: 28, marginLeft: 20 }} />
      {/* Foreground grass blocks */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '22%',
        background: `linear-gradient(180deg, var(--grass-3) 0 18%, var(--grass-2) 18% 35%, var(--dirt-3) 35% 55%, var(--dirt-2) 55% 100%)` }} />
      {/* a Steve-like silhouette block */}
      <div style={{ position: 'absolute', left: '50%', bottom: '24%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, background: 'var(--dirt-4)', border: '3px solid var(--stone-1)' }} />
        <div style={{ width: 28, height: 38, background: 'var(--sky-1)', border: '3px solid var(--stone-1)', borderTop: 'none' }} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: 12, height: 22, background: 'var(--stone-3)', border: '3px solid var(--stone-1)', borderRight: 'none', borderTop: 'none' }} />
          <div style={{ width: 12, height: 22, background: 'var(--stone-3)', border: '3px solid var(--stone-1)', borderTop: 'none' }} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO A — "Plaza" — landscape backdrop, IP front-and-center
   ════════════════════════════════════════════════════════════ */
function HeroPlaza({ players, peak, showCounter }) {
  return (
    <section id="inicio" style={{ position: 'relative', overflow: 'hidden', borderBottom: '4px solid var(--stone-1)' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <PixelLandscape />
        {/* darken bottom for legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.18) 100%)' }} />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '88px 32px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 760 }}>
          <span className="tag tag--gold">★ TEMPORADA 4 — ABIERTA</span>

          <h1 className="h-disp" style={{
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: '#fff',
            lineHeight: 1.25,
            textShadow: '4px 4px 0 var(--stone-1), -2px 2px 0 var(--stone-1), 2px -2px 0 var(--stone-1)',
            margin: 0,
          }}>
            EL SERVIDOR<br />HONDUREÑO MÁS<br /><span style={{ color: 'var(--gold)' }}>ÉPICO</span> DE LATAM
          </h1>

          <p style={{
            fontSize: 19,
            color: '#fff',
            lineHeight: 1.5,
            maxWidth: 520,
            background: 'rgba(14,15,18,0.65)',
            padding: '14px 18px',
            border: '3px solid var(--stone-1)',
            margin: 0,
          }}>
            Survival, Skyblock, BedWars, Factions, Lifesteal, Roleplay y más — todo
            en un mismo mundo. Java <strong>1.21.x</strong> + Bedrock unificados.
          </p>

          <IpCard size="lg" />

          {showCounter && (
            <PlayerStrip players={players} peak={peak} />
          )}

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#tienda" className="btn btn--lg btn--gold">★ Ver tienda</a>
            <a href="#conectar" className="btn btn--lg btn--ghost" style={{ background: 'rgba(255,255,255,0.92)' }}>Cómo conectarse</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO B — "Inventario" — split with pixel inventory grid
   ════════════════════════════════════════════════════════════ */
function HeroInventory({ players, peak, showCounter }) {
  const slots = [
    { kind: 'sword', tone: 'redstone' },
    { kind: 'pickaxe', tone: 'stone' },
    { kind: 'chest', tone: 'gold' },
    { kind: 'key', tone: 'gold' },
    { kind: 'crown', tone: 'gold' },
    { kind: 'potion', tone: 'emerald' },
    { kind: 'pet', tone: 'sky' },
    { kind: 'coin', tone: 'gold' },
    { kind: 'boost', tone: 'redstone' },
  ];
  return (
    <section id="inicio" style={{ position: 'relative', borderBottom: '4px solid var(--stone-1)', background: 'var(--cream)' }}>
      {/* sky strip top */}
      <div style={{ height: 220, background: 'linear-gradient(180deg, var(--sky-3) 0%, var(--sky-2) 100%)', borderBottom: '4px solid var(--stone-1)', position: 'relative', overflow: 'hidden' }}>
        <div className="cloud" style={{ left: '15%', top: 60 }} />
        <div className="cloud" style={{ left: '55%', top: 30 }} />
        <div className="cloud" style={{ left: '78%', top: 90 }} />
        <div className="sun" style={{ right: '10%', top: 40, width: 36, height: 36 }} />
      </div>

      <div className="wrap" style={{ paddingTop: 0, paddingBottom: 80, position: 'relative' }}>
        <div className="grid g-2" style={{ gap: 56, alignItems: 'start', marginTop: -120 }}>
          {/* Left: copy + IP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 24 }}>
            <span className="tag tag--gold">★ DROP DE TEMPORADA</span>

            <h1 className="h-disp" style={{
              fontSize: 'clamp(26px, 4.5vw, 44px)',
              color: 'var(--stone-1)',
              lineHeight: 1.3,
              margin: 0,
            }}>
              CONSTRUYE,<br />SAQUEA,<br />
              <span style={{ background: 'var(--gold)', padding: '0 8px', border: '3px solid var(--stone-1)', display: 'inline-block', marginTop: 8 }}>DOMINA</span>
            </h1>

            <p className="sect-sub" style={{ margin: 0, color: 'var(--stone-3)', fontSize: 18 }}>
              7 modos de juego, comunidad hispana 24/7 y una tienda con todo lo
              que necesitás para destacar. Lobby unificado, lag bajo, staff activo.
            </p>

            <IpCard size="lg" />

            {showCounter && (
              <PlayerStrip players={players} peak={peak} />
            )}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#tienda" className="btn btn--lg btn--gold">Abrir tienda</a>
              <a href="#modos" className="btn btn--lg btn--ghost">Ver modos</a>
            </div>
          </div>

          {/* Right: inventory grid */}
          <div style={{ paddingTop: 8 }}>
            <div className="panel panel--dark" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span className="h-disp" style={{ fontSize: 11, color: 'var(--gold)' }}>★ Honducraft.inv</span>
                <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)' }}>9 / 36 SLOTS</span>
              </div>
              <div className="grid g-3" style={{ gap: 8 }}>
                {slots.map((s, i) => (
                  <div key={i} className="slot" style={{ aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                    <ItemIcon kind={s.kind} size={64} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--stone-2)', border: '3px solid var(--stone-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="h-disp" style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)' }}>HOTBAR ESPECIAL</span>
                <span className="h-disp" style={{ fontSize: 9, color: 'var(--gold)' }}>−25% HOY</span>
              </div>
            </div>
            {/* floating block ornaments */}
            <div style={{ position: 'relative', marginTop: -8, display: 'flex', gap: 10, justifyContent: 'flex-end', paddingRight: 24 }}>
              <PixelBlock palette="diamond" size={48} />
              <PixelBlock palette="emerald" size={48} />
              <PixelBlock palette="gold" size={48} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PLAYER STRIP — live counter widget
   ════════════════════════════════════════════════════════════ */
function PlayerStrip({ players, peak }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'stretch',
      gap: 0,
      background: 'var(--stone-1)',
      border: '3px solid var(--stone-1)',
      boxShadow: '4px 4px 0 var(--stone-3)',
    }}>
      <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--stone-2)', minWidth: 140 }}>
        <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="live-dot" /> EN LÍNEA
        </span>
        <span className="h-mono" style={{ fontSize: 36, color: '#2dd75e' }}>
          <LiveCounter value={players} />
        </span>
      </div>
      <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--stone-3)', minWidth: 120 }}>
        <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)' }}>PICO HOY</span>
        <span className="h-mono" style={{ fontSize: 36, color: 'var(--gold)' }}>
          <LiveCounter value={peak} />
        </span>
      </div>
      <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--stone-2)', minWidth: 120 }}>
        <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)' }}>UPTIME</span>
        <span className="h-mono" style={{ fontSize: 36, color: '#fff' }}>99.8%</span>
      </div>
    </div>
  );
}

Object.assign(window, { TopMarquee, NavBar, IpCard, HeroPlaza, HeroInventory, PlayerStrip });
