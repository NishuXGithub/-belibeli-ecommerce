import type { ElementType } from "react";

type Option = string | {
  label: string;
  value: string;
};

type PlainSelectProps = {
  label: string;
  icon: ElementType;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PlainSelect({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}: PlainSelectProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#475569]">
        {label}
      </label>

      <div className="relative border-b border-[#CBD5E1] pb-1 transition focus-within:border-[#00A63E]">
        <Icon
          size={15}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-full appearance-none bg-transparent pl-6 pr-3 text-[13px] font-medium text-[#172033] outline-none"
        >
          {options.map((item) => {
            const label = typeof item === "string" ? formatStatus(item) : item.label;
            const optionValue = typeof item === "string" ? item : item.value;

            return (
              <option key={optionValue} value={optionValue}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}