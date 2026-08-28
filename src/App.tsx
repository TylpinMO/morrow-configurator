import { useEffect, useMemo, useState } from "react";

type Finish = "Graphite" | "Bone" | "Moss" | "Cobalt";
type ArmSize = "Compact" | "Tall";
type Mount = "Weighted" | "Clamp";
type Temperature = "2700K" | "4000K" | "5000K";
type View = "Front" | "Side" | "Detail";

const finishes: Record<Finish, { body: string; edge: string; price: number }> = {
  Graphite: { body: "#292a27", edge: "#11120f", price: 0 },
  Bone: { body: "#ded8ca", edge: "#aaa394", price: 20 },
  Moss: { body: "#65715f", edge: "#3d4939", price: 25 },
  Cobalt: { body: "#315e80", edge: "#173b58", price: 25 },
};

const temperatures: Record<Temperature, { light: string; label: string }> = {
  "2700K": { light: "#ffd47a", label: "Warm" },
  "4000K": { light: "#fff0bd", label: "Neutral" },
  "5000K": { light: "#dceeff", label: "Daylight" },
};

function LampIllustration({ finish, arm, mount, temperature, view }: {
  finish: Finish;
  arm: ArmSize;
  mount: Mount;
  temperature: Temperature;
  view: View;
}) {
  const lift = arm === "Compact" ? 55 : 0;
  const elbow = { x: 352, y: 326 + lift };
  const head = { x: 472, y: 190 + lift };
  const viewTransform = view === "Side"
    ? "translate(82 0) scale(.78 1)"
    : view === "Detail"
      ? "translate(-120 -82) scale(1.32)"
      : undefined;

  return (
    <svg className="lamp-visual" viewBox="0 0 760 620" role="img" aria-label={`Morrow 01 lamp, ${finish} finish, ${arm.toLowerCase()} arm`}>
      <defs>
        <filter id="lamp-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <linearGradient id="metal" x1="0" x2="1">
          <stop offset="0" stopColor={finishes[finish].edge} />
          <stop offset="0.48" stopColor={finishes[finish].body} />
          <stop offset="1" stopColor={finishes[finish].edge} />
        </linearGradient>
        <linearGradient id="head-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={finishes[finish].body} />
          <stop offset="1" stopColor={finishes[finish].edge} />
        </linearGradient>
      </defs>

      <ellipse cx="352" cy="564" rx="218" ry="24" fill="#8c877b" opacity=".16" />
      <g className="lamp-assembly" transform={viewTransform}>
        <ellipse cx={head.x + 132} cy={head.y + 90} rx="124" ry="88" fill={temperatures[temperature].light} opacity=".26" filter="url(#lamp-glow)" />

        {mount === "Weighted" ? (
          <g>
            <ellipse cx="286" cy="526" rx="118" ry="27" fill={finishes[finish].edge} opacity=".38" />
            <path d="M168 518c0-17 53-31 118-31s118 14 118 31v20c0 17-53 31-118 31s-118-14-118-31z" fill="url(#head-metal)" />
            <ellipse cx="286" cy="518" rx="118" ry="31" fill={finishes[finish].body} />
          </g>
        ) : (
          <g>
            <path d="M214 501h144v29H246v67h-32z" fill="url(#head-metal)" />
            <rect x="252" y="539" width="83" height="14" rx="7" fill={finishes[finish].edge} />
            <circle cx="321" cy="574" r="13" fill={finishes[finish].body} />
            <line x1="321" y1="554" x2="321" y2="574" stroke={finishes[finish].edge} strokeWidth="8" />
          </g>
        )}

        <line x1="286" y1="500" x2={elbow.x} y2={elbow.y} stroke={finishes[finish].edge} strokeWidth="31" strokeLinecap="round" />
        <line x1="286" y1="500" x2={elbow.x} y2={elbow.y} stroke="url(#metal)" strokeWidth="21" strokeLinecap="round" />
        <line x1={elbow.x} y1={elbow.y} x2={head.x} y2={head.y} stroke={finishes[finish].edge} strokeWidth="31" strokeLinecap="round" />
        <line x1={elbow.x} y1={elbow.y} x2={head.x} y2={head.y} stroke="url(#metal)" strokeWidth="21" strokeLinecap="round" />

        {[{ x: 286, y: 500 }, elbow, head].map((joint) => (
          <g key={`${joint.x}-${joint.y}`}>
            <circle cx={joint.x} cy={joint.y} r="25" fill={finishes[finish].edge} />
            <circle cx={joint.x} cy={joint.y} r="13" fill={finishes[finish].body} />
            <circle cx={joint.x - 4} cy={joint.y - 5} r="3" fill="#fff" opacity=".2" />
          </g>
        ))}

        <g transform={`rotate(-9 ${head.x} ${head.y})`}>
          <rect x={head.x - 18} y={head.y - 46} width="226" height="82" rx="41" fill="url(#head-metal)" />
          <rect x={head.x + 174} y={head.y - 31} width="32" height="51" rx="14" fill={temperatures[temperature].light} />
          <rect x={head.x + 183} y={head.y - 22} width="16" height="33" rx="8" fill="#fff" opacity=".54" />
          <path d={`M${head.x + 21} ${head.y - 5}h88`} stroke={finishes[finish].edge} strokeWidth="5" strokeLinecap="round" opacity=".48" />
        </g>

        <path d="M286 550c80 34 136 20 172-26 21-28 31-61 29-99" fill="none" stroke="#292a27" strokeWidth="3" strokeLinecap="round" opacity=".72" />
      </g>
      <line x1="64" y1="580" x2="696" y2="580" stroke="#bdb7aa" strokeWidth="1" />
    </svg>
  );
}

