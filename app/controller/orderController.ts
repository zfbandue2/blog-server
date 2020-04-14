import {controller, get, post} from "../utils/decorator";
@controller("/order")
export default class OrderController {
    @get("/getOrderInfo")
    getOrderInfo(req: any) {
        return {data: "getOrderInfo"};
    }
    @post("/getOrderList")
    getOrderList(req: any) {
        return "getOrderList";
    }
}