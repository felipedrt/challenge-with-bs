import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef , BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';
import { CategoryManagement } from './models/category-management';
import { CategoryManagementService } from './service/category-management.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  public dtOptions: DataTables.Settings = {};
  public dtOptionsHist: DataTables.Settings = {};
  public listData: Array<any> = [];
  public dtTrigger: Subject<any> = new Subject();
  public loading: boolean;
  public categoryForm: FormGroup;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  public listCategories: CategoryManagement[] = [];
  public selectedItem;
  public modalCrudTitle = '';

  public nameControlIsInvalid;

  //#endregion

  //#region Private Attributes

  private modalRef: BsModalRef;
  private sqlAccessMode: SqlAccessModeEnum;

  //#endregion

  //#endregion

  //#region Constructor

  constructor(private categoryManagementService: CategoryManagementService,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) {}

  //#endregion

  //#region Lifecycle Events

  ngOnInit() {
    this.configDataTable();
    this.loadData();
    this.createCategoryForm();
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public async loadData(rerender: boolean = false) {
    this.loading = true;
    
    const data = await this.categoryManagementService.getAll();
    this.listCategories = data.items as CategoryManagement[];
    this.loading = false;
    if (rerender) {
      this.rerenderDataTable();
    } else {
      this.dtTrigger.next();
    } 
  }

  public btnNewCategoryOnClick(template: TemplateRef<any>) {
    this.modalCrudTitle = 'Category Management - New';
    this.sqlAccessMode = SqlAccessModeEnum.Insert;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  public btnEditCategoryOnClick(template: TemplateRef<any>, item) {
    this.selectedItem = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.sqlAccessMode = SqlAccessModeEnum.Update;
    this.categoryForm.patchValue({
      name: item.name
    });
    this.modalCrudTitle = 'Category Management - Edit';
  }
  
  public async btnRemoveCategoryOnClick(template: TemplateRef<any>, item) {
    this.selectedItem = item;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //

  public async confirm() {
    const result = await this.categoryManagementService.delete(this.selectedItem.id);
    if (result.hasError) {
      this.toastrService.error(`Error to delete category | error: ${result.msgError}`, 'Error');
    } else {
      this.toastrService.success('Category deleted with success!', 'Information');
      await this.loadData(true);
    }
    this.modalRef?.hide();
  }
 
  public async saveCategory() {
    this.nameControlIsInvalid = this.categoryForm.get('name')?.errors?.required;

    if (this.categoryForm.valid) {
      const category: CategoryManagement = {
        name: this.categoryForm.get('name').value,
      };

      if (this.sqlAccessMode == SqlAccessModeEnum.Insert) {
        const result = await this.categoryManagementService.insert(category);
        if (result.hasError) {
          this.toastrService.error(`Error to created category | error: ${result.msgError}`, 'Error');
        } else {
          this.toastrService.success('Category created with success!', 'Information');
          this.categoryForm.reset();
          await this.loadData(true);
        }
      } else if (this.sqlAccessMode == SqlAccessModeEnum.Update) {
        const result = await this.categoryManagementService.update(this.selectedItem.id, category);
        if (result.hasError) {
          this.toastrService.error(`Error to update category | error: ${result.msgError}`, 'Error');
        } else {
          this.toastrService.success('Category updated with success!', 'Information');
          this.closeModal();
          await this.loadData(true);
        }
      }
    }
  }

  public closeModal() {
    this.modalRef?.hide();
  }

  //#endregion

  //#region Private Methods

  private createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  private configDataTable() {
    this.dtOptions = {
      columns: [
        {
          title: 'ID',
          data: 'id',
        },
        {
          title: 'Name',
          data: 'name',
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
