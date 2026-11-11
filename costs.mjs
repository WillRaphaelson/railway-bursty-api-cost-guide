import { pathToFileURL } from 'node:url';
export function breakEven(serverMonthly, perRequest) {
  if (!Number.isFinite(serverMonthly) || serverMonthly < 0 || !Number.isFinite(perRequest) || perRequest <= 0) throw new RangeError('Use a nonnegative server cost and positive request cost');
  return serverMonthly / perRequest;
}
export function railwayBill(usage, minimum = 20, otherWorkspaceUsage = 0) {
  for (const v of [usage, minimum, otherWorkspaceUsage]) if (!Number.isFinite(v) || v < 0) throw new RangeError('Costs must be finite and nonnegative');
  return { workspaceTotal: Math.max(minimum, usage + otherWorkspaceUsage), marginalIncrease: Math.max(minimum, usage + otherWorkspaceUsage) - Math.max(minimum, otherWorkspaceUsage) };
}
export function estimate() {
  const requests = 3_000_000, seconds = 30 * 24 * 3600;
  const lambdaDuration = requests * 0.5 * 0.2 * 0.0000166667;
  const lambdaRequests = requests / 1e6 * 0.20;
  const gateway = requests / 1e6;
  const railwayMemory = 0.25 * seconds * 0.00000386;
  const railwayCPU = (requests * 0.010 + seconds * 0.001) * 0.00000772;
  const railway = railwayMemory + railwayCPU;
  return { label: 'Illustrative list-price arithmetic, not measured capacity or a complete bill', priceDate: '2026-11-11', requests, lambda: { duration: lambdaDuration, requests: lambdaRequests, gateway, subtotal: lambdaDuration + lambdaRequests + gateway, subtotalWithFullLambdaAllowance: 0.4 + gateway }, ec2InstanceOnly: 720 * 0.0209, railway: { memory: railwayMemory, cpu: railwayCPU, compute: railway, hobby: railwayBill(railway, 5), pro: railwayBill(railway, 20) }, flyAlwaysOnMachineOnly: 3.69, vercel: { activeCPUHours: requests * 0.010 / 3600, activeCPUCost: requests * 0.010 / 3600 * 0.128, invocationCost: requests / 1e6 * 0.60, provisionedGBHoursAssumed: 34, provisionedMemoryCost: 34 * 0.0106, subtotal: requests * 0.010 / 3600 * 0.128 + requests / 1e6 * 0.60 + 34 * 0.0106 }, breakEvenRequests: breakEven(720 * 0.0209, 0.20 / 1e6 + 0.5 * 0.2 * 0.0000166667 + 1 / 1e6) };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(estimate(), null, 2));
