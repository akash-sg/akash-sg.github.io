// Edit this file to update the site. No other file needs to change.
// New project: copy one line in "projects", change the words, put the image in /images.
// No image yet? Leave image as "" and a coloured tile is shown instead.
const DATA = {
  site: {
    name: "Akash",
    headline: "Made from scratch.",
    subline: "Brand, web and video for businesses and people. Never templated.",
    whatsapp: "918762290104",   // number with country code
    instagram: "https://instagram.com/akash_sg",
    linkedin: "",   // full link
    formEmail: "akash.s.gangolli@gmail.com"   // enquiries are sent here
  },
  // Selected work shows these categories. Each project has cat: one of these ids.
  categories: [
    { id: "web",   name: "Websites & apps",       line: "Sites and tools that bring in customers.", tint: "#4FA9FF", dark: false },
    { id: "brand", name: "Logos & branding",      line: "Marks that make a business look like itself.", tint: "#0B1B33", dark: true },
    { id: "print", name: "Invitations & posters", line: "Designed from scratch, never from a template.", tint: "#F3EDE6", dark: false },
    { id: "media", name: "Photo & video",         line: "Shoots, reels and logo animations.", tint: "#DCE9F7", dark: false }
  ],
  // Each project opens its own case view when clicked.
  // id: short name used in the link (#nyra). about: 1-2 sentences. gallery: extra images. video: optional .mp4.
  projects: [
    { id: "ranks", cat: "web", title: "RANKS Institute", type: "Web", line: "Course website with pricing and WhatsApp enquiry", shot: true, image: "images/ranks.jpg", tint: "#DCEBFF", link: "https://www.ranksinstitute.in/",
      about: "A full website for a computer training institute in Hosanagara: 12 courses with prices, student reviews, FAQ and a WhatsApp enquiry form.", gallery: ["images/ranks.jpg"] },
    { id: "gmap", cat: "web", title: "Gmap AI Reviews", type: "App", line: "AI tool that turns happy customers into Google reviews", shot: true, image: "images/gmap.jpg", tint: "#202124", link: "https://gmap-ai-review.vercel.app",
      about: "My own product. A QR code on the counter, a few taps from the customer, and AI writes a review in their words, ready to post on Google Maps. Each business gets its own questions and tone.", gallery: ["images/gmap.jpg", "images/gmap-2.jpg"] },
    { id: "finewines", cat: "web", title: "Fine Wines", type: "Web", line: "Online store with cart and product listings", shot: true, image: "images/finewines.jpg", tint: "#1B1414", link: "https://finewinesonline.in",
      about: "An online store with product listings, prices and a cart. The same client came back for a second store, Clean Eats.", gallery: ["images/finewines.jpg", "images/finewines-full.jpg"] },
    { id: "arv", cat: "web", title: "ARV Equipments", type: "Web", line: "Website for a bakery and kitchen equipment maker", shot: true, image: "images/arv.jpg", tint: "#0B1B33", link: "https://arvequipments.com",
      about: "A website for a Shivamogga manufacturer and importer of bakery and kitchen equipment: product categories from rotary ovens to mixers, the industries they serve, Google reviews and a WhatsApp button for enquiries.", gallery: ["images/arv.jpg", "images/arv-full.jpg"] },
    { id: "freelance", cat: "web", title: "Freelance Manager", type: "App", line: "Role-based platform for tasks, approvals and payments", shot: true, image: "images/freelance.jpg", tint: "#15141B", link: "https://akash-sg.github.io/freelance-management-platform/",
      about: "A platform where clients post tasks, freelancers deliver and admins handle assignments, approvals, payments and notifications, each with their own dashboard. Try the demo login on the live site.", gallery: ["images/freelance.jpg"] },
    { id: "realestate", cat: "web", title: "Real Estate", type: "Web", line: "Landing page for a construction and real estate firm", shot: true, image: "images/realestate.jpg", tint: "#141414", link: "https://akash-sg.github.io/real-estate-website/",
      about: "A responsive landing page for a builder: services from construction to Vastu consultation, a project gallery, and a quote request. Built as a ready-to-launch design.", gallery: ["images/realestate.jpg", "images/realestate-full.jpg"] },
    { id: "cleaneats", cat: "web", title: "Clean Eats", type: "Web", line: "Online store for healthy snacks", shot: true, image: "images/cleaneats.jpg", tint: "#FFF6E6", link: "https://cleaneats.in/", wip: true,
      about: "An online store for a Shimoga healthy snacks brand: laddoos, honey, cookies and oils, with cart, product options and a WhatsApp button. A second store for the Fine Wines client. Being built now.", gallery: ["images/cleaneats.jpg", "images/cleaneats-full.jpg"] },
    { id: "hms", cat: "web", title: "Ganeshotsava Hosanagara", type: "Web", line: "Kannada festival website with events and countdown", shot: true, image: "images/hms.jpg", tint: "#4A1616", link: "https://hms-hosanagara-site.vercel.app/", wip: true,
      about: "A Kannada website for the Hindu Mahasabha Hosanagara unit and its public Ganeshotsava: a live countdown, the full programme of pujas, cultural events and competitions, and a photo gallery. Being built now.", gallery: ["images/hms.jpg", "images/hms-full.jpg"] },
    { id: "vasudha", cat: "web", title: "Vasudha Organic Mart", type: "Web", line: "Website for an organic products store", shot: true, image: "images/vasudha.jpg", tint: "#E4EFD9", link: "https://akash-sg.github.io/vasudha-website/", wip: true,
      about: "A website for an organic store selling spices, oils and traditional foods sourced from farmers, with a product range and one-tap call. Being built now.", gallery: ["images/vasudha.jpg", "images/vasudha-full.jpg"] },
    { id: "gaav", cat: "print", title: "Gaav Naturals", type: "Brand", line: "Banner design in Kannada and English", image: "images/gaav.jpg", tint: "#F6E7B4", link: "", fit: "contain",
      about: "A shop banner for an organic honey and naturals brand, written in Kannada and English.", gallery: ["images/gaav.jpg"] },
    { id: "picklo", cat: "web", title: "Picklo Shimoga", type: "Brand", line: "Logo and booking website", shot: true, image: "images/picklo-site.jpg", tint: "#111111", link: "https://playpicklo.infinityfreeapp.com/", wip: true,
      about: "Logo, brand and a booking website for Shimoga's pickleball club. Online payments weren't ready, so bookings work through call and WhatsApp with pay-at-venue.", gallery: ["images/picklo-site.jpg", "images/picklo.jpg"] },
    { id: "nyra", cat: "brand", title: "NYRA Estates", type: "Brand", line: "Brand identity and logo animation", image: "images/nyra.jpg", tint: "#DCE9F7", link: "",
      about: "Logo, business cards and a logo reveal animation for a real estate company. Built for generations.", gallery: ["images/nyra-card.jpg"], video: "images/nyra-reveal.mp4" },
    { id: "newborn", cat: "media", title: "Newborn series", type: "Content", line: "Newborn photography", image: "images/newborn.jpg", tint: "#DCE9F7", link: "",
      about: "A soft-light newborn shoot. Shot, edited and colour-graded by me.", gallery: ["images/newborn-2.jpg", "images/newborn-3.jpg", "images/newborn-4.jpg"] },
    { id: "invitations", cat: "print", title: "Wedding invitations", type: "Brand", line: "Five invitations, five different looks", image: "images/inv-dr.jpg", tint: "#F3EDE6", link: "",
      about: "Wedding and engagement invitations, each designed from scratch around the couple: floral watercolour, blue marble, arches and boho wreaths.", gallery: ["images/inv-drushti.jpg", "images/inv-yd.jpg", "images/invite.jpg", "images/inv-pd.jpg"] },
    { id: "tbc", cat: "brand", title: "The Barbel Culture", type: "Brand", line: "Gym logo", image: "images/tbc.jpg", tint: "#FFFFFF", link: "", fit: "contain",
      about: "A bold logo for a gym. Strong shapes that still read clearly on a T-shirt or a signboard.", gallery: ["images/tbc.jpg"] },
    { id: "xpulse", cat: "media", title: "Xpulse ride reel", type: "Content", line: "Shot and edited bike reel", image: "images/xpulse.jpg", tint: "#1E2A1E", link: "",
      about: "An adventure-bike reel shot in natural light and edited to the beat.", gallery: [], video: "images/xpulse.mp4" },
    { id: "melb", cat: "brand", title: "MELB Designs", type: "Brand", line: "Logo and business cards", image: "images/melb.jpg", tint: "#FFFFFF", link: "", fit: "contain",
      about: "Logo and business cards for an interior design studio.", gallery: ["images/melb-card.jpg"] },
    { id: "aarav", cat: "media", title: "First birthday shoot", type: "Content", line: "Kids photography", image: "images/aarav-1.jpg", tint: "#F3E6E0", link: "",
      about: "A first-birthday and cake-smash photoshoot. Warm light, real moments.", gallery: ["images/aarav-2.jpg", "images/aarav-3.jpg"] },
    { id: "jsk", cat: "brand", title: "Jai Shree Krushna", type: "Brand", line: "Restaurant logo", image: "images/jsk.jpg", tint: "#FFFFFF", link: "", fit: "contain",
      about: "A friendly logo for a pure-veg restaurant.", gallery: ["images/jsk.jpg"] },
    { id: "bigwayz", cat: "media", title: "Bigwayz", type: "Content", line: "Logo reveal animation", image: "images/bigwayz.jpg", tint: "#F2F4F7", link: "", fit: "contain",
      about: "A short logo reveal animation, made for social media and video intros.", gallery: [], video: "images/bigwayz.mp4" }
  ],
  // The hero shows 3 of these at random on every page load.
  heroImages: ["images/nyra.jpg", "images/picklo.jpg", "images/tbc.jpg", "images/melb.jpg", "images/jsk.jpg", "images/bigwayz.jpg"],  // logos only
  // How it works. Keep each line short.
  steps: [
    { name: "Enquire", line: "Fill the form. Two minutes." },
    { name: "Quote",   line: "A fixed price in 1-2 days." },
    { name: "Build",   line: "You approve each stage." },
    { name: "Deliver", line: "Ready to launch. Yours to keep." }
  ],
  services: [
    { name: "Brand",   line: "Logos, colours and posters that look like you." },
    { name: "Web",     line: "Websites and small apps built around how your business really works." },
    { name: "Content", line: "Videos, reels and photos that make people stop scrolling." }
  ],
  packages: [
    { name: "Brand Starter", from: 5000,  items: ["Logo", "Colours and fonts", "2 social posters"] },
    { name: "Website",       from: 12000, items: ["1-5 pages", "Enquiry form", "Mobile-ready"] },
    { name: "Full Identity", from: 25000, items: ["Brand Starter", "Website", "Short logo animation"] }
  ],
  packageNote: "Starting prices. Your final quote depends on what you need. 50% to start, 2 rounds of changes included.",
  // Placeholders are hidden on the site. Replace with real quotes and set placeholder: false.
  testimonials: [
    { quote: "We needed a site that actually explained our courses and pricing, not just a contact page. Akash built exactly that.", who: "RANKS Institute", placeholder: true },
    { quote: "He didn't just give us a template. He asked how our store actually works before building anything.", who: "Fine Wines / Clean Eats", placeholder: true },
    { quote: "Simple to work with over WhatsApp, and he kept us updated at every step.", who: "Vasudha Organic Mart", placeholder: true },
    { quote: "He built our booking page around a real problem we had instead of stalling the whole project on it.", who: "Picklo Shimoga", placeholder: true }
  ]
};
