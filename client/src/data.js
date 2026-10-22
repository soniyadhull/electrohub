// Saari shop details yahin ek jagah par -- badalna aasan hai.
export const SHOP = {
  name: "ElectroHub",
  phone: "8053242544",
  wa: "918053242544",
  address: "Chamela Colony, Narwana, Jind, Haryana",
  hours: "9:00 AM to 9:00 PM",
  map: "https://www.google.com/maps?q=Chamela+Colony,+Narwana,+Jind,+Haryana&output=embed",
};

const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  hero: u("photo-1550009158-9ebf69173e03", 1500),
  store: u("photo-1498049794561-7780e7231661", 1100),
  phone: u("photo-1511707171634-5f897ff02aa9"),
  tv: u("photo-1593784991095-a205069470b6"),
  laptop: u("photo-1517336714731-489689fd1ca8"),
  audio: u("photo-1583394838336-acd977736f90"),
  watch: u("photo-1546868871-7041f2a55e12"),
  gadget: u("photo-1572569511254-d8f925fe2cbb"),
  circuit: u("photo-1518770660439-4636190af475"),
};

export const STATS = [
  { n: 5000, s: "+", label: "Happy Customers" },
  { n: 100, s: "+", label: "Products" },
  { n: 20, s: "+", label: "Top Brands" },
  { n: 5, s: "★", label: "Customer Rating" },
];

export const OFFERS = [
  { icon: "📺", title: "Up to 30% Off", text: "Smart TVs par dhamakedaar Diwali discount, limited stock." },
  { icon: "🔄", title: "Exchange Offer", text: "Purane phone ke badle aaj hi naya phone, extra value ke saath." },
  { icon: "💳", title: "No-Cost EMI", text: "Zero interest EMI, sabhi bade debit/credit cards par." },
];

export const CATEGORIES = [
  { icon: "📱", title: "Mobiles", text: "Latest smartphones, har budget mein", img: IMG.phone },
  { icon: "📺", title: "Smart TVs", text: "4K LED / Smart TV, best price", img: IMG.tv },
  { icon: "💻", title: "Laptops", text: "Study, office aur gaming laptops", img: IMG.laptop },
  { icon: "🎧", title: "Audio", text: "Headphones, speakers, soundbars", img: IMG.audio },
  { icon: "⌚", title: "Smart Watches", text: "Fitness aur style, dono ek mein", img: IMG.watch },
  { icon: "🔌", title: "Accessories", text: "Chargers, cables, covers, power banks", img: IMG.gadget },
];

export const BRANDS = ["Samsung", "LG", "Sony", "boAt", "Apple", "Realme"];

export const FEATURES = [
  { icon: "✅", title: "100% Original", text: "Sirf genuine products, GST bill ke saath" },
  { icon: "🛡️", title: "Warranty", text: "Brand warranty aur after-sales support" },
  { icon: "💳", title: "Easy EMI", text: "Aasan EMI aur exchange offers" },
  { icon: "🚚", title: "Home Delivery", text: "Narwana aur aas-paas ke area mein" },
];

export const REVIEWS = [
  { name: "Rakesh Kumar", place: "Narwana", stars: 5, text: "Sahi daam par original phone mila, bill aur warranty ke saath. Staff bahut helpful hai. Zaroor recommend karunga!" },
  { name: "Sunita Devi", place: "Jind", stars: 5, text: "TV exchange aur no-cost EMI dono aasan the. Delivery ghar tak ho gayi. Bahut acchi service." },
  { name: "Amit Sharma", place: "Narwana", stars: 4, text: "Laptop repair sirf 2 din mein ho gaya aur rate bhi reasonable tha. Bharosemand shop hai." },
];

export const GALLERY = [
  { img: IMG.hero, label: "Electronics", tall: true },
  { img: IMG.phone, label: "Smartphones" },
  { img: IMG.tv, label: "Smart TV" },
  { img: IMG.laptop, label: "Laptops", tall: true },
  { img: IMG.audio, label: "Headphones" },
  { img: IMG.watch, label: "Smart Watches" },
  { img: IMG.circuit, label: "Circuit & Repair", tall: true },
  { img: IMG.gadget, label: "Mobile Accessories" },
];
