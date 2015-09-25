#!/usr/bin/env node

// Init node modules
var request = require('request');
var _ = require('underscore');
var parseArgs = require('minimist');

// Collect and parse the CLI arguments
var args = parseArgs(process.argv.slice(2));
var minRent = args.minRent || 0;
var maxRent = args.maxRent || 9999;
var numBedrooms = args.bedrooms || 2;
var numBathrooms = args.bathrooms || 2;

// Make the request to the Avalon API
request('http://api.avalonbay.com/json/reply/ApartmentSearch?communityCode=CA067&min=' + minRent + '&max=' + maxRent + '&_=1443137667833', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // Parse the JSON output
    var aptData = JSON.parse(body);

    // Filter down based on parameters
    var availableApts = aptData.results.availableFloorPlanTypes;

    if (!_.isUndefined(availableApts)) {
        var bedroomFilter = _.where(availableApts, { floorPlanTypeCode: (numBedrooms + "BD") });

        if (!_.isUndefined(bedroomFilter) && !_.isEmpty(bedroomFilter)) {
            bedroomFilter = bedroomFilter[0].availableFloorPlans;

            if (!_.isUndefined(bedroomFilter)) {
                var bedBathFilter = _.where(bedroomFilter, { floorPlanBathType: (numBathrooms + " baths") });

                if (!_.isEmpty(bedBathFilter)) {
                    console.log(JSON.stringify(bedBathFilter));
                } else {
                    console.log("None available");
                }
            }
        }
    }
  }
});