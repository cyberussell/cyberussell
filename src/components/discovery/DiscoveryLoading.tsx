export default function DiscoveryLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="w-12 h-12 border-3 border-white/10 border-t-[#FFD23F] rounded-full animate-spin mb-6" />
      <h2 className="font-sans text-[22px] font-bold text-white mb-2 text-center">
        Analyzing your answers...
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 text-center max-w-[360px]">
        Discovering your hidden skills and matching you with the best Career Blueprint.
      </p>
    </div>
  );
}
