import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { FaChevronDown, FaChevronRight, FaSearch  } from "react-icons/fa";
import Cierta from "../../asstets/logo/Sietra.png";
import ContactButton from "../buttnos";
import { useFormSelection } from "../../context/formContext";
import { useEffect } from "react";

import "./style.scss";
import SearchModal from "../modals/loadInfo";


const NavigationBar = () => {
    const closeTimeout = useRef(null);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [openBurger, setOpenBurger] = useState(true);
  const { setSelectedService, setCustomerType } = useFormSelection();
  const location = useLocation();
  
  // Состояние для управления модальным окном поиска
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleNavigate = (hash) => {
    navigate(`/about#${hash}`);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
  
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      const waitForScrollTop = () => {
        if (window.scrollY === 0) {
          window.location.reload();
        } else {
          requestAnimationFrame(waitForScrollTop);
        }
      };
  
      waitForScrollTop();
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };
  
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const handleToggle = (menu) => {
    setNestedOpen(false);
    clearTimeout(closeTimeout.current);
    setOpenMenu(menu);
  };

  const handleNestedToggle = (menu) => {
    setNestedOpen(true);
    clearTimeout(closeTimeout.current);
    setOpenMenu(menu);
  };
  
  const handleLeaveToggle = (menu) => {
    setNestedOpen(false);
    clearTimeout(closeTimeout.current);
    setOpenMenu(null);
  };

  const handleRedirectToForm = (type, service) => {
    setCustomerType(type);
    setSelectedService(service);
  
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "quote-form" } });
    } else {
      setTimeout(() => {
        document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  
    setOpenBurger(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const target = document.getElementById(location.state.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header__container">
        <Link onClick={handleLogoClick} className="header__logo">
          <div className="header__logo__wrapper">
            <img src={Cierta} alt="Cierta" />
          </div>
        </Link>

        <div className={`header__menu ${openBurger ? "" : "open-burger"}`}>
        <nav className="header__nav">
          <div
            className="header__item"
            onClick={() => handleToggle("business")}
            onMouseEnter={() => handleToggle("business")}
            onMouseLeave={() => 
              {closeTimeout.current = setTimeout(() => {
                handleLeaveToggle("business");
              }, 100);
            }}
          >
            For Businesses <FaChevronDown />
            {openMenu === "business" && (
              <div className="dropdown">
                <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "Truckload")}>Truckload</div>
                <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "LTL")}>LTL</div>
                <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "Last Mile")}>Last Mile</div>
                <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "Boats")}>Boats</div>
                <div
                  className="dropdown__nested"
                  onMouseEnter={() => handleNestedToggle("business")}
                 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleNestedToggle("business")}}
                >
                  <div className="dropdown__parent">
                    Vehicles <FaChevronRight className="dropdown__icon"/>
                  </div>

                  {nestedOpen && (
                    <div className="dropdown__submenu"  
                    onMouseLeave={() => {
                      closeTimeout.current = setTimeout(() => {
                        handleLeaveToggle("business");
                      }, 0); // 1 секунда
                    }}>
                      <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "Vehicles: Cars")}>Cars</div>
                      <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "Vehicles: Motorcycles")}>Motorcycles</div>
                      <div className="dropdown__link"  onClick={() => handleRedirectToForm("business", "Vehicles: RVs")}>RVs</div>
                    </div>
                  )}
                </div>
              </div>
            )}
           
          </div>

          <div
            className="header__item"
            onClick={() => handleToggle("individual")}
            onMouseEnter={() => handleToggle("individual")}
            onMouseLeave={() => {
              closeTimeout.current = setTimeout(() => {
                handleLeaveToggle("individual");
              }, 100); // 1 секунда
            }}
          >
            For Individuals <FaChevronDown />
            {openMenu === "individual" && (
              <div className="dropdown">
                <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "Truckload")}>Truckload (Full Truckload)</div>
                <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "LTL")}>LTL (Less Than Truckload)</div>
                <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "Door to Door")}>Door to Door</div>
                <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "Boats")}>Boats</div>
                <div
                  className="dropdown__nested"
                  onMouseEnter={() => handleNestedToggle("individual")}
                 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleNestedToggle("individual")}}
                >
                  <div className="dropdown__parent">
                    Vehicles <FaChevronRight className="dropdown__icon" />
                  </div>

                  {nestedOpen && (
                    <div className="dropdown__submenu"  onMouseLeave={() => {
                      closeTimeout.current = setTimeout(() => {
                        handleLeaveToggle("business");
                      }, 0); // 1 секунда
                    }}>
                      <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "Vehicles: Cars")}>Cars</div>
                      <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "Vehicles: Motorcycles")}>Motorcycles</div>
                      <div className="dropdown__link" onClick={() => handleRedirectToForm("individual", "Vehicles: RVs")}>RVs</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
          className="header__item"
          onClick={() => handleToggle("shippers")}
          onMouseEnter={() => handleToggle("shippers")}
          onMouseLeave={() =>
            (closeTimeout.current = setTimeout(() => {
              handleLeaveToggle("shippers");
            }, 100))
          }
        >
          Shippers <FaChevronDown />
          {openMenu === "shippers" && (
            <div className="dropdown">
              <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "Truckload")}>Truckload</div>
              <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "LTL")}>LTL</div>
              <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "Last Mile")}>Last Mile</div>
              <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "Boats")}>Boats</div>

              <div
                className="dropdown__nested"
                onMouseEnter={() => handleNestedToggle("shippers")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNestedToggle("shippers");
                }}
              >
                <div className="dropdown__parent">
                  Vehicles <FaChevronRight className="dropdown__icon" />
                </div>

        {nestedOpen && openMenu === "shippers" && (
          <div
            className="dropdown__submenu"
            onMouseLeave={() => {
              closeTimeout.current = setTimeout(() => {
                handleLeaveToggle("shippers");
              }, 0);
            }}
          >
            <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "Vehicles: Cars")}>Cars</div>
            <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "Vehicles: Motorcycles")}>Motorcycles</div>
            <div className="dropdown__link" onClick={() => handleRedirectToForm("business", "Vehicles: RVs")}>RVs</div>
          </div>
        )}
      </div>
    </div>
  )}
