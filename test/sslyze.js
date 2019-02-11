const sslyze = require('../sslyze-report.json');
const { expect } = require('chai');

const commandResults = sslyze.accepted_targets[0].commands_results.certinfo;
const test_timeout = 900000;

describe('SSLyze security testing', () => {
  let hasStapleExt,
    matchesHostname,
    hasAnchor,
    hasSha1,
    isCertValid,
    isLeaf,
    isOcspTrusted;
  before(() => {
    hasStapleExt = commandResults.certificate_has_must_staple_extension;
    matchesHostname = commandResults.certificate_matches_hostname;
    hasAnchor = commandResults.has_anchor_in_certificate_chain;
    hasSha1 = commandResults.has_sha1_in_certificate_chain;
    isCertValid = commandResults.is_certificate_chain_order_valid;
    isLeaf = commandResults.is_leaf_certificate_ev;
    isOcspTrusted = commandResults.is_ocsp_response_trusted;
  }, test_timeout);

  it('should check if certificate has staple extension', () => {
    expect(hasStapleExt).to.equal(true);
  });

  it('should check if certificate matches hostname', () => {
    expect(matchesHostname).to.equal(true);
  });

  it('should check if certificate has anchor in chain', () => {
    expect(hasAnchor).to.equal(true);
  });

  it('should check if certificate has sh1 in chain', () => {
    expect(hasSha1).to.equal(true);
  });

  it('should check if certificate is chain order valid', () => {
    expect(isCertValid).to.equal(true);
  });

  it('should check if certificate is leaf', () => {
    expect(isLeaf).to.equal(true);
  });

  it('should check if certificate is ocsp response trusted', () => {
    expect(isOcspTrusted).to.equal(true);
  });
});
