import { Injectable} from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient,HttpRequest,HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'



const HttpOptions = {
    withCredentials:true
}


const api = 'api/'



@Injectable({
    providedIn:'root'
})

export class BackendServers {

    private baseUrl:any

    constructor(private http:HttpClient){
        this.baseUrl = 'https://www.dljx.asia/' + api
    }



    test():Observable<object>{
        let url = this.baseUrl + 'admin/'
        return this.http.get<any>(url,HttpOptions).pipe(
            map((data:any)=>{
                return data
            })
        )
    }

    SaveInputValue(params:any):Observable<any>{
        let url = this.baseUrl + 'SaveInputValue/'
        const formData = this.common(params)
        let req = new HttpRequest('POST',url,formData,HttpOptions)
        return  this.http.request(req).pipe(
            map((data:any)=>{
                return data.body
            })
        )
    }


    Login(params:any):Observable<any>{
        let url = this.baseUrl + 'login/'
        const formData = this.common(params)
        let req = new HttpRequest('POST',url,formData,HttpOptions)
        return  this.http.request(req).pipe(
            map((data:any)=>{
                return data.body
            })
        )
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







    formatDateToStr(params:Date){
        const d = String(params.getDate()).padStart(2,'0')
        const m = String(params.getMonth() + 1).padStart(2,'0')
        const y = String(params.getFullYear())
        const h = String(params.getHours()).padStart(2,'0')
        const min = String(params.getMinutes()).padStart(2,'0')
        const s = String(params.getSeconds()).padStart(2,'0')
        return `${y}-${m}-${d} ${h}:${min}:${s}`
    }


    formatRangeDate(m = 0,d = 0,h = 0){
        const now = new Date()
        let startDate = new Date (now.getFullYear(),now.getMonth()-m,now.getDate()-d,now.getHours()-h,now.getMinutes(),now.getSeconds())
        return {startDate:startDate,endDate:now}
    }
    
}
