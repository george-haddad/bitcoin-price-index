const sslyze = require('../sslyze-report.json');

const scanResults = sslyze.server_scan_results[0].scan_commands_results;

const test_timeout = 900000;

describe('SSLyze security testing', () => {
  let hasHeartbleed, hasCcsInjection;
  beforeAll(() => {
    hasHeartbleed = scanResults.heartbleed.is_vulnerable_to_heartbleed;
    hasCcsInjection = scanResults.openssl_ccs_injection.is_vulnerable_to_ccs_injection;
  }, test_timeout);

  it('should check if certificate is not vulnerable to heartbleed', () => {
    expect(hasHeartbleed).toEqual(false);
  });

  it('should check if certificate is not vulnerable to CCS Injection', () => {
    expect(hasCcsInjection).toEqual(false);
  });
});
