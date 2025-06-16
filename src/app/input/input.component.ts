import { Component, OnInit,ViewChild, ElementRef, Type} from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { ColDef,GridApi,GridReadyEvent,SideBarDef,CellClickedEvent,GridOptions,ModuleRegistry, AllCommunityModule} from 'ag-grid-community';
import { SizeColumnsToContentStrategy,SizeColumnsToFitGridStrategy,SizeColumnsToFitProvidedWidthStrategy} from '@ag-grid-community/core';
import * as echarts from 'echarts';
import { EChartsOption} from 'echarts';
import { BackendServers} from '../servers/backend.servers'
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';

ModuleRegistry.registerModules([ AllCommunityModule ]);

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  animations:[
    trigger(
      'slideInOut',[
        state('in',style({transform:'translateX(0)'})),
        state('out',style({transform:'translateX(100%)'})),
        transition('in => out',animate('300ms ease-in-out')),
        transition('out => in',animate('300ms ease-in-out'))
      ]
    )
  ]
})
export class InputComponent implements OnInit {

  FormData:FormGroup
  grid_api:any;
  isLoading = false
  IsOpen = false;
  startDate:Date = new Date()
  endDate:Date = new Date()
  theme: GridOptions['theme'] = 'legacy';
  autoSizeStrategy:|SizeColumnsToContentStrategy|SizeColumnsToFitGridStrategy|SizeColumnsToFitProvidedWidthStrategy = {type:'fitCellContents'}
  rowData:any[] = [
    { 类别: "Tesla", 名称: "Model Y", 型号: 64950,数量:4,单位:"个",入库日期:"2025-06-11 07:12:30", electric: true },
    { 类别: "Ford", 名称: "F-Series", 型号: 33850, 数量:4,单位:"个",入库日期:"2025-06-11 07:12:30",electric: false },
    { 类别: "Toyota", 名称: "Corolla", 型号: 29600,数量:4,单位:"个",入库日期:"2025-06-11 07:12:30", electric: false },
  ];

  option:EChartsOption = {
    title:{
      text:'入库历史信息趋势图表'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    grid:{
      left:'2%',
      right:'2%',
      bottom:'2%',
      containLabel:true
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };

  product_list = ['A','B','C']
  name_list = ['item','item2','item3']

// Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
      { field: "类别" },
      { field: "名称" },
      { field: "型号" },
      { field: "数量" },
      { field: "单位" },
      { field: "入库日期" },
      {field:"编辑"}
    ];

  @ViewChild ('chartInput',{static:false}) chartInput!:ElementRef;
  constructor(private Backend:BackendServers,private fb:FormBuilder){
    this.FormData = this.fb.group({
      PRODUCT:['',Validators.required],
      NAME:['',Validators.required],
      NUM:['',Validators.required],
      DATE:['',Validators.required],
      COMMENTS:['',Validators.required]
    })
  }


  ngOnInit(): void {
      let FormatDate = this.Backend.formatRangeDate(6,0,0)
      this.startDate = FormatDate['startDate']
      this.endDate = FormatDate['endDate']
  }

  ngAfterViewInit(){
    echarts.init(this.chartInput.nativeElement,'light').setOption(this.option)
  }


  onGridReady(params:GridReadyEvent<any>){

  }
  
  Query(){
    this.Backend.test().subscribe(data =>{
      if(data){
        console.log(data)
      }
    })
  }


  OpenInput(){
    this.IsOpen  = !this.IsOpen
  }
  

  DownLoad(){

  }

  cancel(){
    this.IsOpen = false
  }

  submitForm(){
    this.isLoading = true
    console.log(this.FormData.value)
    const PostData = this.FormData.value
    this.Backend.SaveInputValue(PostData).subscribe(data =>{
      if(data){
        console.log(data)
        this.FormData.reset()
        this.isLoading = false
      }
    })
  }
}
