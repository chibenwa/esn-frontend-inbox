'use strict';

/* global chai: false */

const { expect } = chai;

describe('The inboxSpecialMailboxes factory', function() {

  var inboxSpecialMailboxes;

  beforeEach(angular.mock.module('esn.inbox.libs'));

  beforeEach(angular.mock.inject(function(_inboxSpecialMailboxes_) {
    inboxSpecialMailboxes = _inboxSpecialMailboxes_;
  }));

  describe('The list fn', function() {

    it('should return an array of special mailboxes with fake data', function() {
      var specialMailboxes = inboxSpecialMailboxes.list();

      expect(specialMailboxes).to.be.an.instanceof(Array);
      expect(specialMailboxes.length).to.equal(1);
      expect(specialMailboxes[0]).to.shallowDeepEqual({
        id: 'all',
        name: 'All Mail',
        role: 'all',
        qualifiedName: 'All Mail',
        unreadEmails: 0
      });
    });
  });

  describe('The get fn', function() {

    it('should return a mailbox if found', function() {
      var mailbox = inboxSpecialMailboxes.list()[0];
      var foundMailbox = inboxSpecialMailboxes.get(mailbox.id);

      expect(foundMailbox).to.deep.equal(mailbox);
    });

    it('should return undefined if not found', function() {
      expect(inboxSpecialMailboxes.get('not_found')).to.be.undefined;
    });

  });

  describe('The add fn', function() {

    it('should add the mailbox to the list', function() {
      inboxSpecialMailboxes.add({ id: 'new', name: 'New' });

      expect(inboxSpecialMailboxes.list()).to.have.length(2);
    });

    it('should add the mailbox to the list, adding some key properties', function() {
      inboxSpecialMailboxes.add({ id: 'new', name: 'New' });

      expect(inboxSpecialMailboxes.get('new')).to.deep.equal({
        id: 'new',
        name: 'New',
        qualifiedName: 'New',
        unreadEmails: 0
      });
    });

  });

});
