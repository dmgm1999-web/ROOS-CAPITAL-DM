import React, { useState } from 'react';
import { 
  Check, 
  Laptop, 
  Globe, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Building2, 
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Landmark,
  Package
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '../context/LanguageContext';
import { CountryFlag, getCountryInfo } from '../utils/countryUtils';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LocationCheckboxFilterProps {
  defaultSection?: SectionKey;
  availableCategories?: string[];
  selectedCategories?: string[];
  onChangeCategories?: (categories: string[]) => void;
  getCategoryCount?: (cat: string) => number;
  availableCountries: string[];
  availableStates: string[];
  availableMunicipios: string[];
  selectedCountries: string[];
  onChangeCountries: (countries: string[]) => void;
  selectedStates: string[];
  onChangeStates: (states: string[]) => void;
  selectedMunicipios: string[];
  onChangeMunicipios: (municipios: string[]) => void;
  filterRemoto: boolean;
  onChangeRemoto: (val: boolean) => void;
  filterInternacional: boolean;
  onChangeInternacional: (val: boolean) => void;
  filterProveedor: boolean;
  onChangeProveedor: (val: boolean) => void;
  onClearAll: () => void;
  countRemoto: number;
  countInternacional: number;
  countProveedor: number;
  getCountryCount: (c: string) => number;
  getStateCount: (s: string) => number;
  getMunicipioCount: (m: string) => number;
  onClose?: () => void;
  isMobileCompact?: boolean;
}

type SectionKey = 'modalidad' | 'categorias' | 'paises' | 'estados' | 'municipios';

export function LocationCheckboxFilter({
  defaultSection = 'categorias',
  availableCategories = [],
  selectedCategories = [],
  onChangeCategories,
  getCategoryCount: _getCategoryCount,
  availableCountries,
  availableStates,
  availableMunicipios,
  selectedCountries,
  onChangeCountries,
  selectedStates,
  onChangeStates,
  selectedMunicipios,
  onChangeMunicipios,
  filterRemoto,
  onChangeRemoto,
  filterInternacional,
  onChangeInternacional,
  filterProveedor,
  onChangeProveedor,
  onClearAll,
  countRemoto: _countRemoto,
  countInternacional: _countInternacional,
  countProveedor: _countProveedor,
  getCountryCount: _getCountryCount,
  getStateCount: _getStateCount,
  getMunicipioCount: _getMunicipioCount,
  onClose,
  isMobileCompact = false
}: LocationCheckboxFilterProps) {
  const { t, translateCategory, language } = useLanguage();

  // Deduplicate categories by their display name so NO category ever repeats (e.g. Fashion & Accessories)
  const uniqueCategories = React.useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const cat of availableCategories) {
      if (!cat || !cat.trim()) continue;
      const key = translateCategory(cat).toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(cat);
      }
    }
    return result;
  }, [availableCategories, translateCategory]);
  // Accordion behavior: only ONE section open at a time!
  // When another section opens, the previous one automatically closes.
  const [openSection, setOpenSection] = useState<SectionKey | null>(defaultSection);

  const toggleSection = (key: SectionKey) => {
    setOpenSection(prev => (prev === key ? null : key));
  };

  const activeCount = 
    selectedCategories.length +
    selectedCountries.length + 
    selectedStates.length + 
    selectedMunicipios.length + 
    (filterRemoto ? 1 : 0) + 
    (filterInternacional ? 1 : 0) + 
    (filterProveedor ? 1 : 0);

  const isAllLocationsActive = activeCount === 0;

  const toggleItem = (list: string[], item: string, setter?: (items: string[]) => void) => {
    if (!setter) return;
    if (list.includes(item)) {
      setter(list.filter(x => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleCountryToggle = (ctry: string) => {
    if (selectedCountries.includes(ctry)) {
      onChangeCountries([]);
      onChangeStates([]);
      onChangeMunicipios([]);
    } else {
      // Only ONE country at a time: auto-unselects previous country and resets states & municipios
      onChangeCountries([ctry]);
      onChangeStates([]);
      onChangeMunicipios([]);
    }
  };

  const handleStateToggle = (st: string) => {
    if (selectedStates.includes(st)) {
      onChangeStates([]);
      onChangeMunicipios([]);
    } else {
      // Only ONE state at a time: auto-unselects previous state and resets municipios
      onChangeStates([st]);
      onChangeMunicipios([]);
    }
  };

  return (
    <div className={cn(
      "flex flex-col bg-white text-[#E85B81] select-none overflow-hidden",
      isMobileCompact ? "w-full max-h-[82vh]" : "w-80 sm:w-96"
    )}>

      {/* SINGLE scrollable container for the whole filter (no nested scrollbars inside!) */}
      <div className="p-2.5 sm:p-3 flex-1 min-h-0 max-h-[68vh] sm:max-h-[30rem] overflow-y-auto space-y-3 divide-y divide-[#E85B81]/10 overscroll-contain select-none [scrollbar-width:thin] [scrollbar-color:rgba(232,91,129,0.3)_transparent]">
        
        {/* OPTS: Todas las Opciones */}
        <div className="pt-0.5">
          <label 
            onClick={onClearAll}
            className={cn(
              "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
              isAllLocationsActive ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div className={cn(
                "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                isAllLocationsActive 
                  ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                  : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
              )}>
                {isAllLocationsActive && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold text-[#E85B81]">{t('filter.allOptions')}</span>
            </div>
          </label>
        </div>

        {/* SECTION 1: Categorías */}
        {availableCategories.length > 0 && onChangeCategories && (
          <div className="pt-2.5 space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('categorias')}
              className="w-full flex items-center justify-between px-2 py-1 text-[9.5px] font-black uppercase tracking-wider text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <ShoppingBag className="w-3.5 h-3.5 text-[#E85B81] group-hover:text-[#DE4B73] transition-colors shrink-0" />
                <span className="truncate">{t('filter.categories')}</span>
                {selectedCategories.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E85B81] shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {selectedCategories.length > 0 && (
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeCategories([]);
                    }}
                    className="text-[8.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] hover:underline lowercase px-1"
                    title={language === 'en' ? 'Clear categories' : 'Limpiar categorías'}
                  >
                    {t('filter.clear')}
                  </span>
                )}
                {openSection === 'categorias' ? <ChevronDown className="w-3 h-3 text-[#E85B81]" /> : <ChevronRight className="w-3 h-3 text-[#E85B81]" />}
              </div>
            </button>

            {openSection === 'categorias' && (
              <div className="space-y-0.5 pt-1">
                {uniqueCategories.map(cat => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label 
                      key={cat}
                      onClick={() => toggleItem(selectedCategories, cat, onChangeCategories)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                        isChecked ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn(
                          "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                          isChecked 
                            ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                            : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                        )}>
                          {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold truncate text-[#E85B81]">{translateCategory(cat)}</span>
                      </div>
                    </label>
                  );
                })}
                {uniqueCategories.length === 0 && (
                  <div className="px-2 py-3 text-center text-xs text-[#E85B81]/60 italic">
                    {language === 'en' ? 'No categories found' : 'No se encontraron categorías'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: Modalidad y proveedores */}
        <div className="pt-2.5 space-y-1">
          <button
            type="button"
            onClick={() => toggleSection('modalidad')}
            className="w-full flex items-center justify-between px-2 py-1 text-[9.5px] font-black uppercase tracking-wider text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-[#E85B81] group-hover:text-[#DE4B73] transition-colors shrink-0" />
              <span className="truncate">{language === 'en' ? 'Modality & Suppliers' : 'Modalidad y proveedores'}</span>
              {(filterRemoto || filterInternacional || filterProveedor) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E85B81] shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {(filterRemoto || filterInternacional || filterProveedor) && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeRemoto(false);
                    onChangeInternacional(false);
                    onChangeProveedor(false);
                  }}
                  className="text-[8.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] hover:underline lowercase px-1"
                  title={language === 'en' ? 'Clear modality' : 'Limpiar modalidad'}
                >
                  {t('filter.clear')}
                </span>
              )}
              {openSection === 'modalidad' ? <ChevronDown className="w-3 h-3 text-[#E85B81]" /> : <ChevronRight className="w-3 h-3 text-[#E85B81]" />}
            </div>
          </button>

          {openSection === 'modalidad' && (
            <div className="space-y-0.5 pt-0.5">
              {/* Remoto */}
              <label 
                onClick={() => onChangeRemoto(!filterRemoto)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                  filterRemoto ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={cn(
                    "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                    filterRemoto 
                      ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                      : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                  )}>
                    {filterRemoto && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Laptop className="w-3.5 h-3.5 text-[#E85B81] shrink-0" />
                    <span className="text-xs font-semibold text-[#E85B81]">{language === 'en' ? 'Remote / Online' : 'Remoto / En línea'}</span>
                  </div>
                </div>
              </label>

              {/* Internacional */}
              <label 
                onClick={() => onChangeInternacional(!filterInternacional)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                  filterInternacional ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={cn(
                    "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                    filterInternacional 
                      ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                      : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                  )}>
                    {filterInternacional && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-[#E85B81] shrink-0" />
                    <span className="text-xs font-semibold text-[#E85B81]">{t('filter.international')}</span>
                  </div>
                </div>
              </label>

              {/* Proveedor */}
              <label 
                onClick={() => onChangeProveedor(!filterProveedor)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                  filterProveedor ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={cn(
                    "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                    filterProveedor 
                      ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                      : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                  )}>
                    {filterProveedor && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Package className="w-3.5 h-3.5 text-[#E85B81] shrink-0" />
                    <span className="text-xs font-semibold text-[#E85B81]">{language === 'en' ? 'Suppliers' : 'Proveedores'}</span>
                  </div>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* SECTION 3: País */}
        {availableCountries.length > 0 && (
          <div className="pt-2.5 space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('paises')}
              className="w-full flex items-center justify-between px-2 py-1 text-[9.5px] font-black uppercase tracking-wider text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <Globe className="w-3.5 h-3.5 text-[#E85B81] group-hover:text-[#DE4B73] transition-colors shrink-0" />
                <span className="truncate">{language === 'en' ? 'Country' : 'País'}</span>
                {selectedCountries.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E85B81] shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {selectedCountries.length > 0 && (
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeCountries([]);
                      onChangeStates([]);
                      onChangeMunicipios([]);
                    }}
                    className="text-[8.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] hover:underline lowercase px-1"
                    title={language === 'en' ? 'Clear country' : 'Limpiar país'}
                  >
                    {t('filter.clear')}
                  </span>
                )}
                {openSection === 'paises' ? <ChevronDown className="w-3 h-3 text-[#E85B81]" /> : <ChevronRight className="w-3 h-3 text-[#E85B81]" />}
              </div>
            </button>

            {openSection === 'paises' && (
              <div className="space-y-0.5 pt-0.5">
                {availableCountries.map(ctry => {
                  const isChecked = selectedCountries.includes(ctry);
                  return (
                    <label 
                      key={ctry}
                      onClick={() => handleCountryToggle(ctry)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                        isChecked ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                          isChecked 
                            ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                            : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                        )}>
                          {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0 truncate">
                          <CountryFlag countryCode={getCountryInfo(ctry).code} className="w-3.5 h-2.5 sm:w-4 sm:h-3 shrink-0" />
                          <span className="text-xs font-semibold truncate text-[#E85B81]">{ctry}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: Estados */}
        <div className="pt-2.5 space-y-1">
          <button
            type="button"
            onClick={() => toggleSection('estados')}
            className="w-full flex items-center justify-between px-2 py-1 text-[9.5px] font-black uppercase tracking-wider text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Building2 className="w-3.5 h-3.5 text-[#E85B81] group-hover:text-[#DE4B73] transition-colors shrink-0" />
              <span className="truncate">{t('filter.states')}</span>
              {selectedStates.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E85B81] shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {selectedStates.length > 0 && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeStates([]);
                    onChangeMunicipios([]);
                  }}
                  className="text-[8.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] hover:underline lowercase px-1"
                  title={language === 'en' ? 'Clear states' : 'Limpiar estados'}
                >
                  {t('filter.clear')}
                </span>
              )}
              {openSection === 'estados' ? <ChevronDown className="w-3 h-3 text-[#E85B81]" /> : <ChevronRight className="w-3 h-3 text-[#E85B81]" />}
            </div>
          </button>

          {openSection === 'estados' && (
            <div className="space-y-0.5 pt-0.5">
              {selectedCountries.length === 0 ? (
                <div className="p-3 text-center rounded-xl bg-[#E85B81]/5 border border-dashed border-[#E85B81]/30 my-1 flex flex-col items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#E85B81]/10 flex items-center justify-center mb-1 text-[#E85B81]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-[#E85B81]">{language === 'en' ? 'Select a country first' : 'Selecciona primero un país'}</p>
                </div>
              ) : availableStates.length > 0 ? (
                availableStates.map(st => {
                  const isChecked = selectedStates.includes(st);
                  return (
                    <label 
                      key={st}
                      onClick={() => handleStateToggle(st)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                        isChecked ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                          isChecked 
                            ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                            : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                        )}>
                          {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold truncate text-[#E85B81]">{st}</span>
                      </div>
                    </label>
                  );
                })
              ) : (
                <div className="px-2 py-3 text-center text-xs text-[#E85B81]/60 italic">
                  {language === 'en' ? `No states found for ${selectedCountries[0]}` : `No se encontraron estados para ${selectedCountries[0]}`}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 5: Municipios */}
        <div className="pt-2.5 space-y-1">
          <button
            type="button"
            onClick={() => toggleSection('municipios')}
            className="w-full flex items-center justify-between px-2 py-1 text-[9.5px] font-black uppercase tracking-wider text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Landmark className="w-3.5 h-3.5 text-[#E85B81] group-hover:text-[#DE4B73] transition-colors shrink-0" />
              <span className="truncate">{t('filter.municipalities')}</span>
              {selectedMunicipios.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E85B81] shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {selectedMunicipios.length > 0 && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeMunicipios([]);
                  }}
                  className="text-[8.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] hover:underline lowercase px-1"
                  title={language === 'en' ? 'Clear cities' : 'Limpiar municipios'}
                >
                  {t('filter.clear')}
                </span>
              )}
              {openSection === 'municipios' ? <ChevronDown className="w-3 h-3 text-[#E85B81]" /> : <ChevronRight className="w-3 h-3 text-[#E85B81]" />}
            </div>
          </button>

          {openSection === 'municipios' && (
            <div className="space-y-0.5 pt-1">
              {selectedStates.length === 0 ? (
                <div className="p-3 text-center rounded-xl bg-[#E85B81]/5 border border-dashed border-[#E85B81]/30 my-1 flex flex-col items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#E85B81]/10 flex items-center justify-center mb-1 text-[#E85B81]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-[#E85B81]">{language === 'en' ? 'Select a state first' : 'Selecciona primero un estado'}</p>
                </div>
              ) : availableMunicipios.length > 0 ? (
                availableMunicipios.map(mun => {
                  const isChecked = selectedMunicipios.includes(mun);
                  return (
                    <label 
                      key={mun}
                      onClick={() => toggleItem(selectedMunicipios, mun, onChangeMunicipios)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group",
                        isChecked ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn(
                          "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                          isChecked 
                            ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                            : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                        )}>
                          {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold truncate text-[#E85B81]">{mun}</span>
                      </div>
                    </label>
                  );
                })
              ) : (
                <div className="px-2 py-3 text-center text-xs text-[#E85B81]/60 italic">
                  {language === 'en' ? `No cities found for ${selectedStates[0]}` : `No se encontraron municipios para ${selectedStates[0]}`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer bar with active filter count legend and done button */}
      {onClose && (
        <div className="p-2 sm:p-2.5 border-t border-[#E85B81]/15 bg-[#FFF9FB] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] sm:text-xs text-[#E85B81] font-bold px-1">
              {activeCount === 0 ? (language === 'en' ? '0 active filters' : '0 filtros activos') : `${activeCount} ${language === 'en' ? (activeCount > 1 ? 'active filters' : 'active filter') : (activeCount > 1 ? 'filtros activos' : 'filtro activo')}`}
            </span>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="flex items-center gap-1 text-[9.5px] sm:text-[10.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-[#E85B81]/10"
                title={language === 'en' ? 'Uncheck all options' : 'Deseleccionar todas las casillas'}
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>{language === 'en' ? 'Clear' : 'Limpiar'}</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 shrink-0"
          >
            {language === 'en' ? 'Done' : 'Listo'}
          </button>
        </div>
      )}
    </div>
  );
}
