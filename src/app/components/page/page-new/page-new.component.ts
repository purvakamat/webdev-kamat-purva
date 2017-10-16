import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: string;
  websiteId: string;
  name: string = "";
  description: string = "";
  pages: any[];

  constructor(private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
        }
      );
  }

  createPage(){
    this.pageService.createPage(this.websiteId, {'name': this.name, 'description':this.description});
  }
}
