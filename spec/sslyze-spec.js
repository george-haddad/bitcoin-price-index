const sslyze = require('../sslyze-report.json');

console.log(JSON.stringify(sslyze));

const commandResults = sslyze.accepted_targets[0].commands_results;
const test_timeout = 900000;

describe('SSLyze security testing', () => {
  let hasHeartbleed, hasCcsInjection;
  beforeAll(() => {
    hasHeartbleed = commandResults.heartbleed.is_vulnerable_to_heartbleed;
    hasCcsInjection = commandResults.openssl_ccs.is_vulnerable_to_ccs_injection;
  }, test_timeout);

  it('should check if certificate is not vulnerable to heartbleed', () => {
    expect(hasHeartbleed).toEqual(false);
  });

  it('should check if certificate is not vulnerable to CCS Injection', () => {
    expect(hasCcsInjection).toEqual(false);
  });
});
