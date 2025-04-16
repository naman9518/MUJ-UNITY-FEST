import React from "react";
import gallery1 from "../../../src/assets/gallery-1.svg";
import gallery2 from "../../../src/assets/gallery-2.svg";
import gallery3 from "../../../src/assets/gallery-3.svg";
import gallery4 from "../../../src/assets/gallery-4.svg";
import gallery5 from "../../../src/assets/gallery-5.svg";

const GallerySection = () => {
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5];

  return (
    <section className="gallery-section" data-aos="fade-up">
      <div className="container">
        <h2>
          Check our latest <span className="highlight">gallery</span>
        </h2>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              key={idx}
            >
              <img src={img} alt={`Gallery image ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
