// ── Single source of truth for site-wide details ──
//
// ⚠️  UNCONFIRMED VALUES are collected in the `unconfirmed` block below and are
// deliberately suppressed from rendered output and structured data until they
// are filled in. Publishing a placeholder phone number is worse than publishing
// none: search engines treat inconsistent NAP (name / address / phone) data as
// a negative local-ranking signal, and a fake number erodes trust if a real
// person dials it. See `hasPhone` / `hasStreetAddress` below.

export const PLACEHOLDER_PHONE = '+91 0000000000';

export const site = {
  name: 'Drona Valuechain Pvt Ltd',
  legalName: 'Drona Valuechain Private Limited',
  shortName: 'Drona Valuechain',
  tagline: 'Empowering People',
  cin: 'U52109DL2023PTC417213',

  mission:
    'To empower people and move businesses forward — uniting every link of the supply chain under one accountable, technology-driven partner.',
  vision:
    'To become India’s most trusted integrated logistics partner — the single operator manufacturers rely on from the shop floor to the customer’s door.',

  // Used as the default meta description and the schema.org `description`.
  description:
    'Drona Valuechain Pvt Ltd is a trusted partner for end-to-end supply chain solutions — in-plant services, warehousing, inventory management, packaging and last-mile delivery, seamlessly integrated under one roof.',

  // Shorter, plainer sentence for answer engines and social cards. Written to
  // be quotable verbatim: who, what, where, in one line.
  shortDescription:
    'Drona Valuechain is an integrated third-party logistics (3PL) company headquartered in Gurugram, Haryana, India, providing in-plant services, warehousing, inventory management, packaging, manpower supply and pan-India last-mile delivery to pharmaceutical, automotive and FMCG manufacturers.',

  url: 'https://dronavaluechain.com',

  email: 'info@dronavaluechain.com',

  phone: PLACEHOLDER_PHONE, // TODO(owner): replace with the real number, E.164 preferred.

  address: {
    street: '', // TODO(owner): full street address — required for LocalBusiness schema and Google Business Profile.
    city: 'Gurugram',
    state: 'Haryana',
    postalCode: '', // TODO(owner)
    country: 'India',
    countryCode: 'IN',
  },

  linkedin: 'https://www.linkedin.com/company/dronavaluechian',
  x: 'https://x.com/DronaValuchain',
  instagram: 'https://www.instagram.com/dronavaluechain/',
  founded: 2023,

  openingHours: 'Operations run 24/7. Office hours are Monday to Saturday, 9:00–18:00 IST.',

  // Entity grounding for structured data and answer engines. These map to
  // schema.org `areaServed` and `knowsAbout`, which is how a model learns what
  // this organisation is authoritative about.
  areaServed: 'India',
  knowsAbout: [
    'Third-party logistics',
    'In-plant logistics services',
    'Warehousing and storage',
    'Inventory management',
    'Industrial and export packaging',
    'Contract manpower supply',
    'Last-mile delivery',
    'Pharmaceutical logistics',
    'Automotive logistics',
    'FMCG distribution',
  ],
};

// ── Guards: never emit placeholder contact data ──
export const hasPhone = site.phone !== PLACEHOLDER_PHONE && site.phone.trim() !== '';
export const hasStreetAddress = site.address.street.trim() !== '';

