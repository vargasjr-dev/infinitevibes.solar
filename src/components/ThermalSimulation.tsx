"use client";

import { useState, useMemo } from "react";

// Atmospheric density model (kg/m³) based on NRLMSISE-00 reference values
// Paper anchor points: 100km solar min = 5e-10, solar max = 5e-9, 80km ≈ 1e-5
const DENSITY_TABLE_SOLAR_MIN = [
  { alt: 80, rho: 1.0e-5 },
  { alt: 85, rho: 7.0e-7 },
  { alt: 90, rho: 5.0e-8 },
  { alt: 95, rho: 5.0e-9 },
  { alt: 100, rho: 5.0e-10 },
  { alt: 110, rho: 8.0e-11 },
  { alt: 120, rho: 2.0e-11 },
  { alt: 150, rho: 2.0e-12 },
  { alt: 200, rho: 2.5e-13 },
  { alt: 250, rho: 5.0e-14 },
  { alt: 300, rho: 1.2e-14 },
];

// Solar max: ~10× higher in thermosphere, converges at lower altitudes
const DENSITY_TABLE_SOLAR_MAX = [
  { alt: 80, rho: 1.0e-5 },
  { alt: 85, rho: 1.5e-6 },
  { alt: 90, rho: 2.0e-7 },
  { alt: 95, rho: 4.0e-8 },
  { alt: 100, rho: 5.0e-9 },
  { alt: 110, rho: 1.0e-9 },
  { alt: 120, rho: 3.0e-10 },
  { alt: 150, rho: 5.0e-11 },
  { alt: 200, rho: 8.0e-12 },
  { alt: 250, rho: 2.0e-12 },
  { alt: 300, rho: 6.0e-13 },
];

function interpolateDensity(
  altitude: number,
  table: { alt: number; rho: number }[],
): number {
  if (altitude <= table[0].alt) return table[0].rho;
  if (altitude >= table[table.length - 1].alt)
    return table[table.length - 1].rho;

  for (let i = 0; i < table.length - 1; i++) {
    if (altitude >= table[i].alt && altitude <= table[i + 1].alt) {
      const frac =
        (altitude - table[i].alt) / (table[i + 1].alt - table[i].alt);
      // Log-linear interpolation
      const logRho =
        Math.log(table[i].rho) +
        frac * (Math.log(table[i + 1].rho) - Math.log(table[i].rho));
      return Math.exp(logRho);
    }
  }
  return table[table.length - 1].rho;
}

// Physical constants
const STEFAN_BOLTZMANN = 5.67e-8; // W/m²K⁴
const C_D = 2; // Hypersonic drag coefficient for cylinder

// Material limits (°C)
const MATERIALS = [
  { name: "Zylon (PBO)", maxTemp: 650, color: "#22c55e" },
  { name: "Carbon Fiber", maxTemp: 500, color: "#3b82f6" },
  { name: "Copper", maxTemp: 1085, color: "#f59e0b" },
  { name: "Steel", maxTemp: 1400, color: "#a855f7" },
];

