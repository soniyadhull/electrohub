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
  { id: "samsung-galaxy-s26-fe", name: "Samsung Galaxy S26 FE", category: "Smartphone", price: 79999, mrp: 109999, image: IMG.phone, desc: "Samsung Galaxy S26 FE brings flagship-level design, a smooth 120Hz display and a versatile triple camera setup at an accessible price. Ideal for daily use, photography and long hours of streaming." },
  { id: "samsung-galaxy-s26", name: "Samsung Galaxy S26", category: "Smartphone", price: 102999, mrp: 117999, image: IMG.phone, desc: "The Samsung Galaxy S26 delivers top-tier performance with a powerful processor, bright AMOLED display and pro-grade cameras. Perfect for power users who want speed, clarity and premium design." },
  { id: "samsung-galaxy-s26-plus", name: "Samsung Galaxy S26+", category: "Smartphone", price: 134999, mrp: 149999, image: IMG.phone, desc: "Samsung Galaxy S26 Plus offers a larger, stunning display, an upgraded camera system and an even bigger battery. Built for those who want a big-screen phone without compromise." },
  { id: "samsung-headphones", name: "Samsung Headphones", category: "Audio", price: 4999, mrp: 6999, image: IMG.audio, desc: "Samsung Headphones deliver clear, balanced sound for music, calls and videos. Comfortable fit and reliable build make them a great everyday companion for work and travel." },
  { id: "samsung-smart-tv", name: "Samsung Smart TV 43\"", category: "Smart TV", price: 32999, mrp: 42999, image: IMG.tv, desc: "Samsung Smart TV 43 inch brings crisp 4K picture, smooth motion and smart apps to your living room. Easy to set up and great for streaming, gaming and sports." },
  { id: "samsung-laptop", name: "Samsung Galaxy Book", category: "Laptop", price: 64999, mrp: 79999, image: IMG.laptop, desc: "Samsung Galaxy Book is a slim, lightweight laptop built for study, office work and everyday browsing. Long battery life and a clean keyboard make it a dependable choice for students and professionals." },
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
  { icon: "📱", title: "Mobiles", text: "Latest smartphones, har budget mein", img: IMG.phone, desc: "Browse the latest smartphones at ElectroHub Narwana. Samsung Galaxy S26 series and other trusted brands with brand warranty, GST bill and no-cost EMI options." },
  { icon: "📺", title: "Smart TVs", text: "4K LED / Smart TV, best price", img: IMG.tv, desc: "Smart TVs for every room and budget. Samsung 43 inch Smart TV with 4K picture, built-in apps and easy remote. Free wall installation in Narwana and nearby areas." },
  { icon: "💻", title: "Laptops", text: "Study, office aur gaming laptops", img: IMG.laptop, desc: "Laptops for study, office and everyday use. Samsung Galaxy Book offers slim design, long battery and reliable performance for students and working professionals." },
  { icon: "🎧", title: "Audio", text: "Headphones, speakers, soundbars", img: IMG.audio, desc: "Audio gear for music, calls and home entertainment. Samsung headphones and audio accessories with clear sound and comfortable fit, available at Narwana." },
  { icon: "⌚", title: "Smart Watches", text: "Fitness aur style, dono ek mein", img: IMG.watch, desc: "Smart watches that track fitness, heart rate and notifications while adding style to your wrist. Compatible with Android and iPhone." },
  { icon: "🔌", title: "Accessories", text: "Chargers, cables, covers, power banks", img: IMG.gadget, desc: "Genuine chargers, cables, covers, power banks and other mobile accessories. Everything you need to keep your devices powered and protected." },
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
