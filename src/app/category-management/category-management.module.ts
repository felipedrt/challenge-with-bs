import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryManagementComponent } from './category-management.component';

@NgModule({
  declarations: [
    CategoryManagementComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class CategoryManagementModule { }