</div>
          <div
            className="header__item"
            onClick={() => handleToggle("carriers")}
            onMouseEnter={() => handleToggle("carriers")}
            onMouseLeave={() => handleLeaveToggle("carriers")}
          >
            Carriers <FaChevronDown />
            {openMenu === "carriers" && (
              <div className="dropdown">
                <a className="footer-column__link" href="https://highway.com/go/cierta-corporation" target="_blank" rel="noopener noreferrer"> Become a Carrier </a>
              </div>
            )}
          </div>

          <div className="header__item" onClick={() => handleToggle("cierta")}  onMouseEnter={() => handleToggle("cierta")}
            onMouseLeave={() => handleLeaveToggle("cierta")}>
            Why Cierta <FaChevronDown />
            {openMenu === "cierta" && (
              <div className="dropdown">
                <div className="dropdown__link" onClick={() => handleNavigate("about-title")}>About Us</div>
                <div className="dropdown__link" onClick={() => handleNavigate("our-mission-and-vision")}>Mission and Vision</div>
                <div className="dropdown__link" onClick={() => handleNavigate("tracking-and-visibility")}>Tracking and Visibility</div>
              </div>
            )}
          </div>

        
            <Link to="/blog" className="header__item">
              Blog
            </Link>
            
            {/* Добавленная кнопка поиска */}
            
          </nav>

          <div className="header__contact">
            <Link to="/" state={{ scrollTo: "contact" }}>
              <ContactButton text="Contact Us" btnclass={"main-btn"} />
            </Link>
            <div 
              className="header__item search-item" 
              // onClick={() => {
              //   setShowSearchModal(true);
              //   setOpenMenu(null); // Закрыть все открытые меню
              // }}
            >
             <a href="https://adminpanel.ciertacorp.com/login" target="_blank" rel="noopener noreferrer"><ContactButton text="Login" btnclass={"main-btn"} /> </a>
            </div>
          </div>
        </div>
        
        <div className={`hamburger ${openBurger ? "" : "burger-active"}`} onClick={() => setOpenBurger(!openBurger)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* Модальное окно поиска */}
      <SearchModal
        show={showSearchModal} 
        onHide={() => setShowSearchModal(false)} 
      />
    </header>
  );
};

export default NavigationBar;
