"use client";

import { useMemo, useState, type CSSProperties } from "react";

type Finish = "Obsidian" | "Chalk" | "Moss" | "Cobalt";
type Arm = "Compact" | "Tall";
type Base = "Clamp" | "Weighted";
type View = "Front" | "Side" | "Detail";

const finishes: Record<Finish, { color: string; accent: string; price: number }> = {
  Obsidian: { color: "#262624", accent: "#0e0e0d", price: 0 },
  Chalk: { color: "#e7e1d3", accent: "#bdb5a4", price: 20 },
  Moss: { color: "#64705a", accent: "#354034", price: 25 },
  Cobalt: { color: "#325778", accent: "#183248", price: 25 },
};

const temperatures = ["2700K", "4000K", "5000K"] as const;

export default function Home() {
  const [finish, setFinish] = useState<Finish>("Obsidian");
  const [arm, setArm] = useState<Arm>("Tall");
  const [base, setBase] = useState<Base>("Weighted");
  const [temperature, setTemperature] = useState<(typeof temperatures)[number]>("4000K");
  const [view, setView] = useState<View>("Front");
  const [bagOpen, setBagOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = useMemo(() => 249 + finishes[finish].price + (arm === "Tall" ? 35 : 0) + (base === "Weighted" ? 45 : 0), [finish, arm, base]);
  const total = unitPrice * quantity;
  const productStyle = { "--product": finishes[finish].color, "--product-accent": finishes[finish].accent } as CSSProperties;

  return (
    <div className="site-shell" style={productStyle}>
      <nav className="nav">
        <a className="wordmark" href="#top">MORROW<span>01</span></a>
        <div className="nav-links"><a href="#story">Design</a><a href="#specs">Specifications</a><a href="#configure">Configure</a></div>
        <button className="bag-button" type="button" onClick={() => setBagOpen(true)}>Bag <span>{quantity}</span></button>
      </nav>

      <main id="top" className="product-layout">
        <section className="product-stage" aria-label={`Morrow 01 lamp in ${finish}`}>
          <div className="stage-topline"><span>01 / Task lighting</span><span>Product study / 2026</span></div>
          <div className={`lamp view-${view.toLowerCase()} arm-${arm.toLowerCase()} base-${base.toLowerCase()}`}>
            <div className="lamp-glow" />
            <div className="lamp-head"><i /><span /></div>
            <div className="lamp-joint joint-top" />
            <div className="lamp-arm arm-upper" />
            <div className="lamp-joint joint-mid" />
            <div className="lamp-arm arm-lower" />
            <div className="lamp-joint joint-base" />
            <div className="lamp-base" />
            <div className="lamp-cable" />
          </div>
          <div className="stage-caption"><p>Drag-free product study</p><div className="view-switch" aria-label="Product view">{(["Front", "Side", "Detail"] as View[]).map((item) => <button className={view === item ? "active" : ""} onClick={() => setView(item)} key={item}>{item}</button>)}</div></div>
        </section>

        <section id="configure" className="config-panel">
          <p className="eyebrow">Morrow 01</p>
          <h1>Light that follows the work.</h1>
          <p className="intro">A counterbalanced task lamp with silent movement, focused illumination, and replaceable components.</p>
          <p className="product-promise">Designed for repair · replaceable components</p>

          <fieldset>
            <legend><span>Finish</span><strong>{finish}</strong></legend>
            <div className="swatches">{(Object.keys(finishes) as Finish[]).map((item) => <button aria-label={item} aria-pressed={finish === item} className={finish === item ? "active" : ""} style={{ background: finishes[item].color }} onClick={() => setFinish(item)} key={item}><i /></button>)}</div>
          </fieldset>

          <fieldset>
            <legend><span>Arm height</span><strong>{arm === "Compact" ? "45 cm" : "62 cm"}</strong></legend>
            <div className="option-grid">{(["Compact", "Tall"] as Arm[]).map((item) => <button className={arm === item ? "active" : ""} onClick={() => setArm(item)} key={item}><span>{item}</span><small>{item === "Compact" ? "45 cm" : "+$35 · 62 cm"}</small></button>)}</div>
          </fieldset>

          <fieldset>
            <legend><span>Light temperature</span><strong>{temperature}</strong></legend>
            <div className="temperature-control">{temperatures.map((item) => <button className={temperature === item ? "active" : ""} onClick={() => setTemperature(item)} key={item}><i className={`temp-${item}`} />{item}</button>)}</div>
          </fieldset>

          <fieldset>
            <legend><span>Mount</span><strong>{base}</strong></legend>
            <div className="option-grid">{(["Clamp", "Weighted"] as Base[]).map((item) => <button className={base === item ? "active" : ""} onClick={() => setBase(item)} key={item}><span>{item}</span><small>{item === "Clamp" ? "Desk edge" : "+$45 · Freestanding"}</small></button>)}</div>
          </fieldset>

          <div className="purchase-row"><div><strong>${unitPrice}</strong><span>Concept price · configuration total</span></div><button type="button" onClick={() => setBagOpen(true)}>Add to bag <span>→</span></button></div>
          <details><summary>What&apos;s included <span>+</span></summary><p>Lamp, selected mount, 24V power adapter, 2 m woven cable, hex key, and repair guide.</p></details>
          <details><summary>Repair-first construction <span>+</span></summary><p>Every mechanical and electrical component is designed to be replaceable with standard tools.</p></details>
        </section>
      </main>

      <section id="story" className="story-section">
        <div><p className="eyebrow">Made for long sessions</p><h2>Precise where it matters. Quiet everywhere else.</h2></div>
        <div className="feature-list"><article><span>01</span><h3>Frictionless motion</h3><p>Spring-balanced arms hold any position without visible knobs or loose joints.</p></article><article><span>02</span><h3>High-fidelity light</h3><p>CRI 95+ LEDs keep paper, materials, and skin tones accurate throughout the day.</p></article><article><span>03</span><h3>Built to be repaired</h3><p>Fasteners, drivers, cable, and LEDs can all be replaced instead of discarded.</p></article></div>
      </section>

      <section id="specs" className="spec-section">
        <p className="eyebrow">Technical sheet</p><h2>Morrow 01 / 2026</h2>
        <div className="spec-grid"><div><span>Output</span><strong>720 lm</strong></div><div><span>Color accuracy</span><strong>CRI 95+</strong></div><div><span>Dimming</span><strong>1–100%</strong></div><div><span>Power</span><strong>8.4 W</strong></div><div><span>Reach</span><strong>{arm === "Tall" ? "62 cm" : "45 cm"}</strong></div><div><span>Serviceability</span><strong>Modular</strong></div></div>
      </section>

      <footer><a className="wordmark" href="#top">MORROW<span>01</span></a><p>Considered objects for focused work.</p><div><a href="#configure">Configure</a><a href="#specs">Specifications</a></div></footer>

      <button className={`bag-backdrop ${bagOpen ? "open" : ""}`} aria-label="Close bag" onClick={() => setBagOpen(false)} />
      <aside className={`bag-drawer ${bagOpen ? "open" : ""}`} aria-label="Shopping bag" aria-hidden={!bagOpen}>
        <header><h2>Your bag</h2><button type="button" onClick={() => setBagOpen(false)} aria-label="Close bag">×</button></header>
        <div className="bag-product"><div className="bag-thumbnail"><div className="mini-lamp" /></div><div><strong>Morrow 01</strong><p>{finish} · {arm} · {temperature}<br />{base} mount</p><span>${unitPrice}</span></div></div>
        <div className="quantity"><span>Quantity</span><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} type="button">−</button><strong>{quantity}</strong><button onClick={() => setQuantity(quantity + 1)} type="button">+</button></div></div>
        <div className="bag-summary"><p><span>Subtotal</span><strong>${total}</strong></p><p><span>Fulfilment</span><strong>Prototype</strong></p><button type="button" disabled>Checkout preview · ${total}</button><small>Concept storefront — no payment is collected.</small></div>
      </aside>
    </div>
  );
}