export default function App() {
  const [finish, setFinish] = useState<Finish>("Graphite");
  const [arm, setArm] = useState<ArmSize>("Tall");
  const [mount, setMount] = useState<Mount>("Weighted");
  const [temperature, setTemperature] = useState<Temperature>("4000K");
  const [view, setView] = useState<View>("Front");
  const [bagOpen, setBagOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = useMemo(
    () => 249 + finishes[finish].price + (arm === "Tall" ? 35 : 0) + (mount === "Weighted" ? 45 : 0),
    [arm, finish, mount],
  );

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBagOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Morrow home">MORROW<sup>01</sup></a>
        <nav aria-label="Main navigation">
          <a href="#design">Design</a>
          <a href="#specifications">Specifications</a>
        </nav>
        <button className="bag-trigger" type="button" onClick={() => setBagOpen(true)}>
          Bag <span>{quantity}</span>
        </button>
      </header>

      <main id="top">
        <section className="configurator" aria-labelledby="product-title">
          <div className="product-stage">
            <div className="stage-meta"><span>Task light / 01</span><span>Designed for repair</span></div>
            <LampIllustration finish={finish} arm={arm} mount={mount} temperature={temperature} view={view} />
            <div className="view-switch" role="group" aria-label="Product view">
              {(Object.keys({ Front: 1, Side: 1, Detail: 1 }) as View[]).map((item) => (
                <button type="button" key={item} aria-pressed={view === item} onClick={() => setView(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="configuration-panel">
            <p className="eyebrow">Morrow 01 / configurable task light</p>
            <h1 id="product-title">Built for the work in front of you.</h1>
            <p className="lede">A counterbalanced desk lamp with accurate light, quiet movement and components designed to be replaced instead of discarded.</p>

            <fieldset>
              <legend><span>Finish</span><strong>{finish}</strong></legend>
              <div className="swatches">
                {(Object.keys(finishes) as Finish[]).map((item) => (
                  <button
                    type="button"
                    key={item}
                    aria-label={item}
                    aria-pressed={finish === item}
                    style={{ backgroundColor: finishes[item].body }}
                    onClick={() => setFinish(item)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>Arm</span><strong>{arm === "Tall" ? "62 cm" : "45 cm"}</strong></legend>
              <div className="choice-grid">
                {(["Compact", "Tall"] as ArmSize[]).map((item) => (
                  <button type="button" key={item} aria-pressed={arm === item} onClick={() => setArm(item)}>
                    <strong>{item}</strong><small>{item === "Compact" ? "45 cm reach" : "62 cm reach · +$35"}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>Light</span><strong>{temperature}</strong></legend>
              <div className="temperature-grid">
                {(Object.keys(temperatures) as Temperature[]).map((item) => (
                  <button type="button" key={item} aria-pressed={temperature === item} onClick={() => setTemperature(item)}>
                    <i style={{ backgroundColor: temperatures[item].light }} />
                    <span>{item}<small>{temperatures[item].label}</small></span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend><span>Mount</span><strong>{mount}</strong></legend>
              <div className="choice-grid">
                {(["Clamp", "Weighted"] as Mount[]).map((item) => (
                  <button type="button" key={item} aria-pressed={mount === item} onClick={() => setMount(item)}>
                    <strong>{item}</strong><small>{item === "Clamp" ? "Desk edge" : "Freestanding · +$45"}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="purchase-row">
              <div><strong>${unitPrice}</strong><span>Configured price</span></div>
              <button type="button" onClick={() => setBagOpen(true)}>Add to bag <span>→</span></button>
            </div>
          </div>
        </section>

        <section id="design" className="design-story">
          <div>
            <p className="eyebrow">Made for long sessions</p>
            <h2>Precise where it matters. Quiet everywhere else.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Balanced movement</h3><p>Two spring-assisted arms hold position without exposed knobs or loose joints.</p></div></li>
            <li><span>02</span><div><h3>Accurate light</h3><p>Three color temperatures and CRI 95+ output keep materials easy to read.</p></div></li>
            <li><span>03</span><div><h3>Repairable by design</h3><p>The driver, cable, light source and joints can be replaced with standard tools.</p></div></li>
          </ol>
        </section>

        <section id="specifications" className="specifications">
          <div className="section-heading"><p className="eyebrow">Technical sheet</p><h2>Morrow 01</h2></div>
          <dl>
            <div><dt>Output</dt><dd>720 lm</dd></div>
            <div><dt>Color accuracy</dt><dd>CRI 95+</dd></div>
            <div><dt>Dimming</dt><dd>1–100%</dd></div>
            <div><dt>Power</dt><dd>8.4 W</dd></div>
            <div><dt>Reach</dt><dd>{arm === "Tall" ? "62 cm" : "45 cm"}</dd></div>
            <div><dt>Warranty</dt><dd>5 years</dd></div>
          </dl>
        </section>
      </main>

      <footer><a className="wordmark" href="#top">MORROW<sup>01</sup></a><p>Considered objects for focused work.</p><a href="#top">Back to top ↑</a></footer>

      {bagOpen ? (
        <>
          <button className="drawer-backdrop is-open" type="button" aria-label="Close bag" onClick={() => setBagOpen(false)} />
          <aside className="bag-drawer is-open" role="dialog" aria-modal="true" aria-label="Shopping bag">
            <div className="drawer-heading"><div><p className="eyebrow">Your selection</p><h2>Bag</h2></div><button type="button" aria-label="Close bag" onClick={() => setBagOpen(false)}>×</button></div>
            <div className="bag-item">
              <div className="bag-thumb"><LampIllustration finish={finish} arm={arm} mount={mount} temperature={temperature} view="Front" /></div>
              <div><h3>Morrow 01</h3><p>{finish} · {arm}<br />{temperature} · {mount}</p><strong>${unitPrice}</strong></div>
            </div>
            <div className="quantity-row"><span>Quantity</span><div><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div></div>
            <div className="drawer-total"><p><span>Subtotal</span><strong>${unitPrice * quantity}</strong></p><button type="button" disabled>Checkout preview</button><small>Portfolio demonstration — no payment is collected.</small></div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
