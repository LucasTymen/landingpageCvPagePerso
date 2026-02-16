#!/usr/bin/env node
/**
 * Orchestration du pool d'agents (Squid Research × LPPP-generator).
 * Lit pool-agents/agents.config.json et enchaîne les agents dans l'ordre.
 *
 * Prérequis : SQUID_RESEARCH_API_URL, LPPP_GENERATOR_URL (et clés si besoin).
 * Usage : node scripts/run-pool-agents.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'pool-agents', 'agents.config.json');

function loadConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Impossible de charger pool-agents/agents.config.json:', e.message);
    process.exit(1);
  }
}

function checkEnv(config) {
  const missing = [];
  if (config.sources) {
    Object.entries(config.sources).forEach(([id, src]) => {
      if (src.env && src.env.base_url && !process.env[src.env.base_url]) {
        missing.push(src.env.base_url);
      }
    });
  }
  if (missing.length) {
    console.warn('Variables d’environnement non définies (les appels réels seront skippés):', missing.join(', '));
    return false;
  }
  return true;
}

// Ordre d'exécution logique des agents (actualisation 20 min = sync-opportunities à l'allumage + cron)
const RUN_ORDER = ['sync-opportunities', 'data-enricher', 'qualification', 'graphiste', 'redacteur-en-chef', 'landing-generator'];

function run(config) {
  const agentsById = {};
  (config.agents || []).forEach((a) => { agentsById[a.id] = a; });

  console.log('Pool d’agents – Squid Research × LPPP-generator\n');
  const hasEnv = checkEnv(config);

  RUN_ORDER.forEach((id, i) => {
    const agent = agentsById[id];
    if (!agent) return;
    console.log(`${i + 1}. [${agent.id}] ${agent.name}`);
    console.log(`   Source: ${agent.source} → Cible: ${agent.target || '(interne)'}`);
  });

  console.log('\n---');
  if (!hasEnv) {
    console.log('Définir SQUID_RESEARCH_API_URL et LPPP_GENERATOR_URL pour activer les appels réels.');
    console.log('Voir pool-agents/README.md et pool-agents/AGENTS.md.');
  } else {
    console.log('Connexions configurées. Pour brancher les appels API, étendre ce script (fetch/axios).');
  }
}

const config = loadConfig();
run(config);
