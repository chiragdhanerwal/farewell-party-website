import fs from "fs";
import path from "path";
import Image from "next/image";
import BackButton from "@/components/BackButton";

function getImages() {
  const imagesDirectory = path.join(process.cwd(), "public", "resort_images");
  if (!fs.existsSync(imagesDirectory)) return [];
  const fileNames = fs.readdirSync(imagesDirectory);
  return fileNames
    .filter((file) => file.match(/\.(jpeg|jpg|png|webp|gif)$/))
    .map((file) => `/resort_images/${file}`);
}

export default function AboutPartyPage() {
  const images = getImages();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      <BackButton />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center mb-16">
          <div
            className="w-20 h-px mx-auto mb-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
          <p className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4">
            The Venue
          </p>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] leading-tight">
            <span className="text-[#ff2d2d]">About:</span> The Party
          </h1>
          <div
            className="w-20 h-px mx-auto mt-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <p className="text-white/60 text-base md:text-lg leading-relaxed tracking-wide">
            Welcome to the battleground. This isn&apos;t your average cramped club or dingy basement. We&apos;ve secured a massive private farmhouse that sets the perfect tone for an unforgettable night.
          </p>
          <p className="text-white/60 text-base md:text-lg leading-relaxed tracking-wide">
            Sprawling lawns, a stunning swimming pool for the Liquid Rhythm, perfectly tuned acoustics for the DJ set, and enough space to get lost in the chaos. Take a look at where history will be made.
          </p>
        </div>

        {/* Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 group break-inside-avoid"
            >
              <Image
                src={src}
                alt={`Venue Image ${idx + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Glow */}
        <div
          className="w-2/3 h-px mx-auto mt-24"
          style={{
            background:
              "linear-gradient(to right, transparent, #ff2d2d, transparent)",
          }}
        />
      </div>
    </div>
  );
}
