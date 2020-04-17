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
         this.artical.insertArtical({
               articalId: req.param("articalId"),
               title: req.param("title"),
               type: req.param("type"),
               content: req.param("content")
         }, (data:any) => {
             this.success(data);
         });
     }
     @get("/getArticalDetail")
     public getArticalDetail(req: any, res: any) {
          this.artical.queryArticalById(req.param("articalId"), (data: any)=> {
               this.success(data);
          });        
     }  
     @get("/getArticalList")
     public getArticalList(req: any, res: any) {
          this.artical.queryArticalList(req.param("currentPage"), req.param("key"), 20, (data:any)=> {
               this.success(data);   
          });
     }
}