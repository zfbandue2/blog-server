import db from "../common/db";
import baseController from "../controller/baseController";
export default class artical {
    insertArtical(data: any, callback: Function) {
         db.update({
            bizType: "blog",//数据库
            collection: "artical", //数据表
            query: {articalId: data.articalId},
            data
        }, (res:any)=> {
            callback(res.result);
        });
    }
    queryArticalById(id: number, callback: Function) {
        db.select({
            bizType: "blog",//数据库
            collection: "artical", //数据表
            query: {
                articalId: id
            }
        }, (res:any) => {
            callback(res);   
        });
    }
    queryArticalList(currentPage: number = 1, key : string, pageSize:number, callback: Function) {
        if(!<number>pageSize) {
            pageSize = 20;
        }
        let articalList = [];
        db.getCollection({
            bizType: "blog",//数据库
            collection: "artical" //数据表
        }, (coll : any)=> {
            let query = coll.find({title: new RegExp(key)}).skip((currentPage - 1) * <number>pageSize).sort({timestamp: -1}).limit(<number>pageSize);
            query.toArray((err: any, res: any) =>{//获取出每页的数据
                coll.find({title: new RegExp(key)}).count().then((count:any)=>{
                    callback({
                        list: res,
                        totalCount: count,
                        currentPage: currentPage
                    });
                });
            });
        });    
    }
}