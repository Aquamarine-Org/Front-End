import React from "react";
import { motion } from "motion/react";

import styles from "./TestimonialsColumn.module.css";

export const TestimonialsColumn = ({
  className = "",
  testimonials,
  duration = 10,
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className={styles.column}
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div className={styles.card} key={`${index}-${i}`}>
                <div className={styles.text}>
                  {text}
                </div>

                <div className={styles.user}>
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className={styles.avatar}
                  />

                  <div className={styles.userInfo}>
                    <div className={styles.name}>
                      {name}
                    </div>

                    <div className={styles.role}>
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};