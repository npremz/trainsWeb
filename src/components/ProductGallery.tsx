import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  titre: string;
}

export default function ProductGallery({ images, titre }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || null);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-white border border-zinc-100 p-12 overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center text-zinc-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-black italic text-zinc-300">Archive Visuelle non disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Image principale avec transition */}
      <div className="aspect-video bg-white border border-zinc-100 p-8 md:p-12 overflow-hidden flex items-center justify-center group relative">
        <img 
          src={mainImage} 
          alt={titre} 
          className="max-w-full max-h-full object-contain grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0"
          key={mainImage} // Force re-render animation
        />
        <div className="absolute bottom-4 right-4 text-[9px] uppercase tracking-widest font-black text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
          Focus Technique
        </div>
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`aspect-square bg-white border p-2 transition-all duration-300 ${
                mainImage === img 
                  ? 'border-zinc-900 shadow-lg scale-95' 
                  : 'border-zinc-100 grayscale hover:grayscale-0 hover:border-zinc-300'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
