interface Item {
  id: string;
  src: string;
  label: string;
}

interface SelectionCardProps {
  item: Item;
  name: string;
  selected: boolean;
  onChange: (id: string) => void;
}

const SelectionCard = ({ item, name, selected, onChange }: SelectionCardProps) => {
  return (
    <label className={`flex flex-col items-center gap-2 p-3 border-2 cursor-pointer transition-colors
      ${selected ? "border-red-600 bg-red-950/20" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
    >
      <input
        type="radio"
        name={name}
        value={item.id}
        checked={selected}
        onChange={() => onChange(item.id)}
        className="hidden"
      />
      <img src={item.src} alt={item.label} className="w-20 h-20 object-contain" />
      <span className={`text-xs tracking-widest uppercase ${selected ? "text-white" : "text-zinc-400"}`}>
        {item.label}
      </span>
    </label>
  );
};

export default SelectionCard;