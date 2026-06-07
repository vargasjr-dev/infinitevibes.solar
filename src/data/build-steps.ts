export interface SubStep {
  title: string;
  description: string;
  specs?: { label: string; value: string }[];
  status: "open" | "in-progress" | "resolved";
  answersQuestion?: string;
  resolution?: {
    summary: string;
    rationale: string;
  };
}

export interface BuildStep {
  step: number;
  slug: string;
  title: string;
  location: string;
  description: string;
  specs: { label: string; value: string }[];
  openQuestions: string[];
  subSteps?: SubStep[];
}

export const buildSteps: BuildStep[] = [
  {
    step: 0,
    slug: "prototype",
    title: "Prototype & Validate",
    location: "Ground + Stratosphere — Test Facilities",
    description:
      "Before committing $2-3M to a full-scale 40,000 km cable and a Starship launch, validate every critical assumption at small scale. Build short cable segments, test splicing under load, prove coatings survive atomic oxygen, and deploy a spool from altitude. This step is the engineering equivalent of staging before production — nothing goes to orbit until it works on the ground.",
    specs: [
      { label: "Prototype cable length", value: "1-10 km" },
      { label: "Estimated prototype budget", value: "$50K-200K" },
      { label: "Duration", value: "6-12 months" },
      {
        label: "Test environments",
        value: "Ground, vacuum chamber, stratosphere",
      },
      {
        label: "Success criteria",
        value: "All sub-steps pass before Step 1 begins",
      },
    ],
    openQuestions: [
      "What test facility has vacuum chambers large enough to simulate 100 km conditions on a cable segment?",
      "Can a sounding rocket or high-altitude balloon test spool deployment at relevant speeds?",
      "What's the minimum prototype length needed to validate splice behavior under hoop stress?",
      "Who are the aerospace testing partners (NASA, AFRL, commercial test labs) that could support this?",
    ],
    subSteps: [
      {
        title: "Material Trade Study",
        description:
          "Before defaulting to Zylon, conduct a rigorous comparison of all candidate rotor cable materials. The orbital ring rotor needs the highest possible specific strength (tensile strength ÷ density) to minimize mass at 8 km/s hoop stress. Zylon (PBO) leads at 5.8 GPa tensile / 1.56 g/cm³, but it's a sole-source material from Toyobo with known degradation issues (UV, moisture, atomic oxygen). Alternatives include carbon fiber (multiple manufacturers, 3.5-6.0 GPa, but brittle), Dyneema/UHMWPE (excellent UV resistance, but melts at ~150°C — fatal for aerodynamic heating), and Kevlar/aramid (heat-resistant but weaker at 3.0-3.6 GPa). The trade study must weigh tensile strength, thermal limits, environmental degradation, supply chain risk, and cost.",
        specs: [
          { label: "Zylon (PBO)", value: "5.8 GPa / 1.56 g/cm³ — Toyobo only" },
          {
            label: "Carbon fiber (T1000G)",
            value: "6.4 GPa / 1.80 g/cm³ — multiple mfrs",
          },
          {
            label: "Dyneema SK99",
            value: "4.1 GPa / 0.97 g/cm³ — melts at 150°C ❌",
          },
          { label: "Kevlar 49", value: "3.6 GPa / 1.44 g/cm³ — weaker" },
          {
            label: "Vectran HT",
            value: "3.2 GPa / 1.40 g/cm³ — good creep resistance",
          },
          {
            label: "Hoop stress requirement",
            value: "3.88 GPa minimum (1.5× safety factor)",
          },
        ],
        status: "resolved",
        resolution: {
          summary:
            "Zylon (PBO) — 5.8 GPa, 1.56 g/cm³. Only fiber that clears the 3.88 GPa hoop stress requirement with safety margin.",
          rationale:
            "The rotor cable needs the highest possible specific strength (tensile strength ÷ density) to survive 8 km/s hoop stress. Minimum requirement: 3.88 GPa at 1.5× safety factor. Five candidates were evaluated:\n\nDyneema SK99 (4.1 GPa, 0.97 g/cm³) — Best specific strength due to ultra-low density, but melts at 150°C. At 100 km altitude, aerodynamic heating from residual atmosphere is fatal for a thermoplastic fiber. Eliminated on thermal limits.\n\nCarbon fiber T1000G (6.4 GPa, 1.80 g/cm³) — Highest raw tensile strength of any candidate. But carbon fiber is brittle and fractures under bending — it cannot be reliably spliced into a 40,000 km continuous loop assembled from thousands of shorter segments. Splice efficiency for brittle fibers is fundamentally limited. Eliminated on spliceability.\n\nKevlar 49 (3.6 GPa, 1.44 g/cm³) — Good thermal resistance (decomposes at 500°C) but falls below the 3.88 GPa minimum hoop stress requirement. Not strong enough. Eliminated on tensile strength.\n\nVectran HT (3.2 GPa, 1.40 g/cm³) — Excellent creep resistance and good UV tolerance, but the weakest candidate at 3.2 GPa. Well below the hoop stress minimum. Eliminated on tensile strength.\n\nZylon PBO (5.8 GPa, 1.56 g/cm³) — Clears the 3.88 GPa threshold with 1.49× margin. Known risks: sole-source manufacturing (Toyobo Co., Ltd., Japan only), UV sensitivity, moisture absorption, and atomic oxygen erosion at 100 km. These are engineering constraints to mitigate through coatings and supply chain strategy — not reasons to choose a weaker fiber. No other material clears the physics.",
        },
        answersQuestion:
          "What test facility has vacuum chambers large enough to simulate 100 km conditions on a cable segment?",
      },
      {
        title: "Procure Zylon Test Fiber",
        description:
          "Source small-quantity Zylon (PBO) fiber for splice testing and prototype fabrication. This is a procurement step — get the material in hand before committing to lab time.\n\nZylon is available through Teijin Frontier USA (primary US distributor) and Avient/Fiber-Line in standard deniers (250, 500, 1000, 1500, 3000d). Hayami Industry Co. (Japan) explicitly accepts small-quantity trial orders of braided Zylon cord. For 50 splices on 1-5 m segments, total material is 50-250 m of fiber (~0.1-0.5 kg) — a trivial order at ~$100-200/kg retail.\n\nOrder both AS (standard modulus) and HM (high modulus) variants for comparison. HM has higher stiffness and lower creep but may behave differently under splice loading. Request the Toyobo technical data sheet with the order to confirm exact specs.",
        specs: [
          { label: "Material needed", value: "50-250 m Zylon (~0.1-0.5 kg)" },
          {
            label: "Variants to order",
            value: "AS (standard modulus) + HM (high modulus)",
          },
          { label: "Deniers available", value: "250, 500, 1000, 1500, 3000" },
          { label: "US distributor", value: "Teijin Frontier USA" },
          { label: "Alt. distributor", value: "Avient/Fiber-Line" },
          {
            label: "Small-order supplier",
            value: "Hayami Industry Co. (Japan)",
          },
          { label: "Estimated material cost", value: "$50-200" },
          { label: "Lead time", value: "1-4 weeks" },
        ],
        status: "open",
        answersQuestion:
          "What's the minimum prototype length needed to validate splice behavior under hoop stress?",
      },
      {
        title: "Build Splice Jig & Develop Technique",
        description:
          "Before running the formal 50-splice test matrix, build a controlled splice jig and develop hand technique for working with PBO fiber. Zylon's rigid molecular structure (higher stiffness than Dyneema or Kevlar) means standard rope splicing techniques may not transfer directly — the fiber handling and interleaving process needs to be learned and refined on actual material.\n\nThe jig is a simple fixture: a board with adjustable clamps to hold both fiber ends at controlled tension, graduated markings for consistent overlap lengths (10-50 cm), guide channels to keep filaments aligned during interleaving, and a small serving tool for wrapping binding thread at even tension. Total cost under $200 in hardware store parts.\n\nSuccess criteria: produce 5 consecutive splices with visually identical geometry — consistent overlap length, even filament distribution, uniform serving wrap — before advancing to formal tensile testing. This step also serves as an early filter: if PBO's stiffness makes braided overlap impractical at test scale, the formal test matrix should weight mechanical sleeve and adhesive bond methods more heavily.",
        specs: [
          {
            label: "Jig components",
            value: "Board, adjustable clamps, guide channels, serving tool",
          },
          { label: "Estimated jig cost", value: "~$100-200" },
          { label: "Practice splices before formal testing", value: "10-20" },
          {
            label: "Parameters to dial in",
            value:
              "Overlap length, filament separation, serving tension, interleave pattern",
          },
          { label: "Time estimate", value: "1-2 weeks" },
          {
            label: "Success criteria",
            value: "5 consecutive visually identical splices",
          },
        ],
        status: "open",
        answersQuestion:
          "What's the minimum prototype length needed to validate splice behavior under hoop stress?",
      },
      {
        title: "Splice Strength Testing",
        description:
          "With Zylon fiber in hand, fabricate 50 test splices using candidate methods (braided overlap, fusion, mechanical) on 1-5 m cable segments and load each to failure. Target: ≥95% of virgin fiber breaking strength. Document failure modes (splice slippage vs. fiber rupture) and establish minimum overlap length. This directly determines whether the 40,000 km cable is viable as a spliced assembly.\n\nTensile testing access: University materials labs are the most cost-effective path. Most ME, aerospace, and civil engineering departments have universal testing machines (Instron, MTS) in the 10-100 kN range and rent lab time to external users at $50-200/hr. TestResources also offers direct machine rental. Target: a 100 kN UTM with fiber/yarn grips and an extensometer.\n\nBudget: The real costs are lab time ($1K-3K for ~20 sessions), splice fabrication tooling (braiding jig, adhesives, fixtures — $500-1K), and failure documentation (high-speed camera rental $500-1K). A university partnership or makerspace with an Instron could cut costs significantly. Save $5K-8K for this step.",
        specs: [
          { label: "Test samples", value: "50 splices across 3 methods" },
          {
            label: "Splice methods",
            value: "Braided overlap, fusion, mechanical",
          },
          { label: "Target efficiency", value: "≥95% of virgin strength" },
          {
            label: "Test equipment",
            value: "Universal testing machine (100 kN) + yarn grips",
          },
          {
            label: "Lab access",
            value:
              "University materials lab ($50-200/hr) or TestResources rental",
          },
          {
            label: "Failure documentation",
            value: "High-speed camera + strain gauge + extensometer",
          },
          {
            label: "Budget target",
            value: "$5K-8K (lab time + tooling + documentation)",
          },
        ],
        status: "open",
        answersQuestion:
          "What's the minimum prototype length needed to validate splice behavior under hoop stress?",
      },
      {
        title: "Atomic Oxygen Exposure Testing",
        description:
          "Subject coated cable samples to atomic oxygen bombardment in a vacuum chamber, simulating conditions at 100 km altitude. Test at least three coating types: SiO₂ (CVD), Al₂O₃ (ALD), and aluminum foil sheath. Measure mass loss, tensile strength retention, and coating adhesion after simulated exposure equivalent to 1, 6, and 12 months. NASA Glenn Research Center and AFRL have ground-based AO exposure facilities (e.g., the MPAC&SEED or directed-beam AO sources).",
        specs: [
          { label: "Coatings to test", value: "SiO₂, Al₂O₃, Al foil, hybrid" },
          {
            label: "Simulated exposure",
            value: "1, 6, and 12 months at 100 km AO flux",
          },
          {
            label: "Measurements",
            value: "Mass loss, tensile retention, SEM imaging",
          },
          {
            label: "Facilities",
            value: "NASA Glenn, AFRL, or commercial AO labs",
          },
          { label: "Estimated cost", value: "$15K-50K" },
        ],
        status: "open",
        answersQuestion:
          "What test facility has vacuum chambers large enough to simulate 100 km conditions on a cable segment?",
      },
      {
        title: "Ground Tension Loop",
        description:
          "Build a 1-10 km closed cable loop on the ground, tensioned between anchor points or on a circular test track. Spin the loop at scaled tension to simulate hoop stress conditions. Run continuously for weeks to test fatigue, creep, splice durability under sustained load, and coating wear. This is the cheapest way to find failure modes before going to orbit. A desert test site, abandoned airstrip, or large warehouse could host the loop.",
        specs: [
          { label: "Loop length", value: "1-10 km" },
          { label: "Cable mass", value: "0.5-5 kg" },
          { label: "Test duration", value: "4-12 weeks continuous" },
          {
            label: "Measurements",
            value: "Tension, creep, temperature, splice integrity",
          },
          {
            label: "Estimated cost",
            value: "$10K-30K (infrastructure + instrumentation)",
          },
        ],
        status: "open",
        answersQuestion:
          "What's the minimum prototype length needed to validate splice behavior under hoop stress?",
      },
      {
        title: "Stratospheric Tether Test",
        description:
          "Loft a 1-5 km cable segment to 30-35 km altitude on a stratospheric balloon. Expose the cable to near-space conditions (low pressure, UV, thermal cycling between sunlight and shadow, partial atomic oxygen exposure) for 1-4 weeks. Monitor tensile strength telemetry in real-time. This bridges the gap between ground vacuum chamber tests and actual orbital deployment. Companies like World View, Aerostar, or Near Space Corporation offer stratospheric balloon platforms for payload testing.",
        specs: [
          { label: "Altitude", value: "30-35 km" },
          { label: "Cable length", value: "1-5 km (suspended below balloon)" },
          { label: "Duration", value: "1-4 weeks" },
          {
            label: "Environment",
            value: "0.01 atm, UV, thermal cycling ±100°C",
          },
          {
            label: "Balloon providers",
            value: "World View, Aerostar, Near Space Corp",
          },
          {
            label: "Estimated cost",
            value: "$20K-80K (flight + instrumentation)",
          },
        ],
        status: "open",
        answersQuestion:
          "Can a sounding rocket or high-altitude balloon test spool deployment at relevant speeds?",
      },
      {
        title: "Spool Deployment Test",
        description:
          "Test the spool unwinding mechanism at speed. Options: (1) ground-based high-speed unspool rig simulating orbital deployment rate, (2) sounding rocket carrying a small spool (100-500m of cable) that deploys during ascent/descent, (3) drop test from a high-altitude balloon. The goal is to prove the cable unspools cleanly without tangling, kinking, or uneven tension — failure modes that would be catastrophic at orbital scale. Document unspooling dynamics with onboard cameras and tension sensors.",
        specs: [
          { label: "Spool size (test)", value: "100-500 m cable" },
          { label: "Deployment speed", value: "10-100 m/s (scaled)" },
          { label: "Sounding rocket option", value: "~$15K-50K per flight" },
          { label: "Ground rig option", value: "~$5K-20K" },
          {
            label: "Instrumentation",
            value: "High-speed camera, tension load cells, IMU",
          },
        ],
        status: "open",
        answersQuestion:
          "Can a sounding rocket or high-altitude balloon test spool deployment at relevant speeds?",
      },
    ],
  },
  {
    step: 1,
    slug: "manufacture-rotor-cable",
    title: "Manufacture the Rotor Cable",
    location: "Ground — Manufacturing Facility",
    description:
      "Produce a continuous loop of Zylon (PBO fiber) cable, roughly 40,000 km in circumference — enough to circle the Earth at 100 km altitude. The cable is wound onto a deployment spool sized for a single launch vehicle payload fairing. Zylon is an existing industrial material manufactured by Toyobo (Japan), used in body armor, motorsport tethers, and aerospace applications.",
    specs: [
      { label: "Material", value: "Zylon (PBO fiber)" },
      { label: "Total mass", value: "~20 tonnes" },
      { label: "Length", value: "~40,000 km" },
      { label: "Tensile strength", value: "5.8 GPa" },
      { label: "Density", value: "1.56 g/cm³" },
      {
        label: "Hoop stress at 2% overspeed",
        value: "3.88 GPa (1.5× safety factor)",
      },
    ],
    openQuestions: [
      "Can Toyobo produce a single continuous 40,000 km fiber, or does it need to be spliced? What's the splice strength penalty?",
      "What's the actual per-kg cost at 20-tonne volume? Published figures suggest ~$100/kg but bulk pricing is unknown.",
      "What spool geometry fits inside a Starship payload fairing (9m diameter × 22m height)?",
      "What coating or sheathing protects Zylon from atomic oxygen degradation at 100 km?",
    ],
    subSteps: [
      {
        title: "Vendor & Supply Chain Analysis",
        description:
          "Toyobo Co., Ltd. (now Toyobo MC Corporation) is the sole manufacturer of Zylon (PBO) fiber worldwide. There are no alternative PBO manufacturers — only distributors (Teijin Frontier USA, FibrXL in Europe, 3L Tex in China, Avient/Fiber-Line). This is a critical supply chain risk: a single-source dependency for the most important component of the entire orbital ring. The vendor analysis must map the full supply chain, identify Toyobo's capacity constraints, assess geopolitical risks (Japan-based sole source), and establish whether a second-source PBO manufacturer could be developed or licensed. SpaceX already uses Zylon for Crew Dragon parachute suspension lines — there may be an existing procurement relationship to leverage.",
        specs: [
          { label: "PBO manufacturer", value: "Toyobo MC Corp. (sole source)" },
          { label: "US distributor", value: "Teijin Frontier USA" },
          { label: "EU distributor", value: "FibrXL (Netherlands)" },
          { label: "China distributor", value: "3L Tex Co., Ltd." },
          {
            label: "Existing aerospace user",
            value: "SpaceX (Crew Dragon parachutes)",
          },
          {
            label: "NASA usage",
            value: "Stratospheric superpressure balloons",
          },
          {
            label: "Supply risk level",
            value: "Critical — no alternative manufacturer",
          },
        ],
        status: "open",
        answersQuestion:
          "What's the actual per-kg cost at 20-tonne volume? Published figures suggest ~$100/kg but bulk pricing is unknown.",
      },
      {
        title: "Fiber Production Feasibility",
        description:
          "Zylon (poly(p-phenylene-2,6-benzobisoxazole), or PBO) is manufactured exclusively by Toyobo Co., Ltd. in Otsu, Japan. Current global production is estimated at 300-500 tonnes per year, primarily for cut-resistant gloves, body armor, and high-performance ropes. The orbital ring requires 20 tonnes — roughly 4-7% of annual output. The critical question is not volume but continuity: can a single unbroken fiber be produced at 40,000 km length, or must it be spliced from shorter segments?",
        specs: [
          { label: "Manufacturer", value: "Toyobo Co., Ltd. (Japan)" },
          { label: "Current global output", value: "~300-500 tonnes/year" },
          { label: "Required volume", value: "20 tonnes (~4-7% of output)" },
          {
            label: "Max continuous spool (est.)",
            value: "~50-200 km per bobbin",
          },
          { label: "Splices needed (est.)", value: "200-800 splices" },
        ],
        status: "open",
        answersQuestion:
          "Can Toyobo produce a single continuous 40,000 km fiber, or does it need to be spliced? What's the splice strength penalty?",
      },
      {
        title: "Splice Engineering",
        description:
          "If the cable cannot be produced as a single continuous fiber (almost certainly the case — no industrial process produces 40,000 km continuous filament), every splice becomes a potential failure point. The splice must carry the full hoop stress of 3.88 GPa without being the weak link. Options include fusion splicing (thermal bonding of PBO ends), mechanical splicing (overlapping fibers with adhesive sheathing), and braided integration (interleaving fiber ends over a long overlap zone). The overlap length determines splice efficiency — longer overlaps approach 100% of virgin fiber strength but add mass.",
        specs: [
          {
            label: "Target splice efficiency",
            value: "≥95% of virgin fiber strength",
          },
          {
            label: "Fusion splice (PBO)",
            value: "~70-80% efficiency (research stage)",
          },
          {
            label: "Braided overlap splice",
            value: "~90-98% efficiency at 50-100× diameter overlap",
          },
          {
            label: "Mass penalty per splice",
            value: "~10-50g (at braided overlap)",
          },
          {
            label: "Total splice mass (800 splices)",
            value: "~8-40 kg (<0.2% of total)",
          },
        ],
        status: "open",
        answersQuestion:
          "Can Toyobo produce a single continuous 40,000 km fiber, or does it need to be spliced? What's the splice strength penalty?",
      },
      {
        title: "Bulk Procurement & Cost",
        description:
          "Published Zylon pricing ranges from $100-200/kg at small commercial quantities. At 20-tonne volume (a significant fraction of global output), bulk pricing is negotiable but unknown. The procurement itself may require a dedicated production run at Toyobo's facility, with lead times of 6-12 months. Alternative PBO sources do not exist — Toyobo holds the manufacturing monopoly.",
        specs: [
          { label: "Published retail price", value: "$100-200/kg" },
          { label: "Estimated bulk (20T)", value: "$50-150/kg (negotiable)" },
          { label: "Total cable cost range", value: "$1M - $3M" },
          { label: "Lead time (est.)", value: "6-12 months" },
          { label: "Supplier", value: "Toyobo (sole source)" },
          {
            label: "Supply risk",
            value: "High — single manufacturer, no alternatives",
          },
        ],
        status: "open",
        answersQuestion:
          "What's the actual per-kg cost at 20-tonne volume? Published figures suggest ~$100/kg but bulk pricing is unknown.",
      },
      {
        title: "Spool Design for Starship Fairing",
        description:
          "The entire 20-tonne, 40,000 km cable must be wound onto a spool that fits inside a Starship payload fairing (9m internal diameter × ~22m usable height). The spool design determines deployment dynamics — a poorly designed spool can tangle, jam, or create uneven tension during unspooling. The cable diameter drives spool geometry: a 1mm diameter Zylon cable wound at maximum packing density requires calculating the spool drum diameter, flange height, and winding pattern.",
        specs: [
          { label: "Fairing diameter (internal)", value: "9 m" },
          { label: "Fairing height (usable)", value: "~22 m" },
          { label: "Cable diameter", value: "~1 mm (single strand)" },
          { label: "Winding layers (est.)", value: "~4,000 layers" },
          {
            label: "Spool mass budget",
            value: "~500-1,000 kg (aluminum frame)",
          },
          {
            label: "Deployment mechanism",
            value: "TBD — motorized or spin-release",
          },
        ],
        status: "open",
        answersQuestion:
          "What spool geometry fits inside a Starship payload fairing (9m diameter × 22m height)?",
      },
      {
        title: "Atomic Oxygen Protection",
        description:
          "At 100 km altitude, atomic oxygen (AO) density is approximately 10⁹ atoms/cm³. AO is the primary degradation mechanism for organic polymers in low Earth orbit — it erodes exposed surfaces through oxidation. Zylon (PBO) is an organic polymer and is vulnerable. The International Space Station uses protective coatings (SiO₂, Al₂O₃) on exposed polymer surfaces. The rotor cable needs a conformal coating that survives 8 km/s relative wind while protecting the fiber underneath. Options: chemical vapor deposition (CVD) of silicon oxide, atomic layer deposition (ALD) of alumina, or a pre-applied metal foil sheath.",
        specs: [
          { label: "AO density at 100 km", value: "~10⁹ atoms/cm³" },
          {
            label: "AO erosion rate (unprotected PBO)",
            value: "~1-10 μm/year (est.)",
          },
          { label: "SiO₂ coating thickness", value: "100-500 nm" },
          { label: "Al₂O₃ (ALD) coating", value: "50-200 nm" },
          { label: "Metal foil sheath", value: "5-25 μm aluminum" },
          { label: "Mass penalty (Al foil, 40,000 km)", value: "~50-250 kg" },
        ],
        status: "open",
        answersQuestion:
          "What coating or sheathing protects Zylon from atomic oxygen degradation at 100 km?",
      },
    ],
  },
  {
    step: 2,
    slug: "launch-to-orbit",
    title: "Launch to 100 km",
    location: "Launch Site → Low Earth Orbit",
    description:
      "A single launch vehicle (e.g. Starship) delivers the spooled cable to a 100 km altitude circular orbit. The payload is the cable spool plus a deployment mechanism. At current projected pricing, this is the single largest cost in the entire bootstrap sequence.",
    specs: [
      { label: "Payload mass", value: "~20 tonnes" },
      { label: "Target altitude", value: "100 km" },
      { label: "Launch vehicle", value: "Starship (or equivalent heavy lift)" },
      { label: "Estimated launch cost", value: "~$2M (at ~$100/kg projected)" },
      { label: "Orbit type", value: "Equatorial circular" },
    ],
    openQuestions: [
      "100 km is below typical orbital altitude — atmospheric drag will deorbit the payload within days if not spun up quickly. What's the timeline constraint?",
      "Does the spool deploy from orbit, or does the launch vehicle unspool during ascent?",
      "What's the deployment mechanism? Spin-stabilized release? Spring-loaded?",
    ],
  },
  {
    step: 3,
    slug: "deploy-and-spin-up",
    title: "Deploy and Spin Up the Rotor",
    location: "100 km Altitude — Equatorial Orbit",
    description:
      "The cable is unspooled from the deployment mechanism into a continuous loop encircling the Earth. Ground-based electromagnetic stations then accelerate the cable from orbital velocity (7,844 m/s) to 102% overspeed (7,999 m/s). The 2% excess velocity generates net outward centrifugal force — this is what will hold the stator platforms up.",
    specs: [
      { label: "Orbital velocity at 100 km", value: "7,844 m/s" },
      { label: "Target velocity (102%)", value: "7,999 m/s" },
      {
        label: "Excess centrifugal acceleration",
        value: "0.384 m/s² per kg of rotor",
      },
      { label: "Spin-up energy (20 tonnes)", value: "~640 GJ (~180 MWh)" },
      { label: "Spin-up electricity cost", value: "~$9,000 at $0.05/kWh" },
    ],
    openQuestions: [
      "How do ground-based EM stations couple to a cable at 100 km altitude? Is this inductive, or does it require embedded conductors in the cable?",
      "How many ground stations are needed, and where should they be positioned?",
      "What's the unspooling procedure? How do you form a 40,000 km loop from a spool in orbit?",
      "What keeps the cable at 100 km during the spin-up window before excess centrifugal force kicks in?",
    ],
  },
  {
    step: 4,
    slug: "first-platform",
    title: "Levitate the First Platform",
    location: "100 km Altitude — On the Rotor",
    description:
      "A 15 kg stator platform is magnetically levitated onto the spinning rotor. The platform uses a Halbach array for passive maglev coupling — the rotor's excess centrifugal force supports the platform's weight against gravity. The platform is the anchor point for everything that follows: tethers, payloads, power, and comms.",
    specs: [
      { label: "Platform mass", value: "15 kg total" },
      { label: "Maglev system", value: "8 kg Halbach array" },
      { label: "Winch", value: "3 kg brushless DC" },
      { label: "Frame", value: "3 kg carbon fiber" },
      { label: "Fittings", value: "1 kg titanium" },
      { label: "Stator support ratio", value: "0.04 kg stator per kg rotor" },
      { label: "Max platforms at 20T rotor", value: "~9 stations" },
      { label: "Deflection angle at 20T", value: "~19° (stable)" },
    ],
    openQuestions: [
      "How is the first platform delivered to the rotor? Separate small launch, or included in the Step 2 payload?",
      "What's the procedure for initial magnetic coupling? Does the platform approach from above, below, or alongside?",
      "How does the Halbach array handle the 155 m/s velocity differential (rotor overspeed)?",
      "What active stabilization is needed beyond passive maglev?",
    ],
  },
  {
    step: 5,
    slug: "first-tether",
    title: "Lower the First Tether",
    location: "100 km → 20 km Altitude",
    description:
      "From the levitated platform, three redundant 0.5mm Zylon threads are lowered 80 km to a stratospheric balloon station at 20 km. This is Stage 2 of the three-stage transport system. Above 20 km, there's negligible wind — the tether hangs nearly vertically. Power flows up via a high-voltage DC conductor woven into the tether. Comms flow via a fiber-optic strand.",
    specs: [
      {
        label: "Tether material",
        value: "Zylon (PBO), 0.5mm × 3 redundant",
      },
      { label: "Length", value: "80 km" },
      { label: "Total tether mass", value: "~72 kg" },
      { label: "Breaking strength", value: "~4,550 N" },
      { label: "Self-weight tension", value: "~960 N" },
      { label: "Remaining payload capacity", value: "~3,590 N (366 kg)" },
      { label: "Power delivery", value: "10 kV / 0.33A / 3.3 kW HVDC" },
    ],
    openQuestions: [
      "What's the tether lowering mechanism? Gravity-fed from the platform winch?",
      "How does the tether connect to the balloon station at 20 km? Autonomous docking?",
      "How is the HVDC conductor integrated into the Zylon tether without compromising tensile strength?",
      "What's the failure mode if one of the three redundant threads breaks?",
    ],
  },
  {
    step: 6,
    slug: "balloon-station",
    title: "Deploy the Balloon Station and Lower Tether",
    location: "Surface → 20 km Altitude",
    description:
      "A cluster of stratospheric balloons is deployed to 20 km, forming the relay station between the surface tether (Stage 1) and the ring tether (Stage 2). A Dyneema (UHMWPE) rope is suspended from the balloon station down to a ground station at an equatorial site. This lower tether must survive the jet stream at 10-12 km — the highest-risk segment.",
    specs: [
      {
        label: "Lower tether material",
        value: "Dyneema (UHMWPE), 4-6 mm diameter",
      },
      { label: "Length", value: "20 km" },
      { label: "Mass", value: "200-500 kg" },
      { label: "Breaking strength", value: "29,400-68,600 N" },
      { label: "Jet stream wind load", value: "~17,000-26,000 N" },
      { label: "Safety factor", value: "1.7-2.6× (before fairings)" },
      {
        label: "Ground station",
        value: "Equatorial — Kiribati, Galápagos, or ocean platform",
      },
    ],
    openQuestions: [
      "What balloon technology works at 20 km for sustained operation? What's the replacement cycle?",
      "Can aerodynamic fairings on the lower tether meaningfully reduce jet stream loading?",
      "What's the ground station infrastructure? Anchoring, winch systems, power supply?",
      "How does the balloon station physically bridge the two tether segments?",
    ],
  },
  {
    step: 7,
    slug: "first-payload",
    title: "First Payload: Self-Reinforcement Begins",
    location: "Surface → Ring (100 km)",
    description:
      "The first payload climbs the full three-stage tether system: ground to balloon station (Stage 1), balloon to ring platform (Stage 2), received at the ring (Stage 3). The payload is more Zylon cable. Every kilogram of cable added to the rotor increases the ring's load-bearing capacity, enabling heavier future payloads. The self-reinforcing loop has begun.",
    specs: [
      { label: "First payload mass", value: "10-100 kg" },
      { label: "Trip time (10 kg at 3.3 kW)", value: "~50 minutes" },
      { label: "Trip time (100 kg at 3.3 kW)", value: "~8 hours" },
      { label: "Energy per 100 kg trip", value: "~26 kWh" },
      { label: "Electricity cost per 100 kg", value: "~$1.40" },
      { label: "Month 1 target", value: "100 kg/day × 30 days = 3 tonnes" },
      { label: "Ring mass increase in month 1", value: "+15% (20T → 23T)" },
    ],
    openQuestions: [
      "What's the climber mechanism? Motor-driven rollers gripping the tether?",
      "How is new cable integrated into the spinning rotor? Spliced in-orbit?",
      "What's the payload attachment/detachment procedure at the ring platform?",
    ],
  },
  {
    step: 8,
    slug: "multiply-platforms",
    title: "Multiply Platforms",
    location: "100 km Altitude — Multiple Points on Ring",
    description:
      "As ring mass grows, additional stator platforms are levitated at intervals around the circumference. Each new platform gets its own tether pair (upper and lower), its own balloon station, and its own ground connection. Throughput scales linearly with station count.",
    specs: [
      { label: "Stations at 20T rotor", value: "Up to 9" },
      { label: "Throughput per station", value: "~100 kg/day" },
      { label: "Total throughput at 9 stations", value: "~900 kg/day" },
      { label: "Annual throughput", value: "~330 tonnes" },
    ],
    openQuestions: [
      "What's the minimum ring mass increment before a new station can be safely added?",
      "How are platforms distributed around the ring? Evenly spaced, or clustered near ground stations?",
      "What's the coordination protocol between multiple stations lifting simultaneously?",
    ],
  },
  {
    step: 9,
    slug: "exponential-growth",
    title: "Exponential Growth",
    location: "Ring-Wide",
    description:
      "Each doubling of ring mass accelerates the next doubling. More mass means more platforms, more throughput, faster reinforcement. The ring enters an exponential growth phase. First doubling (~120 days), second (~60 days), third (~30 days).",
    specs: [
      { label: "First doubling", value: "~120 days (20T → 40T)" },
      { label: "Second doubling", value: "~60 days (40T → 80T)" },
      { label: "Third doubling", value: "~30 days (80T → 160T)" },
      {
        label: "Growth model",
        value: "Each doubling halves the next doubling time",
      },
    ],
    openQuestions: [
      "What's the practical ceiling before single-cable architecture becomes insufficient?",
      "At what mass does atmospheric drag power consumption become a binding constraint?",
      "When does the transition to mass-stream rotor architecture become necessary?",
    ],
  },
  {
    step: 10,
    slug: "resilient-topology",
    title: "Upgrade to Resilient Topology",
    location: "Ring-Wide",
    description:
      "The single cable evolves into a six-cable ladder topology with cross-links every 500-1000m. This is the transition from 'minimum viable' to 'operational infrastructure.' The ladder topology survives 1-2 cable severings with load redistribution and enables self-repair via tether payload delivery.",
    specs: [
      {
        label: "Configuration",
        value: "6 × 0.5mm Zylon cables, ladder topology",
      },
      { label: "Cross-links", value: "Every 500-1000 m" },
      { label: "Total rotor mass", value: "~75 tonnes" },
      { label: "Stator capacity", value: "3,000 kg (34 stations)" },
      { label: "Annual throughput", value: "1,200+ tonnes" },
      { label: "Fault tolerance", value: "Survives 1-2 cable breaks" },
    ],
    openQuestions: [
      "How are parallel cables deployed alongside the existing rotor? Sequential spooling?",
      "What's the cross-link attachment mechanism at 8 km/s relative to ground?",
      "What triggers the transition? Mass threshold? Failure event? Planned milestone?",
    ],
  },
];

export function getStepBySlug(slug: string): BuildStep | undefined {
  return buildSteps.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return buildSteps.map((s) => s.slug);
}
