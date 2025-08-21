import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import HomePage from "./pages/home-page";
import BlogPage from "./pages/blog-page";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy-policy";
import ServicesPage from "./pages/service-page";
import 'react-phone-input-2/lib/style.css';
import "swiper/css";
import "swiper/css/pagination";

import "./style.scss";
import "./media/_media1440.scss";
import "./media/_media1200.scss";
import "./media/_media992.scss";
import "./media/_media768.scss";
import "./media/_media576.scss";
import AboutPage from "./pages/about-page";
import { useToast } from "./context/toatsContext";
import { Toast } from "./components/toast";
import ChatWidget from "./components/FAQchat";
import { FAQ_DATA } from "./helpers";
import ScrollToTop from "./components/totop";
import PolicyPage from "./pages/privacy-policy-test";

function App() {

  
  const {
    showToast,
    setShowToast,
    toastStatus,
    toastMessage,
    handleClose,
    handleToast,
  } = useToast();

  return (
    <div className="App">
      <ScrollToTop />
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        {/* <Route path="/terms" element={<Terms />} /> */}
         {/* <Route path="/privacy" element={<Privacy />} /> */}
        <Route path="/services" element={<ServicesPage />} /> 
        <Route path="/privacy" element={<PolicyPage pageType="privacy" />} />
        <Route path="/terms" element={<PolicyPage pageType="terms" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <ChatWidget/>
      <Footer />
      {showToast && (
        <Toast
          status={toastStatus}
          message={toastMessage}
          onClose={handleClose}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
}

export default App;
