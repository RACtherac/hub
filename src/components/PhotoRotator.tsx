import { useEffect, useState } from "react";
import "../components/styles/rotator.css";

import project1 from "../assets/portfolio/portfoliointern.png";
import project2 from "../assets/portfolio/project1.png";
import project3 from "../assets/portfolio/project3.png";

const images: string[] = [
  project1,
  project2,
  project3,
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