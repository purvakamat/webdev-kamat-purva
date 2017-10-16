import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  pages: any[];
  page: any = {};

  constructor(private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
          this.page = this.pageService.findPageById(this.pageId);
        }
      );
  }

  updatePage(){
    this.pageService.updatePage(this.pageId,this.page);
  }

  deletePage(){
    this.pageService.deletePage(this.pageId);
  }

}
