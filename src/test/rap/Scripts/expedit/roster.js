expedit.rosters = {
	costType : function (name, id, locale, weight, refactor) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.locale = locale;
	    this.weight = weight | 1; //translation between types
	    this.refactor = refactor | 1; //interpreted priority
	},

	cost: function (name, id, min, max, costType, value) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.min = min;
	    this.max = max;
	    this.costType = costType;
	    this.value = value | 0;
	},

	constraint: function (name, id, min, max, constraintType, fixed, weight, blocks, text) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.min;
	    this.max;
	    this.constraintType = constraintType || constraintTypes[0]; //default soft constraint
	    this.fixed = fixed || true; //calculated or not
	    this.weight = weight | 0;
	    this.blocks = blocks || matrixFalse; //interpreted
	    this.text = text; //true representation
	},

	problem: function (name, id, min, max, iterations, liveUpdateClient, liveUpdateServer, complexity, costTypes, virtassets) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.version = 0;
	    this.min = min;
	    this.max = max;
	    this.iterations = iterations | 0; //suggested iterations
	    this.liveUpdateClient = liveUpdateClient || false;
	    this.liveUpdateServer = liveUpdateServer || false;
	    this.complexity = complexity | 0;
	    this.costTypes = costTypes || expedit.rosters.defaults.costTypes; //implies solution type
	    this.virtualassets = virtassets || [];
	},

	asset: function (name, id, min, max, antecedents, availability, constraints, costs, geolocation, capacities, priority) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.min = min; //used for availability, and variations - solve only as one block though
	    this.max = max;
	    this.antecedents = antecedents || [];
	    this.constraints = constraints || [];
	    this.costs = costs || [];
	    this.priority = priority | 0;
	    this.capacities = capacities || [];
	    this.availability = availability || expedit.matrixTrue;
	    this.geolocation = geolocation || expedit.options.currentLocation;
	    this.getIndividualCost = getIndividualCost;
	    function getIndividualCost() //aggregate costs
	    {
		var weight = 0.0;
		for (var i = 0, j = this.costs.length; i < j; i++) {
		    weight += costs[i].value * costs[i].costType.weight;
		}
		return weight;
	    }
	},

	capacity: function (name, id, capacity, asset) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.capacity = capacity | -1;
	    this.asset = asset;
	},

	subscription: function (name, id, license, created, expiry)
	{
	    this.name = name;
	    this.id = id;
	    this.license = license;
	    this.created = created;
	    this.expiry = expiry;
	},
	

    	allocation: function (name, id, asset, group, ticks, geolocation) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.asset = asset;
	    this.group = group; //usually fixed asset
	    this.ticks = ticks;
	    this.geolocation = geolocation;
	},

	solution: function (name, id, min, max, costs,solutionType, iterations, confidence, duration, eta, priority, allocations) {
	    this.name = name;
	    this.id = id || expedit.newComb();
	    this.min = min;
	    this.max = max;
	    this.costs = costs;
	    this.solutionType = solutionType;
	    this.iterations = iterations;
	    this.confidence = confidence;
	    this.duration = duration | 0;
	    this.eta = eta; //date solved
	    this.priority = priority | 0;
	    this.allocations = allocations || [];
	},

	roster: function (user,subscription,problem,assets,solutions) {
	 		
	},

	type: {name: 'expedit.roster', version: '0.0.0'}         
};

expedit.rosters.defaults = {
	costTypes: [new expedit.rosters.costType('money', '3a24e1be-23a1-4903-b000-79717b5d1158', null, 1)],
	constraintTypes : [{ name: 'soft', id: '395efbf8-7dcb-4a0f-b000-79717b5d1158' }, { name: 'hard', id: 'f4caf563-4825-4207-a000-79717b5d1158' }],
	fixed: new expedit.rosters.asset('fixed', 'afdbdb1c-8b68-4f70-a000-79717b5d1158'),
	movable: new expedit.rosters.asset('movable', '9e4f56fa-6d07-4312-a000-79717b5d1158'),
	work: new expedit.rosters.asset('work', '068e421d-0477-44d8-8000-79717b5d1158'),
	material: new expedit.rosters.asset('material', '25c21069-af69-4cf4-8000-79717b5d1158'),
	cost: new expedit.rosters.asset('cost', 'be168bb8-ed15-479a-a000-79717b5d1158')
};
expedit.rosters.defaults.assets = [];
expedit.rosters.defaults.assets['root'] = [expedit.rosters.defaults.fixed, expedit.rosters.defaults.movable, expedit.rosters.defaults.work, expedit.rosters.defaults.material,expedit.rosters.defaults.cost];
expedit.rosters.defaults.assets['start'] = [expedit.rosters.defaults.fixed, expedit.rosters.defaults.movable, expedit.rosters.defaults.work, expedit.rosters.defaults.material, expedit.rosters.defaults.cost];

expedit.rosters.options = {
	currentCostType: expedit.rosters.defaults.costTypes[0],
	currentProblem: new expedit.rosters.problem('Unknown Problem'),
	currentSolutions: [new expedit.rosters.solution('Unknown Solution')],
	currentAssetGroup: expedit.rosters.defaults.assets.start,
	currentSubscription: new expedit.rosters.subscription('Unknown Subscription')
};
expedit.rosters.instances = [new expedit.rosters.roster()]; //TODO

//now load up solutions and real assets
//also load up default templates for asset types [ex. rn's may have specific schedules] constraints and avail and capacity
//also need a method to convert allocation to blocks
