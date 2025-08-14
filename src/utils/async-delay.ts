export async function asyncDelay(milliseconds: number = 0, verbose = false) {
  if (milliseconds <= 0) return;

  if (verbose) {
    console.log(`\nDealying for ${milliseconds / 1000}s \n`);
  }

  await new Promise(resolve => setTimeout(resolve, milliseconds));
}
