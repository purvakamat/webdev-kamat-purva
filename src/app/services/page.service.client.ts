/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ]


  api = {
    'createPage'   : this.createPage,
    'findPagesByWebsiteId' : this.findPagesByWebsiteId,
    'findPageById' : this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(websiteId : string, page : any){
    page["websiteId"] = websiteId;
    this.pages.push(page);
  }

  findPagesByWebsiteId(websiteId : string){
    return this.pages.filter(page => page.websiteId == websiteId);
  }

  findPageById(pageId : string){
    return this.pages.find(page => page._id == pageId);
  }

  updatePage(pageId : string, page : any){
    let pId = this.pages.findIndex(p => p._id == pageId);
    if(pId != -1){
      this.pages[pId] = page;
    }
  }

  deletePage(pageId : string){
    let pId = this.pages.findIndex(p => p._id == pageId);
    if(pId != -1){
      this.pages.splice(pId,1);
    }
  }
}
