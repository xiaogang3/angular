import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder,  Validators ,FormGroup} from '@angular/forms';
import { BackendServers} from '../servers/backend.servers'
import { Router } from '@angular/router';
import { authService} from '../servers/auth.server'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {
  LoginForm:FormGroup
  isloading = false
  constructor(private fb: NonNullableFormBuilder,private Backend:BackendServers,private router: Router,private auth:authService ){
    this.LoginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(true)
    } )
  }


  ngOnInit(): void {
    let config = this.auth.getCookie("dljx")
    if(config){
      this.LoginForm.get('username')?.setValue(config['username'])
    }
  }



  submitForm(): void{
    this.isloading = true
    this.auth.logout()
    let data = this.LoginForm.value
    let remember:boolean = data['remember']
    const username = data['username']
    this.auth.Login(data).subscribe({
      next:()=>{
        this.router.navigate(['/main'])
        if(remember){
          this.auth.setCookie('dljx',{'username':username})
        }
      },
      error:(error)=> console.log(error),
      complete:()=> this.isloading = false
    })    
  }

}
