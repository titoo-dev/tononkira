"use client";

import React from "react";
import Link from "next/link";
import { Music, Search, StarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export const DownloadSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Enhanced background with glass morphism */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/20 absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[100px]" />
        <div className="bg-secondary/20 absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[100px]" />
        <div className="bg-accent/10 absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />
        <div className="bg-primary/30 absolute top-1/4 left-1/4 h-24 w-24 rounded-full blur-lg" />
        <div className="bg-secondary/30 absolute right-1/4 bottom-1/4 h-16 w-16 rounded-full blur-lg" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Take Tononkira{" "}
              <span className="relative">
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  everywhere
                </span>
                <span className="from-primary to-secondary absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r"></span>
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
              Experience the best of Malagasy music on the go with our
              feature-rich mobile application. Create playlists, discover new
              artists, and enjoy lyrics even when offline.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Features section */}
          <motion.div
            className="space-y-10 lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <DescriptionSection />
          </motion.div>

          {/* Device mockups */}
          <motion.div
            className="relative lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <MockupsSection />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DescriptionSection = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="group border-border/50 bg-background/50 hover:border-primary/50 rounded-xl border p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
          <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
            <Music className="text-primary h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Offline Access</h3>
          <p className="text-muted-foreground text-sm">
            Download lyrics and access them anytime, anywhere without internet
            connection.
          </p>
        </div>

        <div className="group border-border/50 bg-background/50 hover:border-secondary/50 rounded-xl border p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
          <div className="bg-secondary/10 group-hover:bg-secondary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
            <Search className="text-secondary h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Smart Search</h3>
          <p className="text-muted-foreground text-sm">
            Find songs by lyrics, artist, or title with our powerful search
            engine.
          </p>
        </div>

        <div className="group border-border/50 bg-background/50 hover:border-accent/50 rounded-xl border p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
          <div className="bg-accent/10 group-hover:bg-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
            <StarIcon className="text-accent h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Personalization</h3>
          <p className="text-muted-foreground text-sm">
            Create favorites list and personalized playlists for easy access.
          </p>
        </div>

        <div className="group border-border/50 bg-background/50 hover:border-primary/50 rounded-xl border p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
          <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
            <Download className="text-primary h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Light & Fast</h3>
          <p className="text-muted-foreground text-sm">
            Small app size with optimized performance for all Android devices.
          </p>
        </div>
      </div>

      <Link
        href={process.env.NEXT_PUBLIC_ANDROID_APP_URL || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="lg" className="w-full gap-2 rounded-full sm:w-auto">
          <Download className="h-4 w-4" /> Download for Android
        </Button>
      </Link>
    </div>
  );
};

const MockupsSection = () => {
  return (
    <div className="relative h-[600px]">
      {/* Main phone */}
      <div className="absolute top-0 left-1/2 z-30 -translate-x-1/2">
        <div className="border-foreground/10 bg-background relative h-[570px] w-[280px] overflow-hidden rounded-[40px] border-[8px] shadow-xl">
          {/* Status bar */}
          <div className="bg-background/90 absolute inset-x-0 top-0 z-10 flex h-6 items-center justify-between px-4">
            <div className="text-[10px]">11:42</div>
            <div className="flex gap-1">
              <div className="bg-primary h-2 w-2 rounded-full"></div>
              <div className="bg-foreground/70 h-2 w-2 rounded-full"></div>
              <div className="bg-foreground/70 h-2 w-2 rounded-full"></div>
            </div>
          </div>

          {/* App content - First onboarding screen */}
          <div className="h-full w-full overflow-hidden">
            {/* Using the offline access onboarding screen */}
            <Image
              src="/flutter_03.png"
              alt="Tononkira Offline Access"
              className="h-full w-full object-cover"
              aria-label="Mobile app screen showing offline access feature with a checkmark icon"
              width={280}
              height={570}
            />
          </div>

          {/* Notch */}
          <div className="bg-foreground/10 absolute top-0 left-1/2 h-5 w-32 -translate-x-1/2 rounded-b-lg"></div>

          {/* Screen reflections */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5"></div>
        </div>
      </div>

      {/* Left phone (slightly turned) */}
      <div className="absolute top-[15%] left-[5%] z-10 origin-center scale-[0.65] rotate-[-15deg]">
        <div className="border-foreground/10 bg-background relative h-[570px] w-[280px] overflow-hidden rounded-[40px] border-[8px] shadow-xl">
          {/* App content - Save favorites onboarding screen */}
          <div className="h-full w-full overflow-hidden">
            <Image
              src="/flutter_05.png"
              alt="Tononkira Save Favorites"
              className="h-full w-full object-cover"
              aria-label="Mobile app screen showing save favorites feature with a heart icon"
              width={280}
              height={570}
            />
          </div>

          {/* Screen reflections */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5"></div>
        </div>
      </div>

      {/* Right device (third onboarding screen) */}
      <div className="absolute top-[25%] right-[5%] z-20 origin-center scale-[0.7] rotate-[15deg]">
        <div className="border-foreground/10 bg-background relative h-[570px] w-[280px] overflow-hidden rounded-[40px] border-[8px] shadow-xl">
          {/* App content - Find lyrics easily onboarding screen */}
          <div className="h-full w-full overflow-hidden">
            <Image
              src="/flutter_06.png"
              alt="Tononkira Find Lyrics"
              className="h-full w-full object-cover"
              aria-label="Mobile app screen showing search functionality with a magnifying glass icon"
              width={280}
              height={570}
            />
          </div>

          {/* Screen reflections */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="bg-foreground/5 absolute right-1/4 -bottom-10 left-1/4 h-6 rounded-full blur-xl"></div>
      <div className="bg-primary/10 absolute right-1/3 bottom-20 left-1/3 h-8 rounded-full blur-xl"></div>
    </div>
  );
};
