export const api = "https://api.ciertacorp.com";

// export const api = "http://localhost:5000";

export const cleanObject = (obj) => {
    const cleanedFilters = {};
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      if (value.length > 0) cleanedFilters[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      const nested = cleanObject(value);
      if (Object.keys(nested).length > 0) cleanedFilters[key] = nested;
    } else if (value !== '' && value !== false && value !== null) {
      cleanedFilters[key] = value;
    }
  }
  return cleanedFilters;
  };
  export function appendDataToFormData(data) {
    const formData = new FormData();
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "images" && Array.isArray(data[key])) {
          data[key].forEach((file) => formData.append("images", file)); 
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    
    return formData;
  }
  // constants/faq.js
export const FAQ_DATA = [
  {
    question: "Can I get help with urgent or last-minute shipments?",
    answer: "Absolutely. We specialize in flexible, time-sensitive logistics. Let us know your timeline, and we'll act fast to get your shipment moving without delay. If you need personal assistance, feel free to contact us at support@ciertacorp.com—we're here to help."
  },
  {
    question: "How can I request a quote for my shipment?",
    answer: "You can request a quote directly through our website. Once submitted, one of our agents will reach out to assist you with the next steps. For any questions while submitting, don't hesitate to email us at support@ciertacorp.com and we'll guide you through the process."
  },
  {
    question: "Is it possible to track my cargo in real time?",
    answer: "Yes, every shipment comes with live tracking and regular updates. You'll always know where your cargo is—every mile of the way. Need help accessing your tracking? Just send us a message at support@ciertacorp.com, and we'll be glad to assist."
  },
  {
    question: "Can I ship vehicles, boats, or motorcycles through you?",
    answer: "Yes, we handle cars, boats, motorcycles, and more—with specialized carriers and careful handling every step of the way. If you'd like a tailored quote or more details, please reach out to us at support@ciertacorp.com—we're happy to assist."
  },
  {
    question: "Is my cargo insured or protected during transport?",
    answer: "Yes. We work with trusted carriers and offer protection options to ensure your shipment travels safely and securely. To learn more about coverage options, feel free to get in touch with us at support@ciertacorp.com."
  },
  {
    question: "Can I arrange both pickup and delivery with your team?",
    answer: "Definitely. We handle the full journey—from first mile to final destination—so you don't have to coordinate a thing. For scheduling or more information, just email us at support@ciertacorp.com—we'll take care of the rest."
  },
  {
    question: "Do you provide temporary warehousing or storage services?",
    answer: "Yes, we offer short- and long-term storage, cross-docking, and transloading to keep your freight moving smoothly. If you're interested in storage solutions, feel free to reach out at support@ciertacorp.com to discuss options."
  },
  {
    question: "What makes Cierta different from other companies?",
    answer: "We go beyond logistics. With real-time visibility, personalized care, and a deep understanding of every mile, we move your shipments with purpose and precision. Want to explore how we can support your business? Send us a message at support@ciertacorp.com—we'd love to connect."
  },
  {
    question: "How do I start the process of booking a shipment?",
    answer: "You can begin by submitting a shipment request through our website. Once we receive your details, our team will contact you to finalize everything. If you'd prefer direct assistance, email us anytime at support@ciertacorp.com and we'll get you started right away."
  },
  {
    question: "Can I choose between contract and spot rates?",
    answer: "Yes—you can lock in contract rates for reliability or choose spot rates for flexibility, depending on your needs. To discuss which pricing model suits you best, feel free to reach out at support@ciertacorp.com."
  },
  {
    question: "Will I be updated throughout the shipping journey?",
    answer: "Always. You'll receive regular updates and have access to real-time tracking, so you're never left guessing. If you ever need clarification or help with updates, our team is just an email away at support@ciertacorp.com."
  }
];

export const DEFAULT_CONTACT = {
  address: "710 East Main Street Suite 201, Lexington, Kentucky 40502, United States",
  phone: "(606) 660-6618",
  email: "support@ciertacorp.com",
  name: "Cierta Corporation"
};