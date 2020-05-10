import {controller, get, post} from "../utils/decorator";
import artical from "../model/artical";
import baseController from "./baseController";
@controller("/artical")
export default class articalController extends baseController{
     artical: any
     constructor() {
          super();
          this.artical = new artical();
     }
     @post("/saveArtical")
     public saveArtical(req: any, res: any) { 
         let userId = this.getUserId(); 
         if(!userId) {
              this.error({
                   code: 401
              }); 
              return;//必须要return
         } 
         let articalId = req.param("articalId") || this.getUid();
         this.artical.insertArtical({
               articalId: articalId,
               title: req.param("title"),
               type: req.param("type"),
               content: req.param("content"),
               publishDate: new Date().getTime(),
               userId: userId
         }, (data:any) => {
             this.success(data);
         });
     }
     @get("/getArticalDetail")
     public getArticalDetail(req: any, res: any) {
          let userId = this.getUserId(); 
          if(!userId) {
               this.error({
                    code: 401
               }); 
               return;//必须要return
          } 
          this.artical.queryArticalById(req.param("articalId"), userId, (data: any)=> {
               this.success(data);
          });        
     }  
     @get("/getArticalList")
     public getArticalList(req: any, res: any) {
          let userId = this.getUserId(); 
          if(!userId) {
               this.error({
                    code: 401
               }); 
               return;//必须要return
          } 
          this.artical.queryArticalList(req.param("currentPage"), req.param("key"), 20, userId, (data:any)=> {
               this.success(data);   
          });
     }
     @get("/deleteArticalById")
     public deleteArticalById(req: any, res: any) {
          let userId = this.getUserId(); 
          if(!userId) {
               this.error({
                    code: 401
               }); 
               return;//必须要return
          } 
          this.artical.deleteArticalById(req.param("articalId"), userId, (data: any) => {
               this.success(data); 
          });
     }
}