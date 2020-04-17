import "reflect-metadata";
const PATH_METADATA = Symbol();
const METHOD_METADATA = Symbol();
const descriptorBuilder = {
    setMapping(target: any, key: string | symbol, path: string, method: string) {
        if(!target.constructor.mapping) {
            target.constructor.mapping = {};
        }
        target.constructor.mapping[path] = {
            method: method,
            callback: target[key] 
        }
    },
    setRouter(target: any, path: string) {
        let routerMap = target.mapping;
        for(let childpath in routerMap) {
            let comboPath = childpath;
            if(path != "/") {
                comboPath = path + childpath;
            }
            global.app[routerMap[childpath].method](comboPath, function(req: any, res: any) {
                let instance = new target(); 
                instance.req = req;
                instance.res =res;
                routerMap[childpath].callback.call(instance, req, res);
            })
        }
    }
}
const controller = (path: string) => {
    return (target: any) => {
        descriptorBuilder.setRouter(target, path);
        Reflect.defineMetadata(PATH_METADATA, path, target);
    }
}
const get =  (path: string) => {
    return (target: any, key: string | symbol, descriptor: any) => {
        descriptorBuilder.setMapping(target, key, path, "get");
        Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
    }
}
const post =  (path: string) => {
    return (target: any, key: string | symbol, descriptor: any) => {
        descriptorBuilder.setMapping(target, key, path, "post");
        Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
    }
}
export {controller, get, post};