import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, KeyRound, Sparkles, CheckCircle2, AlertCircle, Copy, Check, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  getDevicePersonalCode, 
  normalizeRoosCode, 
  isValidStrictRoosCode,
  fetchFavoritesByCode, 
  setDevicePersonalCode 
} from '../utils/favorites';

interface LoginModalProps {
  onClose: () => void;
  currentFavorites: string[];
  onFavoritesLoaded: (newFavorites: string[]) => void;
}

export default function LoginModal({ 
  onClose, 
  currentFavorites,
  onFavoritesLoaded 
}: LoginModalProps) {
  const { t, language } = useLanguage();
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deviceCode = getDevicePersonalCode();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const raw = inputKey.trim();
    if (!raw) {
      setError(language === 'en' ? 'Please enter your Personal ROOS Key' : 'Por favor ingresa tu Clave Personal ROOS');
      return;
    }

    if (!isValidStrictRoosCode(raw)) {
      setError(
        language === 'en'
          ? 'Invalid format. You must enter the complete code: ROOS-XXXX-FAVS (e.g. ROOS-8K2P-FAVS)'
          : 'Formato inválido. Debes ingresar el código completo: ROOS-XXXX-FAVS (ejemplo: ROOS-8K2P-FAVS)'
      );
      return;
    }

    const normalized = normalizeRoosCode(raw);
    setIsLoading(true);

    try {
      const favorites = await fetchFavoritesByCode(normalized);

      if (!favorites || favorites.length === 0) {
        setError(
          language === 'en'
            ? 'No saved favorites found for this key. Please verify the code and try again.'
            : 'No se encontraron favoritas para esta clave. Verifica el código e intenta de nuevo.'
        );
        setIsLoading(false);
        return;
      }

      // Set this code as active on this device
      setDevicePersonalCode(normalized);
      onFavoritesLoaded(favorites);
      setSuccessCount(favorites.length);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(
        language === 'en'
          ? 'Error verifying key. Please try again.'
          : 'Error al verificar la clave. Por favor intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(deviceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#351B25]/50 backdrop-blur-xs"
        id="login-modal-backdrop"
      />

      {/* Unified Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative z-10 w-full max-w-[460px] bg-gradient-to-b from-white via-white to-[#FFF8F9] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#E85B81]/30 shadow-[0_25px_60px_rgba(232,91,129,0.22)] overflow-hidden text-neutral-800"
        id="login-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#FCE8EF] hover:bg-[#F8D4E2] text-[#E85B81] flex items-center justify-center transition-all cursor-pointer z-20"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="w-16 h-16 bg-[#FCE8EF] rounded-full flex items-center justify-center mb-4 text-[#E85B81] shadow-xs">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#18181B] mb-2">
              {t('login.success')}
            </h3>
            <p className="text-xs text-neutral-600 font-sans max-w-xs">
              {language === 'en'
                ? `Loaded ${successCount} favorite businesses into your session.`
                : `Se cargaron ${successCount} marcas favoritas en tu sesión.`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center mx-auto mb-2.5">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#18181B]">
                {language === 'en' ? 'Log In' : 'Iniciar Sesión'}
              </h3>
              <p className="text-xs text-neutral-500 font-sans max-w-xs mx-auto">
                {language === 'en'
                  ? 'Enter your Personal ROOS Key to load your favorite brands on this device.'
                  : 'Ingresa tu Clave Personal ROOS para cargar tus marcas favoritas en este dispositivo.'}
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* UNIFIED ROW: PERSONAL KEY INPUT & LOGIN BUTTON */}
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  {language === 'en' ? 'Personal ROOS Key' : 'Clave Personal ROOS'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputKey}
                    onChange={(e) => {
                      setInputKey(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Ejemplo: ROOS-8K2P-FAVS"
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-neutral-300 text-sm font-mono uppercase tracking-wider text-neutral-900 bg-white focus:outline-none focus:border-[#E85B81] focus:ring-2 focus:ring-[#E85B81]/20 transition-all placeholder:normal-case placeholder:tracking-normal placeholder:font-sans placeholder:text-neutral-400"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {/* Login Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-full bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>{language === 'en' ? 'Verifying...' : 'Verificando...'}</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'en' ? 'Log In' : 'Iniciar Sesión'}</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* UNIFIED EXPLANATION & DEVICE KEY SECTION (What was previously in "My Access Code") */}
            <div className="pt-3 border-t border-[#EFE8DF] space-y-3">
              <div className="p-3.5 bg-white rounded-2xl border border-[#E85B81]/30 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                  <div className="flex items-center gap-1.5 text-neutral-800">
                    <Heart className="w-3.5 h-3.5 text-[#E85B81] fill-[#E85B81]" />
                    <span>{language === 'en' ? 'Your Key on this device:' : 'Tu Clave Personal en este dispositivo:'}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FCE8EF] text-[#E85B81] font-bold">
                    {currentFavorites.length} {language === 'en' ? 'favorites' : 'favoritas'}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
                  {language === 'en'
                    ? 'This key contains all your saved favorites. Use it to log in on any phone or computer without creating passwords.'
                    : 'Esta clave contiene todas tus marcas favoritas guardadas. Úsala para acceder desde cualquier teléfono o computadora sin crear contraseñas.'}
                </p>

                {/* Code Box: ROOS-XXXX-FAVS */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-neutral-900 truncate select-all tracking-wider text-center">
                    {deviceCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3.5 py-2 bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    title={language === 'en' ? 'Copy Key' : 'Copiar Clave'}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (language === 'en' ? 'Copied!' : '¡Copiado!') : (language === 'en' ? 'Copy' : 'Copiar')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
