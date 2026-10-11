// Single source of truth for SEO metadata, structured data and llms.txt.
// The visible page content lives in site/*.html. Keep facts here in line with
// the content rules in CLAUDE.md (no invented figures, no client names).

export const site = {
  name: 'Drona Valuechain',
  legalName: 'Drona Valuechain Pvt. Ltd.',
  url: 'https://dronavaluechain.com',
  description:
    "Drona Valuechain is a Gurugram-based integrated logistics company that builds warehousing and logistics clusters for India's OEMs and their supplier networks, run on its own plant-to-market technology, IPMS.",
  email: 'info@dronavaluechain.com',
  phone: '+91 92892 36626',
  cin: 'U52109DL2023PTC417213',
  foundingDate: '2023',
  address: { street: 'Pioneer Urban Square', locality: 'Gurugram', region: 'Haryana', postalCode: '122098' },
  // Approximate location of Pioneer Urban Square. Confirm against Google Maps.
  geo: { lat: 28.4116, lng: 77.0931 },
  founders: [
    { name: 'Aditya Tripathi', role: 'Sales & Operation' },
    { name: 'Rintu Mondal', role: 'Tech & Innovation' },
  ],
  knowsAbout: [
    'Integrated logistics', 'OEM logistics', 'Automotive logistics', 'Warehousing', 'In-plant logistics',
    'Inbound logistics', 'Milk run logistics', 'JIT / JIS line feeding', 'Kitting and sequencing',
    'Transportation', 'Third-party logistics (3PL)', 'Fourth-party logistics (4PL)', 'Aftermarket logistics',
    'Reverse logistics', 'Cold chain', 'Quick commerce fulfilment', 'Warehouse management system (WMS)',
    'Transport management system (TMS)', 'Supply chain control tower',
  ],
  // Add the real LinkedIn company URL here (and in the footer) once it exists.
  sameAs: [],
  indexNowKey: '7f3c9a2e5d8b4f61a0c4e2b9d7a15e38',
};

const services = [
  { name: 'Integrated warehousing', path: '/services/warehousing/', description: 'Mother, regional, base and micro-warehouses, all leased, with inventory management and value-added services for OEMs.' },
  { name: 'In-plant logistics', path: '/services/in-plant-logistics/', description: 'Managed plant stores, material handling, line feeding, kitting and sequencing, and yard and dock management inside OEM plants.' },
  { name: 'Transportation', path: '/services/transportation/', description: 'Supplier milk runs, line haul between clusters, JIT / JIS delivery to the line, FTL / PTL and secondary distribution.' },
  { name: 'Third-party logistics (3PL)', path: '/services/3pl/', description: 'Warehousing and transportation under one contract, with agreed service levels.' },
  { name: 'Fourth-party logistics (4PL)', path: '/services/4pl/', description: 'Orchestration of the entire logistics network, including other vendors, through a single control tower.' },
  { name: 'Aftermarket and reverse logistics', path: '/services/aftermarket-logistics/', description: 'Spares warehousing, spares milk runs, returns and reverse logistics, and returnable packaging.' },
];

