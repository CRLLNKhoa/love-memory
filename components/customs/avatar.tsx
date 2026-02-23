type CoupleHeroProps = {
  girlName: string;
  boyName: string;
  since: string;
  quote: string;
  girlAvatar: string;
  boyAvatar: string;
};

export default function Avatar({
  girlName,
  boyName,
  since,
  quote,
  girlAvatar,
  boyAvatar,
}: CoupleHeroProps) {
  return (
    <div className="relative mt-4 px-4 md:px-8 flex flex-col items-center">
      {/* Twin Avatar Cluster */}
      <div className="flex items-center justify-center">
        {/* Girl */}
        <div className="relative z-10">
          <div className="size-32 md:size-40 rounded-full border-4 border-background-light bg-slate-200 overflow-hidden shadow-xl ring-2 ring-primary/20">
            <img
              src={boyAvatar}
              alt={boyName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Boy */}
        <div className="relative z-20 -ml-8">
          <div className="size-32 md:size-40 rounded-full border-4 border-background-light bg-slate-200 overflow-hidden shadow-xl ring-2 ring-primary/20">
            <img
              src={girlAvatar}
              alt={girlName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Names */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            {boyName}
          </h1>

          <span className="material-symbols-outlined text-primary text-3xl animate-pulse">
            ˗ˋˏ ♡ ˎˊ˗
          </span>

          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            {girlName}
          </h1>
        </div>

        <p className="mt-3 text-slate-500 italic max-w-sm mx-auto">"{quote}"</p>
      </div>
    </div>
  );
}
