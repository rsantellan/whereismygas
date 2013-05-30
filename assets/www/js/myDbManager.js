myDbManager = function(options){
	this._initialize();

}

myDbManager.instance = null;

myDbManager.getInstance = function (){
	if(myDbManager.instance == null)
		myDbManager.instance = new myDbManager();
	return myDbManager.instance;
}

myDbManager.prototype = {
    _initialize: function(){
        this.db = this.initializeDatabase();
    },
    
    initializeDatabase: function(){
    	db = window.openDatabase("WhereIsMyGasDB", "1.0", "Where is my gas DB", 200000);
        var sql = "CREATE TABLE IF NOT EXISTS fuelIt(id INTEGER PRIMARY KEY, fuel_date DATE, place TEXT, kilometers DOUBLE, price DOUBLE)";
        var self = this;
        db.transaction(function(tx){
        	//tx.executeSql('DROP TABLE IF EXISTS employee');
        	tx.executeSql(sql);
        	//tx.executeSql("insert into notes(title, body, updated) values (?,?,?)", ["test", "body del test", new Date()]);
        }, self.dbErrorMessage, self.dbSuccessMessage);
    	return db;

    },
    
    dbErrorMessage: function(err){
    	myDbManager.getInstance().dbLog("DB Error: "+err.message + " - Code="+err.code);
    },
    
    dbSuccessMessage: function(){
    	myDbManager.getInstance().dbLog("Successfully operation");
    },
    
    showDatabase: function(){
    	this.dbLog("Showing database function.");
    	this.dbLog(this.db);
    },
    
    showTableRowCount: function(tableName){
    	var self = this;
    	self.dbLog(tableName);
    	this.db.transaction(function(tx){
    		var sql = "select count(*) as counter from "+tableName;
    		tx.executeSql(sql, [], function(tx, results){
    			self.dbLog(results);
    			self.dbLog(results.rows);
    			self.dbLog(results.rows.item(0));
    			self.dbLog(results.rows.item(0).counter);
    			//console.info(results.counter);
    		});
    	}, self.dbErrorMessage, self.dbSuccessMessage)
    },
    
    dbLog: function(message){
    	console.info("dbLog: " + message);
    },
    
    populateList: function(){
    	
    }
    
}