/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Gift, Ticket, X, Sparkles } from "lucide-react";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-xl">
            <Gift className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Gift Cards & Coupons
            </h3>
            <p className="text-sm text-slate-600">
              Apply your discount codes here
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label
              htmlFor="voucher"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Do you have a voucher or gift card?
            </label>
            <div className="relative">
              <input
                type="text"
                id="voucher"
                className="block w-full rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm
                p-4 text-slate-800 placeholder-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100
                transition-all duration-300 pr-12"
                placeholder="Enter your code here..."
                value={userInputCode}
                onChange={(e) => setUserInputCode(e.target.value)}
                required
              />
              <Ticket className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <motion.button
            type="button"
            className="relative overflow-hidden w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-emerald-200 transition-all duration-300 group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApplyCoupon}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Apply Code</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </motion.button>
        </div>

        {isCouponApplied && coupon && (
          <motion.div
            className="bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-xl p-4 space-y-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-emerald-200 rounded-lg">
                  <Ticket className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">
                    Applied Coupon
                  </h4>
                  <p className="text-sm text-emerald-600">
                    {coupon.code} • {coupon.discountPercentage}% off
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              type="button"
              className="relative overflow-hidden w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-red-200 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRemoveCoupon}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Remove Coupon</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </motion.button>
          </motion.div>
        )}

        {coupon && (
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1 bg-blue-200 rounded-lg">
                <Gift className="w-4 h-4 text-blue-700" />
              </div>
              <h4 className="font-semibold text-blue-800">Available Coupon</h4>
            </div>
            <p className="text-sm text-blue-600 bg-blue-100 px-3 py-2 rounded-lg font-mono">
              {coupon.code} • {coupon.discountPercentage}% discount
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GiftCouponCard;
