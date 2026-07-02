import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import Team from "./pages/Team";
import Fleet from "./pages/Fleet";
import Posts from "./pages/Posts";
import SiteFooter from "./components/common/SiteFooter";
import About from "./pages/About";
import Support from "./pages/Support";
import PageWrapper from "./components/common/PageWrapper";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black relative">
      <PageWrapper key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/team" element={<Team />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="font-display text-6xl font-bold text-orange-500 mb-4">
                    404
                  </h1>
                  <p className="font-body text-xl text-gray-300 mb-8">
                    Page not found
                  </p>
                  <a
                    href="/"
                    className="ui-text px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </PageWrapper>
      {location.pathname !== "/fleet" && <SiteFooter />}
    </div>
  );
};

export default App;
