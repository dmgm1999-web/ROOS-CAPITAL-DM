import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import path from "path";
import fs from "fs";
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support parsing JSON body
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Persistent Favorites Storage (Zero-cost, client/server file storage)
  const favoritesStorePath = path.join(process.cwd(), 'data', 'favorites-store.json');
  const favoritesMap = new Map<string, string[]>();

  try {
    if (fs.existsSync(favoritesStorePath)) {
      const raw = fs.readFileSync(favoritesStorePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        for (const [k, v] of Object.entries(parsed)) {
          if (Array.isArray(v)) favoritesMap.set(k.toUpperCase(), v as string[]);
        }
      }
    }
  } catch (e) {
    console.warn('[server] Error reading favorites store:', e);
  }

  function persistFavorites() {
    try {
      const dir = path.dirname(favoritesStorePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const obj: Record<string, string[]> = {};
      for (const [k, v] of favoritesMap.entries()) {
        obj[k] = v;
      }
      fs.writeFileSync(favoritesStorePath, JSON.stringify(obj, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[server] Error writing favorites store:', e);
    }
  }

  app.get("/api/favorites", (req, res) => {
    const rawCode = String(req.query.code || '').trim().toUpperCase();
    if (!rawCode || !/^ROOS-([A-Z0-9]{4}|[A-Z0-9]{8})-FAVS$/i.test(rawCode)) {
      return res.status(400).json({ error: "Invalid code format. Expected ROOS-XXXX-FAVS or ROOS-XXXXXXXX-FAVS", favorites: [] });
    }
    const favorites = favoritesMap.get(rawCode) || [];
    return res.json({ code: rawCode, favorites });
  });

  app.post("/api/favorites", (req, res) => {
    const { code, favorites } = req.body || {};
    if (!code || !Array.isArray(favorites)) {
      return res.status(400).json({ error: "Code and favorites required" });
    }
    const cleanCode = String(code).trim().toUpperCase();
    if (!/^ROOS-([A-Z0-9]{4}|[A-Z0-9]{8})-FAVS$/i.test(cleanCode)) {
      return res.status(400).json({ error: "Invalid code format. Expected ROOS-XXXX-FAVS or ROOS-XXXXXXXX-FAVS" });
    }
    favoritesMap.set(cleanCode, favorites);
    persistFavorites();
    return res.json({ success: true, code: cleanCode, count: favorites.length });
  });

  // Real-time active visitor tracking (counts real visitors entering and browsing the site)
  const activeSessions = new Map<string, number>();
  const SESSION_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes active window

  app.post("/api/visitors/ping", (req, res) => {
    const sessionId = String(req.body?.sessionId || req.ip || Math.random().toString(36).substring(2)).trim();
    const now = Date.now();
    activeSessions.set(sessionId, now);

    // Clean up stale sessions
    for (const [id, lastSeen] of activeSessions.entries()) {
      if (now - lastSeen > SESSION_TIMEOUT_MS) {
        activeSessions.delete(id);
      }
    }

    res.json({
      activeCount: Math.max(1, activeSessions.size)
    });
  });

  app.get("/api/visitors/stats", (req, res) => {
    const now = Date.now();
    for (const [id, lastSeen] of activeSessions.entries()) {
      if (now - lastSeen > SESSION_TIMEOUT_MS) {
        activeSessions.delete(id);
      }
    }
    res.json({
      activeCount: Math.max(1, activeSessions.size)
    });
  });

  // Real-time in-memory cache system for Google Sheets data (TTL: 60 seconds)
  interface CacheEntry {
    data: string;
    timestamp: number;
  }
  const memoryCache = new Map<string, CacheEntry>();
  const CACHE_TTL_MS = 60000; // 60 seconds cache duration for fresh data

  // Config sheet ("elementos") containing country documents in column DIRECTORIO and country codes in CSV PAIS
  const configUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTyC2jBz4JtAra4VtCNQSbCyDf28VB7Her9WpYdfuOS1eTBY9lY5ygYT9wDHUIbG4PvGlYEgDvpu6OT/pub?gid=859336638&single=true&output=csv';
  
  // Sheet "anuncios alianza" (formerly "anuncios del mes" / diamonds)
  const alianzaSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTyC2jBz4JtAra4VtCNQSbCyDf28VB7Her9WpYdfuOS1eTBY9lY5ygYT9wDHUIbG4PvGlYEgDvpu6OT/pub?sheet=anuncios+alianza&output=csv';
  const diamondsSheetUrl = alianzaSheetUrl;
  
  const directoryCacheKey = 'unified_directory_data';
  const unifiedDirectoryFilePath = path.join(process.cwd(), 'data', 'cache-sheet-primary.csv');
  const countrySheetsDir = path.join(process.cwd(), 'data', 'country-sheets');

  const sheetDiskCacheMap: Record<string, string> = {
    [directoryCacheKey]: unifiedDirectoryFilePath,
    [alianzaSheetUrl]: path.join(process.cwd(), 'data', 'cache-sheet-alianza.csv'),
    [configUrl]: path.join(process.cwd(), 'data', 'cache-sheet-config.csv'),
  };

  // Seed memory cache immediately from disk if available
  for (const [url, filePath] of Object.entries(sheetDiskCacheMap)) {
    try {
      if (fs.existsSync(filePath)) {
        const text = fs.readFileSync(filePath, 'utf-8');
        if (text && text.length > 50 && !text.trim().startsWith("<!DOCTYPE")) {
          memoryCache.set(url, { data: text, timestamp: Date.now() });
        }
      }
    } catch (e) {
      // Ignore initial disk read error
    }
  }

  function saveSheetToDisk(url: string, text: string) {
    try {
      const filePath = sheetDiskCacheMap[url];
      if (filePath) {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, text, 'utf-8');
      }
    } catch (e) {
      // Ignore disk write error
    }
  }

  function getDiskOrMemoryFallback(url: string): string {
    const mem = memoryCache.get(url);
    if (mem && mem.data && mem.data.length > 50) return mem.data;

    try {
      const filePath = sheetDiskCacheMap[url];
      if (filePath && fs.existsSync(filePath)) {
        const text = fs.readFileSync(filePath, 'utf-8');
        if (text && text.length > 50) {
          memoryCache.set(url, { data: text, timestamp: Date.now() });
          return text;
        }
      }
    } catch (e) {}

    return "";
  }

  const inFlightFetches = new Map<string, Promise<string>>();

  async function refreshSheet(url: string): Promise<string> {
    const existing = inFlightFetches.get(url);
    if (existing) return existing;

    const promise = (async () => {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 25000);
          const now = Date.now();
          const bustUrl = `${url}${url.includes('?') ? '&' : '?'}_t=${now}&_cb=${now}`;
          const response = await fetch(bustUrl, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Accept': 'text/csv, text/plain, */*'
            }
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const text = await response.text();
            if (text && !text.trim().startsWith("<!DOCTYPE") && !text.includes("<html") && text.length > 50) {
              memoryCache.set(url, { data: text, timestamp: Date.now() });
              saveSheetToDisk(url, text);
              return text;
            }
          }
        } catch (err: any) {
          const isAbort = err?.name === 'AbortError' || String(err).includes('aborted');
          const sheetLabel = url.includes('gid=859336638') ? 'elementos/config' : url.includes('gid=2129723216') ? 'diamonds' : 'country-sheet';
          if (isAbort) {
            console.log(`[server] Sheet fetch attempt ${attempt} for ${sheetLabel} reached timeout limit.`);
          } else {
            console.log(`[server] Sheet fetch attempt ${attempt} notice for ${sheetLabel}:`, err?.message || err);
          }
          if (attempt < 2) {
            await new Promise(r => setTimeout(r, 1000));
          }
        }
      }

      return getDiskOrMemoryFallback(url);
    })().finally(() => {
      inFlightFetches.delete(url);
    });

    inFlightFetches.set(url, promise);
    return promise;
  }

  async function fetchWithCache(url: string): Promise<string> {
    const now = Date.now();
    const cached = memoryCache.get(url);

    // If cache is fresh (< 60s) and valid, return immediately
    if (cached && cached.timestamp > 0 && (now - cached.timestamp < CACHE_TTL_MS) && cached.data.length > 50) {
      return cached.data;
    }

    // If we have stale cached data, return it immediately and revalidate in background (Stale-While-Revalidate)
    if (cached && cached.data && cached.data.length > 50) {
      refreshSheet(url).catch(() => {});
      return cached.data;
    }

    // Otherwise (cold cache), await fetch with fallback
    const result = await refreshSheet(url);
    return result || getDiskOrMemoryFallback(url);
  }

  // Quote-aware CSV line parser
  function parseCsvLine(text: string): string[] {
    const cells: string[] = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQ && text[i + 1] === '"') { cur += '"'; i++; }
        else { inQ = !inQ; }
      } else if (c === ',' && !inQ) {
        cells.push(cur);
        cur = '';
      } else if ((c === '\r' || c === '\n') && !inQ) {
        break;
      } else {
        cur += c;
      }
    }
    cells.push(cur);
    return cells;
  }

  function escapeCsvCell(val: any): string {
    if (!val) return '';
    const s = String(val).trim();
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  interface CountryDocInfo {
    countryCode: string;
    countryName: string;
    baseUrl: string;
  }

  function extractCountryDocsFromConfig(configCsv: string): CountryDocInfo[] {
    const lines = configCsv.split('\n');
    let hIdx = lines.findIndex(l => l.toLowerCase().includes('directorio'));
    if (hIdx === -1) hIdx = 1;
    const headers = parseCsvLine(lines[hIdx] || '').map(h => (h || '').toLowerCase().trim());
    const dirCol = headers.findIndex(h => h.includes('directorio'));
    const paisCol = headers.findIndex(h => h.includes('csv pais') || h.includes('pais'));

    const entries: CountryDocInfo[] = [];
    for (let r = hIdx + 1; r < lines.length; r++) {
      const row = parseCsvLine(lines[r]);
      const dir = row[dirCol]?.trim() || '';
      const pais = row[paisCol]?.trim() || '';
      if (dir && dir.startsWith('http')) {
        const m = dir.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/[^\/\?]+/);
        if (m) {
          const parts = pais.split('-');
          entries.push({
            countryCode: parts[0]?.trim() || `C${r}`,
            countryName: parts[1]?.trim() || pais,
            baseUrl: m[0]
          });
        }
      }
    }
    return entries;
  }

  // Multi-country directory aggregation engine
  let isAggregatingDirectory = false;

  async function getUnifiedDirectoryData(): Promise<string> {
    // Check memory cache first
    const cached = memoryCache.get(directoryCacheKey);
    const now = Date.now();
    if (cached && cached.data && (now - cached.timestamp < CACHE_TTL_MS)) {
      return cached.data;
    }

    // If disk cache exists, use it and trigger background refresh
    const diskFallback = getDiskOrMemoryFallback(directoryCacheKey);
    if (diskFallback && !isAggregatingDirectory) {
      refreshAllCountrySheets().catch(() => {});
      return diskFallback;
    }

    if (isAggregatingDirectory && diskFallback) {
      return diskFallback;
    }

    return await refreshAllCountrySheets();
  }

  async function refreshAllCountrySheets(): Promise<string> {
    if (isAggregatingDirectory) {
      return getDiskOrMemoryFallback(directoryCacheKey);
    }
    isAggregatingDirectory = true;

    try {
      const configCsv = await fetchWithCache(configUrl);
      if (!configCsv || configCsv.length < 50) {
        return getDiskOrMemoryFallback(directoryCacheKey);
      }

      const countries = extractCountryDocsFromConfig(configCsv);
      if (countries.length === 0) {
        return getDiskOrMemoryFallback(directoryCacheKey);
      }

      if (!fs.existsSync(countrySheetsDir)) {
        fs.mkdirSync(countrySheetsDir, { recursive: true });
      }

      const combinedRows: string[] = [
        ',,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,BUSQUEDA,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,',
        ',,,,,,,,,,,,,,,,,,,,,,,,',
        ',ONLINE,INTERNACIONAL,PROVEEDOR,PAIS,ESTADO,MUNICIPIO,LOGO,CATEGORIA,ID,NOMBRE DE LA EMPRESA,HASHTAGS,PROMO,WHATSAPP,FACEBOOK,INSTAGRAM,TIKTOK,TWITTER,WECHAT,WEIBO,RED,DOUYIN,LINE,KAKAOTALK,SITIO WEB,TIPO_DE_SOCIO'
      ];

      let rowCount = 0;

      // Fetch each country's "ROOS DISCOVERY" (gid=0) and "ROOS VERIFIED" (gid=794118874)
      for (const country of countries) {
        const sheetConfigs = [
          { type: 'discovery', gid: '0' },
          { type: 'verified', gid: '794118874' }
        ];

        for (const sc of sheetConfigs) {
          const csvUrl = `${country.baseUrl}/pub?gid=${sc.gid}&single=true&output=csv`;
          const filePath = path.join(countrySheetsDir, `${country.countryCode}_${sc.type}.csv`);
          let sheetCsv = '';

          try {
            const controller = new AbortController();
            const tid = setTimeout(() => controller.abort(), 12000);
            const resp = await fetch(csvUrl, {
              signal: controller.signal,
              headers: { 'Accept': 'text/csv, text/plain, */*' }
            });
            clearTimeout(tid);
            if (resp.ok) {
              const text = await resp.text();
              if (text && text.length > 50 && !text.startsWith('<!DOCTYPE')) {
                sheetCsv = text;
                fs.writeFileSync(filePath, text, 'utf-8');
              }
            }
          } catch (e) {
            // fallback to disk file if available
            if (fs.existsSync(filePath)) {
              sheetCsv = fs.readFileSync(filePath, 'utf-8');
            }
          }

          if (!sheetCsv && fs.existsSync(filePath)) {
            sheetCsv = fs.readFileSync(filePath, 'utf-8');
          }

          if (!sheetCsv) continue;

          // Parse rows
          const lines = sheetCsv.split('\n');
          if (lines.length <= 5) continue;

          let hIdx = 4;
          for (let r = 0; r < Math.min(lines.length, 10); r++) {
            if (lines[r].toLowerCase().includes('empresa') || lines[r].toLowerCase().includes('marca')) {
              hIdx = r;
              break;
            }
          }

          const headers = parseCsvLine(lines[hIdx]).map(h => (h || '').toLowerCase().trim());
          const empIdx = headers.findIndex(h => h.includes('empresa') || h.includes('marca') || h.includes('nombre'));
          if (empIdx === -1) continue;

          const onlineIdx = headers.findIndex(h => h === 'online' || h.includes('online'));
          const intIdx = headers.findIndex(h => h.includes('internacional'));
          const provIdx = headers.findIndex(h => h.includes('proveedor'));
          const paisIdx = headers.findIndex(h => h.includes('pais'));
          const estadoIdx = headers.findIndex(h => h.includes('estado'));
          const munIdx = headers.findIndex(h => h.includes('municipio') || h.includes('ciudad'));
          const logoIdx = headers.findIndex(h => h.includes('logo'));
          const catIdx = headers.findIndex(h => h.includes('categoria') || h.includes('rubro'));
          const idIdx = headers.findIndex(h => h === 'id' || h.includes('id'));
          const hashIdx = headers.findIndex(h => h.includes('hashtag'));
          const promoIdx = headers.findIndex(h => h.includes('promo'));
          const wspIdx = headers.findIndex(h => (h.includes('whatsapp') || h.includes('telefono')) && !h.includes('wechat'));
          const fbIdx = headers.findIndex(h => h.includes('facebook') || h === 'fb');
          const igIdx = headers.findIndex(h => h.includes('instagram') || h === 'ig');
          const tkIdx = headers.findIndex(h => (h.includes('tiktok') || h === 'tk') && !h.includes('douyin'));
          const twIdx = headers.findIndex(h => h === 'x' || h === 'twitter' || h.includes('twitter'));
          const wechatIdx = headers.findIndex(h => h.includes('wechat') || h.includes('weixin'));
          const weiboIdx = headers.findIndex(h => h.includes('weibo'));
          const redIdx = headers.findIndex(h => h === 'red' || h.includes('xiaohongshu') || h.includes('red_social'));
          const douyinIdx = headers.findIndex(h => h.includes('douyin'));
          const lineIdx = headers.findIndex(h => (h === 'line' || h.startsWith('line_') || h.endsWith('_line') || h === 'line app') && !h.includes('online'));
          const kakaoIdx = headers.findIndex(h => h.includes('kakao'));
          const webIdx = headers.findIndex(h => h.includes('sitio') || h.includes('web') || h.includes('pagina'));

          for (let r = hIdx + 1; r < lines.length; r++) {
            const line = lines[r];
            if (!line || !line.trim()) continue;
            const cols = parseCsvLine(line);
            const emp = cols[empIdx]?.trim();
            if (!emp || emp.length < 2 || emp.startsWith('http') || emp.startsWith('+') || emp.startsWith('@')) continue;

            rowCount++;
            const row = [
              rowCount,
              escapeCsvCell(cols[onlineIdx] || 'También Online'),
              escapeCsvCell(cols[intIdx] || 'SI'),
              escapeCsvCell(cols[provIdx] || 'NO'),
              escapeCsvCell(cols[paisIdx] || country.countryName),
              escapeCsvCell(cols[estadoIdx] || ''),
              escapeCsvCell(cols[munIdx] || ''),
              escapeCsvCell(cols[logoIdx] || ''),
              escapeCsvCell(cols[catIdx] || 'General'),
              escapeCsvCell(cols[idIdx] || `${country.countryCode}_${rowCount}`),
              escapeCsvCell(emp),
              escapeCsvCell(cols[hashIdx] || ''),
              escapeCsvCell(cols[promoIdx] || ''),
              escapeCsvCell(wspIdx !== -1 ? cols[wspIdx] : ''),
              escapeCsvCell(fbIdx !== -1 ? cols[fbIdx] : ''),
              escapeCsvCell(igIdx !== -1 ? cols[igIdx] : ''),
              escapeCsvCell(tkIdx !== -1 ? cols[tkIdx] : ''),
              escapeCsvCell(twIdx !== -1 ? cols[twIdx] : ''),
              escapeCsvCell(wechatIdx !== -1 ? cols[wechatIdx] : ''),
              escapeCsvCell(weiboIdx !== -1 ? cols[weiboIdx] : ''),
              escapeCsvCell(redIdx !== -1 ? cols[redIdx] : ''),
              escapeCsvCell(douyinIdx !== -1 ? cols[douyinIdx] : ''),
              escapeCsvCell(lineIdx !== -1 ? cols[lineIdx] : ''),
              escapeCsvCell(kakaoIdx !== -1 ? cols[kakaoIdx] : ''),
              escapeCsvCell(webIdx !== -1 ? cols[webIdx] : ''),
              sc.type === 'verified' ? 'Verified' : ''
            ];
            combinedRows.push(row.join(','));
          }
        }
      }

      // Also append rows from "anuncios alianza" (formerly "anuncios del mes") into the unified directory
      try {
        const alianzaCsv = await fetchWithCache(alianzaSheetUrl);
        if (alianzaCsv && alianzaCsv.length > 50 && !alianzaCsv.trim().startsWith("<!DOCTYPE")) {
          const aLines = alianzaCsv.split('\n');
          let aHIdx = -1;
          for (let r = 0; r < Math.min(aLines.length, 10); r++) {
            const lower = (aLines[r] || '').toLowerCase();
            if (lower.includes('empresa') || lower.includes('marca') || lower.includes('nombre')) {
              aHIdx = r;
              break;
            }
          }
          if (aHIdx !== -1) {
            const aHeaders = parseCsvLine(aLines[aHIdx]).map(h => (h || '').toLowerCase().trim());
            const aEmpIdx = aHeaders.findIndex(h => h.includes('empresa') || h.includes('marca') || h.includes('nombre'));
            if (aEmpIdx !== -1) {
              const aOnlineIdx = aHeaders.findIndex(h => h.includes('online'));
              const aIntIdx = aHeaders.findIndex(h => h.includes('internacional'));
              const aProvIdx = aHeaders.findIndex(h => h.includes('proveedor'));
              const aPaisIdx = aHeaders.findIndex(h => h.includes('pais'));
              const aEstadoIdx = aHeaders.findIndex(h => h.includes('estado'));
              const aMunIdx = aHeaders.findIndex(h => h.includes('municipio') || h.includes('ciudad'));
              const aLogoIdx = aHeaders.findIndex(h => h.includes('logo'));
              const aCatIdx = aHeaders.findIndex(h => h.includes('categoria') || h.includes('rubro'));
              const aIdIdx = aHeaders.findIndex(h => h === 'id' || h.includes('id'));
              const aHashIdx = aHeaders.findIndex(h => h.includes('hashtag'));
              const aPromoIdx = aHeaders.findIndex(h => h.includes('promo'));
              const aWspIdx = aHeaders.findIndex(h => (h.includes('whatsapp') || h.includes('telefono')) && !h.includes('wechat'));
              const aFbIdx = aHeaders.findIndex(h => h.includes('facebook') || h === 'fb');
              const aIgIdx = aHeaders.findIndex(h => h.includes('instagram') || h === 'ig');
              const aTkIdx = aHeaders.findIndex(h => h.includes('tiktok') || h === 'tk');
              const aTwIdx = aHeaders.findIndex(h => h === 'x' || h === 'twitter' || h.includes('twitter'));
              const aWebIdx = aHeaders.findIndex(h => h.includes('sitio') || h.includes('web') || h.includes('pagina'));

              for (let r = aHIdx + 1; r < aLines.length; r++) {
                const line = aLines[r];
                if (!line || !line.trim()) continue;
                const cols = parseCsvLine(line);
                const emp = cols[aEmpIdx]?.trim();
                if (!emp || emp.length < 2 || emp.startsWith('http') || emp.startsWith('+') || emp.startsWith('@')) continue;

                rowCount++;
                const row = [
                  rowCount,
                  escapeCsvCell((aOnlineIdx !== -1 ? cols[aOnlineIdx] : '') || 'También Online'),
                  escapeCsvCell((aIntIdx !== -1 ? cols[aIntIdx] : '') || 'SI'),
                  escapeCsvCell((aProvIdx !== -1 ? cols[aProvIdx] : '') || 'SI'),
                  escapeCsvCell((aPaisIdx !== -1 ? cols[aPaisIdx] : '') || 'Estados Unidos'),
                  escapeCsvCell(aEstadoIdx !== -1 ? cols[aEstadoIdx] : ''),
                  escapeCsvCell(aMunIdx !== -1 ? cols[aMunIdx] : ''),
                  escapeCsvCell(aLogoIdx !== -1 ? cols[aLogoIdx] : ''),
                  escapeCsvCell((aCatIdx !== -1 ? cols[aCatIdx] : '') || 'General'),
                  escapeCsvCell((aIdIdx !== -1 ? cols[aIdIdx] : '') || `ALIANZA_${rowCount}`),
                  escapeCsvCell(emp),
                  escapeCsvCell(aHashIdx !== -1 ? cols[aHashIdx] : ''),
                  escapeCsvCell(aPromoIdx !== -1 ? cols[aPromoIdx] : ''),
                  escapeCsvCell(aWspIdx !== -1 ? cols[aWspIdx] : ''),
                  escapeCsvCell(aFbIdx !== -1 ? cols[aFbIdx] : ''),
                  escapeCsvCell(aIgIdx !== -1 ? cols[aIgIdx] : ''),
                  escapeCsvCell(aTkIdx !== -1 ? cols[aTkIdx] : ''),
                  escapeCsvCell(aTwIdx !== -1 ? cols[aTwIdx] : ''),
                  '', '', '', '', '', '', // other socials
                  escapeCsvCell(aWebIdx !== -1 ? cols[aWebIdx] : ''),
                  'Alianza'
                ];
                combinedRows.push(row.join(','));
              }
            }
          }
        }
      } catch (err: any) {
        console.warn('[server] Notice parsing alianza sheet into unified directory:', err?.message || err);
      }

      if (rowCount > 10) {
        const unifiedCsv = combinedRows.join('\n');
        memoryCache.set(directoryCacheKey, { data: unifiedCsv, timestamp: Date.now() });
        fs.writeFileSync(unifiedDirectoryFilePath, unifiedCsv, 'utf-8');
        console.log(`[server] Multi-country directory refreshed with ${rowCount} announcements across ${countries.length} countries.`);
        return unifiedCsv;
      }

      return getDiskOrMemoryFallback(directoryCacheKey);
    } catch (e: any) {
      console.error('[server] Error refreshing multi-country directory:', e.message);
      return getDiskOrMemoryFallback(directoryCacheKey);
    } finally {
      isAggregatingDirectory = false;
    }
  }

  // Pre-fetch/Prime cache asynchronously on startup so initial user requests get fresh data immediately
  async function primeCacheOnStartup() {
    try {
      await Promise.allSettled([
        refreshSheet(diamondsSheetUrl),
        refreshSheet(configUrl),
        getUnifiedDirectoryData()
      ]);
      console.log("[server] Google Sheets cache primed with multi-country directory data");
    } catch (e) {
      // Ignore background priming errors
    }
  }

  // Run priming on startup
  primeCacheOnStartup().catch(() => {});

  // Proxy route for the multi-country Google Sheets CSV (combining "roos discovery" and "roos verified" per country)
  app.get("/api/sheet-data", async (req, res) => {
    const csvData = await getUnifiedDirectoryData();
    
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.header("Content-Type", "text/csv; charset=utf-8");
    if (csvData) {
      res.send(csvData);
    } else {
      res.status(502).send("");
    }
  });

  // Proxy route for "anuncios alianza" (formerly "anuncios del mes" / diamonds)
  app.get(["/api/diamonds-data", "/api/alianza-data", "/api/anuncios-alianza"], async (req, res) => {
    const csvData = await fetchWithCache(alianzaSheetUrl);

    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.header("Content-Type", "text/csv; charset=utf-8");
    if (csvData) {
      res.send(csvData);
    } else {
      res.status(502).send("");
    }
  });

  // Config endpoint for spotlight banners and logo
  app.get("/api/config", async (req, res) => {
    const csvData = await fetchWithCache(configUrl);

    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.header("Content-Type", "text/csv; charset=utf-8");
    if (csvData) {
      res.send(csvData);
    } else {
      res.status(502).send("");
    }
  });

  interface ImageCacheEntry {
    buffer: Buffer;
    contentType: string;
    timestamp: number;
  }
  const imageProxyCache = new Map<string, ImageCacheEntry>();
  const IMAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours in memory cache

  // Add a proxy route for images to bypass CORS with high-performance caching
  app.get("/api/proxy-logo", async (req, res) => {
    let imageUrl = req.query.url as string;
    if (!imageUrl) return res.status(400).send("URL is required");

    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    try {
      const decodedUrl = decodeURIComponent(imageUrl).toLowerCase();

      // Fast-path: Check for local ROOS Capital official logo
      if (decodedUrl.includes('roos capital logo') || decodedUrl.includes('roos_capital_logo')) {
        const localLogoPath = path.join(process.cwd(), 'src', 'assets', 'images', 'roos_capital_logo.png');
        if (fs.existsSync(localLogoPath)) {
          res.setHeader("Cache-Control", "public, max-age=604800, s-maxage=604800, immutable");
          res.setHeader("Content-Type", "image/png");
          return res.sendFile(localLogoPath);
        }
      }

      // Fast-path: Check for local ROOS Anuncios placeholder logo
      if (decodedUrl.includes('roos logo anuncios') || decodedUrl.includes('roos_logo_anuncios')) {
        const localAnunciosPath = path.join(process.cwd(), 'src', 'assets', 'images', 'roos_logo_anuncios.png');
        if (fs.existsSync(localAnunciosPath)) {
          res.setHeader("Cache-Control", "public, max-age=604800, s-maxage=604800, immutable");
          res.setHeader("Content-Type", "image/png");
          return res.sendFile(localAnunciosPath);
        }
      }

      // Re-encode spaces and plus signs to %20 properly
      let cleanUrl = imageUrl.trim();
      cleanUrl = cleanUrl.replace(/ /g, '%20');
      cleanUrl = cleanUrl.replace(/\+/g, '%20');

      try {
        const urlObj = new URL(cleanUrl);
        cleanUrl = urlObj.href;
      } catch (e) {
        // Fallback to manual cleaning
      }

      // Check in-memory RAM cache first
      const cached = imageProxyCache.get(cleanUrl);
      if (cached && (Date.now() - cached.timestamp < IMAGE_CACHE_TTL_MS)) {
        res.setHeader("Cache-Control", "public, max-age=604800, s-maxage=604800, immutable");
        res.setHeader("Content-Type", cached.contentType);
        return res.send(cached.buffer);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(cleanUrl, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[Proxy-Logo] External source returned status ${response.status} for ${cleanUrl}.`);
        return serveFallbackSvg(res);
      }

      const contentType = response.headers.get("content-type") || "image/png";
      const buffer = Buffer.from(await response.arrayBuffer());

      // Save to server RAM cache
      imageProxyCache.set(cleanUrl, {
        buffer,
        contentType,
        timestamp: Date.now()
      });

      res.setHeader("Cache-Control", "public, max-age=604800, s-maxage=604800, immutable");
      res.setHeader("Content-Type", contentType);
      res.send(buffer);
    } catch (error: any) {
      console.warn(`[Proxy-Logo] Error fetching ${imageUrl}: ${error.message}. Serving branded fallback.`);
      serveFallbackSvg(res);
    }
  });

  function serveFallbackSvg(res: any) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="placeholderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCF9FA"/>
      <stop offset="100%" stop-color="#F2EAEB"/>
    </linearGradient>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2A7B5"/>
      <stop offset="100%" stop-color="#A85967"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#placeholderGrad)"/>
  <circle cx="100" cy="100" r="40" fill="url(#iconGrad)" opacity="0.08"/>
  <!-- Branded Gemstone Icon -->
  <path d="M100,75 L125,92 L115,122 L85,122 L75,92 Z" fill="none" stroke="url(#iconGrad)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M100,75 L115,122 M100,75 L85,122" stroke="url(#iconGrad)" stroke-width="0.75" opacity="0.4"/>
</svg>`;
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  }

  // SEO: Direct robots.txt route
  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      return res.sendFile(robotsPath);
    }
    res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://rooscapital.com/sitemap.xml\n`);
  });

  // SEO: Direct sitemap.xml route
  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      return res.sendFile(sitemapPath);
    }
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rooscapital.com/</loc>
    <lastmod>2026-08-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
