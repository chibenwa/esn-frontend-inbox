'use strict';

const _ = require('lodash');

angular.module('linagora.esn.unifiedinbox')

  .controller('inboxSharedMailboxesController', function(inboxMailboxesService, inboxSharedMailboxesService) {
    var self = this;

    self.$onInit = $onInit;
    self.onSave = onSave;

    /////

    function $onInit() {
      inboxMailboxesService.sharedMailboxesList().then(function(mailboxes) {
        var originalMailboxes = _.map(mailboxes, function(mailbox) {
          return _.defaults(mailbox, { isDisplayed: true });
        });

        self.mailboxes = _.cloneDeep(originalMailboxes);
      });
    }

    function onSave() {
      inboxSharedMailboxesService.setHiddenMailboxes(self.mailboxes).then(function() {
        inboxMailboxesService.updateMailboxCache();
      });
    }

  });
