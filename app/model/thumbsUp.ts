import db from "../common/db";
export default class thumbsUp {
    insertThumbs(data: object, callback : Function) {
        db.insert({
            bizType: "blog",//数据库
            collection: "thumbs_up", //数据表
            data
        }, (res:any)=> {
            callback(res);
        });
    }
    updateThumbs(data: any, callback: Function) {
        db.update({
            bizType: "blog",//数据库
            collection: "thumbs_up", //数据表
            query: {articalId: data.articalId},
            data: {count: data.count}
        }, (res:any)=> {
            callback(res.result);
        });
    }
    queryThumbsCountByArticalId(articalId:number, callback : Function) {
        db.select({
            bizType: "blog",//数据库 
            collection: "thumbs_up", //数据表
            query: {
                articalId: articalId
            }
        }, (res:any) => {
            callback(res);   
        });
    }
}