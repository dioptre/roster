﻿// Generated by Xamasoft JSON Class Generator
// http://www.xamasoft.com/json-class-generator

using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EXPEDIT.Roster.Models.Json
{

    public class Roster
    {

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("location")]
        public Location Location { get; set; }

        [JsonProperty("culture")]
        public string Culture { get; set; }

        [JsonProperty("timeResolution")]
        public long TimeResolution { get; set; }

        [JsonProperty("subscription")]
        public Subscription Subscription { get; set; }

        [JsonProperty("problem")]
        public Problem Problem { get; set; }

        [JsonProperty("assets")]
        public Asset[] Assets { get; set; }

        [JsonProperty("solutions")]
        public Solution[] Solutions { get; set; }

        [JsonProperty("costType")]
        public CostType5 CostType { get; set; }
    }

}
