import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const NestedDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown__nested"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="dropdown__parent">
        {title} <FaChevronDown className="dropdown__icon rotate-right" />
      </div>

      {isOpen && (
        <div className="dropdown__submenu">
          {items.map((item, idx) => (
            <Link key={idx} to={item.path}>{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;
