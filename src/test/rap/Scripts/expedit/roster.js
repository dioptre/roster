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
	    this.valued = args.valued || 0;
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
        this.assetClass = args.assetClass;
	    function getIndividualCost() //aggregate costs
	    {
		    var weight = 0.0;
    		for (var i = 0, j = this.costs.length; i < j; i++) {
	    	    weight += costs[i].valued * costs[i].costType.weight;
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
        this.rate = args.rate || 0;
        this.unitid = args.unitid;
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
	    this.assetGroup = args.assetGroup; //usually fixed asset
        this.ticksOffset = args.ticksOffset;
	    this.ticks = args.ticks;
        this.blocks = args.blocks || expedit.matrixFalse;
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
	    this.costType = args.costType;
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
		this.location = args.location;
		this.culture = args.culture;
		this.timeResolution = args.timeResolution;
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
    assetGroups: {
	    fixed: new expedit.rosters.assetGroup({name: 'fixed', id: 'afdbdb1c-8b68-4f70-a000-79717b5d1158'}),
    	movable: new expedit.rosters.assetGroup({name: 'movable', id: '9e4f56fa-6d07-4312-a000-79717b5d1158'}),
	    work: new expedit.rosters.assetGroup({name: 'work', id: '068e421d-0477-44d8-8000-79717b5d1158'}),
	    material: new expedit.rosters.assetGroup({name: 'material', id: '25c21069-af69-4cf4-8000-79717b5d1158'}),
	    cost: new expedit.rosters.assetGroup({name: 'cost', id: 'be168bb8-ed15-479a-a000-79717b5d1158'}),
	    valued: new expedit.rosters.assetGroup({name: 'valued', id: '415f99c9-409c-42d9-a08d-7a0da16b70d8'}),
	    producer: new expedit.rosters.assetGroup({name: 'producer', id: 'c36d87a2-f7f1-4412-a08c-147fc06b70d8'}),
	    consumer: new expedit.rosters.assetGroup({name: 'consumer', id: '19cffc52-e54f-45ef-9004-9511f06b70d8'}),
	    depreciating: new expedit.rosters.assetGroup({name: 'depreciating', id: '1ca043e5-9ef9-4bef-9002-976df06b70d8'}),
	    appreciating: new expedit.rosters.assetGroup({name: 'appreciating', id: '07db183e-d26c-45f7-9007-17f1116b70d8'}),
	    capital: new expedit.rosters.assetGroup({name: 'capital', id: 'a8664427-9f80-4c3d-900e-cc62216b70d8'}),
	    operations: new expedit.rosters.assetGroup({name: 'operations', id: '2b2cc870-ee53-4661-a00f-60a2516b70d8'})
    }
};
expedit.rosters.defaults.assetClass = [];
expedit.rosters.defaults.assetClass['person'] = [expedit.rosters.defaults.assetGroups.movable, expedit.rosters.defaults.assetGroups.work, expedit.rosters.defaults.assetGroups.material, expedit.rosters.defaults.assetGroups.cost];
expedit.rosters.current = new expedit.rosters.roster();
expedit.rosters.test = new expedit.rosters.roster({
         name: 'Unknown'
        ,id: expedit.newComb()
        ,user: expedit.current.user
		,location: expedit.current.location
		,culture: expedit.current.culture
		,timeResolution: expedit.current.timeResolution
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
        ,problem: new expedit.rosters.problem({
            name: 'Unknown'
            ,id: expedit.newComb()
            ,version: 0
            ,min: 0
            ,max: 0
            ,iterations: 10000000
            ,liveUpdateClient: true
            ,liveUpdateServer: true
            ,complexity: 0
            ,virtualAssets: [new expedit.rosters.asset({name: 'Unknown'})]
        })
        ,assets: [new expedit.rosters.asset ({
            name:'Unknown'
            ,antecedents: [new expedit.rosters.asset({name: 'Unknown'})]
            ,constraints: [new expedit.rosters.constraint()]
            ,min: 75
            ,max: 125
            ,costs: [new expedit.rosters.cost({
                name: 'Unknown'
                ,min: 100
                ,max: 200
                ,costType: expedit.rosters.defaults.costTypes[0]
                ,valued: 70
            })]
            ,capacities: [new expedit.rosters.capacity({
                name: 'Unknown'
                ,assetGroup: expedit.rosters.defaults.assetGroups.material
                ,unitid: 'hourly'
            })]
            ,geolocation: expedit.current.location
            ,individualCost: 224000
        })]
        ,solutions: [new expedit.rosters.solution({
            name: 'Unknown'
            ,min: 44500
            ,max: 55000
            ,costs: [new expedit.rosters.cost({
                name: 'Unknown'
                ,min: 100
                ,max: 200
                ,costType: expedit.rosters.defaults.costTypes[0]
                ,valued: 70
            })]
            ,costType: expedit.rosters.defaults.costTypes[0]
            ,solutionType: 'AG101'
            ,iterations: 12000
            ,confidence: 12.444
            ,eta: new Date()
            ,allocations: [new expedit.rosters.allocation({
                asset: new expedit.rosters.asset('Unknown')
                ,assetGroup: expedit.rosters.defaults.assetGroups.fixed
                ,ticksOffset: 155000999
                ,ticks: 3444
                ,geolocation: expedit.current.location
            })]
        })]
        ,costType: expedit.rosters.defaults.costTypes[0]
});

//now load up solutions and real assets
//also load up default templates for asset types [ex. rn's may have specific schedules] constraints and avail and capacity
//also need a method to convert allocation to blocks
