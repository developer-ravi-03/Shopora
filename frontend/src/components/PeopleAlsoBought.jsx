/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { Users, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(
          error.response.data.message ||
            "An error occurred while fetching recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      className="mt-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 rounded-2xl -z-10"></div>

      {/* Header Section */}
      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-2xl">
            <Users className="w-7 h-7 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              People Also Bought
            </h3>
            <p className="text-slate-600 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending products you might love</span>
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-xl">
            <Star className="w-4 h-4 text-yellow-600 fill-yellow-400" />
            <span className="text-sm font-semibold text-yellow-700">
              Popular
            </span>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex flex-wrap gap-2">
          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
            🔥 Hot Picks
          </div>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            📈 Trending
          </div>
          <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            ⭐ Recommended
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {recommendations.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1 * index,
              ease: "easeOut",
            }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:border-emerald-200">
              <ProductCard product={product} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 flex justify-center">
        <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default PeopleAlsoBought;
