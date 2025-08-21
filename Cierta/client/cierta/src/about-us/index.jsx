import React from "react";
import storyImg from "../asstets/about/4.jpg";
import missionImg from "../asstets/about/5.jpg";
import trackingImg from "../asstets/about/6.jpg";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import { api } from "../helpers";

const aboutContent   = [
  {
    title: "Our Story",
    subtitle: "Every Journey Has a Story—This Is Ours",
    text: `Across the highways, through the cities, over the rivers, and beyond the horizon—something important is always on the move. A shipment that keeps a business running. A delivery that brings a promise to life. A vehicle en route to its new owner. A boat making its way to open waters. A truck carrying not just cargo, but the heartbeat of an economy that never stops.

We started Cierta because we saw a world where businesses struggled with delays, uncertainties, and endless red tape. Where a simple shipment could turn into a complicated puzzle. We knew it didn’t have to be that way.

So, we built something better—a freight forwarding company that doesn’t just move loads but delivers confidence, reliability, and peace of mind. A company that understands that every shipment isn’t just about getting from point A to point B—it’s about keeping promises, meeting deadlines, and making progress possible.

What makes us different? It’s not just our ability to transport anything, anywhere. It’s the way we do it—with a deep understanding of the road ahead, cutting-edge tracking, and a team that treats every shipment as if it were their own.

Because when we do our job right, businesses thrive, families move forward, and industries stay in motion. And that’s why we exist: to move more than just cargo. We move the people, the businesses, and the ambitions that drive this world forward.

And we do it mile after mile, day after day—because the road never stops, and neither do we.
`,
    image: `${api}/public/about/4.jpg`,
  },
  {
    
    title: "Our Mission and Vision",
    subtitle: "Every Dream Paints a Horizon—This Is Our Canvas",
    text: `Cierta is not just in the business of moving loads—we are in the business of movement itself, a symphony of progress playing in harmony with the pulse of industry. We are the silent force that keeps dreams alive, the unseen hands that connect aspirations to reality, ensuring that ambitions remain within reach. Our mission is to elevate logistics into an exquisite art form, where every shipment—whether freight, vehicles, boats, or the heaviest of hauls—is not simply transported but meticulously guided with purpose, foresight, and an unwavering commitment to excellence. We don’t just connect points on a map; we bridge distances, unravel complexities, and ensure that what must move, moves—with a promise carried across highways, a commitment measured not just in miles, but in trust.

The road beneath our wheels is more than mere pavement; it is a canvas upon which possibilities unfold and futures are painted. With every route we chart, we weave threads of innovation into the journey, redefining movement and replacing hesitation with confidence. With technology at our fingertips and instinct in our approach, we blend precision with adaptability, ensuring that no challenge is too great, no load too complex. To us, logistics is not an obstacle to overcome—it is an art to be mastered.

Our vision is a world where logistics becomes invisible in its perfection—a realm where businesses expand without disruption and movement is as effortless as a whispering breeze. In this world, trust is not merely spoken; it is woven into the fabric of every mile traveled, proven in every deadline met, and manifested in every challenge transformed into a seamless solution. At Cierta, we don’t just follow the road ahead—we shape it, push its boundaries, and redefine what it means to move.

And we do it step after step, dream after dream—because movement is a boundless horizon upon which our dedication colors the canvas of tomorrow.

`,
    image: `${api}/public/about/5.jpg`,
  },
  {
    title: "Tracking and Visibility",
    subtitle: "Every Mile Holds Insight—This Is How We See It",
    text: `At Cierta, we believe in more than just moving shipments from one place to another. We exist to bridge the gap between your needs and the world’s possibilities. Every load carries more than cargo—it carries intent, urgency, and the expectations of those who depend on it. That’s why our commitment goes beyond logistics; we provide the clarity, the precision, and the unwavering assurance that your shipment is always within reach, no matter how many miles lie ahead.

With our advanced tracking platform, you are never left wondering. Every movement, every milestone, every turn of the wheels is visible in real time, ensuring you remain informed from dispatch to delivery. Our seamless communication, live location updates, and personalized insights turn uncertainty into confidence, so you always know exactly where your shipment stands. And because trust is built on transparency, we don’t just offer information—we offer peace of mind, ensuring you stay in control every step of the way.

But visibility is more than just tracking—it’s empowerment. It’s knowing that no matter how vast the distance or complex the route, you’re never in the dark. Whether your shipment is crossing city lines or state borders, our tracking system ensures the same ease of access, the same reliability, and the same commitment to keeping you connected to what matters. With every mile, we turn movement into certainty, distance into insight, and expectations into delivered promises.

And we do it breath after breath, pulse after pulse—because every journey is a story, and with Cierta, you don’t just wait for the next chapter; you see it unfold in real time.

`,
    image: `${api}/public/about/6.jpg`,
  },
];


const AboutUs = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        const yOffset = -100; // ⬅️ отступ сверху (в пикселях)
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);
  

    return (
      <section className="about-us-section">
        <div className="about-us-section__title">
          <h2 id='about-title'>Why Cierta</h2>
        </div>
        {aboutContent.map((item, index) => (
          <div id={item.title.toLowerCase().replace(/\s+/g, "-")}
            className={`about-us-block ${index % 2 !== 0 ? "reverse" : ""}`}
            key={index}
          >
            <div className="about-us-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="about-us-text">
              <h2>{item.title}</h2>
              <h3>{item.subtitle}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>
    );
  };
  
export default AboutUs;
