import { useEffect, useRef } from "react";

type Shortcut = {
  keys: string;
  description: string;
};

const shortcuts: Shortcut[] = [
  { keys: "alt + w", description: "hide custom cursor" },
  { keys: "alt + a", description: "switch theme" },
  { keys: "alt + d", description: "view resume in new tab" },
  { keys: "Esc", description: "Close modal" },
];

type Props = {
  onClose: () => void;
};

const ShortcutModal = ({ onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-[420px] rounded-lg bg-zinc-900 text-zinc-100 shadow-xl p-5"
      >
        <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
          Keyboard Shortcuts
        </h2>

        <ul className="space-y-3 text-sm">
          {shortcuts.map((s, i) => (
            <li key={i} className="flex justify-between">
              <kbd className="px-2 py-1 rounded bg-zinc-800 text-xs font-mono">
                {s.keys}
              </kbd>
              <span className="text-zinc-400">{s.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShortcutModal;
