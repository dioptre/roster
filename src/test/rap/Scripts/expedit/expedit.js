var expedit = {
	ticks: function (conv) {
	    if (!conv)
	        conv = new Date();
	    return ((conv.getTime() * 10000) + 621355968000000000);
	},

	newGuid: function () {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	    });
	},

	newComb: function newComb(date) {
	    if (!date)
		    date = new Date();
	    var now = expedit.ticks(date).toString(16).substring(0, 15).split('').reverse().join('');
	    return 'xxxxxxxx-xxxx-4xxx-y'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	    }) + now.substring(0, 3) + '-' + now.substring(3, 15);
	},

	user: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.licenses = args.licenses;
	    this.session = args.session;
	},

	license: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id;
	    this.key = args.key;
	    this.signatory = args.signatory;
	    this.checksum = args.checksum;
	},

	session: function(args) {
	    if (!args)
	        args = {};
	    var tempDate = new Date();
	    this.name = args.name;
	    this.id = args.id || expedit.newComb(tempDate);
	    this.created = args.created || tempDate;
	    this.expiry = args.expiry;
	    this.priority = args.priority;    
	},

	location: function (args) {
	    if (!args)
	        args = {};
	    this.name = args.name;
	    this.id = args.id || expedit.newComb();
	    this.easting = args.easting;
	    this.northing = args.northing;
	    this.elevation = args.elevation;
	},

    matrixTrue: [[0, 1], [0], [true]],
	matrixFalse: [[0, 1], [0], [false]],
	type: {name: 'expedit', version: '0.0.0'}
}
expedit.current = {
    user: new expedit.user({name: 'Unknown User', session: new expedit.session({name: 'Unknown Session'})}),
	location: new expedit.location({name: 'Unknown Location', id: 'fafa6852-460d-4eea-a000-79717b5d1158'}),
    culture: 'en-AU',
    timeResolution: 30 * 60 * 10000000 //30min*60sec*(seconds)*100ns
}
