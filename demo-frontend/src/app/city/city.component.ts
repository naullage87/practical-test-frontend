import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CityService } from './city.service';
import jwtDecode from 'jwt-decode';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  private sortingOrder;
  public paginationPageSize;
  private paginationNumberFormatter; 
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;

  
getDecodedAccessToken(token: string): any {
  try {
      return jwtDecode(token);      
  } catch (Error) {
      return null;
  }
}

  
roleStatus: boolean;
  
  ngOnInit() {   
  }


  constructor(private cityService: CityService){

    var role=this.getDecodedAccessToken(localStorage.getItem("access_token")).role;
    if(role.includes('ROLE_ADMIN')){
      this.roleStatus=true;
    }else{
      this.roleStatus=false;
    }

    this.columnDefs=[
      {
        headerName: "ID",
        field: "id",
        width: 100,
        getQuickFilterText: params => {
            return params.value.name;
        },
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Name",
        field: "name",
        filter: true, 
        editable: this.roleStatus,
        width: 150
      },
      {
        headerName: "URL",
        field: "img_path",
        filter: true, 
       editable: this.roleStatus,
        width: 550
      },
      {
        headerName: "Image",
        field: "url",
        cellRenderer: params => {
           return '<img src="' + params.data.img_path + '" width="150" height="80" />';
        },
        width: 300
      }
      
    ]

    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }
  
  onCellValueChanged(obj){
      this.cityService.editCity(obj.data);
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.cityService.getCityList().subscribe(data=>{
      params.api.setRowData(data);
    });
   
  }
}

export interface CityElements {
  id: number;
  name: string;
  img_path: string;
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

