import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 transition-all duration-300 border-b border-slate-700/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-blue-400/25">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                E-Commerce
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="relative text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {user && (
                <Link
                  to="/cart"
                  className="relative group flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium"
                >
                  <div className="relative">
                    <ShoppingCart
                      size={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 shadow-lg animate-pulse">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-blue-400/25 hover:scale-105 group"
                >
                  <Lock
                    size={18}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span>Dashboard</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                </Link>
              )}

              {user ? (
                <button
                  onClick={logout}
                  className="relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white py-2 px-4 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:shadow-slate-400/25 hover:scale-105 group"
                >
                  <LogOut
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  <span>Log Out</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/signup"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 px-4 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-400/25 hover:scale-105 group"
                  >
                    <UserPlus
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span>Sign Up</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  </Link>
                  <Link
                    to="/login"
                    className="relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white py-2 px-4 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:shadow-slate-400/25 hover:scale-105 group"
                  >
                    <LogIn
                      size={18}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span>Login</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
            >
              {isMobileMenuOpen ? (
                <X
                  size={20}
                  className="transition-transform duration-300 rotate-90"
                />
              ) : (
                <Menu size={20} className="transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-slate-800/98 backdrop-blur-xl z-40 lg:hidden transition-all duration-300 border-b border-slate-600/50 shadow-2xl ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 space-y-4">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="block text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-slate-700/50"
          >
            🏠 Home
          </Link>

          {user && (
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="flex items-center justify-between text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-slate-700/50"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </div>
              {cart.length > 0 && (
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg"
            >
              <Lock size={20} />
              <span>Dashboard</span>
            </Link>
          )}

          <div className="pt-4 border-t border-slate-600">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full flex items-center space-x-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 px-4 rounded-xl font-medium shadow-lg"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg"
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center space-x-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 px-4 rounded-xl font-medium shadow-lg"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
