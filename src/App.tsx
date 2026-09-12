/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CurrencyCode, 
  CartItem, 
  Product, 
  ProductVariant 
} from './types';
import { COOKWARE_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CookwareFinder } from './components/CookwareFinder';
import { ProductCatalog } from './components/ProductCatalog';
import { CareAndSeasoningGuide } from './components/CareAndSeasoningGuide';
import { TechnologyExplainer } from './components/TechnologyExplainer';
import { RecipesAndInspiration } from './components/RecipesAndInspiration';
import { AboutUsSection } from './components/AboutUsSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartAndCheckoutDrawer } from './components/CartAndCheckoutDrawer';
import { CorporateGiftingModal } from './components/CorporateGiftingModal';
import { Footer } from './components/Footer';

export default function App() {
  // Global Currency State (Defaults to USD, supports INR, EUR, AED, GBP)
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');

  // Active Navigation Section
  const [activeSection, setActiveSection] = useState<string>('catalog');

  // Wishlist State (persisted)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('taarini_wishlist');
      return saved ? JSON.parse(saved) : ['tp-kadhai-deluxe', 'tp-tawa-dosa'];
    } catch {
      return ['tp-kadhai-deluxe', 'tp-tawa-dosa'];
    }
  });

  // Shopping Bag Items (persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('taarini_consumer_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Storage read error', e);
    }
    // Default initial cart item for a consumer
    return [
      {
        productId: 'tp-kadhai-deluxe',
        variantId: 'tp-kadhai-24',
        productName: 'Taarini Platinum Tri-Ply Deep Kadhai with Lid',
        variantLabel: '24 cm (2.8 Litres / 3-4 Persons)',
        image: '/images/triply-kadai.jpg',
        unitPriceUSD: 42.0,
        quantity: 1,
        mode: 'sample',
        sku: 'TI-TP-KDH-24',
      }
    ];
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGiftingModalOpen, setIsGiftingModalOpen] = useState(false);

  // Product Spec Quick-View Modal
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [detailVariant, setDetailVariant] = useState<ProductVariant | null>(null);

  // Persist cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('taarini_consumer_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Cart storage sync error', e);
    }
  }, [cartItems]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('taarini_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Wishlist storage sync error', e);
    }
  }, [wishlist]);

  // Toggle wishlist item
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === product.id && i.variantId === variant.id
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            variantId: variant.id,
            productName: product.name,
            variantLabel: variant.sizeLabel,
            image: product.image,
            unitPriceUSD: variant.retailPriceUSD,
            quantity,
            mode: 'sample',
            sku: variant.sku,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  // Buy Now handler (adds item and opens drawer directly)
  const handleBuyNow = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1
  ) => {
    handleAddToCart(product, variant, quantity);
    if (detailProduct) {
      setDetailProduct(null);
      setDetailVariant(null);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleQuickView = (product: Product, variant: ProductVariant) => {
    setDetailProduct(product);
    setDetailVariant(variant);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPanFinder = () => {
    const el = document.getElementById('pan-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#001FB5] selection:text-white font-sans">
      
      {/* Consumer-Focused Top Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCartDrawer={() => setIsCartOpen(true)}
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenGiftingModal={() => setIsGiftingModalOpen(true)}
        onOpenPanFinder={handleScrollToPanFinder}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenPanFinder={handleScrollToPanFinder}
          onScrollToCareGuide={() => handleNavigate('care-guide')}
        />

        {/* Interactive Cookware / Pan Finder Quiz */}
        <CookwareFinder
          currentCurrency={currentCurrency}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />

        {/* Cookware Catalog & Product Cards */}
        <ProductCatalog
          currentCurrency={currentCurrency}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
          onOpenPanFinder={handleScrollToPanFinder}
        />

        {/* Masterclass: Leidenfrost Water Droplet & Seasoning Guide */}
        <CareAndSeasoningGuide />

        {/* Metallurgical Science: Why Tri-Ply beats peeling non-stick */}
        <TechnologyExplainer />

        {/* Tested Home Recipes paired with specific cookware */}
        <RecipesAndInspiration
          onQuickViewCookware={handleQuickView}
        />

        {/* About Us: Founded in 2020 in Noida, Online & Offline Distribution, Quality & Recipe Community */}
        <AboutUsSection
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenGiftingModal={() => setIsGiftingModalOpen(true)}
        />

        {/* Verified Customer Reviews & Community Feedback */}
        <CustomerReviewsSection />
      </main>

      {/* Product Quick-View Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          initialVariant={detailVariant}
          currentCurrency={currentCurrency}
          isWishlisted={wishlist.includes(detailProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onClose={() => {
            setDetailProduct(null);
            setDetailVariant(null);
          }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Consumer Shopping Bag & Checkout Drawer */}
      <CartAndCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currentCurrency={currentCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Corporate & Wedding Gifting Inquiry Modal */}
      <CorporateGiftingModal
        isOpen={isGiftingModalOpen}
        onClose={() => setIsGiftingModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGiftingModal={() => setIsGiftingModalOpen(true)}
        onOpenPanFinder={handleScrollToPanFinder}
      />

    </div>
  );
}
