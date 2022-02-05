import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceCrudComponent } from './components/device-crud/device-crud.component';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeviceManagementComponent } from './device-management.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceCrudComponent,
    DeviceManagementComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    DeviceManagementComponent,
  ]
})
export class DeviceManagementModule { }