/** Human-readable address line, skipping any part that isn't confirmed yet. */
export function formatAddress() {
  return [site.address.street, site.address.city, site.address.state, site.address.postalCode, site.address.country]
    .filter(Boolean)
    .join(', ');
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Clients', href: '/clients/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
//
// `summary` and `points` drive the cards on /services/. Everything from
// `metaTitle` down drives the individual /services/<slug>/ page. Each service
// owns one primary search theme — see docs/SEO.md for the keyword map.
// ─────────────────────────────────────────────────────────────────────────────

export const services = [
  {
    slug: 'in-plant-services',
    title: 'In-Plant Services',
    icon: 'factory',
    summary:
      'Embedded logistics teams managing material movement, line feeding and shop-floor operations inside your facility.',
    points: [
      'Material handling & line feeding',
      'Kitting and sequencing',
      'Shop-floor manpower & supervision',
      'Process-driven SOPs and safety compliance',
    ],
    metaTitle: 'In-Plant Logistics Services in India',
    metaDescription:
      'Embedded in-plant logistics teams for Indian manufacturers — line feeding, kitting, sequencing, material handling and shop-floor supervision under a single SLA.',
    h1: 'In-Plant Logistics Services',
    intro:
      'We place a trained, supervised logistics team inside your plant and take ownership of everything that moves between the gate and the production line — so your people can focus on making the product, not chasing the material.',
    definition:
      'In-plant logistics is the management of material movement inside a manufacturing facility — receiving, storing, kitting, sequencing and feeding components to the production line. It is typically outsourced to a specialist 3PL provider who supplies both the workforce and the process discipline, while the manufacturer retains control of production itself.',
    sections: [
      {
        h2: 'What we take off your plate',
        body: 'Most plants lose more time to internal material flow than to the machines themselves. Components arrive but sit unlogged; line-side bins run dry during a shift change; an operator walks fifteen minutes to find a part that was received three days ago. We take responsibility for that entire layer — unloading, binning, kitting, sequencing and line feeding — and run it to a documented SOP with a named supervisor on every shift.',
      },
      {
        h2: 'How the engagement is structured',
        body: 'We start with a two-week ground study of your current material flow: volumes, routes, bin locations, shift patterns and the actual causes of line stoppages. From that we design a manpower plan and an SOP set, agree the SLAs that matter to you — line-stoppage minutes, kit accuracy, inventory accuracy — and then deploy a trained team with its own supervision layer. Payroll, statutory compliance, training and attrition cover sit with us, not with your HR department.',
      },
      {
        h2: 'Why manufacturers move this outside',
        body: 'Running in-plant logistics with your own headcount means carrying a fixed cost through demand troughs, absorbing attrition, and managing statutory compliance for a workforce that is not core to your business. An outsourced model converts that to a variable cost tied to volume, and it puts accountability for material flow on a partner with an SLA attached to it.',
      },
    ],
    deliverables: [
      'Dedicated on-site team with shift supervisors',
      'Documented SOPs for every material movement',
      'Line feeding on JIT or JIS discipline',
      'Kitting and sequencing to production schedule',
      'Statutory compliance and payroll fully managed',
      'Monthly KPI review against agreed SLAs',
    ],
    outcomes: [
      'Fewer line stoppages caused by material shortage',
      'Higher kit and inventory accuracy',
      'Fixed manpower cost converted to variable',
      'Single accountable owner for shop-floor material flow',
    ],
    industries: ['automotive', 'pharmaceutical', 'fmcg-retail'],
    faqs: [
      {
        q: 'What is in-plant logistics?',
        a: 'In-plant logistics is the management of material movement inside a manufacturing facility — receiving, storing, kitting, sequencing and feeding components to the production line. It is distinct from external freight: it covers everything that happens between your gate and your machines.',
      },
      {
        q: 'Does Drona Valuechain supply the workforce as well as the process?',
        a: 'Yes. We deploy a trained team with its own supervision layer, and we carry payroll, statutory compliance, training and attrition cover. You deal with one contract and one point of accountability rather than managing a contract workforce directly.',
      },
      {
        q: 'How long does it take to deploy an in-plant team?',
        a: 'A typical deployment runs four to six weeks from signed contract to go-live: roughly two weeks of ground study and solution design, then two to four weeks of recruitment, training and SOP rollout. Urgent deployments can compress this where the scope is well defined.',
      },
      {
        q: 'Which SLAs do you commit to for in-plant work?',
        a: 'The commercially meaningful ones are usually line-stoppage minutes attributable to material shortage, kit accuracy, inventory record accuracy and manpower fill rate. We agree the specific targets during solution design so they reflect your actual production pattern.',
      },
    ],
  },
  {
    slug: 'warehousing',
    title: 'Warehousing & Storage',
    icon: 'warehouse',
    summary:
      'Secure, scalable storage infrastructure with disciplined processes for receiving, put-away, picking and dispatch.',
    points: [
      'Dedicated & shared warehousing',
      'Compliant storage for regulated goods',
      'Racking, layout & slotting optimisation',
      'Dispatch planning & documentation',
    ],
    metaTitle: 'Warehousing & Storage Services in Gurugram & Pan-India',
    metaDescription:
      'Dedicated and shared warehousing with disciplined receiving, put-away, picking and dispatch processes — including compliant storage for regulated goods across India.',
    h1: 'Warehousing & Storage',
    intro:
      'Storage space is the easy part. What determines whether a warehouse helps or hurts your business is the discipline of the processes running inside it — and that is what we operate.',
    definition:
      'Contract warehousing is an arrangement in which a third-party logistics provider stores and handles a client’s goods under an agreed service level, taking responsibility for receiving, put-away, picking, packing and dispatch. It differs from simple space rental in that the operator is accountable for accuracy and throughput, not just square footage.',
    sections: [
      {
        h2: 'Dedicated or shared, sized to your actual pattern',
        body: 'A dedicated facility makes sense when your volumes are steady, your SKU profile is specialised, or compliance requires segregation. Shared warehousing makes sense when you want to pay for the space you actually consume and ride out seasonal peaks without carrying empty racks in the off-season. We will tell you honestly which one your volume profile justifies rather than defaulting to the larger contract.',
      },
      {
        h2: 'Layout and slotting are where the cost lives',
        body: 'Two warehouses with identical rent can differ by thirty percent in picking labour, purely because of where the fast-moving SKUs sit. We design racking layout and slotting against your real order lines — not a generic ABC split — and we re-slot as your demand pattern shifts. Travel distance per pick is a number we track and reduce.',
      },
      {
        h2: 'Compliance and auditability',
        body: 'For regulated goods, storage conditions and chain of custody have to survive an audit, not just a walkthrough. We run documented receiving and put-away, batch and expiry tracking where the product requires it, controlled access, and records that reconcile to your ERP. When your auditor asks where a specific batch sat and who touched it, the answer exists.',
      },
    ],
    deliverables: [
      'Dedicated or shared space matched to your volume profile',
      'Documented receiving, put-away, pick, pack and dispatch',
      'Racking layout and slotting optimisation',
      'Batch, expiry and serial traceability where required',
      'Dispatch planning and documentation',
      'Stock reconciliation against your ERP',
    ],
    outcomes: [
      'Lower picking labour per order line',
      'Fewer dispatch errors and short shipments',
      'Storage cost that scales with actual volume',
      'Audit-ready records and chain of custody',
    ],
    industries: ['pharmaceutical', 'fmcg-retail', 'automotive'],
    faqs: [
      {
        q: 'What is the difference between dedicated and shared warehousing?',
        a: 'Dedicated warehousing gives you exclusive use of a facility or a defined zone, which suits steady volumes, specialised SKU profiles or compliance-driven segregation. Shared warehousing places your goods in a multi-client facility where you pay for the space and handling you actually consume, which suits seasonal or growing volumes.',
      },
      {
        q: 'Where are your warehouses located?',
        a: 'We are headquartered in Gurugram, Haryana, and operate warehousing and distribution across India. The right location for your business depends on where your suppliers and customers sit — we run a network study as part of solution design rather than pushing you toward existing space.',
      },
      {
        q: 'Can you store regulated or temperature-sensitive goods?',
        a: 'Yes. We operate compliant storage for regulated categories including pharmaceutical products, with GDP-aligned handling, batch and expiry traceability on FEFO discipline, controlled access and auditable chain-of-custody records.',
      },
      {
        q: 'How is warehousing priced?',
        a: 'Contract warehousing is normally priced on a combination of storage — per pallet position or per square foot, per month — and handling, charged per inbound and outbound transaction. We quote both components openly so you can see which one your cost is actually driven by.',
      },
    ],
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management',
    icon: 'inventory',
    summary:
      'Real-time visibility and accuracy across your stock — cycle counts, audits and data-driven replenishment.',
    points: [
      'Real-time stock visibility',
      'Cycle counting & perpetual inventory',
      'FIFO / FEFO / batch traceability',
      'Shrinkage control & audit support',
    ],
    metaTitle: 'Inventory Management Services for Manufacturers',
    metaDescription:
      'Perpetual inventory management with cycle counting, FIFO/FEFO batch traceability, shrinkage control and audit support — so your system stock matches your physical stock.',
    h1: 'Inventory Management',
    intro:
      'Almost every operation we walk into believes its inventory records are roughly right. The gap between "roughly right" and actually right is where working capital and customer promises quietly leak away.',
    definition:
      'Inventory management is the discipline of keeping recorded stock aligned with physical stock, and of holding the right quantity of each item to meet demand without over-investing in working capital. In practice it rests on counting discipline, traceability rules such as FIFO or FEFO, and reconciliation against the system of record.',
    sections: [
      {
        h2: 'Perpetual counting, not annual firefighting',
        body: 'A single wall-to-wall count once a year tells you how wrong you were, twelve months too late, and it usually costs you a shutdown to find out. We run perpetual inventory through structured cycle counting — high-value and fast-moving items counted frequently, the long tail on a longer cycle — so variances surface in days rather than quarters and the root cause is still traceable.',
      },
      {
        h2: 'Traceability that matches the product',
        body: 'FIFO is the right default for most goods. For anything with an expiry date, FEFO is the only defensible rule, and it has to be enforced at the pick face rather than in a policy document. Where batch or serial traceability is a regulatory requirement, we capture it at receiving and carry it through to dispatch, so a recall query returns an answer instead of a search.',
      },
      {
        h2: 'Finding where the shrinkage actually comes from',
        body: 'Shrinkage is rarely one cause. It is some mix of receiving errors, pick errors, damage that never got booked, and genuine loss — and the mix is different in every operation. We separate those buckets through count variance analysis so the corrective action targets the real problem rather than adding a security guard to a receiving-accuracy issue.',
      },
    ],
    deliverables: [
      'Perpetual inventory via structured cycle counting',
      'FIFO, FEFO, batch and serial traceability',
      'Variance analysis and root-cause reporting',
      'Reconciliation against your ERP or WMS',
      'Shrinkage control and damage booking discipline',
      'Statutory and internal audit support',
    ],
    outcomes: [
      'Inventory record accuracy you can plan against',
      'Working capital released from buffer stock',
      'Faster, cleaner audits',
      'Recall and traceability queries answerable on demand',
    ],
    industries: ['pharmaceutical', 'automotive', 'fmcg-retail'],
    faqs: [
      {
        q: 'What is the difference between FIFO and FEFO?',
        a: 'FIFO — first in, first out — dispatches the oldest received stock first. FEFO — first expired, first out — dispatches the stock closest to its expiry date first, regardless of when it arrived. FEFO is essential for pharmaceuticals, food and any product with a shelf life, because the oldest stock is not always the one expiring soonest.',
      },
      {
        q: 'What is cycle counting and why is it better than an annual stock take?',
        a: 'Cycle counting counts a subset of stock continuously, weighting high-value and fast-moving items toward more frequent counts. It surfaces variances within days while the cause is still traceable, and it avoids the production or dispatch shutdown that a full wall-to-wall count requires.',
      },
      {
        q: 'Do you integrate with our existing ERP or WMS?',
        a: 'Yes. We reconcile to your system of record rather than asking you to adopt ours. Where you have no WMS in place, we can operate on our own tooling and hand you the reporting layer.',
      },
      {
        q: 'What inventory accuracy level is realistic?',
        a: 'Well-run operations with disciplined cycle counting typically sustain inventory record accuracy in the high nineties by location and SKU. The achievable number depends on your SKU count, handling volume and the condition of the opening data — we baseline it during the first counting cycle rather than promising a figure up front.',
      },
    ],
  },
  {
    slug: 'packaging-solutions',
    title: 'Packaging Solutions',
    icon: 'package',
    summary:
      'Protective, optimised and compliant packaging — from primary packing to export-ready palletisation.',
    points: [
      'Industrial & export packaging',
      'Kitting, labelling & repacking',
      'Packaging material optimisation',
      'Damage-reduction engineering',
    ],
    metaTitle: 'Industrial & Export Packaging Services in India',
    metaDescription:
      'Industrial and export packaging, kitting, labelling and repacking — with material optimisation and damage-reduction engineering that cuts both freight cost and claims.',
    h1: 'Packaging Solutions',
    intro:
      'Packaging sits between two costs that pull in opposite directions: too little and you pay in damage claims, too much and you pay in material and freight. We engineer for the total of both, not either one alone.',
    definition:
      'Industrial packaging is the design and execution of protective packing for goods in transit and storage, covering material selection, pack configuration, labelling and palletisation. Export packaging additionally has to satisfy destination-country requirements — notably ISPM-15 treatment for wooden packaging material used in international shipments.',
    sections: [
      {
        h2: 'Designing to the damage you are actually seeing',
        body: 'The starting point is your claims history, not a catalogue. Which SKUs are being damaged, at which point in the journey, and in what mode — compression, vibration, drop, or handling? A pack that fails on the third stacking tier needs a different fix from one that fails at the last-mile handover. We instrument the question before recommending a material.',
      },
      {
        h2: 'Material optimisation pays twice',
        body: 'Right-sizing a carton reduces the material you buy and the air you ship. Because freight is charged on volumetric weight for most parcel and express movements, a pack redesign that removes void space often returns more in freight savings than in material savings. We model both before proposing a change.',
      },
      {
        h2: 'Export compliance and palletisation',
        body: 'Export shipments carry requirements that domestic movements do not — ISPM-15 heat treatment and marking for wooden packaging material, destination labelling standards, and documentation that has to match what is physically on the pallet. We build export-ready pallets with the marking and paperwork aligned, so shipments are not held at the port over a stamp.',
      },
    ],
    deliverables: [
      'Pack design against your actual damage history',
      'Industrial and export packaging execution',
      'ISPM-15 compliant wooden packaging for exports',
      'Kitting, labelling and repacking',
      'Right-sizing and material specification',
      'Palletisation and load planning',
    ],
    outcomes: [
      'Lower damage and claims rate',
      'Reduced volumetric freight cost',
      'Export shipments that clear without packaging holds',
      'Consistent, auditable labelling',
    ],
    industries: ['automotive', 'pharmaceutical', 'fmcg-retail'],
    faqs: [
      {
        q: 'What is ISPM-15 and does my shipment need it?',
        a: 'ISPM-15 is the international standard requiring wooden packaging material used in export shipments — pallets, crates, dunnage — to be heat treated or fumigated and stamped with a compliance mark. It applies to most international shipments using solid wood packaging. Shipments that arrive without valid marking can be held, treated at your cost, or refused entry.',
      },
      {
        q: 'Can packaging changes actually reduce freight cost?',
        a: 'Yes, often substantially. Parcel and express freight is charged on volumetric weight, so removing void space from a pack reduces the chargeable weight even when the product weight is unchanged. For many clients the freight saving from right-sizing exceeds the packaging material saving.',
      },
      {
        q: 'Do you supply packaging material or only the labour?',
        a: 'We can do either. Some clients want us to operate their existing material contracts; others want us to take the full scope including sourcing, where our volume across clients typically improves the material rate.',
      },
      {
        q: 'Can you handle repacking and relabelling of existing stock?',
        a: 'Yes. Repacking, relabelling, kitting and rework of stock already in the network is a routine part of our warehousing operations, including where a labelling change is driven by a regulatory or customer requirement.',
      },
    ],
  },
  {
    slug: 'manpower-supply',
    title: 'Manpower Supply',
    icon: 'people',
    summary:
      'Trained, reliable workforce deployed on demand — from material handlers and machine operators to supervisors — managed end to end.',
    points: [
      'Skilled & semi-skilled workforce',
      'Flexible, on-demand scaling',
      'Statutory compliance & payroll managed',
      'Trained, supervised & safety-ready',
    ],
    metaTitle: 'Logistics Manpower Supply & Contract Staffing in India',
    metaDescription:
      'Trained material handlers, machine operators, pickers and supervisors deployed on demand — with payroll, PF, ESI and statutory compliance managed end to end.',
    h1: 'Manpower Supply',
    intro:
      'Supplying people is straightforward. Supplying people who show up trained, stay through the contract, and come with your statutory exposure properly covered is the part that takes an operator.',
    definition:
      'Contract manpower supply in logistics is the deployment of a workforce — material handlers, operators, pickers, packers and supervisors — by a service provider who remains the employer of record. The provider carries payroll, statutory contributions such as PF and ESI, training and attrition cover, while the client directs the work.',
    sections: [
      {
        h2: 'Compliance is the risk you are actually outsourcing',
        body: 'The commercial case for contract manpower is flexibility, but the risk being transferred is statutory. Provident fund and ESI contributions, minimum wage compliance, contract labour registration, and the documentation to prove all of it in an inspection — these sit with us as the employer of record. A supplier who is cheap because they are not filing correctly is a liability that eventually lands on your premises.',
      },
      {
        h2: 'Training and supervision, not just headcount',
        body: 'A worker delivered without induction is a safety incident waiting to be reported. Every deployment includes role-specific training, safety induction, and a supervision layer that belongs to us. Where the role requires certification — forklift operation, for instance — we deploy only certified operators and keep the records current.',
      },
      {
        h2: 'Scaling through peaks without carrying the trough',
        body: 'Demand in most manufacturing and distribution operations is not flat. Festival peaks, model changeovers, seasonal volume — these need headcount that arrives quickly and releases cleanly. We plan a core team with a defined surge capacity so the ramp is contractual rather than a scramble.',
      },
    ],
    deliverables: [
      'Skilled and semi-skilled workforce by role',
      'Employer-of-record payroll and statutory filings',
      'PF, ESI and contract labour compliance',
      'Role-specific and safety training on induction',
      'On-site supervision layer',
      'Defined surge capacity for peak periods',
    ],
    outcomes: [
      'Statutory exposure carried by the service provider',
      'Headcount that flexes with actual demand',
      'Lower attrition-driven disruption',
      'Consistent safety and training compliance',
    ],
    industries: ['automotive', 'fmcg-retail', 'pharmaceutical'],
    faqs: [
      {
        q: 'Who is the employer of record for supplied manpower?',
        a: 'We are. Drona Valuechain carries payroll, provident fund and ESI contributions, contract labour registration and the associated statutory filings. You direct the work; the employment relationship and its compliance obligations sit with us.',
      },
      {
        q: 'What roles do you supply?',
        a: 'Material handlers, pickers and packers, machine operators, forklift operators, quality checkers, loaders and shift supervisors. Where a role requires certification — forklift operation, for example — we deploy only certified operators and maintain current records.',
      },
      {
        q: 'How quickly can you scale a team up or down?',
        a: 'Planned surge capacity agreed in the contract can typically be mobilised within one to two weeks. Unplanned requirements depend on the role and location; semi-skilled roles move faster than certified ones. We prefer to build the expected peak into the contract so the ramp is contractual rather than reactive.',
      },
      {
        q: 'How do you handle attrition?',
        a: 'Attrition cover is our responsibility, not yours. We maintain a replacement pipeline against the deployed headcount so a departure is backfilled without a gap in your operation, and we report attrition openly in the monthly review because a rising trend usually signals something worth fixing.',
      },
    ],
  },
  {
    slug: 'last-mile-delivery',
    title: 'Last-Mile Delivery',
    icon: 'truck',
    summary:
      'Reliable pan-India distribution with real-time tracking, proof of delivery and time-definite service levels.',
    points: [
      'Pan-India delivery network',
      'Real-time shipment tracking',
      'Time-definite & express options',
      'POD management & reverse logistics',
    ],
    metaTitle: 'Last-Mile Delivery & Pan-India Distribution',
    metaDescription:
      'Pan-India last-mile delivery with real-time tracking, time-definite service levels, proof-of-delivery management and reverse logistics for returns.',
    h1: 'Last-Mile Delivery',
    intro:
      'The last mile is the only part of the chain your customer actually sees. Everything upstream can run perfectly and still be judged by whether the box arrived when it was promised.',
    definition:
      'Last-mile delivery is the final leg of a shipment’s journey, from the local distribution point to the end recipient. It is typically the most expensive segment per unit because it involves the smallest drop sizes and the least consolidation, and it is the segment most visible to the end customer.',
    sections: [
      {
        h2: 'Coverage that is real, not a map on a slide',
        body: 'Pan-India coverage means little without knowing the service level behind each pin. Metro and tier-one delivery is a commodity; consistent tier-three and rural service is not. We are explicit about which lanes are time-definite, which are best-effort, and what the realistic transit time is — before you commit to a promise on your own website.',
      },
      {
        h2: 'Tracking and proof of delivery',
        body: 'Real-time tracking matters less for the shipments that go right than for the ones that do not. The value is in knowing, on the day, which consignments are at risk and being able to tell your customer before they call you. Proof of delivery is captured and retrievable, which is also what settles a dispute over a claimed non-receipt.',
      },
      {
        h2: 'Returns are part of the design, not an afterthought',
        body: 'Reverse logistics is where margin quietly disappears in distribution businesses — an uncollected return, a product that comes back unbooked, a refund issued against stock that never physically arrived. We handle pickup, return-to-origin and the booking discipline that reconciles a physical return against the credit note.',
      },
    ],
    deliverables: [
      'Pan-India delivery network with defined lane service levels',
      'Real-time shipment tracking and exception alerting',
      'Time-definite and express options where available',
      'Proof-of-delivery capture and retrieval',
      'Reverse logistics, pickups and return-to-origin',
      'Delivery performance reporting by lane',
    ],
    outcomes: [
      'Delivery promises you can make with confidence',
      'Earlier visibility of at-risk consignments',
      'Disputes settled with retrievable proof of delivery',
      'Returns reconciled against credits',
    ],
    industries: ['pharmaceutical', 'fmcg-retail', 'automotive'],
    faqs: [
      {
        q: 'What areas does your delivery network cover?',
        a: 'We deliver across India. Service levels differ by lane — metro and tier-one destinations support time-definite delivery, while deeper tier-three and rural lanes carry longer and more variable transit times. We share the realistic transit matrix for your specific lanes during solution design.',
      },
      {
        q: 'How is proof of delivery handled?',
        a: 'Proof of delivery is captured at the point of handover and stored against the consignment, so it can be retrieved later to settle a disputed or claimed non-delivery.',
      },
      {
        q: 'Do you handle returns and reverse logistics?',
        a: 'Yes. We manage customer pickups, return-to-origin movements and the booking discipline that reconciles a physical return against the corresponding credit — which is where unmanaged reverse flows usually lose money.',
      },
      {
        q: 'What is the difference between last-mile delivery and line-haul?',
        a: 'Line-haul is the long-distance movement between hubs or cities, usually in consolidated full or part loads. Last-mile delivery is the final leg from a local distribution point to the end recipient, with much smaller drop sizes. Last mile costs more per unit delivered and is the segment your customer experiences directly.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ─────────────────────────────────────────────────────────────────────────────

export const industries = [
  {
    slug: 'pharmaceutical',
    title: 'Pharmaceutical Logistics',
    summary:
      'Compliant, temperature-aware handling and pan-India delivery excellence for pharma manufacturers and distributors.',
    points: [
      'GDP-aligned handling processes',
      'Batch & expiry (FEFO) traceability',
      'Pan-India distribution reach',
      'Secure, auditable chain of custody',
    ],
    metaTitle: 'Pharmaceutical Logistics & Distribution in India',
    metaDescription:
      'GDP-aligned pharmaceutical logistics — batch and expiry FEFO traceability, auditable chain of custody, compliant storage and pan-India distribution for pharma manufacturers.',
    h1: 'Pharmaceutical Logistics',
    intro:
      'In pharma, a logistics error is not a service failure — it is a compliance event. The processes have to hold up to an audit long after the shipment has been delivered.',
    challenge:
      'Pharmaceutical supply chains carry obligations that most other categories do not: shelf-life management that must run on FEFO rather than FIFO, batch-level traceability that has to survive a recall query years later, storage conditions that need documented control, and a chain of custody that an inspector can follow end to end. Getting the delivery right is necessary but not sufficient — the record of how it was handled is part of the product.',
    approach: [
      {
        h3: 'FEFO enforced at the pick face',
        body: 'Expiry-driven dispatch only works if it is enforced where the picker stands, not stated in a policy. We capture batch and expiry at receiving and drive picking on first-expired-first-out, so short-dated stock moves before it becomes a write-off.',
      },
      {
        h3: 'Auditable chain of custody',
        body: 'Every movement is recorded against the batch — who handled it, where it sat, when it moved. A recall or an inspection query returns a documented answer rather than triggering a physical search.',
      },
      {
        h3: 'GDP-aligned handling discipline',
        body: 'Receiving, storage, segregation of quarantined and rejected stock, and dispatch all run to documented procedures aligned with good distribution practice, with controlled access to the storage area.',
      },
      {
        h3: 'Pan-India distribution reach',
        body: 'Distribution to stockists, hospitals and institutional buyers across India, with delivery performance reported by lane so you can see where service is actually holding.',
      },
    ],
    servicesUsed: ['warehousing', 'inventory-management', 'last-mile-delivery', 'packaging-solutions'],
    faqs: [
      {
        q: 'Why does pharmaceutical logistics use FEFO instead of FIFO?',
        a: 'Because the oldest stock in a warehouse is not always the stock expiring soonest — different batches carry different shelf lives. FEFO, first-expired-first-out, dispatches the batch closest to expiry first, which minimises write-offs and prevents short-dated product reaching a customer.',
      },
      {
        q: 'What is GDP in pharmaceutical distribution?',
        a: 'GDP stands for good distribution practice — the set of standards governing how medicinal products are stored, transported and handled through the supply chain so that quality and integrity are maintained and the chain of custody remains traceable and auditable.',
      },
      {
        q: 'Can you support a product recall?',
        a: 'Yes. Because batch and expiry data is captured at receiving and every movement is recorded against the batch, we can identify which consignments contained an affected batch and where they were delivered, which is the information a recall requires.',
      },
    ],
  },
  {
    slug: 'automotive',
    title: 'Automotive & Engineering',
    summary:
      'In-plant operations and precision logistics support for automotive OEMs and component manufacturers.',
    points: [
      'In-plant material flow management',
      'JIT / JIS line feeding',
      'Kitting & sequencing for assembly',
      'Vendor-managed inventory support',
    ],
    metaTitle: 'Automotive Logistics, In-Plant & JIT Line Feeding',
    metaDescription:
      'In-plant logistics for automotive OEMs and component manufacturers — JIT and JIS line feeding, kitting and sequencing for assembly, and vendor-managed inventory support.',
    h1: 'Automotive & Engineering Logistics',
    intro:
      'An automotive assembly line does not tolerate approximation. Parts arrive in the right sequence at the right minute, or the line stops and the cost is measured in minutes.',
    challenge:
      'Automotive logistics is defined by the intolerance of the assembly line to variation. Just-in-time replenishment means there is no buffer to absorb a late delivery; just-in-sequence means the parts must arrive in build order, not merely on time. Add high part-number counts, model variants, and a supplier base spread across geographies, and internal material flow becomes the constraint on plant output.',
    approach: [
      {
        h3: 'JIT and JIS line feeding',
        body: 'We feed the line to your production schedule, in build sequence where the process requires it, with the replenishment triggers and route timings designed around your actual takt rather than a nominal one.',
      },
      {
        h3: 'Kitting and sequencing for assembly',
        body: 'Parts are kitted per unit and sequenced to the build order, so the operator receives a complete kit rather than picking from line-side bins — which cuts both fitment errors and the walking time hidden inside cycle time.',
      },
      {
        h3: 'In-plant material flow ownership',
        body: 'A dedicated on-site team owns everything between the gate and the line: unloading, binning, internal movement and line feeding, run to documented SOPs with shift supervision and safety compliance.',
      },
      {
        h3: 'Vendor-managed inventory support',
        body: 'Where a VMI arrangement is in place, we operate the consumption tracking and replenishment discipline that keeps it honest, so stock is available without inflating the buffer.',
      },
    ],
    servicesUsed: ['in-plant-services', 'manpower-supply', 'packaging-solutions', 'warehousing'],
    faqs: [
      {
        q: 'What is the difference between JIT and JIS?',
        a: 'Just-in-time (JIT) delivers parts to the line as they are needed, minimising line-side inventory. Just-in-sequence (JIS) goes further: parts arrive in the exact order the units will be built, so a variant-specific component reaches the station matched to the vehicle in front of it. JIS is more demanding because a sequencing error stops the line even when the part is present.',
      },
      {
        q: 'What is kitting in automotive assembly?',
        a: 'Kitting is the practice of gathering all the parts required for one assembly unit into a single container before it reaches the station. The operator fits from a complete kit rather than picking from multiple line-side bins, which reduces fitment errors and removes picking time from the assembly cycle.',
      },
      {
        q: 'Do you work with tier-one suppliers as well as OEMs?',
        a: 'Yes. Component manufacturers supplying into an OEM face the same sequencing and line-feeding discipline imposed on them by their customer, and in-plant support is often a more direct lever for them than for the OEM itself.',
      },
    ],
  },
  {
    slug: 'fmcg-retail',
    title: 'FMCG & Retail',
    summary:
      'High-velocity warehousing and distribution built for seasonal peaks, broad SKU ranges and tight delivery windows.',
    points: [
      'High-throughput fulfilment',
      'Multi-channel distribution',
      'Seasonal scalability',
      'Returns & reverse logistics',
    ],
    metaTitle: 'FMCG & Retail Logistics, Warehousing and Distribution',
    metaDescription:
      'High-velocity FMCG and retail logistics — multi-channel distribution, seasonal peak scalability, broad SKU handling and reverse logistics for returns across India.',
    h1: 'FMCG & Retail Logistics',
    intro:
      'FMCG punishes rigidity. Volume triples for a festival window, a promotion changes the SKU mix overnight, and the delivery window at a modern-trade distribution centre is measured in hours.',
    challenge:
      'Fast-moving consumer goods and retail distribution combine three pressures that rarely appear together: very high throughput, a broad and shifting SKU range, and demand that swings sharply with season and promotion. Layered on top is multi-channel complexity — general trade, modern trade and e-commerce each expect different pack configurations, documentation and delivery windows from the same warehouse.',
    approach: [
      {
        h3: 'Throughput-first warehouse design',
        body: 'Layout and slotting are designed around order-line velocity and re-slotted as the mix shifts, because in a high-throughput operation picking travel is the dominant labour cost.',
      },
      {
        h3: 'Seasonal scalability',
        body: 'Peak capacity is planned into the contract — space, headcount and dispatch capacity — so a festival ramp is a scheduled event rather than an emergency, and you are not paying for peak capacity through the trough.',
      },
      {
        h3: 'Multi-channel dispatch discipline',
        body: 'General trade, modern trade and e-commerce orders are picked, packed and documented to each channel’s requirements from a shared inventory pool, with the appointment and documentation discipline that modern-trade DCs enforce.',
      },
      {
        h3: 'Returns handled as a designed flow',
        body: 'Reverse logistics is planned rather than improvised: pickups, return-to-origin, inspection and the booking discipline that reconciles physical returns against credits.',
      },
    ],
    servicesUsed: ['warehousing', 'inventory-management', 'last-mile-delivery', 'manpower-supply'],
    faqs: [
      {
        q: 'How do you handle seasonal demand peaks?',
        a: 'Peak capacity is built into the contract in advance — additional space, planned surge headcount and dispatch capacity — with the trigger points agreed ahead of the season. That keeps the ramp scheduled rather than reactive, and it means you are not carrying peak-sized fixed cost through the off-season.',
      },
      {
        q: 'Can you serve general trade, modern trade and e-commerce from one warehouse?',
        a: 'Yes. The three channels differ in pack configuration, documentation and delivery-window discipline rather than in the underlying stock, so they can be served from a shared inventory pool with channel-specific pick, pack and dispatch processes.',
      },
      {
        q: 'What does high-throughput fulfilment require that ordinary warehousing does not?',
        a: 'Mainly slotting discipline and re-slotting cadence. At high order-line volumes, the distance a picker travels dominates labour cost, so the placement of fast-moving SKUs — and the willingness to change it as the mix shifts — matters more than any other single factor.',
      },
    ],
  },
];

export const stats = [
  { value: '20+', label: 'Years of leadership experience' },
  { value: 'Pan-India', label: 'Delivery network' },
  { value: '100+', label: 'Team members' },
  { value: '24/7', label: 'Operations support' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY-LEVEL FAQs
//
// These drive the FAQ block on the homepage and the FAQPage structured data.
// Written as direct, self-contained answers: an answer engine quoting a single
// one of these should still produce a correct, attributable statement.
// ─────────────────────────────────────────────────────────────────────────────

export const companyFaqs = [
  {
    q: 'What does Drona Valuechain do?',
    a: 'Drona Valuechain is an integrated third-party logistics (3PL) company based in Gurugram, Haryana, India. We provide in-plant logistics services, warehousing and storage, inventory management, industrial and export packaging, contract manpower supply, and pan-India last-mile delivery — either as individual service lines or as a single end-to-end programme under one contract.',
  },
  {
    q: 'Where is Drona Valuechain located?',
    a: `Drona Valuechain is headquartered in ${site.address.city}, ${site.address.state}, India, and operates warehousing and distribution across India.`,
  },
  {
    q: 'Which industries does Drona Valuechain serve?',
    a: 'We work primarily with pharmaceutical manufacturers and distributors, automotive OEMs and component manufacturers, and FMCG and retail businesses. The common thread is operations where accuracy, compliance and delivery reliability carry real cost when they fail.',
  },
  {
    q: 'What is a 3PL, and when should a manufacturer use one?',
    a: 'A third-party logistics provider (3PL) operates logistics functions on behalf of another company — warehousing, inventory, packaging, transport or in-plant material flow. Outsourcing to a 3PL makes sense when logistics is not your competitive advantage, when you want fixed cost converted to variable cost that tracks volume, or when you need a single accountable owner for a process currently split across several vendors.',
  },
  {
    q: 'Can Drona Valuechain handle only one part of our supply chain?',
    a: 'Yes. Each service line runs independently. Many engagements begin with a single scope — a warehouse, or an in-plant team — and expand once the operating relationship is established. There is no requirement to hand over the whole chain to begin.',
  },
  {
    q: 'How does an engagement with Drona Valuechain start?',
    a: 'It starts with a ground study. We look at your current operation — volumes, locations, routes, shift patterns and the actual failure points — and come back with a solution design, a staffing plan and proposed SLAs. Deployment follows in a structured go-live with trained teams and documented SOPs, after which we review performance against the agreed KPIs on a monthly cycle.',
  },
  {
    q: 'When was Drona Valuechain founded?',
    a: `Drona Valuechain Pvt Ltd was founded in ${site.founded}, by a leadership team with more than 20 years of combined experience in Indian logistics operations.`,
  },
];
