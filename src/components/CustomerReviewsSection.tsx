import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/consumerData';
import { CustomerReview } from '../types';
import { 
  Star, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  X,
  Utensils
} from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'Japan',
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Exceptional Quality Stainless Steel',
      comment: newComment,
      verifiedBuyer: true,
      productName: 'Taarini Cookware',
      dishCooked: newDish || 'Daily Cooking',
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsWriteModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewTitle('');
      setNewComment('');
      setNewDish('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#001FB5] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#001FB5]" /> Real Kitchen Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
              Loved by Over 12,000 Home Chefs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              See how everyday cooks are upgrading to chemical-free Tri-Ply cookware across global kitchens.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Overall Score Badge */}
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-3xl font-black text-[#001FB5] font-mono">4.9</div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Based on 1,280+ Reviews
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold shadow-md shadow-[#001FB5]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#7D9EFF]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="text-sm font-bold text-slate-900 font-serif leading-snug">
                  "{rev.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>

                {/* Dish Cooked badge */}
                {rev.dishCooked && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF2FF] border border-[#C7D7FE] text-[#001FB5] text-[11px] font-semibold">
                    <Utensils className="w-3 h-3 text-[#001FB5]" />
                    <span>Cooked: {rev.dishCooked}</span>
                  </div>
                )}
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center text-[10px] text-emerald-600 font-semibold gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.location}</span>
                </div>

                <div className="text-[10px] text-slate-400 max-w-[120px] text-right truncate">
                  {rev.productName}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-serif">Share Your Kitchen Experience</h3>
              <p className="text-xs text-slate-500 mt-1">
                Help fellow home chefs learn how Taarini cookware performs in daily cooking.
              </p>
            </div>

            {submittedMessage ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Thank you for your review!</h4>
                <p className="text-xs text-slate-500">Your review has been added to the community.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer p-1"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">{newRating} of 5 Stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Meera S."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / Country</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Tokyo, Japan"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dish You Cooked Most</label>
                  <input
                    type="text"
                    value={newDish}
                    onChange={(e) => setNewDish(e.target.value)}
                    placeholder="e.g. Butter Chicken, Masala Dosa, Chai, Stir Fry"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Cooks evenly with zero burning!"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Detailed Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="How does the heat retention feel? Was it easy to clean? How did your food taste?"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold transition-all shadow-md shadow-[#001FB5]/20 cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
