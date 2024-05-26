import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersService} from './users.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
  CommonModule,
  NgxPaginationModule,
  HttpClientModule,
  MatCardModule,
  MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'pagination';
  POSTS: any;
  page: number=1;
  count: number=0;
  tableSize: number=10;
  tableSizes: any=[5,10,15,20];

  constructor(private userservice: UsersService){}
  
  ngOnInit(): void{
    this.postList();
  }

  postList():void{
    this.userservice.getall().subscribe((response)=>{
      this.POSTS=response;
      console.log(this.POSTS);
    })
  }

  onTableDataChange(event: any){
    this.page=event;
    this.postList();
  }

  onTableSize(event: any): void{
    this.tableSize=event.target.value;
    this.page=1;
    this.postList();
  }
}
