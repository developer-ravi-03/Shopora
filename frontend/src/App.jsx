import { motion } from "framer-motion";
function App() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <motion.div
          className="text-center p-10 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            👋 Welcome to Shopora
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Your one-stop e-commerce platform. Start exploring amazing products
            today!
          </p>
          <button className="px-6 py-3 text-lg font-semibold rounded-2xl shadow-lg text-indigo-600 bg-white hover:bg-indigo-100 transition duration-300">
            Get Started
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default App;
