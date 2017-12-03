import { Component, OnInit } from '@angular/core';
import {WebsiteService} from "../../../services/website.service.client";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: string;
  websites: any[];

  constructor(private sharedService: SharedService, private websiteService: WebsiteService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe((websites) => {
        this.websites = websites;
      });
  }
}
