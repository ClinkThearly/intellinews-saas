export default function Badge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
      {text}
    </span>
  );
}
