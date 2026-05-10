// primitives.jsx — shared visual building blocks for Honducraft

const { useState, useEffect, useRef } = React;

/* ──────────────────────────────────────────────────────────────
   Voxel block (isometric-flat) — used for inline ornament & cubes
   ────────────────────────────────────────────────────────────── */
function PixelBlock({ size = 56, palette = 'grass', label, style }) {
  // each block is a 8x8 px grid of cells. We render via background gradients.
  const variants = {
    grass: { top: '#7cba3c', topShade: '#5d9c2e', side: '#8b5a2b', sideShade: '#6b4423' },
    dirt:  { top: '#a87539', topShade: '#8b5a2b', side: '#6b4423', sideShade: '#4a2f1a' },
    stone: { top: '#8a8f9a', topShade: '#5a5f6c', side: '#5a5f6c', sideShade: '#3b3f49' },
    diamond: { top: '#7af0e8', topShade: '#39c4d4', side: '#2596b8', sideShade: '#0e6080' },
    gold:  { top: '#fce26a', topShade: '#f4c430', side: '#c8930b', sideShade: '#7a5a06' },
    netherite: { top: '#3b3338', topShade: '#241f22', side: '#5a4d52', sideShade: '#3b3338' },
    emerald: { top: '#54e6c0', topShade: '#17c0a0', side: '#0e8a72', sideShade: '#075240' },
    redstone: { top: '#ff6a6a', topShade: '#d83232', side: '#a01a1a', sideShade: '#5a0a0a' },
    leaf: { top: '#7cba3c', topShade: '#4a8a25', side: '#3a6a18', sideShade: '#234410' },
    wood: { top: '#c89968', topShade: '#a87539', side: '#6b4423', sideShade: '#4a2f1a' },
  };
  const c = variants[palette] || variants.grass;
  return (
    <span
      className="pixelated"
      title={label}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {/* top half */}
      <span style={{
        position: 'absolute', left: 0, top: 0, width: '100%', height: '38%',
        background: `linear-gradient(180deg, ${c.top} 0 60%, ${c.topShade} 60% 100%)`,
        border: '2px solid #0e0f12',
        borderBottom: 'none',
      }} />
      {/* side */}
      <span style={{
        position: 'absolute', left: 0, top: '38%', width: '100%', height: '62%',
        background: c.side,
        backgroundImage: `repeating-linear-gradient(180deg, ${c.sideShade} 0 ${Math.max(2, size*0.06)}px, transparent ${Math.max(2,size*0.06)}px ${Math.max(4, size*0.18)}px)`,
        border: '2px solid #0e0f12',
      }} />
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
   Item icon — slot-friendly pixel item glyph for store items.
   Built from layered colored squares (no SVG illustrations).
   ────────────────────────────────────────────────────────────── */
function ItemIcon({ kind = 'sword', size = 64 }) {
  // Each kind = a 12x12 pixel grid encoded as colors per cell.
  // We render via CSS box-shadows on a single 1px element — efficient + crisp.
  const grids = {
    sword: [
      '............',
      '..........##',
      '.........###',
      '........####',
      '.......####.',
      '......####..',
      '.....####...',
      '....####....',
      '...####.....',
      '..####......',
      '.##.........',
      '#...........',
    ],
    key: [
      '...####.....',
      '..#YYYY#....',
      '.#YYBBYY#...',
      '.#YBBBBY#...',
      '.#YYBBYY#...',
      '..#YYYY#....',
      '...#YY#.....',
      '....#Y#.....',
      '....#Y#.....',
      '....#YY#....',
      '....#Y#.....',
      '....#YY#....',
    ],
    chest: [
      '.##########.',
      '#YYYYYYYYYY#',
      '#YDDDDDDDDY#',
      '#YDDDD##DDY#',
      '#YDDD####DY#',
      '#Y########Y#',
      '#YDDDDDDDDY#',
      '#YDDDDDDDDY#',
      '#YYYYYYYYYY#',
      '.##########.',
      '............',
      '............',
    ],
    crown: [
      '............',
      '#..#...#..#.',
      '#..#...#..#.',
      '#Y.#YYY#.Y#.',
      '#YYYYYYYYY#.',
      '#YYRRYYRRY#.',
      '#YYYYYYYYY#.',
      '############',
      '............',
      '............',
      '............',
      '............',
    ],
    potion: [
      '...####.....',
      '...#PP#.....',
      '..######....',
      '.#PPPPPP#...',
      '#PPMMMMPP#..',
      '#PMMMMMMP#..',
      '#PMMMMMMP#..',
      '#PMMMMMMP#..',
      '#PPMMMMPP#..',
      '.#PPPPPP#...',
      '..######....',
      '............',
    ],
    pet: [
      '............',
      '..####.####.',
      '.#YYYY#YYYY#',
      '#YOOYYYYOOY#',
      '#YOOYYYYOOY#',
      '#YYYYYYYYYY#',
      '#YYRRRRRRYY#',
      '#YYYYYYYYYY#',
      '.##YY##YY##.',
      '..#####YY#..',
      '............',
      '............',
    ],
    coin: [
      '....####....',
      '..##YYYY##..',
      '.#YYY##YYY#.',
      '#YY#YYYY#YY#',
      '#Y#YYYYYY#Y#',
      '#YYYYYYYYYY#',
      '#YYYYYYYYYY#',
      '#YY#YYYY#YY#',
      '.#YYY##YYY#.',
      '..##YYYY##..',
      '....####....',
      '............',
    ],
    boost: [
      '............',
      '......##....',
      '.....####...',
      '....##XX#...',
      '...##XXX#...',
      '..##XXXX#...',
      '.##XXXXX#...',
      '#XXXXXXX#...',
      '.##XXXXX#...',
      '..##XXX#....',
      '...##X#.....',
      '....#.......',
    ],
    pickaxe: [
      '...####.....',
      '..######....',
      '.##YYYY##...',
      '##YBBBBY##..',
      '###BBBB###..',
      '...##YY#....',
      '....#YY#....',
      '....#YY#....',
      '....#YY#....',
      '....#YY#....',
      '....#YY#....',
      '....####....',
    ],
    book: [
      '.##########.',
      '#GG########.',
      '#GYYYYYYYY#.',
      '#GYRRRRRR Y#.',
      '#GYYYYYYYY#.',
      '#GY  Y  YY#.',
      '#GYYYYYYYY#.',
      '#GYRRRYRRY#.',
      '#GYYYYYYYY#.',
      '#GG########.',
      '.##########.',
      '............',
    ],
    helmet: [
      '............',
      '..########..',
      '.#YYYYYYYY#.',
      '#YYYYYYYYYY#',
      '#YBBBBBBBBY#',
      '#YBBBBBBBBY#',
      '#YBBBBBBBBY#',
      '#YYYYYYYYYY#',
      '.#YBBBBBBY#.',
      '..#YYYYYY#..',
      '...######...',
      '............',
    ],
  };

  const palette = {
    '#': '#0e0f12',
    'Y': '#f4c430',
    'D': '#a87539',
    'O': '#1d1f24',
    'R': '#d83232',
    'P': '#a98ad4',
    'M': '#d92aa3',
    'X': '#ff6a3a',
    'B': '#4a8fc4',
    'G': '#5d9c2e',
    ' ': 'transparent',
    '.': 'transparent',
  };

  const grid = grids[kind] || grids.sword;
  const rows = grid.length;
  const cols = grid[0].length;
  const px = Math.floor(size / Math.max(rows, cols));

  return (
    <div
      className="pixelated"
      style={{
        position: 'relative',
        width: cols * px,
        height: rows * px,
        margin: '0 auto',
      }}
    >
      {grid.map((row, y) =>
        [...row].map((ch, x) => {
          const c = palette[ch];
          if (!c || c === 'transparent') return null;
          return (
            <span
              key={`${x}-${y}`}
              style={{
                position: 'absolute',
                left: x * px,
                top: y * px,
                width: px,
                height: px,
                background: c,
              }}
            />
          );
        })
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Live counter — animates toward target value
   ────────────────────────────────────────────────────────────── */
function LiveCounter({ value, duration = 800, suffix = '' }) {
  const [n, setN] = useState(value);
  const start = useRef(value);
  const target = useRef(value);
  const t0 = useRef(performance.now());

  useEffect(() => {
    start.current = n;
    target.current = value;
    t0.current = performance.now();
    let raf;
    const step = () => {
      const t = Math.min(1, (performance.now() - t0.current) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      const v = Math.round(start.current + (target.current - start.current) * e);
      setN(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span>{n.toLocaleString('es-HN')}{suffix}</span>;
}

/* ──────────────────────────────────────────────────────────────
   Section header (eyebrow + title + subtitle)
   ────────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, sub, align = 'left', children }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? '720px' : 'none', margin: align === 'center' ? '0 auto' : undefined }}>
      {eyebrow && <span className="sect-eyebrow">{eyebrow}</span>}
      <h2 className="sect-title">{title}</h2>
      {sub && <p className="sect-sub" style={{ margin: align === 'center' ? '0 auto' : 0 }}>{sub}</p>}
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Pixel placeholder — striped with mono label, "drop screenshot here"
   ────────────────────────────────────────────────────────────── */
function PixelPlaceholder({ label = 'screenshot.png', height = 220, tone = 'stone' }) {
  const tones = {
    stone: { bg: '#3b3f49', fg: 'rgba(255,255,255,0.85)' },
    grass: { bg: '#5d9c2e', fg: 'rgba(255,255,255,0.92)' },
    sky: { bg: '#88c5e8', fg: 'rgba(0,0,0,0.7)' },
    cream: { bg: '#e6dcc0', fg: 'rgba(0,0,0,0.55)' },
  };
  const t = tones[tone] || tones.stone;
  return (
    <div
      className="ph-stripe"
      style={{ height, background: t.bg, color: t.fg, backgroundImage: `repeating-linear-gradient(-45deg, rgba(0,0,0,0.12) 0 8px, rgba(0,0,0,0.04) 8px 16px)` }}
    >
      <div style={{ textAlign: 'center', lineHeight: 1.5 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, opacity: 0.7, marginBottom: 8, letterSpacing: '0.1em' }}>
          ← DROP SCREENSHOT →
        </div>
        <div>{label}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PixelBlock,
  ItemIcon,
  LiveCounter,
  SectionHeader,
  PixelPlaceholder,
});
