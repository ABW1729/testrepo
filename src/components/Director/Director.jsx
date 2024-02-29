"use client";
import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp } from "./Di";

export default function Home() {
  const phrase =
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the.";
  const director = "Director's Desk";
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div>
      {" "}
      <div className="max-w-[65rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="md:grid md:grid-cols-2 space-x-4 md:items-center md:gap-10 xl:gap-24">
          <div>
            <img
              className="rounded-xl w-full"
              src="/images/padolesir.jpg"
              alt="Director"
            />
          </div>

          <div ref={description} className={styles.description}>
            <p>
              {director.split(" ").map((word, index) => {
                return (
                  <span key={index} className={styles.mask}>
                    <motion.span
                      variants={slideUp}
                      custom={index}
                      animate={isInView ? "open" : "closed"}
                      key={index}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </p>
            <div className={styles.body}>
              <p>
                {phrase.split(" ").map((word, index) => {
                  return (
                    <span key={index} className={styles.mask}>
                      <motion.span
                        variants={slideUp}
                        custom={index}
                        animate={isInView ? "open" : "closed"}
                        key={index}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </p>

              {/* <button>
                {" "}
                <a
                  href="/"
                  className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  Read More
                </a>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
