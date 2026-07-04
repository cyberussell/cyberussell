export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const revealUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: EASE },
  }),
};

export const revealLine = {
  hidden: { opacity: 0, y: "100%" },
  show: (i = 0) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, delay: i * 0.09, ease: EASE },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 1, transition: { duration: 0.6, delay: i * 0.06 } }),
};
