import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: string;
  websites: any[];
  websiteId: string;
  website: any = {};

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.websites = this.websiteService.findWebsitesByUser(this.userId);

          this.website = this.websiteService.findWebsiteById(this.websiteId);
        }
      );
  }

  updateWebsite(){
    this.websiteService.updateWebsite(this.websiteId, this.website);
  }

  deleteWebsite(){
    this.websiteService.deleteWebsite(this.websiteId);
  }

}
