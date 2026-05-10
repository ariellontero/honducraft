// ranking-connect.jsx — leaderboard + cómo conectarse

const { useState: useState_rc } = React;

/* ════════════════════════════════════════════════════════════
   RANKING — top jugadores
   ════════════════════════════════════════════════════════════ */
function RankingSection() {
  const tabs = [
    { id: 'level', label: 'Nivel total' },
    { id: 'kills', label: 'Kills PvP' },
    { id: 'rich',  label: 'Más ricos' },
    { id: 'time',  label: 'Tiempo jugado' },
  ];
  const [active, setActive] = useState_rc('level');

  // Same data, different sorts (mocked)
  const dataByTab = {
    level: [
      { rank: 1, name: 'CatrachoBuilder', value: '99', sub: '4,820 horas', rankBadge: 'NETHERITE', color: '#3b3338' },
      { rank: 2, name: 'LempiraXX', value: '94', sub: '3,210 horas', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 3, name: 'CopanQueen', value: '91', sub: '2,955 horas', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 4, name: 'PuntaSal_HN', value: '88', sub: '2,488 horas', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 5, name: 'TegusTNT', value: '85', sub: '2,201 horas', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 6, name: 'CeibaMiner', value: '83', sub: '2,010 horas', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 7, name: 'MayaBuilder', value: '79', sub: '1,860 horas', rankBadge: 'IRON', color: '#8a8f9a' },
      { rank: 8, name: 'RoatánPvP', value: '77', sub: '1,654 horas', rankBadge: 'IRON', color: '#8a8f9a' },
    ],
    kills: [
      { rank: 1, name: 'TegusTNT', value: '8,442', sub: 'KDR 4.8', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 2, name: 'RoatánPvP', value: '7,910', sub: 'KDR 4.2', rankBadge: 'IRON', color: '#8a8f9a' },
      { rank: 3, name: 'LempiraXX', value: '6,388', sub: 'KDR 3.9', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 4, name: 'CatrachoBuilder', value: '5,201', sub: 'KDR 3.1', rankBadge: 'NETHERITE', color: '#3b3338' },
      { rank: 5, name: 'CopanQueen', value: '4,855', sub: 'KDR 2.8', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 6, name: 'PuntaSal_HN', value: '4,210', sub: 'KDR 2.5', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 7, name: 'CeibaMiner', value: '3,888', sub: 'KDR 2.2', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 8, name: 'MayaBuilder', value: '3,102', sub: 'KDR 1.9', rankBadge: 'IRON', color: '#8a8f9a' },
    ],
    rich: [
      { rank: 1, name: 'CopanQueen', value: '$2.4M', sub: 'monedas in-game', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 2, name: 'CatrachoBuilder', value: '$1.9M', sub: 'monedas in-game', rankBadge: 'NETHERITE', color: '#3b3338' },
      { rank: 3, name: 'LempiraXX', value: '$1.5M', sub: 'monedas in-game', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 4, name: 'CeibaMiner', value: '$1.1M', sub: 'monedas in-game', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 5, name: 'PuntaSal_HN', value: '$890K', sub: 'monedas in-game', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 6, name: 'MayaBuilder', value: '$720K', sub: 'monedas in-game', rankBadge: 'IRON', color: '#8a8f9a' },
      { rank: 7, name: 'TegusTNT', value: '$610K', sub: 'monedas in-game', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 8, name: 'RoatánPvP', value: '$545K', sub: 'monedas in-game', rankBadge: 'IRON', color: '#8a8f9a' },
    ],
    time: [
      { rank: 1, name: 'CatrachoBuilder', value: '4,820', sub: 'horas', rankBadge: 'NETHERITE', color: '#3b3338' },
      { rank: 2, name: 'LempiraXX', value: '3,210', sub: 'horas', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 3, name: 'CopanQueen', value: '2,955', sub: 'horas', rankBadge: 'DIAMOND', color: '#39c4d4' },
      { rank: 4, name: 'PuntaSal_HN', value: '2,488', sub: 'horas', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 5, name: 'TegusTNT', value: '2,201', sub: 'horas', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 6, name: 'CeibaMiner', value: '2,010', sub: 'horas', rankBadge: 'GOLD', color: '#f4c430' },
      { rank: 7, name: 'MayaBuilder', value: '1,860', sub: 'horas', rankBadge: 'IRON', color: '#8a8f9a' },
      { rank: 8, name: 'RoatánPvP', value: '1,654', sub: 'horas', rankBadge: 'IRON', color: '#8a8f9a' },
    ],
  };
  const data = dataByTab[active];

  return (
    <section id="ranking" className="section" data-screen-label="Ranking" style={{ background: 'var(--paper)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 36 }}>
          <SectionHeader
            eyebrow="LEADERBOARD"
            title="Top jugadores de la temporada"
            sub="Datos en vivo del servidor. Los rankings se reinician cada temporada (3 meses)."
          />
          <span className="h-disp" style={{ fontSize: 9, color: 'var(--stone-4)' }}>ACTUALIZADO HACE 2 MIN</span>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '4px solid var(--stone-1)', flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                background: active === t.id ? 'var(--stone-1)' : 'transparent',
                color: active === t.id ? 'var(--gold)' : 'var(--stone-2)',
                border: 'none',
                padding: '14px 22px 12px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 11,
                cursor: 'default',
                borderTop: '3px solid transparent',
                borderRight: '3px solid transparent',
                marginBottom: -4,
                borderBottom: active === t.id ? '4px solid var(--gold)' : '4px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid g-2" style={{ gap: 24 }}>
          {/* podium */}
          <div className="panel" style={{ background: 'var(--cream)', padding: 28 }}>
            <span className="h-disp" style={{ fontSize: 10, color: 'var(--stone-4)' }}>► PODIO</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, marginTop: 22, height: 280 }}>
              {[data[1], data[0], data[2]].map((p, i) => {
                const place = [2, 1, 3][i];
                const heights = [180, 240, 150];
                const colors = ['#c0c0c0', '#f4c430', '#cd7f32'];
                return (
                  <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '32%' }}>
                    {/* head block */}
                    <div className="pixelated" style={{ width: 56, height: 56, background: 'var(--dirt-3)', border: '3px solid var(--stone-1)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '20%', left: '15%', width: '18%', height: '20%', background: '#fff', border: '2px solid var(--stone-1)' }} />
                      <div style={{ position: 'absolute', top: '20%', right: '15%', width: '18%', height: '20%', background: '#fff', border: '2px solid var(--stone-1)' }} />
                      <div style={{ position: 'absolute', bottom: '20%', left: '25%', right: '25%', height: '12%', background: 'var(--stone-1)' }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, textAlign: 'center', wordBreak: 'break-word' }}>{p.name}</div>
                    <div className="h-mono" style={{ fontSize: 22, color: 'var(--stone-1)' }}>{p.value}</div>
                    <div style={{
                      width: '100%', height: heights[i],
                      background: colors[i],
                      border: '4px solid var(--stone-1)',
                      boxShadow: 'inset 4px 4px 0 rgba(255,255,255,0.4), inset -4px -4px 0 rgba(0,0,0,0.18)',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                      paddingTop: 16,
                    }}>
                      <span className="h-disp" style={{ fontSize: 28, color: 'var(--stone-1)' }}>#{place}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* table */}
          <div className="panel panel--dark" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '3px solid var(--stone-1)', background: 'var(--stone-2)', display: 'flex', justifyContent: 'space-between' }}>
              <span className="h-disp" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>► RANK</span>
              <span className="h-disp" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>VALOR</span>
            </div>
            {data.map((p, i) => (
              <div key={p.name} style={{
                display: 'grid',
                gridTemplateColumns: '40px 56px 1fr auto',
                alignItems: 'center',
                gap: 14,
                padding: '12px 18px',
                borderBottom: i < data.length - 1 ? '2px solid var(--stone-2)' : 'none',
                background: i % 2 ? 'var(--stone-3)' : 'var(--stone-2)',
              }}>
                <span className="h-mono" style={{ fontSize: 28, color: i < 3 ? 'var(--gold)' : 'rgba(255,255,255,0.6)', textAlign: 'right' }}>{p.rank}</span>
                <span style={{ background: p.color, border: '3px solid var(--stone-1)', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: p.color === '#3b3338' ? '#fff' : 'var(--stone-1)', letterSpacing: '0.04em' }}>
                  {p.rankBadge.slice(0, 4)}
                </span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 }}>{p.sub}</div>
                </div>
                <span className="h-mono" style={{ fontSize: 24, color: i < 3 ? 'var(--gold)' : '#fff' }}>{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   HOW TO CONNECT — Java + Bedrock step-by-step
   ════════════════════════════════════════════════════════════ */
function ConnectSection() {
  const [platform, setPlatform] = useState_rc('java');
  const steps = {
    java: [
      { n: 1, title: 'Abrí Minecraft Java', desc: 'Versión 1.20.x — 1.21.x. Todas las versiones recientes funcionan, recomendamos la última.' },
      { n: 2, title: 'Multijugador → Añadir servidor', desc: 'En el menú principal, hacé clic en Multijugador y luego en "Añadir servidor".' },
      { n: 3, title: 'Pegá la IP', desc: 'Nombre: Honducraft. Dirección: play.honducraft.net. Guardá los cambios.' },
      { n: 4, title: 'Conectá y elegí mundo', desc: 'Doble clic en el servidor y vas a caer al lobby. Desde ahí elegís qué jugar.' },
    ],
    bedrock: [
      { n: 1, title: 'Abrí Minecraft Bedrock', desc: 'Móvil, consola, Switch, Win10/11. Cualquier dispositivo Bedrock vale.' },
      { n: 2, title: 'Jugar → Servidores → Añadir servidor', desc: 'Pestaña "Servidores", botón "Añadir servidor" al final de la lista.' },
      { n: 3, title: 'Datos del servidor', desc: 'Nombre: Honducraft. Dirección: play.honducraft.net. Puerto: 19132.' },
      { n: 4, title: 'Conectá', desc: 'Listo. El proxy une Java y Bedrock — jugás con todos.' },
    ],
  };

  return (
    <section id="conectar" className="section" data-screen-label="Conectar" style={{
      background: 'var(--stone-1)', color: '#fff', borderTop: '4px solid var(--stone-1)',
      borderBottom: '4px solid var(--stone-1)',
    }}>
      <div className="wrap">
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="h-disp" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.12em' }}>► COMO CONECTARSE</span>
            <h2 className="h-disp" style={{ fontSize: 32, margin: '18px 0 10px', color: '#fff' }}>4 pasos. Cero fricción.</h2>
            <p style={{ margin: 0, fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: '60ch' }}>
              Cualquier versión 1.20+. No necesitás cuenta premium para entrar al lobby — solo para zonas
              competitivas. Jugadores de Bedrock y Java en el mismo mundo.
            </p>
          </div>

          {/* platform toggle */}
          <div style={{ display: 'flex', border: '3px solid var(--stone-1)', boxShadow: '4px 4px 0 var(--stone-3)' }}>
            {['java', 'bedrock'].map((p, i) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{
                  background: platform === p ? 'var(--gold)' : 'var(--stone-3)',
                  color: platform === p ? 'var(--stone-1)' : 'rgba(255,255,255,0.7)',
                  border: 'none',
                  borderRight: i === 0 ? '3px solid var(--stone-1)' : 'none',
                  padding: '14px 22px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 11,
                  cursor: 'default',
                }}
              >
                {p === 'java' ? 'Java Edition' : 'Bedrock'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid g-4" style={{ gap: 18, marginBottom: 28 }}>
          {steps[platform].map((s) => (
            <div key={s.n} style={{
              background: 'var(--stone-2)',
              border: '3px solid var(--stone-1)',
              boxShadow: '5px 5px 0 var(--stone-3)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="h-mono" style={{ fontSize: 44, color: 'var(--gold)' }}>0{s.n}</span>
                <PixelBlock palette={['grass','diamond','gold','emerald'][s.n - 1]} size={36} />
              </div>
              <h4 className="h-disp" style={{ fontSize: 12, margin: 0, color: '#fff', lineHeight: 1.5 }}>{s.title}</h4>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* IP block + commands */}
        <div className="grid g-2" style={{ gap: 18 }}>
          <IpCard size="lg" />
          <div style={{
            background: 'var(--stone-2)',
            border: '3px solid var(--stone-1)',
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            justifyContent: 'space-between',
          }}>
            <div>
              <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}>SOPORTE</span>
              <div style={{ marginTop: 8, fontSize: 15, color: '#fff', fontFamily: "'VT323', monospace", fontSize: 22 }}>
                /help · /report · /vote · soporte@honducraft.net
              </div>
            </div>
            <a href="#discord" className="btn btn--gold">Discord →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { RankingSection, ConnectSection });
