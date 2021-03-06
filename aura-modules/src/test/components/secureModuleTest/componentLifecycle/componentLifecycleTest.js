({
    /**
     * Note that this test file operates in system mode (objects are not Lockerized) so the tests delegate logic and
     * verification to the controller and helper files, which operate in user mode.
     */

    // LockerService not supported on IE
    browsers: ["-IE8", "-IE9", "-IE10", "-IE11"],

    setUp: function (cmp) {
        cmp.set("v.testUtils", $A.test);
    },

    testConstructorHook: {
        attributes: {
            shouldTest_constructor_hook: true /* Setting the attribute triggers in routine in the test module*/
        },
        test: function(cmp){
            cmp.componentLifecycleTester("constructorHookCalled");
        }
    },

    testConnectedCallbackHook: {
        attributes: {
            shouldTest_connectedCallback_hook: true /* Setting the attribute triggers in routine in the test module*/
        },
        test: function(cmp) {
            cmp.componentLifecycleTester("connectedCallbackHookCalled");
        }
    },

    testDisconnectedCallbackHook: {
        attributes: {
            shouldTest_disconnectedCallback_hook: true
        },
        test: function(cmp) {
            cmp.find("componentLifecycleTester").destroy();
            cmp.componentLifecycleTester("disconnectedCallbackHookCalled");
        }
    },

    testRenderedCallbackHook: {
        attributes: {
            shouldTest_renderedCallback_hook: true /* Setting the attribute triggers in routine in the test module*/
        },
        test: function(cmp) {
            cmp.set("v.title", "rerender!");
            cmp.componentLifecycleTester("renderedCallbackHookCalled");
        }
    }
})
