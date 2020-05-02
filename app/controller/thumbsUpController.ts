import {controller, get, post} from "../utils/decorator";
import db from "../common/db";
import thumbsUp from "../model/thumbsUp";
import baseController from "./baseController";
@controller("/thumbsUp")
export default class thumbsUpController extends baseController{
     thumbsUp:any 
     constructor() {
        super();
        this.thumbsUp = new thumbsUp();
     }
     @get("/addThumbs")
     public addThumbs(req: any, res: any) {
         this.thumbsUp.updateThumbs({
            articalId: req.param("articalId"),
            count: req.param("count")
         }, (data: any)=> {
             this.success(data);
         });
     }
     @get("/getThumbsCount")
     public getThumbsCount(req: any, res: any) {
        this.thumbsUp.queryThumbsCountByArticalId(req.param("articalId"), (data: any)=> {
               if(data && data.length > 0) {
                    this.success({
                        count: data[0].count
                    });
                } else {
                    this.error({
                        err: data.err
                    });
                }
        });
     }
}
