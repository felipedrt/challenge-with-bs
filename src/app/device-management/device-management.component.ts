import { Component, OnInit, ViewChild } from '@angular/core';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';
import { DeviceListComponent } from './components/device-list/device-list.component';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss']
})
export class DeviceManagementComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  @ViewChild('deviceListComponent') deviceListComponent: DeviceListComponent;

  public sqlAccessMode: SqlAccessModeEnum;
  public sqlAccessModeHtml = SqlAccessModeEnum;
  public pageTitle = '';
  public selectedItem;

  //#endregion

  //#endregion

  //#region Constructor

  constructor() { }

  //#endregion

  //#region Lifecycle Events

  ngOnInit(): void {
    this.sqlAccessMode = SqlAccessModeEnum.List;
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public new() {
    this.pageTitle = 'Device Management - New';
    this.sqlAccessMode = SqlAccessModeEnum.Insert;
  }
  
  public edit(item) {
    this.pageTitle = 'Device Management - Edit';
    this.selectedItem = item;
    this.sqlAccessMode = SqlAccessModeEnum.Update;
  }
  
  public visualize(item) {
    this.pageTitle = 'Device Management - Visualization';
    this.selectedItem = item;
    this.sqlAccessMode = SqlAccessModeEnum.Select;
  }
  
  public backToPage() {
    this.sqlAccessMode = SqlAccessModeEnum.List;
    this.deviceListComponent.loadData(true);
  }

  //#endregion
  
  //#endregion
}
