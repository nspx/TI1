export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'AED' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstUSD: number; // 1 USD = rate
  label: string;
}

export type CookwareCategory =
  | 'all'
  | 'tri-ply'
  | 'pressure-cookers'
  | 'kadhais-woks'
  | 'frypans'
  | 'saucepans'
  | 'casseroles-stockpots'
  | 'tawas-griddles'
  | 'steamers-cookers'
  | 'cookware-sets';

export interface ProductVariant {
  id: string;
  sizeLabel: string; // e.g. "24 cm / 2.8 Litres"
  diameterCm: number;
  capacityLitres: number;
  baseThicknessMm: number;
  retailPriceUSD: number;
  originalMrpUSD?: number;
  wholesaleTiers?: {
    minQty: number;
    priceUSD: number;
  }[];
  masterCartonUnits?: number;
  cartonCbm?: number;
  cartonWeightKg?: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  series: 'Platinum Tri-Ply' | 'Artisan SAS Bottom' | 'Imperial Pressure Cookers' | 'Signature Banquet Sets' | 'MasterChef Heritage';
  category: CookwareCategory;
  tagline: string;
  description: string;
  material: string; // e.g., "Food-grade AISI 304 Stainless Steel + Heavy Aluminum Core + Magnetic AISI 430 Base"
  gauge: string; // e.g., "2.6 mm Heavy Tri-Ply"
  finish: string; // "High Polish Mirror Interior, Brushed Satin Exterior"
  lidType: string;
  handleType: string;
  heatCompatibility: string[]; // ['Induction', 'Gas Stove', 'Ceramic', 'Halogen', 'Oven Safe to 260°C']
  certifications: string[]; // ['ISO 9001:2015', 'ISI Certified', 'FDA / LFGB Food Contact Safe']
  warrantyYears: number;
  isBestSeller?: boolean;
  isExportPriority?: boolean;
  rating: number;
  reviewCount: number;
  idealForDishes: string[];
  inStock: boolean;
  image: string;
  gallery: string[];
  moqUnits?: number;
  leadTimeDays?: number;
  variants: ProductVariant[];
  keyHighlights: string[];
  careTips?: string[];
  boxContents?: string[];
  hsCode?: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  image: string;
  unitPriceUSD: number;
  originalMrpUSD?: number;
  quantity: number;
  sku: string;
  mode?: 'sample' | 'wholesale';
  cartonCbm?: number;
  cartonWeightKg?: number;
  masterCartonUnits?: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  productName: string;
  dishCooked?: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  category: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Chef';
  recommendedCookware: string;
  cookwareId: string;
  description: string;
  proTip: string;
  image: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  items: CartItem[];
  subtotalUSD: number;
  discountUSD: number;
  shippingUSD: number;
  totalUSD: number;
  orderDate: string;
}

export interface WholesaleInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  destinationPort: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'EXW' | 'DDP';
  targetVolume: 'Sample / Trial LCL' | '20ft FCL Container' | '40ft HQ FCL Container' | 'Multi-Container Monthly Contract';
  customBrandingOEM: boolean;
  brandNameText?: string;
  packagingPreference: 'Export Master Carton' | 'Color Luxury Gift Box + Master Carton' | 'Shrink Wrapped Retail Pallet';
  notes: string;
  items: {
    productId: string;
    productName: string;
    variantLabel: string;
    quantity: number;
    estimatedUnitPriceUSD: number;
  }[];
  status: 'Received' | 'Quotation Sent' | 'Under Review' | 'Sample Dispatched';
  createdAt: string;
  estimatedTotalUSD: number;
}

export interface DistributorAccount {
  id: string;
  companyName: string;
  representativeName: string;
  email: string;
  country: string;
  region: 'Middle East' | 'Europe' | 'North America' | 'South Asia' | 'Africa' | 'Domestic (India)';
  primaryPort: string;
  partnerTier: 'Gold Global Distributor' | 'Platinum Preferred Partner' | 'Enterprise Trade Partner';
  discountRate: number;
  creditLimitUSD: number;
  activeShipmentsCount: number;
  token: string;
}

export interface ShipmentTracking {
  id: string;
  blNumber: string;
  containerNumber: string;
  originPort: string;
  destinationPort: string;
  vesselName: string;
  bookingRef: string;
  departureDate: string;
  estimatedArrival: string;
  status: 'Booked' | 'Loaded at JNPT' | 'At Sea' | 'Customs Cleared' | 'Port Delivered';
  progressPercent: number;
  contentsSummary: string;
  cartonCount: number;
  grossWeightKg: number;
  cbm: number;
}
