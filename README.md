# Bursty API cost guide

A stateless Node.js API, bounded external smoke-load runner, and illustrative cost calculator. Requires Node.js 22 or later. No database, credentials, or load generator is deployed. The API's timer simulates I/O waiting; it does not reproduce the article's memory, CPU, throughput, or latency assumptions.

## Run locally

```sh
npm install
npm test
npm run check
npm start
```

In another terminal:

```sh
curl http://localhost:3000/health
npm run burst -- http://localhost:3000/api/example 100 5
npm run cost
```

Only run the burst tool against a service you own. It limits each invocation to 1,000 requests and 20 concurrent workers. The article's 3-million-request workload is hypothetical; these smoke checks are separate.

## Deploy

The Railway Infrastructure as Code configuration declares one API service from this repository with a healthcheck and a single replica. Add a Railway public domain to the service after deployment. Keep sleeping disabled initially; configure optional Serverless in the dashboard and deploy again before testing wake behavior. Plan minimums, egress and any extra resources still apply.

## Arithmetic

`costs.mjs` records the November 11, 2026 price inputs and calculates the article's illustrative subtotals. Vercel memory is deliberately left as a formula because allocation and overlapping instance lifetimes must be supplied. The calculator is not a provider quote or capacity benchmark. Add storage, networking, observability, taxes, and account-specific credits for a full estimate.
