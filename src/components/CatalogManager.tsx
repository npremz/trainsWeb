import React, { useState, useMemo } from 'react';

interface Annonce {
  id: string;
  data: {
    titre: string;
    prix: number;
    echelle: string;
    systeme: string;
    etat: string;
    images?: string[];
  };
}

interface Props {
  annonces: Annonce[];
}

export default function CatalogManager({ annonces }: Props) {
  const [filterEchelle, setFilterEchelle] = useState('all');
  const [filterSysteme, setFilterSysteme] = useState('all');

  const filteredAnnonces = useMemo(() => {
    return annonces.filter(annonce => {
      const matchEchelle = filterEchelle === 'all' || annonce.data.echelle === filterEchelle;
      const matchSysteme = filterSysteme === 'all' || annonce.data.systeme === filterSysteme;
      return matchEchelle && matchSysteme;
    });
  }, [annonces, filterEchelle, filterSysteme]);

  const echelles = ['HO', 'N', 'Z', 'O'];
  const systemes = [
    { id: '2-rails-dc', label: '2L DC' },
    { id: '2-rails-dcc', label: '2L DCC' },
    { id: '3-rails-ac', label: '3L AC' }
  ];

  return (
    <div className="space-y-20">
      {/* Barre de filtres */}
      <div className="flex flex-wrap gap-x-12 gap-y-8 border-b border-zinc-100 pb-12 font-sans">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-4">Filtrer par Échelle</span>
          <div className="flex gap-4">
            <button 
              onClick={() => setFilterEchelle('all')}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${filterEchelle === 'all' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
            >
              Toutes
            </button>
            {echelles.map(e => (
              <button 
                key={e}
                onClick={() => setFilterEchelle(e)}
                className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${filterEchelle === e ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-4">Système de traction</span>
          <div className="flex gap-4">
            <button 
              onClick={() => setFilterSysteme('all')}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${filterSysteme === 'all' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
            >
              Tous
            </button>
            {systemes.map(s => (
              <button 
                key={s.id}
                onClick={() => setFilterSysteme(s.id)}
                className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${filterSysteme === s.id ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto self-end">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {filteredAnnonces.length} résultat{filteredAnnonces.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grille de produits */}
      <div className="grid md:grid-cols-3 gap-x-12 gap-y-24">
        {filteredAnnonces.map(annonce => (
          <div key={annonce.id} className="group fade-in">
            <a href={`/annonces/${annonce.id}`}>
              <div className="aspect-square bg-white border border-zinc-100 p-8 mb-8 relative transition-all group-hover:shadow-2xl group-hover:shadow-zinc-200/50">
                {annonce.data.images?.[0] ? (
                  <img src={annonce.data.images[0]} alt={annonce.data.titre} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-black italic text-zinc-300">Archive Visuelle</span>
                  </div>
                )}
                <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-200">REF-{annonce.id.substring(0,6).toUpperCase()}</span>
              </div>

              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-sm font-black uppercase tracking-tight group-hover:underline decoration-zinc-400 underline-offset-4 leading-tight">{annonce.data.titre}</h3>
                  <span className="text-sm font-medium text-zinc-900 leading-none mt-0.5 whitespace-nowrap">{annonce.data.prix}€</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-widest font-black text-zinc-300 border-t border-zinc-50 pt-4">
                  <span className="text-zinc-900">{annonce.data.echelle}</span>
                  <span className="text-zinc-100">/</span>
                  <span>{annonce.data.systeme}</span>
                  <span className="text-zinc-100">/</span>
                  <span className="italic font-bold">{annonce.data.etat}</span>
                </div>
              </div>
            </a>
            <button
              className="snipcart-add-item mt-6 w-full bg-zinc-900 text-white py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-700 transition-all"
              data-item-id={annonce.id}
              data-item-name={annonce.data.titre}
              data-item-price={annonce.data.prix}
              data-item-url={`/annonces/${annonce.id}`}
              data-item-description={`Échelle ${annonce.data.echelle} • ${annonce.data.etat}`}
              data-item-image={annonce.data.images?.[0] || ''}
              data-item-quantity={1}
              data-item-max-quantity={1}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>

      {filteredAnnonces.length === 0 && (
        <div className="py-40 text-center border border-dashed border-zinc-100">
          <p className="text-zinc-400 italic font-serif text-xl">Aucune pièce ne correspond à ces critères dans l'archive.</p>
          <button 
            onClick={() => { setFilterEchelle('all'); setFilterSysteme('all'); }}
            className="mt-6 text-[10px] font-black uppercase tracking-widest border-b border-zinc-900 pb-1"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
