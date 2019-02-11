const { expect, assert } = require('chai');

describe('Sitespeed performance testing', async => {
  const tstamp = process.env.TSTAMP;
  it('should recognize the sitespeed timestamp', async => {
    expect(tstamp).to.be.a('string');
  });

  describe('on a native speed network', async => {
    const nativeResults = require(`../sitespeed-result/${tstamp}/native/budgetResult.json`);
    const failingTests = nativeResults.failing;

    Object.keys(failingTests).forEach(page => {
      const metrics = failingTests[page];

      describe(`for page ${page}`, async => {
        metrics.forEach(mg => {
          it(`should pass the metric ${mg.metric} with a max of ${
            mg.limit
          }`, async => {
            if (typeof mg.value === 'string') {
              assert.isAtMost(parseFloat(mg.value), parseFloat(mg.limit));
            } else {
              assert.isAtMost(mg.value, mg.limit);
            }
          });
        });
      });
    });
  });
});
