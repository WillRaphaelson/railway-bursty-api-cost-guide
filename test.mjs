import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';
import { estimate, breakEven, railwayBill } from './costs.mjs';
test('minimum is a floor and shared workspace marginal cost is calculated separately', () => {
  assert.equal(railwayBill(3,20).workspaceTotal,20);
  assert.equal(railwayBill(3,20,25).marginalIncrease,3);
  assert.equal(railwayBill(3,20,18).marginalIncrease,1);
  assert.throws(()=>railwayBill(-1));
  assert.throws(()=>breakEven(10,0));
  assert.equal(breakEven(10,.000001),10_000_000);
  assert.ok(Math.abs(estimate().railway.compute-2.75289024)<1e-8);
  assert.ok(Math.abs(estimate().lambda.subtotal-8.60001)<1e-8);
});
test('API validates waits and serves a healthy process', async () => {
  const server=createServer(); await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await fetch(base+'/health')).status,200);
    assert.equal((await fetch(base+'/api/example?waitMs=-1')).status,400);
    assert.equal((await fetch(base+'/api/example?waitMs=0')).status,200);
    assert.equal((await fetch(base+'/missing')).status,404);
  } finally { await new Promise(r=>server.close(r)); }
});
