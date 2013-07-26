function Ticks(conv) {
    return ((conv.getTime() * 10000) + 621355968000000000);
}

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function newComb(conv) {
    if (conv == null)
        conv = new Date();
    var now = Ticks(conv).toString(16).substring(0, 15).split('').reverse().join('');
    return 'xxxxxxxx-xxxx-4xxx-y'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }) + now.substring(0, 3) + '-' + now.substring(3, 15);
}

function Geolocation(name, id, easting, northing, elevation) {
    this.name = name;
    this.id = id || newComb();
    this.easting = easting;
    this.northing = northing;
    this.elevation = elevation;
}

var unknownLocation = new Geolocation('Unknown Location', 'fafa6852-460d-4eea-a000-79717b5d1158');
var brisbane = new Geolocation('Brisbane', '2adbe3cf-88fb-45ba-8000-79717b5d1158', 153.0333, 27.4667, 38);

var matrixTrue = [[0, 1], [0], [true]];
var matrixFalse = [[0, 1], [0], [false]];

function Capacity(name, id, capacity, asset) {
    this.name = name;
    this.id = id || newComb();
    this.capacity = capacity | -1;
    this.asset = asset;

}


function CostType(name, id, locale, weight, refactor) {
    this.name = name;
    this.id = id || newComb();
    this.locale = locale;
    this.weight = weight | 1; //translation between types
    this.refactor = refactor | 1; //interpreted priority
}


var moneyCostType = new CostType('money', '3a24e1be-23a1-4903-b000-79717b5d1158', null, 1);

function Cost(name, id, min, max, costType, value) {
    this.name = name;
    this.id = id || newComb();
    this.min = min;
    this.max = max;
    this.costType = costType;
    this.value = value | 0;
}

var constraintTypes = [{ name: 'soft', id: '395efbf8-7dcb-4a0f-b000-79717b5d1158' }, { name: 'hard', id: 'f4caf563-4825-4207-a000-79717b5d1158' }];

function Constraint(name, id, min, max, constraintType, fixed, weight, blocks, text) {
    this.name = name;
    this.id = id || newComb();
    this.min;
    this.max;
    this.constraintType = constraintType || constraintTypes[0]; //default soft constraint
    this.fixed = fixed || true; //calculated or not
    this.weight = weight | 0;
    this.blocks = blocks || matrixFalse; //interpreted
    this.text = text; //true representation
}

function Problem(name, id, min, max, iterations, liveUpdateClient, liveUpdateServer, complexity, costTypes, virtAssets) {
    this.name = name;
    this.id = id || newComb();
    this.min = min;
    this.max = max;
    this.iterations = iterations | 0; //suggested iterations
    this.liveUpdateClient = liveUpdateClient || false;
    this.liveUpdateServer = liveUpdateServer || false;
    this.complexity = complexity | 0;
    this.costTypes = costTypes || [moneyCostType]; //implies solution type
    this.virtualAssets = virtAssets || [];
}

function Asset(name, id, min, max, antecedents, availability, constraints, costs, geolocation, capacities, priority) {
    this.name = name;
    this.id = id || newComb();
    this.min = min; //used for availability, and variations - solve only as one block though
    this.max = max;
    this.antecedents = antecedents || [];
    this.constraints = constraints || [];
    this.costs = costs || [];
    this.priority = priority | 0;
    this.capacities = capacities || [];
    this.availability = availability || matrixTrue;
    this.geolocation = geolocation || unknownLocation;
    this.getIndividualCost = getIndividualCost;
    function getIndividualCost() //aggregate costs
    {
        var weight = 0.0;
        for (var i = 0, j = this.costs.length; i < j; i++) {
            weight += costs[i].value * costs[i].costType.weight;
        }
        return weight;
    }
}

var fixed = new Asset('fixed', 'afdbdb1c-8b68-4f70-a000-79717b5d1158');
var movable = new Asset('movable', '9e4f56fa-6d07-4312-a000-79717b5d1158');
var work = new Asset('work', '068e421d-0477-44d8-8000-79717b5d1158');
var material = new Asset('material', '25c21069-af69-4cf4-8000-79717b5d1158');
var cost = new Asset('cost', 'be168bb8-ed15-479a-a000-79717b5d1158');
var rootAssets = [fixed, movable, work, material, cost];
var startAssets = [fixed, movable, work, material, cost];

function Me(name, id, subscription) {
    this.name = name;
    this.id = id || newComb();
    this.subscription = subscription;
}

function Allocation(name, id, asset, group, ticks, geolocation) {
    this.name = name;
    this.id = id || newComb();
    this.asset = asset;
    this.group = group; //usually fixed asset
    this.ticks = ticks;
    this.geolocation = geolocation;
}

function Solution(name, id, min, max, costs, iterations, confidence, duration, eta, priority, allocations) {
    this.name = name;
    this.id = id || newComb();
    this.min = min;
    this.max = max;
    this.costs = costs;
    this.iterations = iterations;
    this.confidence = confidence;
    this.duration = duration | 0;
    this.eta = eta; //date solved
    this.priority = priority | 0;
    this.allocations = allocations || [];
}

var now = new Date();

var bs =
{
    id: newComb(now),
    max: Ticks(now),
    min: Ticks(now),
    durationLimit: 336, //1 week of 30 min intervals
    unitResolution: 30 * 60 * 10000000, //30min*60sec*(seconds)*100ns
    problem: new Problem('Unknown Problem'),
    me: new Me('Unknown User'),
    solution: [new Solution('Unknown Solution')],
    assets: startAssets
};

//now load up solutions and real assets
//also load up default templates for asset types [ex. rn's may have specific schedules] constraints and avail and capacity
//also need a method to convert allocation to blocks
