// modes-store.jsx — game modes grid + tienda (the star section)

const { useState: useState_ms } = React;

/* ════════════════════════════════════════════════════════════
   MODES — game mode cards
   ════════════════════════════════════════════════════════════ */
function ModesSection() {
  const modes = [
    { id: 'survival', name: 'Survival SMP', tag: 'Casa principal', players: 218, palette: 'grass',
      desc: 'Vanilla+ con tierras protegidas, economía y mercado de jugadores.', accent: 'var(--grass-3)' },
    { id: 'skyblock', name: 'Skyblock', tag: 'Nuevo 1.21', players: 96, palette: 'diamond',
      desc: 'Islas infinitas, niveles, misiones diarias y cofres mágicos.', accent: 'var(--sky-2)' },
    { id: 'bedwars', name: 'BedWars', tag: 'Minijuego', players: 144, palette: 'redstone',
      desc: 'Defiende tu cama, destruye las demás. Solos / Dúos / Squads.', accent: 'var(--redstone)' },
    { id: 'factions', name: 'Factions', tag: 'PvP', players: 72, palette: 'netherite',
      desc: 'Forma alianzas, conquista bases, controla la economía del wipe.', accent: 'var(--stone-5)' },
    { id: 'lifesteal', name: 'Lifesteal', tag: 'Hardcore', players: 41, palette: 'redstone',
      desc: 'Mata para robar corazones. Cero corazones = baneo de temporada.', accent: 'var(--redstone)' },
    { id: 'rp', name: 'Roleplay', tag: 'Comunidad', players: 33, palette: 'gold',
      desc: 'Ciudades, oficios, economía narrativa y trama mensual.', accent: 'var(--gold)' },
    { id: 'vanilla', name: 'Vanilla+ QoL', tag: 'Tranqui', players: 58, palette: 'leaf',
      desc: 'Solo plugins de calidad de vida. Sin tiendas pay-to-win.', accent: 'var(--grass-2)' },
    { id: 'minigames', name: 'Más Minijuegos', tag: 'Lobby', players: 134, palette: 'gold',
      desc: 'SkyWars, Build Battle, TNT Run, Murder Mystery y más.', accent: 'var(--gold)' },
  ];
  return (
    <section id="modos" className="section" style={{ background: 'var(--paper)' }} data-screen-label="Modos">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 24, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow="MODOS DE JUEGO"
            title="7 mundos. 1 sola IP."
            sub="Conectate una vez y elegí qué jugar desde el lobby central. Inventarios y economías separados por mundo."
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="tag tag--grass">JAVA 1.21.X</span>
            <span className="tag tag--sky">BEDROCK</span>
          </div>
        </div>

        <div className="grid g-4" style={{ gap: 18 }}>
          {modes.map((m) => (
            <ModeCard key={m.id} mode={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModeCard({ mode }) {
  const [hover, setHover] = useState_ms(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#fff',
        border: '4px solid var(--stone-1)',
        boxShadow: hover ? '8px 8px 0 var(--stone-1)' : '6px 6px 0 var(--stone-1)',
        transform: hover ? 'translate(-2px, -2px)' : 'none',
        transition: 'transform 0.08s, box-shadow 0.08s',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* top art zone */}
      <div style={{
        height: 120,
        background: `linear-gradient(180deg, ${mode.accent} 0%, ${mode.accent} 60%, color-mix(in srgb, ${mode.accent} 70%, var(--stone-1)) 100%)`,
        position: 'relative',
        borderBottom: '4px solid var(--stone-1)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 16,
        overflow: 'hidden',
      }}>
        {/* repeating block pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 12px, transparent 12px 24px)`,
        }} />
        {/* big block */}
        <div style={{ position: 'absolute', left: 16, bottom: 14 }}>
          <PixelBlock palette={mode.palette} size={70} />
        </div>
        <span className="tag" style={{ position: 'relative' }}>{mode.tag}</span>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 className="h-disp" style={{ fontSize: 14, margin: 0, color: 'var(--stone-1)' }}>{mode.name}</h3>
        <p style={{ margin: 0, fontSize: 14.5, color: 'var(--stone-3)', lineHeight: 1.55, flex: 1 }}>{mode.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px dashed var(--stone-5)', paddingTop: 12 }}>
          <span className="h-disp" style={{ fontSize: 8, color: 'var(--stone-4)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="live-dot" />
            {mode.players} ONLINE
          </span>
          <span className="h-disp" style={{ fontSize: 9, color: 'var(--grass-2)' }}>JUGAR →</span>
        </div>
      </div>
    </article>
  );
}

/* ════════════════════════════════════════════════════════════
   STORE — the STAR section
   - Top: featured pase + rangos VIP tier comparison
   - Mid:  hotbar of categories
   - Grid: items (llaves, cosméticos, mascotas, monedas, boosters, kits)
   ════════════════════════════════════════════════════════════ */
function StoreSection() {
  return (
    <section id="tienda" className="section" data-screen-label="Tienda" style={{
      background: 'var(--cream)',
      borderTop: '4px solid var(--stone-1)',
      borderBottom: '4px solid var(--stone-1)',
      position: 'relative',
    }}>
      {/* ornament */}
      <div style={{ position: 'absolute', left: 24, top: 32, display: 'flex', gap: 6 }}>
        <PixelBlock palette="emerald" size={36} />
        <PixelBlock palette="diamond" size={36} />
      </div>
      <div style={{ position: 'absolute', right: 24, top: 32, display: 'flex', gap: 6 }}>
        <PixelBlock palette="gold" size={36} />
        <PixelBlock palette="redstone" size={36} />
      </div>

      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="sect-eyebrow" style={{ justifyContent: 'center' }}>TIENDA OFICIAL</span>
          <h2 className="sect-title" style={{ fontSize: 36, marginTop: 16 }}>
            EL <span style={{ background: 'var(--gold)', padding: '0 12px', border: '4px solid var(--stone-1)' }}>HOTBAR</span> DE HONDUCRAFT
          </h2>
          <p className="sect-sub" style={{ margin: '12px auto 0', fontSize: 18 }}>
            Cosméticos, ventajas y soporte directo al servidor. Pagos seguros vía
            tarjeta, PayPal, Tigo Money y Pix.
          </p>
        </div>

        <FeaturedDeal />

        <RangosVip />

        <CategoryHotbar />

        <ItemsGrid />

        <SeasonPass />
      </div>
    </section>
  );
}

/* ── Featured deal banner ──────────────────────────────────── */
function FeaturedDeal() {
  return (
    <div className="panel panel--dark" style={{ marginBottom: 56, padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0 }} className="featured-grid">
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
          <span className="tag tag--gold">★ DROP DE TEMPORADA — −25%</span>
          <h3 className="h-disp" style={{ fontSize: 22, margin: 0, color: '#fff', lineHeight: 1.35 }}>
            COFRE DE LA TEMPORADA 4
          </h3>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.55, maxWidth: 460 }}>
            10× llaves doradas, 1× pet legendario aleatorio, 5,000 monedas in-game
            y un cosmético exclusivo de las Tierras del Cacao. Solo hasta el 31 de mayo.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span className="h-mono" style={{ fontSize: 48, color: 'var(--gold)' }}>$8.99</span>
              <span className="h-disp" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>$11.99</span>
            </div>
            <a href="#" className="btn btn--lg btn--gold">Comprar →</a>
          </div>
        </div>
        <div style={{ background: 'var(--stone-2)', borderLeft: '3px solid var(--stone-1)', position: 'relative', minHeight: 240, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* central giant chest */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ background: 'var(--gold)', border: '4px solid var(--stone-1)', padding: 16, boxShadow: 'inset 4px 4px 0 #fde072, inset -4px -4px 0 var(--gold-2)' }}>
              <ItemIcon kind="chest" size={120} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <PixelBlock palette="gold" size={28} />
              <PixelBlock palette="diamond" size={28} />
              <PixelBlock palette="emerald" size={28} />
              <PixelBlock palette="redstone" size={28} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── VIP rank ladder ───────────────────────────────────────── */
function RangosVip() {
  const ranks = [
    { name: 'IRON',     tag: 'Inicio',     price: 4.99,  palette: 'stone',     accent: '#8a8f9a',
      perks: ['/sethome ×3', 'Color en chat', '+15% drops', 'Acceso al Discord VIP'] },
    { name: 'GOLD',     tag: 'Más popular', price: 9.99,  palette: 'gold',      accent: '#f4c430', popular: true,
      perks: ['Todo lo anterior', '/sethome ×8', 'Vuelo en lobby', 'Skin propia + capa', '+30% drops'] },
    { name: 'DIAMOND',  tag: 'Pro',        price: 19.99, palette: 'diamond',   accent: '#39c4d4',
      perks: ['Todo lo anterior', '/sethome ×15', 'Vuelo en survival', 'Pet exclusivo', '+50% drops'] },
    { name: 'NETHERITE', tag: 'Top',       price: 39.99, palette: 'netherite', accent: '#3b3338',
      perks: ['Todo lo anterior', '/sethome ×25', 'Acceso early a temporadas', 'Cosmético mensual', '+75% drops'] },
  ];
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
        <h3 className="h-disp" style={{ fontSize: 18, margin: 0, color: 'var(--stone-1)' }}>► RANGOS VIP</h3>
        <span style={{ fontSize: 14, color: 'var(--stone-4)' }}>Suscripción única, dura para siempre. Acumulan al subir de tier.</span>
      </div>
      <div className="grid g-4" style={{ gap: 18 }}>
        {ranks.map((r) => (
          <RankCard key={r.name} rank={r} />
        ))}
      </div>
    </div>
  );
}

function RankCard({ rank }) {
  return (
    <div style={{
      background: '#fff',
      border: '4px solid var(--stone-1)',
      boxShadow: rank.popular ? '8px 8px 0 var(--gold), 8px 8px 0 4px var(--stone-1)' : '6px 6px 0 var(--stone-1)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transform: rank.popular ? 'translateY(-8px)' : 'none',
    }}>
      {rank.popular && (
        <div style={{
          position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--gold)', border: '3px solid var(--stone-1)',
          padding: '6px 12px', whiteSpace: 'nowrap',
        }}>
          <span className="h-disp" style={{ fontSize: 9, color: 'var(--stone-1)' }}>★ MÁS POPULAR</span>
        </div>
      )}
      <div style={{
        padding: 20,
        background: rank.accent,
        color: rank.name === 'GOLD' ? 'var(--stone-1)' : '#fff',
        borderBottom: '4px solid var(--stone-1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 8px, transparent 8px 16px)' }} />
        <div style={{ position: 'relative' }}>
          <PixelBlock palette={rank.palette} size={64} />
        </div>
        <h4 className="h-disp" style={{ fontSize: 18, margin: 0, position: 'relative' }}>{rank.name}</h4>
        <span className="h-disp" style={{ fontSize: 8, opacity: 0.7, letterSpacing: '0.12em', position: 'relative' }}>{rank.tag.toUpperCase()}</span>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="h-mono" style={{ fontSize: 38, color: 'var(--stone-1)' }}>${rank.price}</span>
          <span style={{ fontSize: 13, color: 'var(--stone-4)' }}>USD</span>
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--stone-2)', flex: 1 }}>
          {rank.perks.map((p, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', lineHeight: 1.4 }}>
              <span style={{ width: 10, height: 10, background: 'var(--grass-3)', border: '2px solid var(--stone-1)', flexShrink: 0, marginTop: 5 }} />
              {p}
            </li>
          ))}
        </ul>
        <button className={`btn ${rank.popular ? 'btn--gold' : 'btn--ghost'}`} style={{ marginTop: 'auto' }}>
          Obtener {rank.name}
        </button>
      </div>
    </div>
  );
}

/* ── Category hotbar ───────────────────────────────────────── */
function CategoryHotbar() {
  const cats = [
    { id: 'all',    label: 'Todos',     icon: 'sword' },
    { id: 'keys',   label: 'Llaves',    icon: 'key' },
    { id: 'cos',    label: 'Cosméticos', icon: 'crown' },
    { id: 'pets',   label: 'Mascotas',  icon: 'pet' },
    { id: 'coins',  label: 'Monedas',   icon: 'coin' },
    { id: 'boost',  label: 'Boosters',  icon: 'boost' },
    { id: 'kits',   label: 'Kits',      icon: 'helmet' },
    { id: 'pass',   label: 'Pases',     icon: 'book' },
    { id: 'pot',    label: 'Pociones',  icon: 'potion' },
  ];
  const [active, setActive] = useState_ms('all');
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 className="h-disp" style={{ fontSize: 18, margin: '0 0 16px', color: 'var(--stone-1)' }}>► CATEGORÍAS</h3>
      <div style={{
        display: 'flex',
        gap: 0,
        background: 'var(--stone-1)',
        padding: 0,
        border: '4px solid var(--stone-1)',
        boxShadow: '6px 6px 0 var(--stone-3)',
        overflowX: 'auto',
      }}>
        {cats.map((c, i) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                flex: '1 0 110px',
                padding: '14px 8px 12px',
                background: isActive ? 'var(--cream)' : 'var(--stone-3)',
                border: 'none',
                borderRight: i < cats.length - 1 ? '3px solid var(--stone-1)' : 'none',
                borderBottom: isActive ? '6px solid var(--gold)' : '6px solid var(--stone-1)',
                color: isActive ? 'var(--stone-1)' : 'rgba(255,255,255,0.85)',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 9,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: isActive
                  ? 'inset 3px 3px 0 rgba(255,255,255,0.5), inset -3px -3px 0 rgba(0,0,0,0.18)'
                  : 'inset 3px 3px 0 rgba(255,255,255,0.18), inset -3px -3px 0 rgba(0,0,0,0.4)',
              }}
            >
              <ItemIcon kind={c.icon} size={36} />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Items grid ────────────────────────────────────────────── */
function ItemsGrid() {
  const items = [
    { name: 'Llave Dorada',     category: 'Llaves',     icon: 'key',     price: 0.99, qty: '1×',  rarity: 'Épica',     accent: 'var(--gold)' },
    { name: 'Pack 10 Llaves',   category: 'Llaves',     icon: 'key',     price: 7.99, qty: '10×', rarity: 'Épica',     accent: 'var(--gold)', sale: '−20%' },
    { name: 'Pet: Lobo Maya',   category: 'Mascotas',   icon: 'pet',     price: 4.99, qty: '1×',  rarity: 'Rara',      accent: 'var(--sky-2)' },
    { name: 'Pet: Quetzal',     category: 'Mascotas',   icon: 'pet',     price: 9.99, qty: '1×',  rarity: 'Legendaria', accent: 'var(--emerald)', sale: 'NUEVO' },
    { name: 'Corona Catracha',  category: 'Cosméticos', icon: 'crown',   price: 6.99, qty: '1×',  rarity: 'Épica',     accent: 'var(--gold)' },
    { name: 'Capa de Nubes',    category: 'Cosméticos', icon: 'crown',   price: 3.99, qty: '1×',  rarity: 'Común',     accent: 'var(--sky-2)' },
    { name: 'Bolsa 5K Monedas', category: 'Monedas',    icon: 'coin',    price: 2.99, qty: '5K',  rarity: 'Económico', accent: 'var(--gold)' },
    { name: 'Bolsa 25K',        category: 'Monedas',    icon: 'coin',    price: 11.99, qty: '25K', rarity: 'Mejor valor', accent: 'var(--gold)', sale: '+10%' },
    { name: 'Poción de Velocidad', category: 'Pociones',  icon: 'potion',  price: 2.49, qty: '5min', rarity: 'Común',     accent: 'var(--sky-2)' },
    { name: 'Poción de Curación II', category: 'Pociones', icon: 'potion',  price: 3.99, qty: '8min', rarity: 'Rara',      accent: 'var(--redstone)' },
    { name: 'Booster XP 1h',    category: 'Boosters',   icon: 'boost',   price: 1.99, qty: '1h',  rarity: 'Común',     accent: 'var(--redstone)' },
    { name: 'Booster XP 24h',   category: 'Boosters',   icon: 'boost',   price: 9.99, qty: '24h', rarity: 'Épica',     accent: 'var(--redstone)' },
    { name: 'Kit Aventurero',   category: 'Kits',       icon: 'helmet',  price: 4.99, qty: '1×',  rarity: 'Rara',      accent: 'var(--grass-3)' },
    { name: 'Poción de Salto',  category: 'Pociones',   icon: 'potion',  price: 2.99, qty: '10min', rarity: 'Común',   accent: 'var(--emerald)' },
  ];
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h3 className="h-disp" style={{ fontSize: 18, margin: 0, color: 'var(--stone-1)' }}>► ÍTEMS DESTACADOS</h3>
        <a href="#" className="h-disp" style={{ fontSize: 10, color: 'var(--grass-2)', textDecoration: 'none', borderBottom: '3px solid var(--grass-3)', paddingBottom: 4 }}>
          Ver tienda completa →
        </a>
      </div>
      <div className="grid g-4" style={{ gap: 14 }}>
        {items.map((item, i) => <ItemCard key={i} item={item} />)}
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  const cardRef = React.useRef(null);
  const [tilt, setTilt] = useState_ms({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 10 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });
  const isPotion = item.icon === 'potion';
  return (
    <div
      ref={cardRef}
      className="card-shine"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: '#fff',
        border: '4px solid var(--stone-1)',
        boxShadow: '4px 4px 0 var(--stone-1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {item.sale && (
        <div style={{
          position: 'absolute', top: -12, right: 12,
          background: 'var(--redstone)', color: '#fff',
          border: '3px solid var(--stone-1)',
          padding: '4px 8px',
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          zIndex: 3,
          transform: 'translateZ(20px)',
        }}>{item.sale}</div>
      )}
      {/* item visual: hotbar-style slot */}
      <div className={`slot slot--glow ${isPotion ? 'potion-jar' : ''}`} style={{
        background: `color-mix(in srgb, ${item.accent} 25%, var(--stone-5))`,
        aspectRatio: '1.4 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '4px solid var(--stone-1)',
        position: 'relative',
        overflow: 'hidden',
        '--glow': `${item.accent}aa`,
        '--rays': `${item.accent}99`,
      }}>
        {/* rotating rarity rays behind icon */}
        <div className="rarity-rays" />

        {/* potion bubbles */}
        {isPotion && [0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="bubble" style={{
            left: `${20 + i * 14}%`,
            animationDelay: `${i * 0.32}s`,
            animationDuration: `${1.5 + (i % 3) * 0.4}s`,
            background: `color-mix(in srgb, ${item.accent} 60%, #fff)`,
            '--bx': `${(i % 2 ? 1 : -1) * (4 + i)}px`,
          }} />
        ))}

        <div className="item-icon-wrap" style={{ position: 'relative', zIndex: 1, transform: 'translateZ(30px)' }}>
          <ItemIcon kind={item.icon} size={64} />
        </div>
        {/* qty pill */}
        <span style={{
          position: 'absolute', right: 8, bottom: 8,
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          background: 'var(--stone-1)', color: '#fff',
          padding: '4px 6px',
          border: '2px solid var(--stone-1)',
          zIndex: 2,
          transform: 'translateZ(15px)',
        }}>{item.qty}</span>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div>
          <span className="h-disp" style={{ fontSize: 8, color: 'var(--stone-4)' }}>{item.category.toUpperCase()}</span>
          <h4 style={{ margin: '6px 0 0', fontSize: 16, fontWeight: 700, color: 'var(--stone-1)' }}>{item.name}</h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8 }}>
          <span className="h-mono" style={{ fontSize: 28, color: 'var(--stone-1)' }}>${item.price}</span>
          <button className="btn btn--sm btn--grass">+ Añadir</button>
        </div>
      </div>
    </div>
  );
}

/* ── Season pass banner ────────────────────────────────────── */
function SeasonPass() {
  const tiers = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{
        background: 'var(--stone-1)',
        color: '#fff',
        border: '4px solid var(--stone-1)',
        boxShadow: '8px 8px 0 var(--gold)',
        padding: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="tag tag--gold">★ PASE DE TEMPORADA 4</span>
            <h3 className="h-disp" style={{ fontSize: 22, margin: '14px 0 8px' }}>TIERRAS DEL CACAO</h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: 15, maxWidth: 540, lineHeight: 1.5 }}>
              50 niveles de recompensas: cosméticos exclusivos, llaves, monedas y un pet legendario al lvl 50.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div>
              <span className="h-disp" style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 4 }}>PRECIO</span>
              <span className="h-mono" style={{ fontSize: 40, color: 'var(--gold)' }}>$14.99</span>
            </div>
            <a href="#" className="btn btn--lg btn--gold">Activar pase</a>
          </div>
        </div>

        {/* tier track */}
        <div style={{ background: 'var(--stone-2)', border: '3px solid var(--stone-1)', padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="h-disp" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>PROGRESO TEMPORADA</span>
            <span className="h-disp" style={{ fontSize: 9, color: 'var(--gold)' }}>NIVEL 12 / 50</span>
          </div>
          <div style={{ height: 18, background: 'var(--stone-3)', border: '3px solid var(--stone-1)', position: 'relative', marginBottom: 14 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '24%', background: 'var(--gold)', borderRight: '3px solid var(--stone-1)' }} />
          </div>
          <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
            {tiers.map((t, i) => {
              const claimed = i < 3;
              const current = i === 3;
              return (
                <div key={t} style={{
                  flex: 1,
                  minWidth: 0,
                  aspectRatio: '1 / 1',
                  background: claimed ? 'var(--gold)' : current ? 'var(--emerald)' : 'var(--stone-3)',
                  border: '3px solid var(--stone-1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  <span className="h-disp" style={{ fontSize: 8, color: claimed ? 'var(--stone-1)' : 'rgba(255,255,255,0.7)', position: 'absolute', top: 4, left: 4 }}>L{t}</span>
                  <ItemIcon kind={['key','coin','potion','crown','book','helmet','pickaxe','boost','sword','pet','chest'][i % 11]} size={28} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ModesSection, StoreSection });
