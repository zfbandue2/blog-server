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
    queryArticalById(id: number, uId: string, callback: Function) {
        db.select({
            bizType: "blog",//数据库
            collection: "artical", //数据表
            query: {
                articalId: id,
                userId: uId
            }
        }, (res:any) => {
            callback(res);   
        });
    }
    queryArticalList(currentPage: number = 1, key : string, pageSize:number, userId: string, callback: Function) {
        if(!<number>pageSize) {
            pageSize = 20;
        }
        db.getCollection({
            bizType: "blog",//数据库
            collection: "artical" //数据表
        }, (coll : any)=> {
            let query = coll.find({title: new RegExp(key), userId: userId}).skip((currentPage - 1) * <number>pageSize).sort({publishDate: -1}).limit(<number>pageSize);
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
    deleteArticalById(articalId: string, userId: string, callback: Function) {
        db.delete({
            bizType: "blog",
            collection: "artical",
            query: {
                articalId: articalId,
                userId: userId
            }
        }, (res: any)=> {
            callback(res);
        });
    }
}