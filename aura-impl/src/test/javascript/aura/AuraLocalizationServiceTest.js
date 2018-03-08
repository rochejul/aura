/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Function.RegisterNamespace("Test.Aura");

[Fixture]
Test.Aura.AuraLocalizationServiceTest = function() {
    var Aura = {
        Services: {},
        Utils: {
            SecureFilters: {},
            Util: {}
        }
    };

    // Mock the exp() function defined in Aura.js, this is originally used for exposing members using a export.js file
    Mocks.GetMocks(Object.Global(), {
        "Aura": Aura,
        "AuraLocalizationService":function(){},
        "navigator": {
            "userAgent": ""
        },
        "window": {}
    })(function() {
        [Import("aura-impl/src/main/resources/aura/AuraLocalizationService.js")]
        [Import("aura-impl/src/main/resources/aura/util/Duration.js"),
         Import("aura-impl/src/main/resources/aura/util/Util.js")]
    });

    var targetService = new Aura.Services.AuraLocalizationService();

    var targetDateTime = "07/10/2013 12:00:00";
    var targetTime = "12:00:00";
    var targetNumberFormat = "nFormat";
    var targetPercentFormat = "pFormat";
    var targetCurrencyFormat = "cFormat";

    var mockUtil = Mocks.GetMocks(Object.Global(), {
        "$A": {
            assert: function () {},
            deprecated: function() {},
            auraError: function() {},
            get:function(value){
                if(value === "$Locale.dateFormat") return "YYYY-MM-DD";
                if(value === "$Locale.datetimeFormat") return "YYYY-MM-DD hh:mm:ss";
                if(value === "$Locale.timeFormat") return "hh:mm:ss";
                if(value === "$Locale.timezone") return "PST";
                if(value === "$Locale.numberFormat") return targetNumberFormat;
                if(value === "$Locale.percentFormat") return targetPercentFormat;
                if(value === "$Locale.currencyFormat") return targetCurrencyFormat;
                if(value === "$Locale.firstDayOfWeek") return 1;
            },
            logger: {
                reportError: function(){}
            },
            util: {
                isString: Aura.Utils.Util.prototype.isString,
                isNumber: Aura.Utils.Util.prototype.isNumber
            },
            warning: function(){}
        },
        "Aura": Aura
    });

    var mockDateTime = {
        isValid:function(){
            return true;
        },
        toString:function(){
            return targetDateTime;
        },
        toDate:function(){
            return targetDateTime;
        },
        getTime: function() {}
    };


    [Fixture]
    function displayDuration() {

        [Fact]
        function displayDuration() {
            // Arrange
            var mockHumanize = Stubs.GetMethod();
            var mockMomentDuration = {
                humanize: mockHumanize
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockHumanize.Calls.length);
        }

        [Fact]
        function displayDurationWithSuffix() {
            // Arrange
            var actual;
            var mockMomentDuration = {
                // moment duration uses with suffix as param
                humanize: function(withSuffix) {
                    actual = withSuffix
                }
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                // we use noSuffix as param
                targetService.displayDuration(duration, true);
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function displayDurationInDays() {
            // Arrange
            var mockAsDays = Stubs.GetMethod();
            var mockMomentDuration = {
                asDays: mockAsDays
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInDays(duration);
            });

            // Assert
            Assert.Equal(1, mockAsDays.Calls.length);
        }

        [Fact]
        function displayDurationInHours(){
            // Arrange
            var mockAsHours = Stubs.GetMethod();
            var mockMomentDuration = {
                asHours: mockAsHours
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInHours(duration);
            });

            // Assert
            Assert.Equal(1, mockAsHours.Calls.length);
        }

        [Fact]
        function displayDurationInMilliseconds(){
            // Arrange
            var mockAsMilliseconds = Stubs.GetMethod();
            var mockMomentDuration = {
                asMilliseconds: mockAsMilliseconds
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInMilliseconds(duration);
            });

            // Assert
            Assert.Equal(1, mockAsMilliseconds.Calls.length);
        }

        [Fact]
        function displayDurationInMinutes(){
            // Arrange
            var mockAsMinutes = Stubs.GetMethod();
            var mockMomentDuration = {
                asMinutes: mockAsMinutes
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInMinutes(duration);
            });

            // Assert
            Assert.Equal(1, mockAsMinutes.Calls.length);
        }

        [Fact]
        function displayDurationInMonths() {
            // Arrange
            var mockAsMonths = Stubs.GetMethod();
            var mockMomentDuration = {
                asMonths: mockAsMonths
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInMonths(duration);
            });

            // Assert
            Assert.Equal(1, mockAsMonths.Calls.length);
        }

        [Fact]
        function displayDurationInSeconds() {
            // Arrange
            var mockAsSeconds = Stubs.GetMethod();
            var mockMomentDuration = {
                asSeconds: mockAsSeconds
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInSeconds(duration);
            });

            // Assert
            Assert.Equal(1, mockAsSeconds.Calls.length);
        }

        [Fact]
        function displayDurationInYears() {
            // Arrange
            var mockAsYears = Stubs.GetMethod();
            var mockMomentDuration = {
                asYears: mockAsYears
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.displayDurationInYears(duration);
            });

            // Assert
            Assert.Equal(1, mockAsYears.Calls.length);
        }

        [Fact]
        function getDaysInDuration() {
            // Arrange
            var mockDays = Stubs.GetMethod();
            var mockMomentDuration = {
                days: mockDays
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getDaysInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockDays.Calls.length);
        }

        [Fact]
        function getHoursInDuration() {
            // Arrange
            var mockHours = Stubs.GetMethod();
            var mockMomentDuration = {
                hours: mockHours
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getHoursInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockHours.Calls.length);
        }

        [Fact]
        function getMillisecondsInDuration(){
            // Arrange
            var mockMilliseconds = Stubs.GetMethod();
            var mockMomentDuration = {
                milliseconds: mockMilliseconds
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getMillisecondsInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockMilliseconds.Calls.length);
        }

        [Fact]
        function getMinutesInDuration(){
            // Arrange
            var mockMinutes = Stubs.GetMethod();
            var mockMomentDuration = {
                minutes: mockMinutes
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getMinutesInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockMinutes.Calls.length);
        }

        [Fact]
        function getMonthsInDuration(){
            // Arrange
            var mockMonths = Stubs.GetMethod();
            var mockMomentDuration = {
                months: mockMonths
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getMonthsInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockMonths.Calls.length);
        }

        [Fact]
        function getSecondsInDuration() {
            // Arrange
            var mockSeconds = Stubs.GetMethod();
            var mockMomentDuration = {
                seconds: mockSeconds
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getSecondsInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockSeconds.Calls.length);
        }

        [Fact]
        function getYearsInDuration() {
            // Arrange
            var mockYears = Stubs.GetMethod();
            var mockMomentDuration = {
                years: mockYears
            };
            var duration = new Aura.Utils.Duration(mockMomentDuration);

            // Act
            mockUtil(function() {
                targetService.getYearsInDuration(duration);
            });

            // Assert
            Assert.Equal(1, mockYears.Calls.length);
        }
    }

    [Fixture]
    function duration() {

        [Fact]
        function RespectsNumParam() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = "expectedNum";
            var actual;
            targetService.moment = {
                duration: function(num, unit) {
                    actual = num;
                }
            };

            // Act
            mockUtil(function() {
                targetService.duration(expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function RespectsUnitParam() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = "expectedUnit";
            var actual;
            targetService.moment = {
                duration: function(num, unit) {
                    actual = unit;
                }
            };

            // Act
            mockUtil(function() {
                targetService.duration(30, expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function endOf() {

        [Fact]
        function ReturnsOriginalDateIfUnitIsFalsy() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = new Date();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.endOf(expected, undefined);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsOriginalInputForInvalidDateType() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = [new Date()];
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.endOf(expected, "month");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function DoesNotMutateOriginalDate() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date = new Date(2013, 2, 3, 6);
            var expected = date.getTime();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.endOf(date, "day");
            });

            // Assert
            Assert.Equal(expected, date.getTime());
        }

        [Fact]
        function EndOfYear() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2008-12-31
            var expected = new Date(2008, 11, 31, 23, 59, 59, 999).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2008-04-03
                actual = targetService.endOf(new Date(2008, 3, 3), "year");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function EndOfMonth() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2008-02-29
            var expected = new Date(2008, 1, 29, 23, 59, 59, 999).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2008-02-03
                actual = targetService.endOf(new Date(2008, 1, 3), "month");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function EndOfDayWithTimestampInput() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-01 23:59:59
            var expected = new Date(2013, 3, 1, 23, 59, 59, 999).toISOString();
            // 2013-04-1 03:20:30
            var timestamp = new Date(2013, 3, 1, 3, 20, 30).getTime();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.endOf(timestamp, "day");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function EndOfHour() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-01 03:59
            var expected = new Date(2013, 3, 1, 3, 59, 59, 999).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03 03:20
                actual = targetService.endOf(new Date(2013, 3, 1, 3, 20), "hour");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function EndOfMinute() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-01 03:20:59
            var expected = new Date(2013, 3, 1, 3, 20, 59, 999).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03 03:20:30
                actual = targetService.endOf(new Date(2013, 3, 1, 3, 20, 30), "minute");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function EndOfSecondWithTimestampInput() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-03 00:00:00:999
            var expected = new Date(2013, 3, 3, 3, 20, 30, 999).toISOString();
            // 2013-04-03 03:20:30:123
            var timestamp = new Date(2013, 3, 3, 3, 20, 30, 123).getTime();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.endOf(timestamp, "second");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }
    }

    [Fixture]
    function startOf() {

        [Fact]
        function ReturnsOriginalDateIfUnitIsFalsy() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = new Date();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.startOf(expected, undefined);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsOriginalInputForInvalidDateType() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = [new Date()];
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.startOf(expected, "month");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function DoesNotMutateOriginalDate() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date = new Date(2013, 2, 3, 6);
            var expected = date.getTime();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.startOf(date, "day");
            });

            // Assert
            Assert.Equal(expected, date.getTime());
        }

        [Fact]
        function StartOfYear() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-01-01
            var expected = new Date(2013, 0, 1).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03
                actual = targetService.startOf(new Date(2013, 3, 3), "year");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function StartOfMonth() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-01
            var expected = new Date(2013, 3, 1).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03
                actual = targetService.startOf(new Date(2013, 3, 3), "month");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function StartOfDayWithTimestampInput() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-03 00:00:00
            var expected = new Date(2013, 3, 3, 0, 0, 0).toISOString();
            var timestamp = new Date(2013, 3, 3, 3, 20, 30).getTime();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03 03:20:30
                actual = targetService.startOf(timestamp, "day");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function StartOfHour() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-01
            var expected = new Date(2013, 3, 1, 3, 0, 0).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03
                actual = targetService.startOf(new Date(2013, 3, 1, 3, 20, 30), "hour");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function StartOfMinute() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-01 03:20:00
            var expected = new Date(2013, 3, 1, 3, 20, 0).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2013-04-03 03:20:30
                actual = targetService.startOf(new Date(2013, 3, 1, 3, 20, 30), "minute");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function StartOfSecondWithTimestampInput() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            // 2013-04-03 00:00:00:000
            var expected = new Date(2013, 3, 3, 3, 20, 30, 0).toISOString();
            // 2013-04-03 03:20:30:123
            var timestamp = new Date(2013, 3, 3, 3, 20, 30, 123).getTime();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.startOf(timestamp, "second");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }

        [Fact]
        function StartOfWeekIfFirstDayIsMonday() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();

            // 2018-03-01
            var expected = new Date(2018, 1, 26).toISOString();
            var actual;

            // Act
            mockUtil(function() {
                // 2018-02-26
                actual = targetService.startOf(new Date(2018, 2, 1), "week");
            });

            // Assert
            Assert.Equal(expected, actual.toISOString());
        }
    }

    [Fixture]
    function formatDate() {

        [Fact]
        function CallsDisplayDateTimeWithMomentDateForValidDate(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = date;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

             var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.formatDate("date", "format");
            });

            // Assert
            Assert.Equal(momentDate, actual);
        }

        [Fact]
        function UsesDateFormatInLocaleProviderAsDefaultFormat(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = format;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "format";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.dateFormat") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDate("date");
            });


            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProvider(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDate("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function formatDateUTC(){

        [Fact]
        function CallsDisplayDateTimeWithMomentDateForValidDate(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = date;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

             var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.formatDateUTC("date", "format");
            });

            // Assert
            Assert.Equal(momentDate, actual);
        }

        [Fact]
        function UsesDateFormatInLocaleProviderAsDefaultFormat(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = format;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "format";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.dateFormat") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDateUTC("date");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProvider(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDateUTC("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function formatDateTime(){

        [Fact]
        function CallsDisplayDateTimeWithMomentDateForValidDate(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = date;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

             var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.formatDateTime("date", "format");
            });

            // Assert
            Assert.Equal(momentDate, actual);
        }

        [Fact]
        function UsesDateTimeFormatInLocaleProviderAsDefaultFormat(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = format;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "format";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.datetimeFormat") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDateTime("date");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProvider(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDateTime("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function formatDateTimeUTC(){

        [Fact]
        function CallsDisplayDateTimeWithMomentDateForValidDate(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = date;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

             var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.formatDateTimeUTC("date", "format");
            });

            // Assert
            Assert.Equal(momentDate, actual);
        }

        [Fact]
        function UsesDateTimeFormatInLocaleProviderAsDefaultFormat(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = format;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "format";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.datetimeFormat") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDateTimeUTC("date");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProvider(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatDateTimeUTC("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function formatTime() {

        [Fact]
        function CallsDisplayDateTimeWithMomentDateForValidDate(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = date;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

             var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.formatTime("date", "format");
            });

            // Assert
            Assert.Equal(momentDate, actual);
        }

        [Fact]
        function UsesDateFormatInLocaleProviderAsDefaultFormat(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = format;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "format";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.timeFormat") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatTime("date");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProvider(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatTime("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function formatTimeUTC(){
        [Fact]
        function CallsDisplayDateTimeWithMomentDateForValidDate(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = date;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

             var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.formatTimeUTC("date", "format");
            });

            // Assert
            Assert.Equal(momentDate, actual);
        }

        [Fact]
        function UsesTimeFormatInLocaleProviderAsDefaultFormat(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = format;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "format";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.timeFormat") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatTimeUTC("date");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProvider(){
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.displayDateTime = function (date, format, locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.formatTimeUTC("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function isAfter() {

        [Fact]
        function UnitDefaultsToMillisecond() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date1 = new Date(2016, 3, 3, 12, 26, 30, 999);
            var date2 = new Date(2016, 3, 3, 12, 26, 30, 1);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isAfter(date1, date2);
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function UsesDefaultUnitIfInvalid() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date1 = new Date(2016, 3, 3, 12, 26, 30, 999);
            var date2 = new Date(2016, 3, 3, 12, 26, 30, 1);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isAfter(date1, date2, "invalidUnit");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function PositiveComparisonWithUnit() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date1 = new Date(2016, 3, 3, 12);
            var date2 = new Date(2016, 3, 3, 5);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isAfter(date1, date2, "hour");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function NegativeComparisonWithUnit() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date1 = new Date(2016, 3, 3);
            var date2 = new Date(2016, 3, 5);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isAfter(date1, date2, "month");
            });

            // Assert
            Assert.False(actual);
        }
    }

    [Fixture]
    function isBefore() {

        [Fact]
        function UnitDefaultsToMillisecond() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date1 = new Date(2016, 3, 3, 12, 26, 30, 1);
            var date2 = new Date(2016, 3, 3, 12, 26, 30, 999);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBefore(date1, date2);
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function UsesDefaultUnitIfInvalid() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date1 = new Date(2016, 3, 3, 12, 26, 30, 1);
            var date2 = new Date(2016, 3, 3, 12, 26, 30, 999);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBefore(date1, date2, "invalidUnit");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function PositiveComparisonWithUnit() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date1 = new Date(2016, 3, 3, 1);
            var date2 = new Date(2016, 3, 3, 12);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBefore(date1, date2, "hour");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function NegativeComparisonWithUnit() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date1 = new Date(2016, 3, 12);
            var date2 = new Date(2016, 3, 1);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBefore(date1, date2, "month");
            });

            // Assert
            Assert.False(actual);
        }
    }

    [Fixture]
    function isSame() {

        [Fact]
        function UnitDefaultsToMillisecond() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date1 = new Date(2016, 3, 3, 12, 26, 30, 1);
            var date2 = new Date(2016, 3, 3, 12, 26, 30, 999);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isSame(date1, date2);
            });

            // Assert
            Assert.False(actual);
        }

        [Fact]
        function UsesDefaultUnitIfInvalid() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date1 = new Date(2016, 3, 3, 12, 26, 30, 1);
            var date2 = new Date(2016, 3, 3, 12, 26, 30, 999);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isSame(date1, date2, "invalidUnit");
            });

            // Assert
            Assert.False(actual);
        }

        [Fact]
        function PositiveComparisonWithUnit() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date1 = new Date(2016, 3, 3, 1, 1);
            var date2 = new Date(2016, 3, 3, 1, 20);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isSame(date1, date2, "hour");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function NegativeComparisonWithUnit() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var date1 = new Date(2016, 3, 12);
            var date2 = new Date(2016, 3, 1);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBefore(date1, date2, "month");
            });

            // Assert
            Assert.False(actual);
        }
    }

    [Fixture]
    function isBetween() {

        [Fact]
        function ReturnsFalseIfDateIsBeforeFromDate() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var fromDate = new Date(2016, 3, 1);
            var toDate = new Date(2016, 3, 15);
            var date = new Date(2016, 2, 28);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBetween(date, fromDate, toDate, "day");
            });

            // Assert
            Assert.False(actual);
        }

        [Fact]
        function ReturnsFalseIfDateIsAfterToDate() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var fromDate = new Date(2016, 3, 1);
            var toDate = new Date(2016, 3, 15);
            var date = new Date(2016, 3, 30);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBetween(date, fromDate, toDate, "day");
            });

            // Assert
            Assert.False(actual);
        }

        [Fact]
        function ReturnsTrueIfDateEqualsFromDate() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var fromDate = new Date(2016, 3, 1, 12, 30, 00);
            var toDate = new Date(2016, 3, 15, 13, 20, 00);
            var date = new Date(2016, 3, 1, 12, 30, 00);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBetween(date, fromDate, toDate, "minutes");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function ReturnsTrueIfDateEqualsToDate() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var fromDate = new Date(2016, 3, 1, 12, 30, 00);
            var toDate = new Date(2016, 3, 15, 13, 20, 00);
            var date = new Date(2016, 3, 15, 13, 20, 00);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBetween(date, fromDate, toDate, "minutes");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function ReturnsTrueIfInBetween() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();
            var fromDate = new Date(2016, 3, 1, 12, 30, 00);
            var toDate = new Date(2016, 3, 15, 15, 20, 00);
            var date = new Date(2016, 3, 15, 13, 40, 00);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBetween(date, fromDate, toDate, "hour");
            });

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function ReturnsTrueIfInBetweenForWeek() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.setupDateTimeUnitAlias();

            var fromDate = new Date(2018, 1, 26);
            var toDate = new Date(2018, 2, 16);
            var date = new Date(2018, 2, 1);
            var actual;

            //Act
            mockUtil(function() {
                actual = targetService.isBetween(date, fromDate, toDate, "week");
            });

            // Assert
            Assert.True(actual);
        }
    }

    [Fixture]
    function parseDateTime() {

        [Fact]
        function ReturnsNullForEmptyDateTimeString() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();

            // Act
            var actual = targetService.parseDateTime("", "format");

            // Assert
            Assert.Null(actual);
        }

        [Fact]
        function ReturnsNullIfMomentDateIsInvalid() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();

            var momentDate = {
                isValid: function() {
                    return false;
                }
            };

            targetService.moment = function() {
                return momentDate;
            };

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){}
            });

            // Act
            mockUtil(function(){
                actual = targetService.parseDateTime("date", "format");
            });

            // Assert
            Assert.Null(actual);
        }

        [Fact]
        function CallsToDateIfMomentDateIsValid() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();

            var momentDate = {
                isValid: function() {
                    return true;
                },
                toDate: Stubs.GetMethod()
            };

            targetService.moment = function() {
                return momentDate;
            };

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){}
            });

            // Act
            mockUtil(function(){
                targetService.parseDateTime("date", "format");
            });

            // Assert
            Assert.Equal(1, momentDate.toDate.Calls.length);
        }

        [Fact]
        function UsesLocaleInLocaleProviderIfThirdParamIsBoolean() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.getAvailableMomentLocale = function(locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                },
                toDate: function() {}
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.parseDateTime("date", "format", true);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProviderIfThirdParamIsUndefined() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.getAvailableMomentLocale = function(locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                },
                toDate: function() {}
            };

            targetService.moment = function() {
                return momentDate;
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.parseDateTime("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }

    }


    [Fixture]
    function parseDateTimeUTC(){

        [Fact]
        function ReturnsNullForEmptyDateTimeString() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();

            // Act
            var actual = targetService.parseDateTime("", "format");

            // Assert
            Assert.Null(actual);
        }

        [Fact]
        function ReturnsNullIfMomentDateIsInvalid() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();

            var momentDate = {
                isValid: function() {
                    return false;
                }
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                actual = targetService.parseDateTimeUTC("date", "format");
            });

            // Assert
            Assert.Null(actual);
        }

        [Fact]
        function CallsToDateIfMomentDateIsValid() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();

            var momentDate = {
                isValid: function() {
                    return true;
                },
                toDate: Stubs.GetMethod()
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value) {}
            });

            // Act
            mockUtil(function(){
                targetService.parseDateTimeUTC("date", "format");
            });

            // Assert
            Assert.Equal(1, momentDate.toDate.Calls.length);
        }

        [Fact]
        function UsesLocaleInLocaleProviderIfThirdParamIsBoolean() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.getAvailableMomentLocale = function(locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                },
                toDate: function() {}
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.parseDateTimeUTC("date", "format", true);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesLocaleInLocaleProviderIfThirdParamIsUndefined() {
            // Arrange
            var actual;
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.getAvailableMomentLocale = function(locale) {
                actual = locale;
            }

            var momentDate = {
                isValid: function() {
                    return true;
                },
                toDate: function() {}
            };

            targetService.moment = {
                utc: function() {
                    return momentDate;
                }
            };

            var expected = "locale";
            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                util: {
                    isBoolean: function(value) { return typeof value === "boolean" },
                    isUndefined: function(value) { return value === undefined; }
                },
                get: function(value){
                    if(value === "$Locale.langLocale") return expected;
                }
            });

            // Act
            mockUtil(function(){
                targetService.parseDateTimeUTC("date", "format");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }



    [Fixture]
    function parseDateTimeISO8601() {

        var createTargetService = function() {
             var targetService = new Aura.Services.AuraLocalizationService();
             var mockInvalidDate = {
                    isValid: function(){
                        return false;
                    }
                };

             targetService.moment = function(dateTimeString) {
                if (dateTimeString === null) {
                    return null;
                } else if (dateTimeString === "invalid") {
                    return mockInvalidDate;
                } else if (typeof dateTimeString === "string") {
                    return mockDateTime;
                }
            };
            return targetService;
        }

        [Fact]
        function ReturnsNullForInvalidDateTimeString() {
            // Arrange
            var targetService = createTargetService();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.parseDateTimeISO8601("invalid");
            });

            // Assert
            Assert.Null(actual);
        }

        [Fact]
        function ReturnsNullWhenMomentReturnsNull() {
            // Arrange
            var expected = null;
            var targetService = createTargetService();

            // Act
            var actual = targetService.parseDateTimeISO8601(null);

            // Assert
            Assert.Null(actual);
        }

        [Fact]
        function ReturnsDateTimeForValidDateTime() {
            // Arrange
            var expected = targetDateTime;
            var targetService = createTargetService();

            // Act
            var actual = targetService.parseDateTimeISO8601("2017-11-12T12:30:40.123");

            // Assert
            Assert.True(expected === actual);
        }
    }

    [Fixture]
    function toISOString() {

        [Fact]
        function ReturnsInputValueForFalsyInput() {
            // Arrange
            var expected = "";
            var targetService = new Aura.Services.AuraLocalizationService();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.toISOString(expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsInputValueForNonDateInput() {
            // Arrange
            var expected = "2015-04-01";
            var targetService = new Aura.Services.AuraLocalizationService();
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.toISOString(expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function CallsToISOStringOnDateIfExits() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date = new Date();
            date.toISOString = Stubs.GetMethod();

            // Act
            mockUtil(function() {
                targetService.toISOString(date);
            });

            // Assert
            Assert.Equal(1, date.toISOString.Calls.length);
        }

        [Fact]
        function ReturnsISOStringForDateWithToISOString(){
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = "2004-11-09T12:30:59.123Z";
            var date = new Date(Date.UTC(2004,10,09,12,30,59,123));
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.toISOString(date);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsISOStringForDateWithoutToISOString(){
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = "2004-11-09T12:30:59.123Z";
            var date = new Date(Date.UTC(2004,10,09,12,30,59,123));
            date.toISOString = undefined;
            var actual;

            // Act
            mockUtil(function() {
                actual = targetService.toISOString(date);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

    }

    [Fixture]
    function UTCToWallTime() {

        [Fact]
        function CallbackWithOriginalDateWhenZoneIsGMT() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = Stubs.GetObject({});
            var actual;

            // Act
            mockUtil(function () {
                targetService.UTCToWallTime(expected, "GMT", function(date) {
                    actual = date;
                });
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesUserTimezoneIfTimeZoneIsFalsy() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var mockGet = Stubs.GetMethod("$Locale.timezone", "UTC");
            var actual;

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                assert: function () {},
                get: mockGet
            });

            // Act
            mockUtil(function() {
                // when timezone is UTC, callback gets called with the original date
                targetService.UTCToWallTime(mockDateTime, undefined, function() {});
            });

            // Assert
            Assert.Equal(1, mockGet.Calls.length);
        }

        [Fact]
        function UsesUserTimeZoneIfTimeZoneIsUnsupported() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var timeZone = "America/Los_Angeles";
            var mockGet = Stubs.GetMethod("$Locale.timezone", timeZone);

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                assert: function () {},
                warning: function() {},
                get: mockGet
            });

            // Act
            mockUtil(function() {
                targetService.UTCToWallTime(new Date(), "unsupported", function() {});
            });

            // Assert
            Assert.Equal(1, mockGet.Calls.length);
        }

        [Fact]
        function ConvertsTimeBasedOnTimeZone() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date = new Date(Date.UTC(2017, 1, 3, 20, 30));
             // minus 8 hours
            var expected = new Date(Date.UTC(2017, 1, 3, 12, 30)).toISOString();
            var actual;

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                assert: function () {},
            });

            // Act
            mockUtil(function() {
                targetService.UTCToWallTime(date, "America/Los_Angeles",
                    function(WallTime) {
                        actual = WallTime.toISOString();
                    });
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function WallTimeToUTC(){

        [Fact]
        function CallbackWithOriginalDateWhenZoneIsGMT() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var expected = Stubs.GetObject({});
            var actual;

            // Act
            mockUtil(function () {
                targetService.WallTimeToUTC(expected, "GMT", function(date) {
                    actual = date;
                });
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function UsesUserTimezoneIfTimeZoneIsFalsy() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var mockGet = Stubs.GetMethod("$Locale.timezone", "UTC");
            var actual;

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                assert: function () {},
                get: mockGet
            });

            // Act
            mockUtil(function() {
                // when timezone is UTC, callback gets called with the original date
                targetService.WallTimeToUTC(mockDateTime, undefined, function() {});
            });

            // Assert
            Assert.Equal(1, mockGet.Calls.length);
        }

        [Fact]
        function UsesUserTimeZoneIfTimeZoneIsUnsupported() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var timeZone = "America/Los_Angeles";
            var mockGet = Stubs.GetMethod("$Locale.timezone", timeZone);

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                assert: function () {},
                warning: function() {},
                get: mockGet
            });

            // Act
            mockUtil(function() {
                targetService.WallTimeToUTC(new Date(), "unsupported", function() {});
            });

            // Assert
            Assert.Equal(1, mockGet.Calls.length);
        }

        [Fact]
        function ConvertsTimeBasedOnTimeZone() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            var date = new Date(Date.UTC(2017, 1, 3, 20, 30));
            // plus 8 hours
            var expected = new Date(Date.UTC(2017, 1, 4, 4, 30)).toISOString();
            var actual;

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                assert: function () {},
            });

            // Act
            mockUtil(function() {
                targetService.WallTimeToUTC(date, "America/Los_Angeles",
                    function(WallTime) {
                        actual = WallTime.toISOString();
                    });
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function displayDateTime(){

        var targetFormat = "format";
        var targetLang = "lang";

        var targetDateTimeObj={
            l:'',
            f:'',
            locale:function(lang){
                if(lang === targetLang) this.l = lang;
            },
            format:function(format){
                if(format === targetFormat) this.f = format + this.l;
                return this.f;
            }
        };

        var createTargetService = function() {
            var targetService = new Aura.Services.AuraLocalizationService();
            //targetService.moment =
            targetService.getNormalizedFormat = function(format){
                return format;
            }

            targetService.getAvailableMomentLocale = function(locale) {
                return locale;
            }

            return targetService;
        };

        [Fact]
        function InvalidLocale(){
            // Arrange
            var targetService = createTargetService();
            var expected = targetFormat;

            // Act
            var actual = targetService.displayDateTime(targetDateTimeObj, targetFormat, '');

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function validFormatAndLocale(){
            // Arrange
            var targetService = createTargetService();
            var expected = targetFormat+targetLang;

            // Act
            var actual = targetService.displayDateTime(targetDateTimeObj, targetFormat, targetLang);

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function getNormalizedFormat(){

        var targetFormat = "DDMMYYYY";

        [Fact]
        function inValidFormat(){
            // Arrange
            var expected = "";
            var actual;

            // Act
            actual = targetService.getNormalizedFormat("");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function cacheHit(){
            // Arrange
            var expected = targetFormat;
            var actual;

            var mockCache = Mocks.GetMock(targetService, "cache", {
                format: {
                    DDMMYYYY:targetFormat
                }
            });

            // Act
            mockCache(function(){
                actual = targetService.getNormalizedFormat(targetFormat);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function cacheMiss(){
            // Arrange
            var expected = targetFormat;
            var actual;

            var mockCache = Mocks.GetMock(targetService, "cache", {
                format: {
                    ddMMyyyy:false
                }
            });

            // Act
            mockCache(function(){
                actual = targetService.getNormalizedFormat("ddMMyyyy");
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function getStrictModeFormat(){

        var targetFormat = "DDMMYYYY";

        [Fact]
        function emptyFormat(){
            // Arrange
            var expected = "";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function dateOnlySingleLetterFormat(){
            // Arrange
            var expected = "D-M-YYYY";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("d-M-y");

            // Assert
            Assert.Equal(expected, actual);
        }


        [Fact]
        function dateOnlyDoubleLetterFormat(){
            // Arrange
            var expected = "D-M-YYYY";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("dd-MM-y");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function dateTimeSingleLetterFormat(){
            // Arrange
            var expected = "D-M-YYYY h:m A";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("d-M-y h:m a");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function dateTimeDoubleLetterFormat(){
            // Arrange
            var expected = "D-M-YYYY h:m A";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("dd-MM-y hh:mm a");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function dateTimeNoSpaceAMPMFormat(){
            // Arrange
            var expected = "D-M-YYYY h:m A";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("dd-MM-y hh:mmA  ");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function dateTimeExtraSpaceAMPMFormat(){
            // Arrange
            var expected = "D-M-YYYY h:m A";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("dd-MM-y hh:mm   A  ");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function dateTime24HrFormat(){
            // Arrange
            var expected = "D-M-YYYY H:m";
            var actual;

            // Act
            actual = targetService.getStrictModeFormat("d-M-y HH:mm");

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function getAvailableMomentLocale(){

        [Fact]
        function ReturnsValueInCacheIfHits() {
            // Arrange
            var expected = "momentLocale";
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.localeCache = { "javaLocale": expected };

            // Act
            var actual = targetService.getAvailableMomentLocale("javaLocale");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsEnIfCacheMisses() {
            // Arrange
            var expected = "en";
            var targetService = new Aura.Services.AuraLocalizationService();

            // Act
            var actual = targetService.getAvailableMomentLocale("notExists");

            // Assert
            Assert.Equal(expected, actual);
        }

    }

    [Fixture]
    function normalizeToMomentLocale(){

        [Fact]
        function ReturnsArgValueForFalsy() {
            // Arrange
            var expected = "";
            var targetService = new Aura.Services.AuraLocalizationService();

            // Act
            var actual = targetService.normalizeToMomentLocale(expected);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsMomentLocaleIfCompoundLocaleMatches(){
            // Arrange
            var expected = "zh-cn";
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return [expected];
                }
            };

            // Act
            var actual = targetService.normalizeToMomentLocale("zh_CN");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsMomentLocaleIfLanguageLocaleMatches(){
            // Arrange
            var expected = "de";
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return [expected];
                }
            };

            // Act
            var actual = targetService.normalizeToMomentLocale("de_DE");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnEnIfNoMatchingLocale(){
            // Arrange
            var expected = "en";
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return [];
                }
            };

            // Act
            var actual = targetService.normalizeToMomentLocale("not_matching");

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsNbForNorNorwegian(){
            // Arrange
            var expected = "nb";
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return [expected];
                }
            };

            // Act
            var actual = targetService.normalizeToMomentLocale("no_No");

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function isAvailableLocale(){

        [Fact]
        function ReturnsFalseForFalsyValue() {
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();

            // Act
            var actual = targetService.isAvailableLocale("");

            // Assert
            Assert.False(actual);
        }

        [Fact]
        function ReturnsTrueIfLocaleCacheHits(){
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();
            targetService.localeCache["zh_CN"] = "zh-cn";

            // Act
            var actual = targetService.isAvailableLocale("zh_CN");

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function ReturnsTrueIfMomentDataAvailable(){
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return ["zh-cn"];
                }
            };

            // Act
            var actual = targetService.isAvailableLocale("ZH-CN");

            // Assert
            Assert.True(actual);
        }

        [Fact]
        function AddsToCacheIfCacheMissesOnAvailableLocale(){
            // Arrange
            var expected = "zh-cn";
            var locale = "zh_CN";
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return [expected];
                }
            };

            // Act
            targetService.isAvailableLocale(locale);
            var actual = targetService.localeCache[locale];

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsFalseForUnavailableLocale(){
            // Arrange
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment = {
                locales: function(){
                    return [];
                }
            };

            // Act
            var actual = targetService.isAvailableLocale("unavailable");

            // Assert
            Assert.False(actual);
        }

        [Fact]
        function ReturnsTrueIfEnLocaleIsAvailable(){
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.moment =  {
                locales: function(){
                    return ["en"];
                }
            };

            // Act
            var actual = targetService.isAvailableLocale("en-US");

            // Assert
            Assert.True(actual);
        }

    }

    [Fixture]
    function init(){

        [Fact]
        function SetsMomentLocaleAsValueInLocaleProvider(){
            // Arrange
            var expected = "locale";
            var javaLocale = "JavaLocale";
            var targetService = new Aura.Services.AuraLocalizationService();
            var actual;

            targetService.normalizeToMomentLocale = function(locale) {
                if (locale === javaLocale) { return expected; }
            }

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                get: function(key) {
                    if(key === "$Locale.langLocale") return javaLocale;
                }
            });

            var mockMoment = Mocks.GetMock(Object.Global(), "moment", {
                locale: function(locale) {
                    actual = locale;
                }
            });

            // Act
            mockUtil(function(){
                mockMoment(function(){
                    targetService.init();
                });
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function AddsAvailableLocaleToCache(){
            // Arrange
            var expected = "locale";
            var javaLocale = "JavaLocale";
            var targetService = new Aura.Services.AuraLocalizationService();

            targetService.normalizeToMomentLocale = function(locale) {
                if (locale === javaLocale) { return expected; }
            }

            var mockUtil = Mocks.GetMock(Object.Global(), "$A", {
                get: function(key) {
                    if(key === "$Locale.langLocale") return javaLocale;
                }
            });

            var mockMoment = Mocks.GetMock(Object.Global(), "moment", {
                locale: function(locale) {}
            });

            // Act
            mockUtil(function(){
                mockMoment(function(){
                    targetService.init();
                });
            });

            // Assert
            var actual = targetService.localeCache[javaLocale];
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function formatNumbers(){

        [Fact]
        function formatNumber(){
            // Arrange
            var expected = 101;
            var actual;

            var mockGetDefaultNumberFormat = Mocks.GetMock(targetService, "getDefaultNumberFormat", function(){
                return {
                    format: function(number) {
                        if(number === expected) return expected;
                    }
                };
            });

            // Act
            mockGetDefaultNumberFormat(function(){
                actual = targetService.formatNumber(expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function formatPercent(){
            // Arrange
            var expected = "10%";
            var actual;

            var mockGetDefaultPercentFormat = Mocks.GetMock(targetService, "getDefaultPercentFormat", function(){
                return {
                    format: function(number){
                        if(number === expected) return expected;
                    }
                };
            });

            // Act
            mockGetDefaultPercentFormat(function(){
                actual = targetService.formatPercent(expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function formatCurrency(){
            // Arrange
            var expected = "$100";
            var actual;

            var mockGetDefaultCurrencyFormat = Mocks.GetMock(targetService, "getDefaultCurrencyFormat", function(){
                return {
                    format: function(number){
                        if(number === expected) return expected;
                    }
                };
            });

            // Act
            mockGetDefaultCurrencyFormat(function(){
                actual = targetService.formatCurrency(expected);
            });

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function getNumberFormat(){

        [Fact]
        function getNumberFormat(){
            // Arrange
            var actual;
            var targetSymbols = '###';
            var mockNumberFormat = {};

            var mockNumberFormatConstructor = Mocks.GetMock(Object.Global(), "Aura", { "Utils" : {"NumberFormat": function(format, symbols){
                if(format === targetNumberFormat && symbols === targetSymbols) return mockNumberFormat;
            }}});

            // Act
            mockNumberFormatConstructor(function(){
                actual = targetService.getNumberFormat(targetNumberFormat, targetSymbols);
            });

            // Assert
            Assert.Equal(mockNumberFormat, actual);
        }
    }

    [Fixture]
    function getDefaultFormats(){

        [Fact]
        function getNumberFormat(){
            // Arrange
            var actual;
            var mockNumberFormat = {};

            var mockNumberFormatConstructor = Mocks.GetMock(Object.Global(), "Aura", { "Utils" : {"NumberFormat": function(val){
                if(val === targetNumberFormat) return mockNumberFormat;
            }}});

            // Act
            mockUtil(function(){
                mockNumberFormatConstructor(function(){
                    actual = targetService.getDefaultNumberFormat();
                });
            });

            // Assert
            Assert.Equal(mockNumberFormat, actual);
        }

        [Fact]
        function getDefaultPercentFormat(){
            // Arrange
            var actual;
            var mockNumberFormat = {};

            var mockNumberFormatConstructor = Mocks.GetMock(Object.Global(), "Aura", { "Utils" : {"NumberFormat": function(val){
                if(val === targetPercentFormat) return mockNumberFormat;
            }}});

            // Act
            mockUtil(function(){
                mockNumberFormatConstructor(function(){
                    actual = targetService.getDefaultPercentFormat();
                });
            });

            // Assert
            Assert.Equal(mockNumberFormat, actual);
        }

        [Fact]
        function getDefaultCurrencyFormat(){
            // Arrange
            var actual;
            var mockNumberFormat = {};

            var mockNumberFormatConstructor = Mocks.GetMock(Object.Global(), "Aura", { "Utils" : {"NumberFormat": function(val){
                if(val === targetCurrencyFormat) return mockNumberFormat;
            }}});

            // Act
            mockUtil(function(){
                mockNumberFormatConstructor(function(){
                    actual = targetService.getDefaultCurrencyFormat();
                });
            });

            // Assert
            Assert.Equal(mockNumberFormat, actual);
        }
    }

    [Fixture]
    function pad(){

        [Fact]
        function pad0(){
            // Arrange
            var expected = '00';
            var actual;

            // Act
            actual = targetService.pad(0);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function pad1(){
            // Arrange
            var expected = '01';
            var actual;

            // Act
            actual = targetService.pad(1);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function pad9(){
            // Arrange
            var expected = '09';
            var actual;

            // Act
            actual = targetService.pad(9);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function pad10(){
            // Arrange
            var expected = '10';
            var actual;

            // Act
            actual = targetService.pad(10);

            // Assert
            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function doublePad(){

        [Fact]
        function pad0(){
            // Arrange
            var expected = '000';
            var actual;

            // Act
            actual = targetService.doublePad(0);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function pad1(){
            // Arrange
            var expected = '001';
            var actual;

            // Act
            actual = targetService.doublePad(1);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function pad9(){
            // Arrange
            var expected = '099';
            var actual;

            // Act
            actual = targetService.doublePad(99);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        function pad10(){
            // Arrange
            var expected = '100';
            var actual;

            // Act
            actual = targetService.doublePad(100);

            // Assert
            Assert.Equal(expected, actual);
        }
    }
}
