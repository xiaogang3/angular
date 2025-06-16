import { Component,OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {



  user_info:any = {}
  isCollapsed = false
  btn_name = '统计分析'
  menu_list = [
    // {name:'首页',icon:'home',routeLink:'home'},
    {name:'统计分析',icon:'line-chart',routeLink:'summary'},
    {name:'入库管理',icon:'pic-left',routeLink:'input'},
    {name:'出库管理',icon:'pic-right',routeLink:'output'},
    {name:'工作清单',icon:'profile',routeLink:'work-list'},
    {name:'人员管理',icon:'team',routeLink:'people'},
    {name:'系统设置',icon:'setting',routeLink:'setting'},
    {name:'联系我们',icon:'mail',routeLink:'mail-us'}
  ]
  constructor(private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {

    this.user_info = {
      'name':'xiaogan3','id':1234567,'tel':13804282199,'email':'email@163.com'
    }

    let path = window.location.pathname.split('/')[2]
    if(path){
      this.menu_list.forEach(item =>{
        if(item['routeLink'] == path){
          this.btn_name = item['name']
          return
        }
      })
      
    }
    
  }

  handleMenu(){
   
  }

}
