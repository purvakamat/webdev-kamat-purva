import { Component, OnInit } from '@angular/core';
import {WebsiteService} from "../../../services/website.service.client";
import {ActivatedRoute} from '@angular/router';

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

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websites = this.websiteService.findWebsitesByUser(this.userId);
        }
      );
  }

  createWebsite(){
    console.log(this.name);
    this.websiteService.createWebsite(this.userId,{'name':this.name, 'description':this.description});
  }
}
