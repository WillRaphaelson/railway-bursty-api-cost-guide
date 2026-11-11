import { defineRailway, github, project, service } from 'railway/iac';
export default defineRailway(() => project('bursty-api-cost-guide', {
  resources: [service('api', {
    source: github('WillRaphaelson/railway-bursty-api-cost-guide', { branch: 'main' }),
    start: 'npm start', healthcheck: '/health', replicas: 1,
    env: { NODE_ENV: 'production' },
  })],
}));
