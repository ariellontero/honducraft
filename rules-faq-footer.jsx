// rules-faq-footer.jsx — reglas, staff, FAQ, discord CTA, footer

const { useState: useState_rf } = React;

/* ════════════════════════════════════════════════════════════
   RULES + STAFF
   ════════════════════════════════════════════════════════════ */
function RulesStaffSection() {
  const rules = [
    { n: '01', title: 'Respeto sobre todo', desc: 'Nada de insultos, racismo, doxxing ni acoso. Cero tolerancia.', accent: 'var(--redstone)' },
    { n: '02', title: 'Sin hacks ni cheats', desc: 'X-Ray, autoclickers, bots y mods de combate están baneados.', accent: 'var(--gold)' },
    { n: '03', title: 'No griefing', desc: 'No destruyas casas ajenas. Usá /claim para proteger tu zona.', accent: 'var(--grass-3)' },
    { n: '04', title: 'Una cuenta por persona', desc: 'Alts solo permitidas con permiso de staff. Nada de farmear premios.', accent: 'var(--sky-2)' },
    { n: '05', title: 'No spam ni publicidad', desc: 'Promocionar otros servidores en chat = baneo permanente.', accent: 'var(--emerald)' },
    { n: '06', title: 'Reportes', desc: 'Usá /report o el ticket en Discord. Capturas siempre ayudan.', accent: 'var(--dirt-4)' },
  ];
  const staff = [
    { name: 'Jocho', role: 'Owner', color: 'var(--redstone)', tag: '#OWNER' },
    { name: 'Kary', role: 'Admin', color: 'var(--gold)', tag: '#ADMIN' },
    { name: 'PuntaSal', role: 'Mod', color: 'var(--grass-3)', tag: '#MOD' },
    { name: 'Diego', role: 'Mod', color: 'var(--grass-3)', tag: '#MOD' },
    { name: 'Sofi', role: 'Helper', color: 'var(--sky-2)', tag: '#HELPER' },
    { name: 'Toño', role: 'Builder', color: 'var(--emerald)', tag: '#BUILD' },
  ];

  return (
    <section id="reglas" className="section" data-screen-label="Reglas" style={{ background: 'var(--paper)' }}>
      <div className="wrap">
        <div className="grid g-2" style={{ gap: 56, alignItems: 'start' }}>
          {/* Rules */}
          <div>
            <SectionHeader
              eyebrow="REGLAS"
              title="6 reglas. No más, no menos."
              sub="Las versiones largas legales están en /rules dentro del juego y en Discord. Aquí el resumen."
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
              {rules.map((r) => (
                <div key={r.n} style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 18,
                  alignItems: 'center',
                  background: '#fff',
                  border: '3px solid var(--stone-1)',
                  boxShadow: '4px 4px 0 var(--stone-1)',
                  padding: 16,
                }}>
                  <div style={{
                    width: 64, height: 64,
                    background: r.accent,
                    border: '3px solid var(--stone-1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'inset 3px 3px 0 rgba(255,255,255,0.4), inset -3px -3px 0 rgba(0,0,0,0.18)',
                  }}>
                    <span className="h-mono" style={{ fontSize: 32, color: 'var(--stone-1)' }}>{r.n}</span>
                  </div>
                  <div>
                    <h4 className="h-disp" style={{ fontSize: 12, margin: 0, color: 'var(--stone-1)' }}>{r.title}</h4>
                    <p style={{ margin: '6px 0 0', fontSize: 14.5, color: 'var(--stone-3)', lineHeight: 1.5 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div style={{ position: 'sticky', top: 100 }}>
            <SectionHeader
              eyebrow="STAFF"
              title="El equipo"
              sub="Catrachos y latinos al frente del servidor 24/7. Tickets respondidos en menos de 4h."
            />
            <div className="grid g-3" style={{ gap: 12, marginTop: 28 }}>
              {staff.map((s) => (
                <div key={s.name} className="slot slot--cream" style={{
                  background: 'var(--cream)',
                  padding: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  {/* head pixel */}
                  <div className="pixelated" style={{ width: 56, height: 56, background: 'var(--dirt-3)', border: '3px solid var(--stone-1)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '20%', left: '15%', width: '20%', height: '22%', background: '#fff', border: '2px solid var(--stone-1)' }} />
                    <div style={{ position: 'absolute', top: '20%', right: '15%', width: '20%', height: '22%', background: '#fff', border: '2px solid var(--stone-1)' }} />
                    <div style={{ position: 'absolute', bottom: '22%', left: '24%', right: '24%', height: '14%', background: 'var(--stone-1)' }} />
                  </div>
                  <span className="h-disp" style={{ fontSize: 9, color: 'var(--stone-1)' }}>{s.name}</span>
                  <span style={{
                    background: s.color,
                    border: '2px solid var(--stone-1)',
                    padding: '3px 6px 2px',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 7,
                    color: s.color === 'var(--gold)' || s.color === 'var(--grass-3)' || s.color === 'var(--sky-2)' || s.color === 'var(--emerald)' ? 'var(--stone-1)' : '#fff',
                    letterSpacing: '0.06em',
                  }}>{s.tag}</span>
                </div>
              ))}
            </div>

            {/* Server stats panel */}
            <div className="panel panel--grass" style={{ marginTop: 24, padding: 22 }}>
              <h4 className="h-disp" style={{ fontSize: 12, margin: 0, color: '#fff' }}>► EL SERVER EN NÚMEROS</h4>
              <div className="grid g-3" style={{ gap: 12, marginTop: 16 }}>
                <div>
                  <span className="h-mono" style={{ fontSize: 30, color: 'var(--gold)' }}>3</span>
                  <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.85)', display: 'block', marginTop: 4 }}>AÑOS ONLINE</span>
                </div>
                <div>
                  <span className="h-mono" style={{ fontSize: 30, color: 'var(--gold)' }}>24K</span>
                  <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.85)', display: 'block', marginTop: 4 }}>JUGADORES ÚNICOS</span>
                </div>
                <div>
                  <span className="h-mono" style={{ fontSize: 30, color: 'var(--gold)' }}>99.8%</span>
                  <span className="h-disp" style={{ fontSize: 8, color: 'rgba(255,255,255,0.85)', display: 'block', marginTop: 4 }}>UPTIME</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FAQ — accordion
   ════════════════════════════════════════════════════════════ */
function FaqSection() {
  const items = [
    { q: '¿Necesito Minecraft Premium?', a: 'No para entrar al lobby ni a la mayoría de modos. Para zonas competitivas con ranking oficial sí pedimos cuenta legal. Bedrock entra siempre.' },
    { q: '¿La tienda es pay-to-win?', a: 'No. Los rangos VIP dan calidad de vida (sethomes, cosméticos, +drops). Nunca vendemos armaduras OP, ítems exclusivos de combate ni nada que rompa el balance PvP.' },
    { q: '¿Aceptan pagos desde Honduras?', a: 'Sí. Tarjeta local, PayPal, Tigo Money y transferencia. Pix y Yape para el resto de LatAm. Las compras se acreditan en menos de 5 minutos.' },
    { q: '¿Puedo jugar con mis amigos de Bedrock?', a: 'Sí. El proxy une Java y Bedrock en el mismo mundo. Tu primo en Switch, tu amigo en PC y vos en celular juegan juntos.' },
    { q: '¿Qué pasa si me banean injustamente?', a: 'Apelá en Discord con un ticket. Mostramos los logs y revisamos en menos de 24h. Si fue error nuestro, te compensamos.' },
    { q: '¿Cuándo arranca la próxima temporada?', a: 'Las temporadas duran 3 meses. La actual (Tierras del Cacao) termina el 15 de agosto. La siguiente es "Selva Esmeralda".' },
    { q: '¿Hay descuentos en la tienda?', a: 'Sí — drops semanales, pack de bienvenida −50% el primer mes y descuentos por completar el pase de temporada.' },
    { q: '¿Puedo ser staff?', a: 'Aplicaciones abiertas cuando faltan moderadores. Anunciamos en Discord. Pedimos +16 años, micrófono y disponibilidad mínima de 8h/semana.' },
  ];
  const [open, setOpen] = useState_rf(0);
  return (
    <section id="faq" className="section" data-screen-label="FAQ" style={{
      background: 'var(--cream)', borderTop: '4px solid var(--stone-1)', borderBottom: '4px solid var(--stone-1)',
    }}>
      <div className="wrap" style={{ maxWidth: 920 }}>
        <SectionHeader
          eyebrow="PREGUNTAS FRECUENTES"
          title="Lo que la gente más pregunta"
          align="center"
        />
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: '#fff',
                border: '3px solid var(--stone-1)',
                boxShadow: isOpen ? '5px 5px 0 var(--gold)' : '4px 4px 0 var(--stone-1)',
              }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: '100%', textAlign: 'left',
                    background: isOpen ? 'var(--stone-1)' : 'transparent',
                    color: isOpen ? '#fff' : 'var(--stone-1)',
                    border: 'none',
                    padding: '18px 22px',
                    cursor: 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16,
                  }}
                >
                  <span>{it.q}</span>
                  <span style={{
                    background: isOpen ? 'var(--gold)' : 'var(--stone-1)',
                    color: isOpen ? 'var(--stone-1)' : 'var(--gold)',
                    width: 32, height: 32,
                    border: '2px solid var(--stone-1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Press Start 2P', monospace", fontSize: 12,
                    flexShrink: 0,
                  }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '18px 22px 22px', fontSize: 15.5, color: 'var(--stone-3)', lineHeight: 1.6, borderTop: '2px dashed var(--stone-5)' }}>
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   DISCORD / SOCIAL CTA
   ════════════════════════════════════════════════════════════ */
function DiscordCta() {
  return (
    <section id="discord" className="section--tight" style={{
      background: 'var(--stone-1)', color: '#fff', padding: '80px 0',
      borderBottom: '4px solid var(--stone-1)',
    }}>
      <div className="wrap">
        <div className="grid g-2" style={{ gap: 32, alignItems: 'center' }}>
          <div>
            <span className="h-disp" style={{ fontSize: 10, color: 'var(--gold)' }}>► COMUNIDAD</span>
            <h2 className="h-disp" style={{ fontSize: 30, margin: '16px 0 12px', lineHeight: 1.35 }}>
              Únete a 12,400<br />catrachos en Discord
            </h2>
            <p style={{ margin: 0, fontSize: 17, color: 'rgba(255,255,255,0.72)', maxWidth: '52ch', lineHeight: 1.55 }}>
              Eventos, sorteos semanales, soporte en vivo, canales por modo y la
              comunidad más activa de Latinoamérica en Minecraft.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <a href="#" className="btn btn--lg btn--gold">
                <span style={{ width: 12, height: 12, background: '#5865f2', display: 'inline-block', border: '2px solid var(--stone-1)' }} />
                Entrar al Discord
              </a>
              <a href="#" className="btn btn--lg btn--ghost" style={{ color: '#fff', borderColor: 'var(--stone-3)' }}>TikTok</a>
              <a href="#" className="btn btn--lg btn--ghost" style={{ color: '#fff', borderColor: 'var(--stone-3)' }}>YouTube</a>
            </div>
          </div>
          <div className="grid g-2" style={{ gap: 14 }}>
            {[
              { k: '12,400', l: 'EN DISCORD', c: 'var(--sky-2)' },
              { k: '2,800+', l: 'EN VOZ AHORA', c: 'var(--grass-3)' },
              { k: '24/7',    l: 'SOPORTE',     c: 'var(--gold)' },
              { k: '850',     l: 'EVENTOS HECHOS', c: 'var(--redstone)' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--stone-2)',
                border: '3px solid var(--stone-1)',
                boxShadow: '5px 5px 0 var(--stone-3)',
                padding: 22,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', right: -8, bottom: -8, width: 60, height: 60, background: s.c, border: '3px solid var(--stone-1)', opacity: 0.7 }} />
                <span className="h-mono" style={{ fontSize: 44, color: s.c, position: 'relative' }}>{s.k}</span>
                <span className="h-disp" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', display: 'block', marginTop: 6, position: 'relative' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: 'var(--stone-2)', color: 'rgba(255,255,255,0.85)', borderTop: '4px solid var(--stone-1)' }}>
      {/* pixel divider strip */}
      <div className="pix-div" />

      <div className="wrap" style={{ padding: '56px 32px 32px' }}>
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <PixelBlock palette="grass" size={42} />
              <div>
                <div className="h-disp" style={{ fontSize: 16, color: '#fff' }}>HONDUCRAFT</div>
                <div className="h-disp" style={{ fontSize: 8, color: 'var(--gold)', marginTop: 4 }}>.NET</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: '46ch', lineHeight: 1.55, margin: 0 }}>
              Servidor independiente operado por la comunidad hondureña de Minecraft.
              Honducraft no está afiliado oficialmente con Mojang AB ni con Microsoft.
            </p>
            <div style={{ marginTop: 18 }}>
              <IpCard />
            </div>
          </div>
          <FooterCol title="Servidor" links={['Modos', 'Ranking', 'Eventos', 'Mapa dinámico', 'Stats']} />
          <FooterCol title="Tienda" links={['Rangos VIP', 'Llaves', 'Cosméticos', 'Pase de temporada', 'Soporte de pagos']} />
          <FooterCol title="Comunidad" links={['Discord', 'TikTok', 'YouTube', 'Wiki', 'Reglas']} />
        </div>

        <div style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: '3px solid var(--stone-3)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        }}>
          <span className="h-disp" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>
            © 2026 HONDUCRAFT.NET — HECHO EN HONDURAS 🇭🇳
          </span>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Términos', 'Privacidad', 'EULA', 'Contacto'].map((l) => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          footer .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h5 className="h-disp" style={{ fontSize: 10, color: 'var(--gold)', margin: '0 0 16px' }}>► {title}</h5>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <li key={l}>
            <a href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}>{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { RulesStaffSection, FaqSection, DiscordCta, Footer });
