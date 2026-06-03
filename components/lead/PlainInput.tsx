import type { ElementType } from "react";

type PlainInputProps = {
  label: string;
  required?: boolean;
  icon: ElementType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PlainInput({
  label,
  required,
  icon: Icon,
  placeholder,
  value,
  onChange,
}: PlainInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#475569]">
        {label} {required && <span className="text-[#00A63E]">*</span>}
      </label>

      <div className="relative border-b border-[#CBD5E1] pb-1 transition focus-within:border-[#00A63E]">
        <Icon
          size={15}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-8 w-full bg-transparent pl-6 pr-3 text-[13px] font-medium text-[#172033] outline-none placeholder:text-[13px] placeholder:font-normal placeholder:text-[#B8C2CC]"
        />
      </div>
    </div>
  );
}