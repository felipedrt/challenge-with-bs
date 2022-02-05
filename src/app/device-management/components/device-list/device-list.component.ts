import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef , BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DeviceManagement } from '../../models/device-management';
import { DeviceManagementService } from '../../service/device-management.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  @Output() newDeviceEventEmitter = new EventEmitter();
  @Output() editDeviceEventEmitter = new EventEmitter();
  @Output() visualizeDeviceEventEmitter = new EventEmitter();
  @Output() reloadDatatable = new EventEmitter();

  public dtOptions: DataTables.Settings = {};
  public dtOptionsHist: DataTables.Settings = {};
  public listData: Array<any> = [];
  public dtTrigger: Subject<any> = new Subject();
  public loading: boolean;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  public listDevices: DeviceManagement[] = [];
  public selectedItem;

  //#endregion

  //#region Private Attributes

  private modalRef: BsModalRef;

  //#endregion

  //#endregion

  //#region Constructor

  constructor(private deviceManagementService: DeviceManagementService,
    private toastrService: ToastrService,
    private modalService: BsModalService) {}

  //#endregion

  //#region Lifecycle Events

  ngOnInit() {
    this.configDataTable();
    this.loadData();
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public async loadData(rerender: boolean = false) {
    this.loading = true;
    
    const data = await this.deviceManagementService.getAll();
    this.listDevices = data.items as DeviceManagement[];
    this.loading = false;
    if (rerender) {
      this.rerenderDataTable();
    } else {
      this.dtTrigger.next();
    } 
  }

  public btnNewDeviceOnClick() {
    this.newDeviceEventEmitter.emit();
  }

  public btnEditDeviceOnClick(item) {
    this.editDeviceEventEmitter.emit(item);
  }
  
  public btnVisualizeDeviceOnClick(item) {
    this.visualizeDeviceEventEmitter.emit(item);
  }

  public async btnRemoveDeviceOnClick(template: TemplateRef<any>, item) {
    this.selectedItem = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //

  public async confirm() {
    const result = await this.deviceManagementService.delete(this.selectedItem.id);
    if (result.hasError) {
      this.toastrService.error(`Error to delete device | error: ${result.msgError}`, 'Error');
    } else {
      this.toastrService.success('Device deleted with success!', 'Information');
      await this.loadData(true);
    }
    this.modalRef?.hide();
  }
 
  public decline(): void {
    this.modalRef?.hide();
  }

  //#endregion

  //#region Private Methods

  private configDataTable() {
    this.dtOptions = {
      columns: [
        {
          title: 'ID',
          data: 'id',
        },
        {
          title: 'Category',
          data: 'name',
        },
        {
          title: 'Color',
          data: 'color',
        },
        {
          title: 'Part Number',
          data: 'partNumber',
        },
        {
          title: '',
          orderable: false,
        },
        {
          title: '',
          orderable: false,
        },
        {
          title: '',
          orderable: false,
        },
      ],

      paging: true,
    };
  }

  private rerenderDataTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  //#endregion

  //#endregion
}
