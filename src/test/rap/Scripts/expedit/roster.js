expedit.rosters = {
	costType : function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.locale = args.locale;
	    this.weight = args.weight || 1; //translation between types
	    this.refactor = args.refactor || 1; //interpreted priority
	},

	cost: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.min = args.min;
	    this.max = args.max;
	    this.costType = args.costType;
	    this.value = args.value || 0;
	},

	
    constraintType: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
    },
	
    constraint: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.min = args.min;
	    this.max = args.max;
	    this.constraintType = args.constraintType || expedit.rosters.defaults.constraintTypes[0]; //default soft constraint
	    this.fixed = args.fixed || true; //calculated or not
	    this.weight = args.weight || 0;
	    this.blocks = args.blocks || expedit.matrixFalse; //interpreted
	    this.text = args.text; //true representation
	},

	problem: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.version = 0;
	    this.min = args.min;
	    this.max = args.max;
	    this.iterations = args.iterations || 0; //suggested iterations
	    this.liveUpdateClient = args.liveUpdateClient || false;
	    this.liveUpdateServer = args.liveUpdateServer || false;
	    this.complexity = args.complexity || 0;
	    this.costTypes = args.costTypes || expedit.rosters.defaults.costTypes; //implies solution type
	    this.virtualAssets = args.virtualAssets || [];
	},

	assetGroup: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id;
    },

	asset: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.min = args.min; //used for availability, and variations - solve only as one block though
	    this.max = args.max;
	    this.antecedents = args.antecedents || [];
	    this.constraints = args.constraints || [];
	    this.costs = args.costs || [];
	    this.priority = args.priority || 0;
	    this.capacities = args.capacities || [];
	    this.availability = args.availability || expedit.matrixTrue;
	    this.geolocation = args.geolocation;
	    this.individualCost = args.getIndividualCost;
        this.assetGroups = args.assetGroups || [];
	    function getIndividualCost() //aggregate costs
	    {
		    var weight = 0.0;
    		for (var i = 0, j = this.costs.length; i < j; i++) {
	    	    weight += costs[i].value * costs[i].costType.weight;
		    }
		    return weight;
	    }
	},

	capacity: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.capacity = args.capacity || -1;
	    this.assetGroup = args.assetGroup; 
	},

	subscription: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id;
	    this.license = args.license;
	    this.created = args.created;
	    this.expiry = args.expiry;
	},
	

   	allocation: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.asset = args.asset;
	    this.group = args.group; //usually fixed asset
	    this.ticks = args.ticks;
	    this.geolocation = args.geolocation;
	},

	solution: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.min = args.min;
	    this.max = args.max;
	    this.costs = args.costs;
	    this.solutionType = args.solutionType;
	    this.iterations = args.iterations;
	    this.confidence = args.confidence;
	    this.duration = args.duration || 0;
	    this.eta = args.eta; //date solved
	    this.priority = args.priority || 0;
	    this.allocations = args.allocations || [];
        this.completed = args.completed || false;
	},

	roster: function (args) {
	    if (!args)
	        args = {};
	    this.id = args.id || expedit.newComb();
        this.name = args.name;
        this.user = args.user;
        this.subscription = args.subscription;
        this.problem = args.problem; 
        this.assets = args.assets; 
        this.solutions = args.solutions; 
        this.costType = args.costType; 
	},

	type: {name: 'expedit.roster', version: '0.0.0'}         
};

expedit.rosters.defaults = {
    costTypes: [new expedit.rosters.costType({name: 'money', id: '3a24e1be-23a1-4903-b000-79717b5d1158'})],
	constraintTypes : [new expedit.rosters.constraintType({ name: 'soft', id: '395efbf8-7dcb-4a0f-b000-79717b5d1158' }), new expedit.rosters.constraintType({ name: 'hard', id: 'f4caf563-4825-4207-a000-79717b5d1158' })],
	fixed: new expedit.rosters.assetGroup({name: 'fixed', id: 'afdbdb1c-8b68-4f70-a000-79717b5d1158'}),
	movable: new expedit.rosters.assetGroup({name: 'movable', id: '9e4f56fa-6d07-4312-a000-79717b5d1158'}),
	work: new expedit.rosters.assetGroup({name: 'work', id: '068e421d-0477-44d8-8000-79717b5d1158'}),
	material: new expedit.rosters.assetGroup({name: 'material', id: '25c21069-af69-4cf4-8000-79717b5d1158'}),
	cost: new expedit.rosters.assetGroup({name: 'cost', id: 'be168bb8-ed15-479a-a000-79717b5d1158'})
};
expedit.rosters.defaults.assetGroups = [];
expedit.rosters.defaults.assetGroups['all'] = [expedit.rosters.defaults.fixed, expedit.rosters.defaults.movable, expedit.rosters.defaults.work, expedit.rosters.defaults.material,expedit.rosters.defaults.cost];
expedit.rosters.defaults.assetGroups['person'] = [expedit.rosters.defaults.movable, expedit.rosters.defaults.work, expedit.rosters.defaults.material, expedit.rosters.defaults.cost];
expedit.rosters.current = new expedit.rosters.roster();
expedit.rosters.test = new expedit.rosters.roster({
         name: 'Unknown'
        ,id: expedit.newComb()
        ,user: expedit.current.user
        ,subscription: new expedit.rosters.subscription({
            name: 'Unknown'
            ,id: expedit.newComb()
            ,license: new expedit.license({
                name: 'Unknown'
                ,id: expedit.newComb()
                ,key: "key"
                ,signatory: "sig"
                ,checksum: "checksum"
            })
            ,created: new Date()
            ,expiry: new Date()
        })
        ,problem: new expedit.rosters.problem({name: 'Unknown'})
        ,assets: [new expedit.rosters.asset ({name:'Unknown'})]
        ,solutions: [new expedit.rosters.solution({name: 'Unknown'})]
        ,costType: expedit.rosters.defaults.costTypes[0]
});

//now load up solutions and real assets
//also load up default templates for asset types [ex. rn's may have specific schedules] constraints and avail and capacity
//also need a method to convert allocation to blocks
