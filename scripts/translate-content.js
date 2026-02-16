#!/usr/bin/env node
/**
 * Traduit le contenu FR → EN dans public/content/site-content.json
 * Usage: node scripts/translate-content.js
 * Option: DEEPL_AUTH_KEY=xxx node scripts/translate-content.js (recommandé)
 * Sans clé: tentative LibreTranslate (gratuit, peut être instable)
 */

const fs = require('fs');
const path = require('path');

const CONTENT_PATH = path.join(__dirname, '..', 'public', 'content', 'site-content.json');
const DEEPL_API = 'https://api-free.deepl.com/v2/translate';

function loadJson() {
  const raw = fs.readFileSync(CONTENT_PATH, 'utf8');
  return JSON.parse(raw);
}

function saveJson(data) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function translateWithDeepL(text, authKey) {
  const form = new URLSearchParams({
    auth_key: authKey,
    text: text,
    source_lang: 'FR',
    target_lang: 'EN',
  });
  const res = await fetch(DEEPL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepL: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.translations && data.translations[0] ? data.translations[0].text : text;
}

async function translateWithLibreTranslate(text) {
  const res = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: 'fr',
      target: 'en',
      format: 'text',
    }),
  });
  if (!res.ok) throw new Error('LibreTranslate: ' + res.status);
  const data = await res.json();
  return data.translated || text;
}

async function translateText(text, options) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;
  if (options.deeplKey) {
    return translateWithDeepL(trimmed, options.deeplKey);
  }
  try {
    return await translateWithLibreTranslate(trimmed);
  } catch (e) {
    console.warn('LibreTranslate failed:', e.message);
    return trimmed;
  }
}

function isObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/** Construit un clone de obj avec toutes les chaînes traduites (FR → EN). */
async function deepTranslate(obj, options) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return translateText(obj, options);
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i];
      if (typeof item === 'string') {
        out.push(await translateText(item, options));
      } else if (isObject(item)) {
        out.push(await deepTranslate(item, options));
      } else {
        out.push(item);
      }
    }
    return out;
  }
  if (isObject(obj)) {
    const out = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (typeof val === 'string') {
        process.stdout.write(key + ' … ');
        out[key] = await translateText(val, options);
        console.log('ok');
      } else {
        out[key] = await deepTranslate(val, options);
      }
    }
    return out;
  }
  return obj;
}

async function main() {
  const deeplKey = process.env.DEEPL_AUTH_KEY;
  if (!deeplKey) {
    console.log('Astuce: DEEPL_AUTH_KEY=xxx pour utiliser DeepL (sinon tentative LibreTranslate).');
  }
  const content = loadJson();
  if (!content.fr) {
    console.error('Aucune clé "fr" dans le JSON.');
    process.exit(1);
  }
  console.log('Traduction FR → EN en cours…');
  content.en = await deepTranslate(content.fr, { deeplKey: deeplKey || null });
  saveJson(content);
  console.log('Écrit: public/content/site-content.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
