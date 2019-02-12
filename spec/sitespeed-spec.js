describe('Sitespeed performance testing', () => {
  const tstamp = process.env.TSTAMP;
  it('should recognize the sitespeed timestamp', () => {
    expect(typeof tstamp).toBe('string');
  });

  describe('on a native speed network', () => {
    const nativeResults = require(`../sitespeed-result/${tstamp}/native/budgetResult.json`);
    const failingTests = nativeResults.failing;

    Object.keys(failingTests).forEach(page => {
      const metrics = failingTests[page];

      describe(`for page ${page}`, () => {
        metrics.forEach(mg => {
          it(`should pass the metric ${mg.metric} with a max of ${
            mg.limit
          }`, done => {
            if (typeof mg.value === 'string') {
              expect(parseFloat(mg.value)).toBeLessThanOrEqual(
                parseFloat(mg.limit),
              );
            } else {
              expect(mg.value).toBeLessThanOrEqual(mg.limit);
            }
          });
        });
      });
    });
  });
});
