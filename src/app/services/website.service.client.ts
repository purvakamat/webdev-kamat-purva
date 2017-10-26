/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WebsiteService{

  baseUserURL : string;
  baseWebsiteURL: string

  constructor(private http: Http){
    this.baseUserURL = 'http://localhost:3100/api/user';
    this.baseWebsiteURL = 'http://localhost:3100/api/website';
  }

  createWebsite(userId : string, website : any){
    return this.http.post(this.baseUserURL + "/" + userId + "/website", website).map((response: Response) => {
      return response.json();
    });
  }

  findWebsitesByUser(userId : string){
    return this.http.get(this.baseUserURL + "/" + userId + "/website").map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(websiteId : string){
    return this.http.get(this.baseWebsiteURL + "/" + websiteId).map((response: Response) => {
      return response.json();
    });
  }

  updateWebsite(websiteId : string, website : any){
    return this.http.put(this.baseWebsiteURL + "/" + websiteId, website).map((response: Response) => {
      return response.json();
    });
  }

  deleteWebsite(websiteId : string){
    return this.http.delete(this.baseWebsiteURL + "/" + websiteId).map((response: Response) => {
      return response.json();
    });
  }
}
