"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import { Volume2, Pause, Play } from "lucide-react";
import { useState } from "react";

export const MusicVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const topBarsControl = useAnimation();
  const bottomBarsControl = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      const animateBars = async () => {
        await topBarsControl.start({
          height: [8, 16, 12, 20, 8],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          },
        });
      };

      animateBars();
      bottomBarsControl.start({
        height: [8, 20, 10, 15, 8],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      });
    } else {
      topBarsControl.stop();
      bottomBarsControl.stop();
      topBarsControl.start({ height: 8 });
      bottomBarsControl.start({ height: 8 });
    }
  }, [isPlaying, topBarsControl, bottomBarsControl]);

  return (
    <motion.div
      className="relative flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative mx-auto aspect-square max-w-md"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 rounded-3xl bg-gradient-to-br blur-xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="bg-card absolute inset-4 flex items-center justify-center rounded-2xl border p-6 shadow-xl backdrop-blur-md"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-x-0 top-0 flex h-2/5 flex-col items-center justify-center space-y-4">
              <motion.div
                className="bg-accent/30 w-3/4 rounded-full"
                animate={topBarsControl}
                initial={{ height: 8 }}
              />
              <motion.div
                className="bg-primary/40 w-2/3 rounded-full"
                animate={topBarsControl}
                initial={{ height: 8 }}
                transition={{ delay: 0.1 }}
              />
              <motion.div
                className="bg-secondary/40 w-1/2 rounded-full"
                animate={topBarsControl}
                initial={{ height: 8 }}
                transition={{ delay: 0.2 }}
              />
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-muted relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full"
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      className="border-t-primary absolute inset-0 rounded-full border-4 border-r-transparent border-b-transparent border-l-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  className="bg-background flex h-14 w-14 items-center justify-center rounded-full"
                  whileHover={{
                    boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                  }}
                >
                  {isPlaying ? (
                    <Pause className="text-primary h-5 w-5" />
                  ) : (
                    <Play className="text-primary ml-1 h-5 w-5" />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 flex h-2/5 flex-col items-center justify-center space-y-4">
              <motion.div
                className="bg-secondary/40 w-1/2 rounded-full"
                animate={bottomBarsControl}
                initial={{ height: 8 }}
              />
              <motion.div
                className="bg-primary/40 w-2/3 rounded-full"
                animate={bottomBarsControl}
                initial={{ height: 8 }}
                transition={{ delay: 0.15 }}
              />
              <motion.div
                className="bg-accent/30 w-3/4 rounded-full"
                animate={bottomBarsControl}
                initial={{ height: 8 }}
                transition={{ delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-primary/30 absolute -right-4 bottom-8 h-24 w-24 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="bg-accent/30 absolute top-8 -left-4 h-24 w-24 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute top-0 right-0 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Volume2 className="text-primary/70 h-4 w-4" />
      </motion.div>
    </motion.div>
  );
};
