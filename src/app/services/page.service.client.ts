/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PageService {

  basePageURL : string;
  baseWebsiteURL: string;

  constructor(private http: Http){
    this.basePageURL = 'http://localhost:3100/api/page';
    this.baseWebsiteURL = 'http://localhost:3100/api/website';
  }

  createPage(websiteId : string, page : any){
    return this.http.post(this.baseWebsiteURL + "/" + websiteId + "/page", page).map((response: Response) => {
      return response.json();
    });
  }

  findPagesByWebsiteId(websiteId : string){
    return this.http.get(this.baseWebsiteURL + "/" + websiteId + "/page").map((response: Response) => {
      return response.json();
    });
  }

  findPageById(pageId : string){
    return this.http.get(this.basePageURL + "/" + pageId).map((response: Response) => {
      return response.json();
    });
  }

  updatePage(pageId : string, page : any){
    return this.http.put(this.basePageURL + "/" + pageId, page).map((response: Response) => {
      return response.json();
    });
  }

  deletePage(pageId : string){
    return this.http.delete(this.basePageURL + "/" + pageId).map((response: Response) => {
      return response.json();
    });
  }
}
