import React from 'react';
export default function NewsletterPreview({data}:{data:any}){
  return(
    <div className="border border-white/20 rounded-xl p-6 h-full backdrop-blur-md bg-black/20">
      <p className="text-sm mb-4">Preview for {data.role}</p>
      <div className="h-36 flex items-center justify-center text-gray-500 text-xs">
        Newsletter mock-up
      </div>
    </div>
  )
}
