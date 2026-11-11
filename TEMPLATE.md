# Deploy and Host a Bursty Node.js API with Railway

Deploy a conventional stateless HTTP API to explore resource consumption and compare it with an illustrative pricing model.

## About Hosting a Bursty Node.js API

One Node.js service exposes /health and /api/example. An optional waitMs query parameter simulates I/O waiting. No database or external credentials are required. The included calculator and load runner are local tools, not extra deployed services.

## Why Deploy a Bursty Node.js API on Railway?

Run a familiar server process with managed deployment, automatic vertical resource scaling within limits, and consumption-based CPU and memory billing. Inspect actual metrics before estimating your workload's costs.

## Common Use Cases

- Learn the difference between CPU time and request wall time.
- Inspect quiet-period and burst resource behavior.
- Test optional Serverless sleep separately from always-awake behavior.

## Dependencies for a Bursty Node.js API

Railway builds the Node.js service from the public repository. There are no application secrets or required external services.

### Deployment Dependencies

A Railway account and an appropriate plan. Node.js 22 or later locally for the optional calculator and bounded smoke-load runner. Usage costs and paid-plan minimums apply. This is a learning example, not a production performance benchmark.
