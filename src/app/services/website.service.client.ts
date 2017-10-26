/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class WebsiteService{

  websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
  ]

  createWebsite(userId : string, website : any){
    website["developerId"] = userId;
    this.websites.push(website);
  }

  findWebsitesByUser(userId : string){
    return this.websites.filter(website => website.developerId == userId);
  }

  findWebsiteById(websiteId : string){
    return this.websites.find(website => website._id == websiteId);
  }

  updateWebsite(websiteId : string, website : any){
    let wId = this.websites.findIndex(w => w._id == websiteId);
    if(wId != -1){
      this.websites[wId] = website;
    }
  }

  deleteWebsite(websiteId : string){
    let wId = this.websites.findIndex(w => w._id == websiteId);
    if(wId != -1){
      this.websites.splice(wId,1);
    }
  }
}
