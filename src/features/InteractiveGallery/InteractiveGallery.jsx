import image1 from "@assets/landing_page/interactive-gallery/interactive-gallery1.png";
import image2 from "@assets/landing_page/interactive-gallery/interactive-gallery2.png";
import image3 from "@assets/landing_page/interactive-gallery/interactive-gallery3.png";
import image4 from "@assets/landing_page/interactive-gallery/interactive-gallery4.png";
import image5 from "@assets/landing_page/interactive-gallery/interactive-gallery5.png";
import image6 from "@assets/landing_page/interactive-gallery/interactive-gallery6.png";
import image7 from "@assets/landing_page/interactive-gallery/interactive-gallery7.png";
import styles from "./InteractiveGallery.module.css";

function InteractiveGallery() {
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryColumn}>
        <img src={image1} alt="Imagem 1" />
        <img src={image7} alt="Imagem 2" />
      </div>
      <div className={styles.galleryLargeColumn}>
        <img src={image2} alt="Imagem 3" />
        <img src={image5} alt="Imagem 4" />
        <img src={image6} alt="Imagem 5" />
      </div>
      <div className={styles.galleryColumn}>
        <img src={image3} alt="Imagem 6" />
        <img src={image4} alt="Imagem 7" />
      </div>
    </div>
  );
}

export default InteractiveGallery;
