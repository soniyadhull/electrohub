// Saari shop details yahin ek jagah par -- badalna aasan hai.
export const SHOP = {
  name: "ElectroHub",
  phone: "8053242544",
  wa: "918053242544",
  address: "Chamela Colony, Narwana, Jind, Haryana",
  hours: "9:00 AM to 9:00 PM",
  map: "https://www.google.com/maps?q=Chamela+Colony,+Narwana,+Jind,+Haryana&output=embed",
};

export const WHATSAPP_MESSAGE = "नमस्ते! Product details बताएं।\nHi! Please share product details.";

const u = (name) => `/images/${name}.webp`;

export const IMG = {
  hero: u("hero"),
  store: u("store"),
  phone: u("phone"),
  tv: "/images/tv-product.svg",
  laptop: u("laptop"),
  audio: u("audio"),
  watch: u("watch"),
  gadget: u("gadget"),
  circuit: u("circuit"),
};

export const PRODUCTS_PRICE_CHECKED = "29 Oct 2026";
export const PRODUCTS_SOURCE = "https://www.samsung.com/in/smartphones/galaxy-s26/buy/";
export const PRODUCTS = [
  { id: "samsung-galaxy-s26-fe", name: "Samsung Galaxy S26 FE", category: "Smartphone", price: 79999, mrp: 109999, image: IMG.phone },
  { id: "samsung-galaxy-s26", name: "Samsung Galaxy S26", category: "Smartphone", price: 102999, mrp: 117999, image: IMG.phone },
  { id: "samsung-galaxy-s26-plus", name: "Samsung Galaxy S26+", category: "Smartphone", price: 134999, mrp: 149999, image: IMG.phone },
  { id: "samsung-headphones", name: "Samsung Headphones", category: "Audio", price: 4999, mrp: 6999, image: IMG.audio },
  { id: "samsung-smart-tv", name: "Samsung Smart TV 43\"", category: "Smart TV", price: 32999, mrp: 42999, image: IMG.tv },
  { id: "samsung-laptop", name: "Samsung Galaxy Book", category: "Laptop", price: 64999, mrp: 79999, image: IMG.laptop },
];

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
