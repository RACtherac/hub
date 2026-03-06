import { useEffect, useState } from "react";

const images = [
  "/src/assets/portfolio/project1.png",
  "/src/assets/portfolio/project2.png",
  "/src/assets/portfolio/project3.png",
];

export default function PhotoRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          style={{
            ...imageStyle,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "500px",
  height: "300px", // fixed height prevents page shifting
  margin: "2rem auto",
  overflow: "hidden",
};

const imageStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 1s ease-in-out",
};