function formatScientific(n: number): string {
  if (n === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / Math.pow(10, exp);
  return `${mantissa.toFixed(2)} × 10^${exp}`;
}

function tempToColor(tempC: number): string {
  // Blue (-50) → Green (100) → Yellow (400) → Red (800) → White (1500+)
  if (tempC < 0) return "#3b82f6"; // blue
  if (tempC < 200) {
    const t = tempC / 200;
    return `rgb(${Math.round(59 + t * 195)}, ${Math.round(130 + t * 28)}, ${Math.round(246 - t * 200)})`;
  }
  if (tempC < 500) {
    const t = (tempC - 200) / 300;
    return `rgb(${Math.round(254)}, ${Math.round(158 - t * 100)}, ${Math.round(46 - t * 46)})`;
  }
  if (tempC < 1000) {
    const t = (tempC - 500) / 500;
    return `rgb(255, ${Math.round(58 + t * 60)}, ${Math.round(t * 40)})`;
  }
  return "#ff4444";
}

export default function ThermalSimulation() {
  const [altitude, setAltitude] = useState(100);
  const [solarCondition, setSolarCondition] = useState<"min" | "max">("min");
  const [cableDiameter, setCableDiameter] = useState(1.0); // cm
  const [emissivity, setEmissivity] = useState(0.3);

  const result = useMemo(() => {
    const d = cableDiameter / 100; // convert cm to m
    const v = 8000; // m/s (approximate orbital velocity at these altitudes)

    const table =
      solarCondition === "min"
        ? DENSITY_TABLE_SOLAR_MIN
        : DENSITY_TABLE_SOLAR_MAX;
    const rho = interpolateDensity(altitude, table);

    // Drag power per meter: P = ½ρv³C_d·d
    const pDrag = 0.5 * rho * Math.pow(v, 3) * C_D * d;

    // Radiative cooling per meter: P = εσT⁴·πd
    // Solve for T: T = (P_drag / (εσπd))^(1/4)
    const denominator = emissivity * STEFAN_BOLTZMANN * Math.PI * d;
    const tEq = Math.pow(pDrag / denominator, 0.25);
    const tEqC = tEq - 273.15;

    // Check material survival
    const materialStatus = MATERIALS.map((m) => ({
      ...m,
      survives: tEqC < m.maxTemp,
      margin: m.maxTemp / tEqC,
    }));

    const anyMaterialSurvives = materialStatus.some((m) => m.survives);

    let verdict: "safe" | "marginal" | "catastrophic";
    if (tEqC < 300) verdict = "safe";
    else if (anyMaterialSurvives) verdict = "marginal";
    else verdict = "catastrophic";

    return { rho, pDrag, tEq, tEqC, materialStatus, verdict, d };
  }, [altitude, solarCondition, cableDiameter, emissivity]);

  const verdictConfig = {
    safe: {
      label: "SURVIVES",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      description: "Well within material limits",
    },
    marginal: {
      label: "MARGINAL",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
      description: "Some materials survive — careful engineering required",
    },
    catastrophic: {
      label: "CATASTROPHIC",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      description: "Exceeds all material limits — not viable at this altitude",
    },
  };

  const v = verdictConfig[result.verdict];

  return (
    <div className="space-y-8">
      {/* Primary readout */}
      <div className="text-center">
        <div
          className="text-6xl md:text-8xl font-bold font-mono tabular-nums transition-colors duration-300"
          style={{ color: tempToColor(result.tEqC) }}
        >
          {result.tEqC < 10000
            ? `${result.tEqC.toFixed(0)}°C`
            : `${(result.tEqC / 1000).toFixed(1)}k°C`}
        </div>
        <div className="text-muted text-sm mt-2">
          Equilibrium Temperature ({result.tEq.toFixed(0)} K)
        </div>
        <div
          className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border ${v.bg}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${result.verdict === "safe" ? "bg-green-400" : result.verdict === "marginal" ? "bg-yellow-400" : "bg-red-400"}`}
          />
          <span className={`font-mono font-bold text-sm ${v.color}`}>
            {v.label}
          </span>
          <span className="text-muted text-xs">— {v.description}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Altitude - primary control */}
        <div className="md:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Altitude</label>
            <span className="font-mono text-solar text-lg font-bold">
              {altitude} km
            </span>
          </div>
          <input
            type="range"
            min={80}
            max={300}
            step={1}
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-solar)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-muted)] mt-1">
            <span>80 km (mesosphere)</span>
            <span className="text-solar">100 km (Kármán line)</span>
            <span>300 km (thermosphere)</span>
          </div>
        </div>

        {/* Solar condition */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <label className="text-sm font-medium block mb-3">
            Solar Activity
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSolarCondition("min")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                solarCondition === "min"
                  ? "bg-solar text-[var(--color-background)]"
                  : "bg-[var(--color-background)] text-[var(--color-muted)] border border-[var(--color-border)]"
              }`}
            >
              Solar Minimum
            </button>
            <button
              onClick={() => setSolarCondition("max")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                solarCondition === "max"
                  ? "bg-solar text-[var(--color-background)]"
                  : "bg-[var(--color-background)] text-[var(--color-muted)] border border-[var(--color-border)]"
              }`}
            >
              Solar Maximum
            </button>
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-2">
            Solar max increases thermospheric density ~10× due to UV heating and
            atmospheric expansion
          </p>
        </div>

        {/* Cable diameter */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Cable Diameter</label>
            <span className="font-mono text-solar font-bold">
              {cableDiameter.toFixed(1)} cm
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={cableDiameter}
            onChange={(e) => setCableDiameter(Number(e.target.value))}
            className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-solar)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-muted)] mt-1">
            <span>0.1 cm (bootstrap)</span>
            <span>5 cm (full-scale)</span>
          </div>
        </div>
      </div>

      {/* Physics breakdown */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
          <div className="text-xs text-[var(--color-muted)] font-mono mb-1">
            ATMOSPHERIC DENSITY
          </div>
          <div className="text-lg font-mono font-bold">
            {formatScientific(result.rho)} kg/m³
          </div>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
          <div className="text-xs text-[var(--color-muted)] font-mono mb-1">
            DRAG HEATING
          </div>
          <div className="text-lg font-mono font-bold text-red-400">
            {result.pDrag < 1000
              ? `${result.pDrag.toFixed(2)} W/m`
              : result.pDrag < 1e6
                ? `${(result.pDrag / 1000).toFixed(1)} kW/m`
                : `${(result.pDrag / 1e6).toFixed(1)} MW/m`}
          </div>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5">
          <div className="text-xs text-[var(--color-muted)] font-mono mb-1">
            RADIATIVE COOLING
          </div>
          <div className="text-lg font-mono font-bold text-blue-400">
            {result.pDrag < 1000
              ? `${result.pDrag.toFixed(2)} W/m`
              : result.pDrag < 1e6
                ? `${(result.pDrag / 1000).toFixed(1)} kW/m`
                : `${(result.pDrag / 1e6).toFixed(1)} MW/m`}
          </div>
          <div className="text-xs text-[var(--color-muted)] mt-1">
            (= drag at equilibrium)
          </div>
        </div>
      </div>

      {/* Material limits */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
        <h3 className="text-sm font-medium mb-4">Material Survival</h3>
        <div className="space-y-3">
          {result.materialStatus.map((m) => (
            <div key={m.name} className="flex items-center gap-4">
              <div className="w-32 text-sm" style={{ color: m.color }}>
                {m.name}
              </div>
              <div className="flex-1 relative h-6 bg-[var(--color-background)] rounded-full overflow-hidden">
                {/* Temperature bar */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((result.tEqC / m.maxTemp) * 100, 100)}%`,
                    backgroundColor: m.survives ? `${m.color}40` : "#ef444480",
                  }}
                />
                {/* Limit marker */}
                <div
                  className="absolute top-0 h-full w-0.5"
                  style={{
                    left: `${Math.min(100, (m.maxTemp / Math.max(result.tEqC, m.maxTemp)) * 100)}%`,
                    backgroundColor: m.color,
                  }}
                />
              </div>
              <div className="w-20 text-right text-sm font-mono">
                {m.maxTemp}°C
              </div>
              <div className="w-16 text-right">
                {m.survives ? (
                  <span className="text-green-400 text-sm font-mono">
                    {m.margin.toFixed(1)}×
                  </span>
                ) : (
                  <span className="text-red-400 text-sm font-mono">FAIL</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equations reference */}
      <details className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
        <summary className="p-6 cursor-pointer text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
          Show equations
        </summary>
        <div className="px-6 pb-6 space-y-3 text-sm">
          <div className="font-mono text-solar bg-[var(--color-background)] rounded-lg px-4 py-3">
            P_drag = ½ × ρ × v³ × C_d × d
          </div>
          <div className="text-[var(--color-muted)]">
            Where ρ = atmospheric density, v = {8000} m/s, C_d = {C_D}{" "}
            (hypersonic cylinder), d = cable diameter
          </div>
          <div className="font-mono text-solar bg-[var(--color-background)] rounded-lg px-4 py-3">
            P_rad = ε × σ × T⁴ × π × d
          </div>
          <div className="text-[var(--color-muted)]">
            Where ε = {emissivity} (emissivity), σ = 5.67 × 10⁻⁸ W/m²K⁴
            (Stefan-Boltzmann)
          </div>
          <div className="font-mono text-solar bg-[var(--color-background)] rounded-lg px-4 py-3">
            T_eq = (P_drag / (ε × σ × π × d))^(1/4)
          </div>
          <div className="text-[var(--color-muted)]">
            At equilibrium, drag heating equals radiative cooling. Solve for
            temperature.
          </div>
        </div>
      </details>
    </div>
  );
}
