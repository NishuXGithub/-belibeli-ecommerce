import type { ElementType } from "react";

type BorrowPointProps = {
  icon: ElementType;
  title: string;
  text: string;
};

export default function BorrowPoint({
  icon: Icon,
  title,
  text,
}: BorrowPointProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#008A2E] shadow-sm">
        <Icon size={19} />
      </div>

      <div>
        <h4 className="text-sm font-black text-[#172033]">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-[#64748B]">{text}</p>
      </div>
    </div>
  );
}


