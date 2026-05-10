// app.jsx — Honducraft.net landing composition + Tweaks

const { useState: useState_app, useEffect: useEffect_app } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "parallax",
  "palette": "classic",
  "showCounter": true,
  "showStore": true,
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Live player counter that drifts
  const [players, setPlayers] = useState_app(742);
  const [peak, setPeak] = useState_app(1124);

  useEffect_app(() => {
    const id = setInterval(() => {
      setPlayers((p) => {
        const drift = Math.round((Math.random() - 0.45) * 14);
        return Math.max(420, Math.min(950, p + drift));
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Apply palette
  useEffect_app(() => {
    document.documentElement.dataset.palette = t.palette;
  }, [t.palette]);

  return (
    <div data-screen-label="Honducraft Landing">
      <TopMarquee />
      <NavBar />

      {t.heroVariant === 'inventory'
        ? <HeroInventory players={players} peak={peak} showCounter={t.showCounter} />
        : t.heroVariant === 'plaza'
        ? <HeroPlaza players={players} peak={peak} showCounter={t.showCounter} />
        : <HeroParallax players={players} peak={peak} showCounter={t.showCounter} />}

      <ModesSection />

      {t.showStore && <StoreSection />}

      <RankingSection />
      <ConnectSection />
      <RulesStaffSection />
      <FaqSection />
      <DiscordCta />
      <Footer />

      {/* ── Tweaks panel ─────────────────────────────────────── */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio
          label="Variante"
          value={t.heroVariant}
          options={[
            { value: 'parallax', label: 'Parallax' },
            { value: 'plaza', label: 'Plaza' },
            { value: 'inventory', label: 'Inv' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)}
        />
        <TweakToggle
          label="Mostrar contador en vivo"
          value={t.showCounter}
          onChange={(v) => setTweak('showCounter', v)}
        />

        <TweakSection label="Tema" />
        <TweakRadio
          label="Paleta"
          value={t.palette}
          options={[
            { value: 'classic', label: 'Classic' },
            { value: 'nether', label: 'Nether' },
            { value: 'tropical', label: 'Tropical' },
          ]}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Secciones" />
        <TweakToggle
          label="Mostrar tienda"
          value={t.showStore}
          onChange={(v) => setTweak('showStore', v)}
        />

        <TweakSection label="Atajos" />
        <TweakButton label="Ir a tienda" onClick={() => {
          const el = document.getElementById('tienda');
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }} />
        <TweakButton label="Ir a modos" onClick={() => {
          const el = document.getElementById('modos');
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
