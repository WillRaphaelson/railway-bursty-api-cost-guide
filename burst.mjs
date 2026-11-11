// Run only against a deployment you own. This is a bounded smoke load, not the article's hypothetical 100 RPS.
const [target, countArg='100', concurrencyArg='5'] = process.argv.slice(2);
if (!target) throw new Error('Usage: npm run burst -- https://YOUR-SERVICE/api/example 100 5');
const url=new URL(target), count=Number(countArg), concurrency=Number(concurrencyArg);
if (!['http:','https:'].includes(url.protocol) || !Number.isInteger(count) || count<1 || count>1000 || !Number.isInteger(concurrency) || concurrency<1 || concurrency>20) throw new Error('Use 1–1000 requests and 1–20 workers');
let next=0, failed=0; const times=[]; const start=performance.now();
await Promise.all(Array.from({length:concurrency},async()=>{ while(next++<count) { const t=performance.now(); try { const r=await fetch(url,{signal:AbortSignal.timeout(15000)}); await r.text(); if(!r.ok) failed++; } catch { failed++; } times.push(performance.now()-t); } }));
times.sort((a,b)=>a-b); console.log(JSON.stringify({requests:count,concurrency,failed,elapsedMs:performance.now()-start,p95Ms:times[Math.ceil(times.length*.95)-1],note:'Observed smoke load only; does not validate illustrative pricing inputs'},null,2));
if(failed) process.exitCode=1;
