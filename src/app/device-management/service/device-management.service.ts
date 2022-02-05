import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChallengeHttpResponse } from 'src/models/challenge-http-response';
import { CategoryManagement } from '../../category-management/models/category-management';
import { DeviceManagement } from '../models/device-management';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DeviceManagementService {

    //#region Constructor

    constructor(private http: HttpClient) {}

    //#endregion

    //#region Methods

    //#region Select

    public getAll() {
        return new Promise<ChallengeHttpResponse<DeviceManagement>>((resolve, reject) => {
            this.http.get<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices`).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error)
            });
        });
    }

    public getById(id: number) {
        return new Promise<ChallengeHttpResponse<DeviceManagement>>((resolve, reject) => {
            this.http.get<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/${id}`).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
    
    public getCategories() {
        return new Promise<ChallengeHttpResponse<CategoryManagement>>((resolve, reject) => {
            this.http.get<ChallengeHttpResponse<CategoryManagement>>(`${API}/categories`).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#region Insert

    public insert(device: DeviceManagement) {
        return new Promise<ChallengeHttpResponse<DeviceManagement>>((resolve, reject) => {
            this.http.post<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/insert`, device).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#region Update

    public update(id: number, device: DeviceManagement) {
        return new Promise<ChallengeHttpResponse<DeviceManagement>>((resolve, reject) => {
            this.http.patch<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/${id}`, device).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#region Delete

    public delete(id: number) {
        return new Promise<ChallengeHttpResponse<DeviceManagement>>((resolve, reject) => {
            this.http.delete<ChallengeHttpResponse<DeviceManagement>>(`${API}/devices/${id}`).subscribe((result: any) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    //#endregion

    //#endregion
}
