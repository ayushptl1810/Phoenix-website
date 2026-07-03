import React from "react";
import Logo from "../../assets/Logo.png";

const PostsCard = ({ title, excerpt, image, linkedinUrl, imageFit = "cover" }) => {
  return (
    <div
      className="post-card-item bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 group hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-orange-500/5 w-full opacity-0"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors cursor-pointer">
              {title}
            </h3>
          </a>
        ) : (
          <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2">
            {title}
          </h3>
        )}

        <p className="font-body text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 h-12 sm:h-16">
          {excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center text-xs sm:text-sm text-gray-400">
          <div className="flex items-center">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white border border-orange-500/30 rounded-full mr-2 sm:mr-3 flex items-center justify-center p-1">
              <img
                src={Logo}
                alt="DJS Phoenix Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-body text-sm sm:text-lg">DJS Phoenix</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
