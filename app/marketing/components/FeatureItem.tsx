export default function FeatureItem({
  icon, title, description,
}:{ icon:React.ReactNode; title:string; description:string }) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
