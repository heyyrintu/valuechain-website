// ── Single source of truth for site-wide details ──
// Update these values once your final contact details are confirmed.

export const site = {
  name: 'Drona Valuechain Pvt Ltd',
  shortName: 'Drona Valuechain',
  tagline: 'Empowering People',
  mission:
    'To empower people and move businesses forward — uniting every link of the supply chain under one accountable, technology-driven partner.',
  description:
    'Drona Valuechain Pvt Ltd is a trusted partner for end-to-end supply chain solutions — in-plant services, warehousing, inventory management, packaging and last-mile delivery, seamlessly integrated under one roof.',
  url: 'https://www.dronavaluechain.com', // TODO: confirm final domain
  email: 'info@dronavaluechain.com', // TODO: confirm
  phone: '+91 0000000000', // TODO: confirm
  address: {
    line1: 'Gurugram, Haryana', // TODO: full street address
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
  },
  linkedin: 'https://www.linkedin.com/company/dronavaluechian',
  x: 'https://x.com/DronaValuchain',
  instagram: 'https://www.instagram.com/dronavaluechain/',
  founded: 2023,
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Clients', href: '/clients/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

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
  },
];

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
  },
];

export const stats = [
  { value: '20+', label: 'Years of leadership experience' },
  { value: 'Pan-India', label: 'Delivery network' },
  { value: '100+', label: 'Team members' },
  { value: '24/7', label: 'Operations support' },
];
