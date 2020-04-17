class mongodbPool {
    static url = 'mongodb://localhost:27017/blog';
    static MC:any = require('mongodb').MongoClient;
    private option:any = {
        reconnectTries: 3,
        auto_reconnect: true,
        poolSize : 40,
        connectTimeoutMS: 500,
        useNewUrlParser:true
    }
    private p_db: any;
    private initPool(cb: any):void {
        mongodbPool.MC.connect(mongodbPool.url, this.option, (err: any, db: any)=> {
            if (err) throw err;
            this.p_db = db;
            if(cb && typeof(cb) == 'function')
                cb(this.p_db);
        });
    }
    public getInstance(cb: any):void {
        if(!this.p_db) {
            this.initPool(cb)
        }
        else{
            if(cb && typeof(cb) == 'function')
                cb(this.p_db);
        }
    }
}
export default new mongodbPool();