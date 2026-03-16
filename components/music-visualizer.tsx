"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useAnimation, AnimatePresence } from "motion/react";
import { Volume2, Pause, Play } from "lucide-react";
import { useState } from "react";

export const MusicVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const topBarsControl = useAnimation();
  const bottomBarsControl = useAnimation();

  const handlePlayToggle = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    if (newIsPlaying) {
      topBarsControl.start({
        scaleY: [1, 2, 1.5, 2.5, 1],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        },
      });
      bottomBarsControl.start({
        scaleY: [1, 2.5, 1.25, 1.875, 1],
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
      topBarsControl.start({ scaleY: 1 });
      bottomBarsControl.start({ scaleY: 1 });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="relative hidden flex-1 lg:block" // Hide on mobile, display from medium screens up
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <m.div
          className="relative mx-auto aspect-square max-w-md"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <m.div
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
          <m.div
            className="bg-card absolute inset-4 flex items-center justify-center rounded-2xl border p-6 shadow-xl backdrop-blur-md"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-x-0 top-0 flex h-2/5 flex-col items-center justify-center space-y-4">
                <m.div
                  className="bg-accent/30 w-3/4 rounded-full"
                  animate={topBarsControl}
                  initial={{ height: 6 }}
                />
                <m.div
                  className="bg-primary/40 w-2/3 rounded-full"
                  animate={topBarsControl}
                  initial={{ height: 6 }}
                  transition={{ delay: 0.1 }}
                />
                <m.div
                  className="bg-secondary/40 w-1/2 rounded-full"
                  animate={topBarsControl}
                  initial={{ height: 6 }}
                  transition={{ delay: 0.2 }}
                />
              </div>

              <m.div
                className="absolute inset-0 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <m.div
                  className="bg-muted relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full"
                  whileHover={{ scale: 1.05 }}
                  onClick={handlePlayToggle}
                >
                  <AnimatePresence>
                    {isPlaying && (
                      <m.div
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
                  <m.div
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
                  </m.div>
                </m.div>
              </m.div>

              <div className="absolute inset-x-0 bottom-0 flex h-2/5 flex-col items-center justify-center space-y-4">
                <m.div
                  className="bg-secondary/40 w-1/2 rounded-full"
                  animate={bottomBarsControl}
                  initial={{ height: 6 }}
                />
                <m.div
                  className="bg-primary/40 w-2/3 rounded-full"
                  animate={bottomBarsControl}
                  initial={{ height: 6 }}
                  transition={{ delay: 0.15 }}
                />
                <m.div
                  className="bg-accent/30 w-3/4 rounded-full"
                  animate={bottomBarsControl}
                  initial={{ height: 6 }}
                  transition={{ delay: 0.3 }}
                />
              </div>
            </div>
          </m.div>
        </m.div>

        <m.div
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
        <m.div
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

        <m.div
          className="absolute top-0 right-0 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Volume2 className="text-primary/70 h-4 w-4" />
        </m.div>
      </m.div>
    </LazyMotion>
  );
};
