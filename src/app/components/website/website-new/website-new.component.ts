import { Component, OnInit } from '@angular/core';
import {WebsiteService} from "../../../services/website.service.client";
import {Router} from '@angular/router';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: string;
  websites: any[];
  name: string = "";
  description: string = "";

  constructor(private websiteService: WebsiteService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe((websites) => {
        this.websites = websites;
      });
  }

  createWebsite(){
    this.websiteService.createWebsite(this.userId,{'name':this.name, 'description':this.description})
      .subscribe((website) => {
        this.router.navigate(['/user', 'website']);
      });
  }
}
