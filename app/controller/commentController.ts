import {controller, get, post} from "../utils/decorator";
import db from "../common/db";
import comment from "../model/comment"
import baseController from "./baseController";
@controller("/comment")
export default class commentController extends baseController {
     comment: any 
     constructor() {
         super();
         this.comment = new comment();
     }
     @post("/saveComment")
     public saveComment(req: any, res: any) {
         this.comment.insertComment({
              content: req.param("content"),
              articalId: req.param("articalId") 
         }, (data: any) => {
              this.success(data);
         }); 
     }
     @get("/getCommentList")
     public getCommentList(req: any, res: any) {
        this.comment.queryCommentListByArticalId(req.param("param"), (data: any)=> {
            this.success(data);
        });
     }
}
