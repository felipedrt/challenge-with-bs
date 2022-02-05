import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChallengeHttpResponse } from 'src/models/challenge-http-response';
import { CategoryManagement } from '../models/category-management';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {

    //#region Constructor

    constructor(private http: HttpClient) {}

    //#endregion

    //#region Methods

    //#region Select

    public getAll() {
        return new Promise<ChallengeHttpResponse<CategoryManagement>>((resolve, reject) => {
            this.http.get<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories`).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    public getById(id: number) {
        return new Promise<ChallengeHttpResponse<CategoryManagement>>((resolve, reject) => {
            this.http.get<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/${id}`).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
    
    //#endregion

    //#region Insert

    public insert(category: CategoryManagement) {
        return new Promise<ChallengeHttpResponse<CategoryManagement>>((resolve, reject) => {
            this.http.post<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/insert`, category).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#region Update

    public update(id: number, category: CategoryManagement) {
        return new Promise<ChallengeHttpResponse<CategoryManagement>>((resolve, reject) => {
            this.http.patch<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/${id}`, category).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#region Delete

    public delete(id: number) {
        return new Promise<ChallengeHttpResponse<CategoryManagement>>((resolve, reject) => {
            this.http.delete<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories/${id}`).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#endregion
}
