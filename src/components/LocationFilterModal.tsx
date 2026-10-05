import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Check, 
  X, 
  Search, 
  Laptop, 
  Globe, 
  Sparkles, 
  RotateCcw,
  Building2,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

export interface LocationFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountries: string[];
  onToggleCountry: (country: string) => void;
  selectedStates: string[];
  onToggleState: (state: string) => void;
  selectedMunicipios: string[];
  onToggleMunicipio: (municipio: string) => void;
  filterRemoto: boolean;
  onToggleRemoto: () => void;
  filterInternacional: boolean;
  onToggleInternacional: () => void;
  filterProveedor: boolean;
  onToggleProveedor: () => void;
  onClearAll: () => void;
  availableCountries: string[];
  availableStates: string[];
  availableMunicipios: string[];
  countryCounts: Record<string, number>;
  stateCounts: Record<string, number>;
  municipioCounts: Record<string, number>;
  countRemoto: number;
  countInternacional: number;
  countProveedor: number;
  totalResultsCount: number;
}

export function LocationFilterPopover({
  isOpen,
  onClose,
  selectedCountries,
  onToggleCountry,
  selectedStates,
  onToggleState,
  selectedMunicipios,
  onToggleMunicipio,
  filterRemoto,
  onToggleRemoto,
  filterInternacional,
  onToggleInternacional,
  filterProveedor,
  onToggleProveedor,
  onClearAll,
  availableCountries,
  availableStates,
  availableMunicipios,
  countryCounts,
  stateCounts,
  municipioCounts,
  countRemoto,
  countInternacional,
  countProveedor,
  totalResultsCount
}: LocationFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'modality' | 'geo'>('all');
  const [expandedSections, setExpandedSections] = useState({
    modality: true,
    country: true,
    state: true,
    municipio: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const totalActiveFilters = 
    selectedCountries.length + 
    selectedStates.length + 
    selectedMunicipios.length + 
    (filterRemoto ? 1 : 0) + 
    (filterInternacional ? 1 : 0) + 
    (filterProveedor ? 1 : 0);

  // Filter lists based on internal search query
  const queryLower = searchQuery.toLowerCase().trim();

  const filteredCountries = useMemo(() => {
    if (!queryLower) return availableCountries;
    return availableCountries.filter(c => c.toLowerCase().includes(queryLower));
  }, [availableCountries, queryLower]);

  const filteredStates = useMemo(() => {
    if (!queryLower) return availableStates;
    return availableStates.filter(s => s.toLowerCase().includes(queryLower));
  }, [availableStates, queryLower]);

  const filteredMunicipios = useMemo(() => {
    if (!queryLower) return availableMunicipios;
    return availableMunicipios.filter(m => m.toLowerCase().includes(queryLower));
  }, [availableMunicipios, queryLower]);

  const showModalitySection = !queryLower || 
    'proveedor'.includes(queryLower) || 
    'remoto'.includes(queryLower) || 
    'online'.includes(queryLower) || 
    'internacional'.includes(queryLower);

  if (!isOpen) return null;

  return (
    <>
      {/* Click-away backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] md:bg-transparent"
        onClick={onClose}
        id="location-filter-backdrop"
      />

      {/* Popover / Dropdown container */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed inset-x-2 bottom-2 top-auto max-h-[85vh] sm:static sm:inset-auto sm:absolute sm:top-full sm:right-0 sm:left-auto sm:mt-2 w-auto sm:w-[440px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-wine/15 z-50 flex flex-col overflow-hidden text-brand-wine"
        id="location-filter-popover"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-brand-wine/10 bg-gradient-to-r from-rose-50/70 via-white to-orange-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-brand-wine uppercase tracking-tight flex items-center gap-1.5">
                <span>Filtros de Ubicación</span>
                {totalActiveFilters > 0 && (
                  <span className="bg-brand-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    {totalActiveFilters}
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-brand-wine/60 font-medium">
                Selecciona casillas para filtrar tus resultados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {totalActiveFilters > 0 && (
              <button
                onClick={onClearAll}
                className="text-[11px] font-bold text-brand-orange hover:text-brand-wine flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-brand-orange/10 transition-colors"
                title="Limpiar todas las casillas"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-brand-wine transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search inside Filter */}
        <div className="px-3.5 pt-3 pb-2 shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar país, estado o municipio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50/80 border border-neutral-200 focus:border-brand-orange rounded-xl pl-8 pr-7 py-1.5 text-xs text-brand-wine placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-neutral-400 hover:text-neutral-600 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Filter Options */}
        <div className="flex-1 overflow-y-auto px-3.5 py-1 divide-y divide-neutral-100 space-y-3">
          
          {/* SECTION 1: MODALIDAD Y TIPO (Proveedor, Remoto, Internacional) */}
          {showModalitySection && (
            <div className="pt-2">
              <div 
                onClick={() => toggleSection('modality')}
                className="flex items-center justify-between py-1 cursor-pointer select-none group"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-wine/70 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-orange" />
                  Modalidad y Tipo
                  {(filterProveedor || filterRemoto || filterInternacional) && (
                    <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  )}
                </span>
                <button className="text-neutral-400 group-hover:text-brand-wine">
                  {expandedSections.modality ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSections.modality && (
                <div className="grid grid-cols-1 gap-1.5 mt-1.5">
                  {/* PROVEEDOR CHECKBOX */}
                  {(!queryLower || 'proveedor'.includes(queryLower) || 'proveedores'.includes(queryLower)) && (
                    <label 
                      className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer select-none ${
                        filterProveedor 
                          ? 'bg-orange-50/90 border-orange-400 shadow-2xs' 
                          : 'bg-white border-neutral-200/80 hover:bg-orange-50/40 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div 
                          onClick={(e) => { e.preventDefault(); onToggleProveedor(); }}
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            filterProveedor 
                              ? 'bg-orange-500 border-orange-500 text-white shadow-xs' 
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {filterProveedor && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-brand-wine">Proveedor</span>
                            <span className="text-[8px] font-extrabold uppercase bg-orange-500 text-white px-1.5 py-0.2 rounded tracking-wider">
                              Naranja
                            </span>
                          </div>
                          <span className="text-[9.5px] text-brand-wine/60 font-medium">
                            Anuncios con etiqueta oficial de proveedor
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        filterProveedor 
                          ? 'bg-orange-200 text-orange-900' 
                          : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {countProveedor}
                      </span>
                    </label>
                  )}

                  {/* REMOTO / ONLINE CHECKBOX */}
                  {(!queryLower || 'remoto'.includes(queryLower) || 'online'.includes(queryLower) || 'en linea'.includes(queryLower)) && (
                    <label 
                      className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer select-none ${
                        filterRemoto 
                          ? 'bg-emerald-50/90 border-emerald-400 shadow-2xs' 
                          : 'bg-white border-neutral-200/80 hover:bg-emerald-50/40 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div 
                          onClick={(e) => { e.preventDefault(); onToggleRemoto(); }}
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            filterRemoto 
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {filterRemoto && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <Laptop className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-xs font-bold text-brand-wine">Remoto / En línea</span>
                          </div>
                          <span className="text-[9.5px] text-brand-wine/60 font-medium">
                            Servicios por internet o atención a distancia
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        filterRemoto 
                          ? 'bg-emerald-200 text-emerald-900' 
                          : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {countRemoto}
                      </span>
                    </label>
                  )}

                  {/* INTERNACIONAL CHECKBOX */}
                  {(!queryLower || 'internacional'.includes(queryLower) || 'global'.includes(queryLower) || 'exterior'.includes(queryLower)) && (
                    <label 
                      className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer select-none ${
                        filterInternacional 
                          ? 'bg-blue-50/90 border-blue-400 shadow-2xs' 
                          : 'bg-white border-neutral-200/80 hover:bg-blue-50/40 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div 
                          onClick={(e) => { e.preventDefault(); onToggleInternacional(); }}
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            filterInternacional 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {filterInternacional && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs font-bold text-brand-wine">Internacional</span>
                          </div>
                          <span className="text-[9.5px] text-brand-wine/60 font-medium">
                            Con cobertura, clientes o envíos en el extranjero
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        filterInternacional 
                          ? 'bg-blue-200 text-blue-900' 
                          : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {countInternacional}
                      </span>
                    </label>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: PAÍSES (Casillas de verificación) */}
          {filteredCountries.length > 0 && (
            <div className="pt-2">
              <div 
                onClick={() => toggleSection('country')}
                className="flex items-center justify-between py-1 cursor-pointer select-none group"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-[#E85B81]" />
                  País
                  {selectedCountries.length > 0 && (
                    <span className="bg-[#E85B81] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      {selectedCountries.length}
                    </span>
                  )}
                </span>
                <button className="text-neutral-400 group-hover:text-[#E85B81]">
                  {expandedSections.country ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSections.country && (
                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                  {filteredCountries.map(country => {
                    const isSelected = selectedCountries.includes(country);
                    const count = countryCounts[country] || 0;
                    return (
                      <label 
                        key={country}
                        onClick={(e) => { e.preventDefault(); onToggleCountry(country); }}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                          isSelected 
                            ? 'bg-[#FCE8EF] border-[#E85B81] font-bold text-[#E85B81]' 
                            : 'bg-white border-neutral-200/80 hover:border-[#E85B81]/40 text-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#E85B81] border-[#E85B81] text-white' : 'border-neutral-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{country}</span>
                        </div>
                        <span className="text-[9px] font-bold text-neutral-400 ml-1">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: ESTADOS (Casillas de verificación) */}
          {filteredStates.length > 0 && (
            <div className="pt-2">
              <div 
                onClick={() => toggleSection('state')}
                className="flex items-center justify-between py-1 cursor-pointer select-none group"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-[#E85B81]" />
                  Estado
                  {selectedStates.length > 0 && (
                    <span className="bg-[#E85B81] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      {selectedStates.length}
                    </span>
                  )}
                </span>
                <button className="text-neutral-400 group-hover:text-[#E85B81]">
                  {expandedSections.state ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSections.state && (
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 max-h-44 overflow-y-auto pr-1">
                  {filteredStates.map(state => {
                    const isSelected = selectedStates.includes(state);
                    const count = stateCounts[state] || 0;
                    return (
                      <label 
                        key={state}
                        onClick={(e) => { e.preventDefault(); onToggleState(state); }}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                          isSelected 
                            ? 'bg-[#FCE8EF] border-[#E85B81] font-bold text-[#E85B81]' 
                            : 'bg-white border-neutral-200/80 hover:border-[#E85B81]/40 text-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#E85B81] border-[#E85B81] text-white' : 'border-neutral-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{state}</span>
                        </div>
                        <span className="text-[9px] font-bold text-neutral-400 ml-1">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: MUNICIPIOS (Casillas de verificación) */}
          {filteredMunicipios.length > 0 && (
            <div className="pt-2">
              <div 
                onClick={() => toggleSection('municipio')}
                className="flex items-center justify-between py-1 cursor-pointer select-none group"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#E85B81]" />
                  Municipio
                  {selectedMunicipios.length > 0 && (
                    <span className="bg-[#E85B81] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      {selectedMunicipios.length}
                    </span>
                  )}
                </span>
                <button className="text-neutral-400 group-hover:text-[#E85B81]">
                  {expandedSections.municipio ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSections.municipio && (
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 max-h-44 overflow-y-auto pr-1">
                  {filteredMunicipios.map(municipio => {
                    const isSelected = selectedMunicipios.includes(municipio);
                    const count = municipioCounts[municipio] || 0;
                    return (
                      <label 
                        key={municipio}
                        onClick={(e) => { e.preventDefault(); onToggleMunicipio(municipio); }}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                          isSelected 
                            ? 'bg-[#FCE8EF] border-[#E85B81] font-bold text-[#E85B81]' 
                            : 'bg-white border-neutral-200/80 hover:border-[#E85B81]/40 text-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#E85B81] border-[#E85B81] text-white' : 'border-neutral-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{municipio}</span>
                        </div>
                        <span className="text-[9px] font-bold text-neutral-400 ml-1">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#E85B81]/15 bg-neutral-50/80 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-neutral-600 font-semibold">
            {totalActiveFilters === 0 ? (
              <span>Sin filtros activos</span>
            ) : (
              <span className="text-[#E85B81] font-bold">
                {totalActiveFilters} {totalActiveFilters === 1 ? 'filtro seleccionado' : 'filtros seleccionados'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {totalActiveFilters > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 text-xs font-bold text-neutral-600 hover:text-[#E85B81] bg-white border border-neutral-200 rounded-xl transition-all"
              >
                Limpiar
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#E85B81] hover:bg-[#DE4B73] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Ver resultados ({totalResultsCount})</span>
            </button>
          </div>
        </div>

      </motion.div>
    </>
  );
}
