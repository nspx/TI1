import React, { useState } from 'react';
import { TESTED_RECIPES } from '../data/consumerData';
import { COOKWARE_PRODUCTS } from '../data/products';
import { RecipeItem, Product, ProductVariant } from '../types';
import { 
  Clock, 
  Users, 
  ChefHat, 
  ArrowRight, 
  UtensilsCrossed,
  Lightbulb
} from 'lucide-react';

interface RecipesAndInspirationProps {
  onQuickViewCookware: (product: Product, variant: ProductVariant) => void;
}

export const RecipesAndInspiration: React.FC<RecipesAndInspirationProps> = ({
  onQuickViewCookware,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem>(TESTED_RECIPES[0]);

  const handleOpenCookware = (cookwareId: string) => {
    const prod = COOKWARE_PRODUCTS.find(p => p.id === cookwareId);
    if (prod) {
      onQuickViewCookware(prod, prod.variants[0]);
    }
  };

  return (
    <section id="recipes" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#001FB5] uppercase tracking-wider mb-1">
              <UtensilsCrossed className="w-3.5 h-3.5" /> Tested in Real Kitchens
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
              Recipes Crafted for Your Cookware
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Experience the difference heavy stainless steel makes. Perfect caramelization, silky gravies, and golden crusts every time.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            5 Chef-Tested Classics
          </div>
        </div>

        {/* Featured Recipe Showcase + Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          
          {/* Main Selected Recipe Card */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-[#050B20] text-white overflow-hidden shadow-xl border border-[#001FB5]/30">
            <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B20] via-[#050B20]/40 to-transparent"></div>
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-[#001FB5] text-white font-bold text-xs shadow-sm">
                  {selectedRecipe.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7D9EFF]" /> {selectedRecipe.cookTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#7D9EFF]" /> {selectedRecipe.servings}
                </span>
                <span className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#7D9EFF]" /> {selectedRecipe.difficulty}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {selectedRecipe.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedRecipe.description}
              </p>

              {/* Chef pro tip */}
              <div className="p-3.5 rounded-2xl bg-[#001FB5]/15 border border-[#001FB5]/30 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-[#608CFF] shrink-0 mt-0.5" />
                <div className="text-xs text-blue-200 leading-relaxed">
                  <strong className="text-white font-semibold block mb-0.5">Chef's Stainless Steel Tip:</strong>
                  {selectedRecipe.proTip}
                </div>
              </div>

              {/* Recommended Cookware Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Recommended: <span className="text-white font-semibold">{selectedRecipe.recommendedCookware}</span>
                </div>

                <button
                  onClick={() => handleOpenCookware(selectedRecipe.cookwareId)}
                  className="px-4 py-2 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#001FB5]/30 cursor-pointer shrink-0"
                >
                  <span>Shop This Cookware</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Switcher List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {TESTED_RECIPES.map((recipe) => {
              const isSelected = selectedRecipe.id === recipe.id;
              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#EEF2FF] border-[#001FB5] shadow-sm ring-1 ring-[#001FB5]/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                      <span className="font-semibold text-[#001FB5] uppercase text-[10px]">
                        {recipe.category}
                      </span>
                      <span>{recipe.cookTime}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate font-serif">
                      {recipe.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      Uses: {recipe.recommendedCookware.split('(')[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
