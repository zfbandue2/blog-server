class connect {
    static MongoPool:any = require("./mongoPool").default;
    private add0(m:any){return m<10?'0'+m:m }
    private getTimestamp():string {
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+ this.add0(m)+'-'+ this.add0(d);
    }
    private initDB(dbName:any, cname:any, callback:any) {
        var startTime = new Date().getTime();
        connect.MongoPool.getInstance((db:any) => {
            var dbase = db.db(dbName);
            var collection = dbase.collection(cname);
            callback(db, collection);
        });
    }
    public insert(params: any, callback: any)  {
        this.initDB(params.bizType, params.collection,(db:any, collection:any)=> {
            params.data.timestamp = this.getTimestamp();
            params.data.date = new Date(params.data.timestamp).getTime();
            collection.insertOne(params.data, function(err:any, res:any) {
                if(err) {
                    callback({err: err.message});
                } else {
                    callback(res);
                }
            });
        })
    }
    public select(params: any, callback: any) {
        this.initDB(params.bizType, params.collection, (db:any, collection:any)=> {
            collection.find(params.query).toArray(function(err:any, res:any) {
                if(err) {
                    callback({err: err.message});
                } else {
                    callback(res);
                }
            });
        });
    }
    public update(params: any, callback: any) {
        this.initDB(params.bizType, params.collection, (db:any, collection:any)=> {
            collection.update(params.query, {$set: params.data}, {upsert: true}, function(err:any, res:any) {
                if(err) {
                    callback({err: err.message});
                } else {
                    callback(res);
                }
            });
        });
    }
    public delete(params: any, callback: any) {
        this.initDB(params.bizType, params.collection, (db:any, collection:any)=> {
            collection.remove(params.query, function(err: any, res:any) {
                if(err) {
                    callback({err: err.message});
                } else {
                    callback(res);
                }
            });
        });     
    } 
    public getCollection(params: any, callback: any) {
        this.initDB(params.bizType, params.collection, (db:any, collection:any)=> {
            callback(collection);
        });
    }
}
export default new connect();