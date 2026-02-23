"use client";

interface FeaturedMomentProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function FeaturedMoment({
  title,
  date,
  location,
  imageUrl,
  onClick,
}: FeaturedMomentProps) {
  return (
    <section className="mb-12 px-4">
      <div className="relative group overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[21/9] shadow-xl">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          data-alt="Couple holding hands while walking on a beach at sunset"
          style={{
            backgroundImage: `
    linear-gradient(
      to top,
      rgba(0,0,0,0.8) 0%,
      rgba(0,0,0,0.2) 50%,
      rgba(0,0,0,0) 100%
    ),
    url("${imageUrl}")
  `,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">
                Highlight Moment
              </span>
              <h2 className="text-white text-3xl font-bold mb-1">{title}</h2>
              <p className="text-slate-200 font-medium">
                {date} • {location}
              </p>
            </div>

            <button
              onClick={onClick}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all w-fit"
            >
              Xem ảnh
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
