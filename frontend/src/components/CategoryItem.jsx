import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <Link to={"/category" + category.href}>
        <div className="relative overflow-hidden">
          {/* Image Container */}
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
              <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                {category.name}
              </h3>
              <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Discover our {category.name.toLowerCase()} collection
              </p>

              {/* Shop Now Button */}
              <div className="flex items-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                <span className="text-sm border-b border-white/50 pb-1 group-hover:border-emerald-400 transition-colors duration-300">
                  Shop Now
                </span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Top-right badge */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
