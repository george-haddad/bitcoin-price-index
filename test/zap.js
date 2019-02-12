const { expect } = require('chai');
const ZapClient = require('zaproxy');

const zapOptions = {
  proxy: 'http://zap:8090/',
};

const PR_NUMBER = process.env.PR_NUMBER;
let url;
if (PR_NUMBER) {
  url = `https://deploy-preview-${PR_NUMBER}--peaceful-kepler-549198.netlify.com/`;
} else {
  url = `https://peaceful-kepler-549198.netlify.com/`;
}

const zaproxy = new ZapClient(zapOptions);

// Take no longer than 15 minutes for the performance test to complete
const test_timeout = 900000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const runZapAttack = async () => {
  return await zaproxy.spider
    .scan(url, 1)
    .then(waitForSpiderScan)
    .then(startActiveScan)
    .then(waitForActiveScan)
    .catch(err => console.error(err));
};

const waitForSpiderScan = async id => {
  console.log('waiting for spider scan: ', id);
  while (true) {
    const progress = await zaproxy.spider.status(id);
    console.log(`Spider crawl progress is at ${progress.status} / 100`);

    await delay(2000);

    if (progress.status === '100') {
      console.log('Spider crawl complete');
      return;
    }
  }
};

const startActiveScan = async () => {
  const id = await zaproxy.ascan.scan(url);
  console.log('Start active scan:', id);
  return id;
};

const waitForActiveScan = async id => {
  console.log('Waiting for active scan:', id);

  while (true) {
    const progress = await zaproxy.ascan.status(id);
    console.log(`Active scan progress is at ${progress.status} / 100`);

    await delay(5000);

    if (progress.status === '100') {
      console.log('Active scan complete');
      const alerts = await zaproxy.core.alerts();
      return alerts;
    }
  }
};

describe(`Security attack tests against ${url}`, () => {
  let cweCount;
  before(async () => {
    const attackResults = await runZapAttack();
    cweCount = attackResults.alerts.reduce(function(sums, entry) {
      sums[entry.cweid] = (sums[entry.cweid] || 0) + 1;
      return sums;
    }, {});
  }, test_timeout);

  it('should have 0 CWE-525 risk alerts', () => {
    expect(cweCount['525']).to.equal(0);
  });

  it('should have 0 CWE-933 risk alerts', () => {
    expect(cweCount['933']).to.equal(0);
  });
});
