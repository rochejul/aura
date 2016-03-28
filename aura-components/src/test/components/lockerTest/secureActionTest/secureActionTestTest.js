({
    /**
     * Note that this test file operates in system mode (objects are not Lockerized) so the tests delegate logic and
     * verification to the controller and helper files, which operate in user mode.
     */

    setUp: function(cmp) {
        cmp.set("v.testUtils", $A.test);
    },

    testServerActionIsSecureAction: {
        test: function(cmp) {
            cmp.testServerActionIsSecureAction();
        }
    },
    
    testClientActionIsSecureAction: {
        test: function(cmp) {
            cmp.testClientActionIsSecureAction();
        }
    },
    
    testActionThatErrors: {
        test: function(cmp) {
            cmp.testActionThatErrors();
            $A.test.addWaitFor(true, function() {
                return !!cmp.get("v.testComplete");
            });
        }
    },

    // TODO(W-2988718): Action passed from system mode is raw Action object instead of SecureAction
    _testDifferentNamespacedActionPassedFromSystemMode: {
        test: function(cmp) {
            var facet = cmp.find("facet");
            var facetAction = facet.get("c.cExecuteInForegroundWithReturn");
            cmp.testDifferentNamespacedActionPassedFromSystemMode(facetAction);
            $A.test.addWaitFor(true, function() {
                return !!cmp.get("v.testComplete");
            });
        }
    }
})