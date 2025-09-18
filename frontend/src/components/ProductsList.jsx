/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Trash, Star, Package, AlertTriangle, Edit, Eye } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products, updateStock } =
    useProductStore();
  const [editingStock, setEditingStock] = useState(null);
  const [newStockValue, setNewStockValue] = useState("");
  const navigate = useNavigate();

  // console.log("products", products);

  const handleStockUpdate = async (productId, currentStock) => {
    const stockToReduce = currentStock - parseInt(newStockValue);
    if (stockToReduce < 0) {
      alert("New stock value cannot be negative");
      return;
    }

    try {
      // Update stock directly by setting new value
      await updateStock(productId, stockToReduce);
      setEditingStock(null);
      setNewStockValue("");
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  };

  const startEditingStock = (productId, currentStock) => {
    setEditingStock(productId);
    setNewStockValue(currentStock.toString());
  };

  const cancelEditingStock = () => {
    setEditingStock(null);
    setNewStockValue("");
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/admin/update-product/${productId}`);
  };

  const getStockStatus = (stock) => {
    if (stock === 0)
      return { color: "text-red-500", bg: "bg-red-100", label: "Out of Stock" };
    if (stock <= 5)
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        label: "Low Stock",
      };
    return { color: "text-green-600", bg: "bg-green-100", label: "In Stock" };
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <motion.div
          className="space-y-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {products?.map((product) => {
            const stockStatus = getStockStatus(product.stock || 0);

            return (
              <motion.div
                key={product._id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-lg object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-sm font-medium text-emerald-400">
                            ₹{product.price?.toFixed(2)}
                          </span>
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full capitalize">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFeaturedProduct(product._id)}
                        className={`ml-2 p-1 rounded-full transition-all duration-200 ${
                          product.isFeatured
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            product.isFeatured ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          Stock: {product.stock || 0}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                        >
                          {(product.stock || 0) <= 5 &&
                            (product.stock || 0) > 0 && (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            )}
                          {stockStatus.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 mt-4">
                      <button
                        onClick={() => handleUpdateProduct(product._id)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Desktop Table View */}
      <motion.div
        className="hidden lg:block bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Featured
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {products?.map((product) => {
                const stockStatus = getStockStatus(product.stock || 0);

                return (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4 max-w-xs">
                          <div className="text-sm font-medium text-white truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-emerald-400">
                        ₹{product.price?.toFixed(2)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full capitalize">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStock === product._id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            value={newStockValue}
                            onChange={(e) => setNewStockValue(e.target.value)}
                            className="w-16 px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button
                            onClick={() =>
                              handleStockUpdate(product._id, product.stock)
                            }
                            className="text-green-400 hover:text-green-300 text-xs font-bold"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelEditingStock}
                            className="text-red-400 hover:text-red-300 text-xs font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <button
                            onClick={() =>
                              startEditingStock(product._id, product.stock || 0)
                            }
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                          >
                            {product.stock || 0}
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                        >
                          {(product.stock || 0) <= 5 &&
                            (product.stock || 0) > 0 && (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            )}
                          {stockStatus.label}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeaturedProduct(product._id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          product.isFeatured
                            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            product.isFeatured ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateProduct(product._id)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all duration-200 group"
                          title="Update Product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200 group"
                          title="Delete Product"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {(!products || products.length === 0) && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-300">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new product.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductsList;
