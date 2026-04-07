import { useEffect, useState } from "react";
import "../components/styles/rotator.css";

import cvImage1 from "../assets/portfolio/CvImage.png";
import cvImage2 from "../assets/portfolio/CvImage2.png";

const images: string[] = [
  cvImage1,
  cvImage2,
];

export default function PhotoRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="rotator">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt={`Project ${i + 1}`}
          className={`rotator-image ${i === index ? "active" : ""}`}
        />
      ))}
    </section>
  );
}