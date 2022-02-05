import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryManagement } from 'src/app/category-management/models/category-management';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';
import { DeviceManagement } from '../../models/device-management';
import { DeviceManagementService } from '../../service/device-management.service';

@Component({
  selector: 'app-device-crud',
  templateUrl: './device-crud.component.html',
  styleUrls: ['./device-crud.component.scss']
})
export class DeviceCrudComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  @Input() pageTitle;
  @Input() selectedItem;
  @Input() sqlAccessModeEnum: SqlAccessModeEnum;
  @Output() actionExecutedEventEmitter = new EventEmitter();
  @Output() backToPageEventEmitter = new EventEmitter();
  public deviceForm: FormGroup;
  public listCategories: CategoryManagement[];

  public showSaveButton = true;

  public categoryIdControlIsInvalid;
  public colorControlIsInvalid;
  public partNumberControlIsInvalid;

  //#endregion

  //#endregion

  //#region Constructor

  constructor(private formBuilder: FormBuilder,
    private deviceManagementService: DeviceManagementService,
    private toastrService: ToastrService) { }

  //#endregion

  //#region Lifecycle Events

  ngOnInit(): void {
    this.createDeviceForm();
    this.getCategories();

    switch (this.sqlAccessModeEnum) {
      case SqlAccessModeEnum.Update:
        this.setFormValue();
      break;
      
      case SqlAccessModeEnum.Select:
        this.setFormValue();
        this.deviceForm.disable();
        this.showSaveButton = false;
      break;
    }
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public btnBackOnClick() {
    this.backToPageEventEmitter.emit();
  }

  public negativeValidator() {
    const valor = this.deviceForm.get('partNumber').value as string;
    if (valor?.toString().includes('-')) {
        return true
    } else {
      return false;
    }
  }

  public async saveDevice() {
    this.categoryIdControlIsInvalid = this.deviceForm.get('categoryId')?.errors?.required;
    this.colorControlIsInvalid = this.deviceForm.get('color')?.errors?.required;
    this.partNumberControlIsInvalid = this.deviceForm.get('partNumber')?.errors?.required;

    if (this.deviceForm.valid) {
      const device: DeviceManagement = {
        categoryId: this.deviceForm.get('categoryId').value,
        color: this.deviceForm.get('color').value,
        partNumber: this.deviceForm.get('partNumber').value,
      }
      if (this.sqlAccessModeEnum == SqlAccessModeEnum.Insert) {
        const result = await this.deviceManagementService.insert(device);
        if (result.hasError) {
          this.toastrService.error(`Error to created device | error: ${result.msgError}`, 'Error');
        } else {
          this.toastrService.success('Device created with success!', 'Information');
          this.deviceForm.reset();
        }
      } else if (this.sqlAccessModeEnum == SqlAccessModeEnum.Update) {
        const result = await this.deviceManagementService.update(this.selectedItem.id, device);
        if (result.hasError) {
          this.toastrService.error(`Error to update device | error: ${result.msgError}`, 'Error');
        } else {
          this.toastrService.success('Device updated with success!', 'Information');
          this.backToPageEventEmitter.emit();
        }
      }
    }
  }

  //#endregion

  //#region Private Methods

  private createDeviceForm() {
    this.deviceForm = this.formBuilder.group({
      categoryId: [null, Validators.required],
      color: [null, Validators.required],
      partNumber: [null, [Validators.required]],
    });
  }

  private async getCategories() {
    const data = await this.deviceManagementService.getCategories();
    this.listCategories = data.items as CategoryManagement[];
  }

  private async setFormValue() {
    const item = await this.deviceManagementService.getById(this.selectedItem.id);
    const device = item.items as DeviceManagement;

    this.deviceForm.patchValue({
      categoryId: device.categoryId,
      color: device.color,
      partNumber: device.partNumber,
    })
  }

  //#endregion

  //#endregion
}
