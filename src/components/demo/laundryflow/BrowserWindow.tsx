import type { ReactNode } from "react";

export default function BrowserWindow({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="w-full rounded-[10px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.1)] flex flex-col bg-[#35363a]">
      <div className="flex items-center h-11 bg-[#202124] pr-2">
        <div className="flex gap-2 px-3.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-end h-full pl-1 flex-1">
          <div className="relative h-[34px] self-end px-3 flex items-center gap-2 bg-[#35363a] rounded-t-lg min-w-[120px] max-w-[220px]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#5f6368] shrink-0" />
            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[12px] text-[#e8eaed]">Track Order</span>
          </div>
        </div>
      </div>
      <div className="h-10 bg-[#35363a] flex items-center gap-1 px-2">
        <div className="w-7 h-7 flex items-center justify-center">
          <span className="w-4 h-4 rounded-full bg-[#9aa0a6] opacity-40" />
        </div>
        <div className="flex-1 h-[30px] rounded-full bg-[#282a2d] flex items-center gap-2 px-3.5 mx-1.5">
          <span className="w-3 h-3 rounded-full bg-[#9aa0a6] opacity-40" />
          <span className="flex-1 text-[13px] text-[#e8eaed]">{url}</span>
        </div>
        <div className="w-7 h-7 flex items-center justify-center">
          <span className="w-4 h-4 rounded-full bg-[#9aa0a6] opacity-40" />
        </div>
      </div>
      <div className="flex-1 bg-white overflow-auto">{children}</div>
    </div>
  );
}
