export default class baseController {
    constructor() {
        
    }
    success(data: any) {
        if(typeof data == "string") {
            this.res.end(data)
        } else {
            this.res.json({data: data, message: "success"});
        }
    }
    error(data: any) {
        if(typeof data == "string") {
            this.res.end(data)
        } else {
            this.res.json({data: data, message: "error"});
        }
    }
}