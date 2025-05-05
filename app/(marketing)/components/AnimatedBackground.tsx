export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 opacity-20 animate-[gradient_15s_ease_infinite]" style={{background:'linear-gradient(125deg,#121212 0%,#2d1b69 25%,#121212 50%,#1a0b2e 75%,#121212 100%)',backgroundSize:'400% 400%'}}/>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(rgba(255,255,255,0.1) 1px,transparent 1px)',backgroundSize:'30px 30px'}}/>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-600 opacity-10 blur-3xl"/>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-600 opacity-5 blur-3xl"/>
    </div>
  );
}