// path: clean URL the page is served at. priority feeds sitemap.xml.
// Titles stay under ~60 characters, descriptions under ~160.
export const pages = [
  {
    file: 'index.html', path: '/', name: 'Home', priority: '1.0', changefreq: 'weekly',
    title: 'Drona Valuechain | Integrated Logistics for OEMs in India',
    description: "Integrated warehousing, in-plant logistics, transportation, 3PL and 4PL for India's OEMs and their supplier networks, run on our own IPMS technology.",
    image: '/assets/img/hero-cluster-overview.webp',
    services,
  },
  {
    file: 'about.html', path: '/about/', name: 'About', priority: '0.8', schemaType: 'AboutPage',
    title: 'About Drona Valuechain | OEM Logistics Company, Gurugram',
    description: 'Drona Valuechain Pvt. Ltd. is a Gurugram-based integrated logistics company for OEMs and their supplier networks. Vision, leadership and how we engage.',
    image: '/assets/img/hero-cluster-overview.webp',
  },
  {
    file: 'services.html', path: '/services/', name: 'Services', priority: '0.9', schemaType: 'CollectionPage',
    title: 'Logistics Services: Warehousing, 3PL, 4PL | Drona Valuechain',
    description: 'Integrated warehousing, in-plant logistics, transportation, 3PL, 4PL and aftermarket logistics across the OEM value chain, from supplier to plant to market.',
    image: '/assets/img/cluster-network.webp',
    services,
  },
  {
    file: 'warehousing.html', path: '/services/warehousing/', name: 'Integrated warehousing', priority: '0.8',
    parents: [{ name: 'Services', path: '/services/' }],
    title: 'Integrated Warehousing for OEMs in India | Drona Valuechain',
    description: 'Mother, regional, base and micro-warehouses, all leased, with inventory management and value-added services, run on our own WMS.',
    image: '/assets/img/warehouse.webp',
    services: [services[0]],
  },
  ...[
    ['in-plant-logistics.html', 1, 'In-plant logistics', 'In-Plant Logistics, JIT / JIS Line Feeding | Drona Valuechain',
      'Managed plant stores, material handling, JIT / JIS line feeding, kitting and sequencing, and yard and dock management inside OEM plants.', '/assets/img/inplant-logistics.webp'],
    ['transportation.html', 2, 'Transportation', 'Milk Run, Line Haul and JIT Transport | Drona Valuechain',
      'Supplier milk runs, line haul between clusters, JIT / JIS delivery to the line, FTL / PTL, secondary distribution and last mile, planned on our TMS.', '/assets/img/hero-cluster-overview.webp'],
    ['3pl.html', 3, '3PL', '3PL Logistics Services for OEMs in India | Drona Valuechain',
      'Third-party logistics (3PL): warehousing and transportation executed under one contract, with agreed service levels and shared dashboards.', '/assets/img/warehouse.webp'],
    ['4pl.html', 4, '4PL orchestration', '4PL Logistics and Control Tower | Drona Valuechain',
      'Fourth-party logistics (4PL): your entire logistics network, including other vendors, orchestrated through a single control tower.', '/assets/img/ipms-technology.webp'],
    ['aftermarket-logistics.html', 5, 'Aftermarket and reverse', 'Aftermarket, Spares and Reverse Logistics | Drona Valuechain',
      'Spares warehousing, spares milk runs to dealers, returns and reverse logistics, and tracked returnable bins, crates and pallets.', '/assets/img/warehouse.webp'],
  ].map(([file, i, name, title, description, image]) => ({
    file, name, title, description, image, priority: '0.8',
    path: `/services/${file.replace('.html', '')}/`,
    parents: [{ name: 'Services', path: '/services/' }],
    services: [services[i]],
  })),
  {
    file: 'industries.html', path: '/industries/', name: 'Industries', priority: '0.8',
    title: 'Industries: Automotive, Electronics, D2C | Drona Valuechain',
    description: 'Logistics for automotive and auto components, consumer durables, electronics, and quick commerce / D2C, with launch corridors and a 2026–2031 roadmap.',
    image: '/assets/img/inplant-logistics.webp',
  },
  {
    file: 'technology.html', path: '/technology/', name: 'Technology', priority: '0.8',
    title: 'IPMS Logistics Technology: WMS, TMS, EMS | Drona Valuechain',
    description: 'IPMS, our Integrated Plant Management System, connects with your ERP and runs on our own TMS, WMS, EMS and HRMS for one view of every movement.',
    image: '/assets/img/ipms-technology.webp',
  },
  {
    file: 'contact.html', path: '/contact/', name: 'Contact', priority: '0.7', schemaType: 'ContactPage',
    title: 'Contact Drona Valuechain | Gurugram Logistics Partner',
    description: 'Talk to Drona Valuechain in Gurugram: a discovery call, a site visit and a pilot proposal for one lane or site. info@dronavaluechain.com, +91 92892 36626.',
  },
];

// FAQPage schema is emitted only where these questions are visible on the page.
const common = [
  ['What does Drona Valuechain do?', "We build integrated warehousing and logistics clusters for India's OEMs and their supplier networks, and run warehousing, transportation, 3PL and 4PL for them on our own technology."],
  ['Where are you based?', 'Our office is at Pioneer Urban Square, Gurugram, Haryana. Operations begin in November 2026 in our launch corridor.'],
  ['Which sectors do you focus on?', 'Automotive and auto components, consumer durables, electronics, and quick commerce / D2C.'],
  ['What is the difference between 3PL and 4PL?', 'In 3PL we execute your warehousing and transportation under one contract. In 4PL we orchestrate your entire logistics network, including other vendors, through a single control tower.'],
  ['Can we start with just one service?', 'Yes. Clients usually start with one lane, site or service as a pilot, then add more as the service proves itself.'],
  ['How does an engagement start?', 'With a discovery call and a site visit to walk through your current flows. We then design the network, process and service levels, and propose a pilot.'],
];
export const faqs = { 'index.html': common, 'contact.html': common };
