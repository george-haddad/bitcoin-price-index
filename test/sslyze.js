const { expect } = require('chai');
const sslyze = require('../sslyze-report.json');

const commandResults = sslyze.accepted_targets[0].commands_results;
const test_timeout = 900000;

describe('SSLyze security testing', () => {
  let hasStapleExt,
    matchesHostname,
    hasAnchor,
    hasSha1,
    isCertValid,
    isLeaf,
    hasHeartbleed,
    hasCcsInjection;
  before(() => {
    hasStapleExt =
      commandResults.certinfo.certificate_has_must_staple_extension;
    matchesHostname = commandResults.certinfo.certificate_matches_hostname;
    hasAnchor = commandResults.certinfo.has_anchor_in_certificate_chain;
    hasSha1 = commandResults.certinfo.has_sha1_in_certificate_chain;
    isCertValid = commandResults.certinfo.is_certificate_chain_order_valid;
    isLeaf = commandResults.certinfo.is_leaf_certificate_ev;
    hasHeartbleed = commandResults.heartbleed.is_vulnerable_to_heartbleed;
    hasCcsInjection = commandResults.openssl_ccs.is_vulnerable_to_ccs_injection;
  }, test_timeout);

  it('should check if certificate has staple extension', () => {
    expect(hasStapleExt).to.equal(false);
  });

  it('should check if certificate matches hostname', () => {
    expect(matchesHostname).to.equal(true);
  });

  it('should check if certificate has anchor in chain', () => {
    expect(hasAnchor).to.equal(false);
  });

  it('should check if certificate has sh1 in chain', () => {
    expect(hasSha1).to.equal(false);
  });

  it('should check if certificate is chain order valid', () => {
    expect(isCertValid).to.equal(true);
  });

  it('should check if certificate is leaf', () => {
    expect(isLeaf).to.equal(false);
  });

  it('should check if certificate is not vulnrable to heartbleed', () => {
    expect(hasHeartbleed).to.equal(false);
  });

  it('should check if certificate is not vulnrable to CCS Injection', () => {
    expect(hasCcsInjection).to.equal(false);
  });
});
