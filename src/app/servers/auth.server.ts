import { Injectable} from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient,HttpRequest,HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { NzNotificationService } from 'ng-zorro-antd/notification';


const api = 'api/'
const HttpOptions = {
    withCredentials:true
}




@Injectable({
    providedIn:'root'
})

export class authService{



    private baseUrl:any
    constructor(private http:HttpClient,private notification: NzNotificationService ){

        this.baseUrl = 'https://www.dljx.asia/' + api
    }

    setCookie(key:string,value:any){
        const Days = 365;
        const exp = new Date()
        exp.setTime(exp.getTime() + Days*24*60*60*1000)
        document.cookie = key + '=' + JSON.stringify(value) + ";expries=" + exp.toUTCString()+";path=/"
    }

    getCookie(key:string){
        let arr,reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
        if (arr=document.cookie.match(reg)){
            return JSON.parse(arr[2])
        }else{
            return null
        }
    }

    delCookie(key:string){
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        let cval = this.getCookie(key)
        if(cval !=null){
            document.cookie = key + "=" + cval + ';expires' + exp.toUTCString() + ';path=/';
        }
    }



    Login(params:any):Observable<any>{
        let url = this.baseUrl + 'login/'
        const formData = this.common(params)
        let req = new HttpRequest('POST',url,formData,HttpOptions)
        return  this.http.request(req).pipe(
            map((data:any)=>{
                if(data.body){
                    if(data.body['data'] === 1){
                        localStorage.setItem('token',data.body['token'])
                    }else{
                        this.notification.create(
                            'error',
                            '通知',
                            '请输入正确的账号和密码！'
                          );
                    }
                }
            })
        )
    }

    logout(){
        localStorage.removeItem('token')
    }

    isAuthenticated():boolean{
        return !!localStorage.getItem('token')
    }


    common(args:any){
        const data : FormData = new FormData()
        for (let key in args){
            if(args[key] instanceof Object){
                data.append(String(key),JSON.stringify(args[key]))
            }else{
                data.append(String(key),args[key]?args[key]: '')
            }
        }
        return data
    }
}