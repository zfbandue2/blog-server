import fs from "fs";
import path from "path";
export default class Router {
    buildRouter(scanDir: string) {
        let self = this;
        fs.readdir(scanDir, function(err, files) {
            if(err){
                console.warn(err)
            } else{
                files.forEach(function(filename: string){
                    var filedir = path.join(scanDir, filename);
                    fs.stat(filedir, function(eror, stats){
                        if(eror){
                            console.warn('获取文件失败');
                        }else{
                            var isFile = stats.isFile();//是文件
                            var isDir = stats.isDirectory();//是文件夹
                            if(isFile) {
                                require("../../" + filedir);
                            } else if(isDir){
                                self.buildRouter(scanDir);
                            }
                        }
                    })
                });
            }
        });
    }
} 