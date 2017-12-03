import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  websiteId: string;
  pageId: string;
  pages: any[];
  page: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.websiteId = params['wid'];
          this.pageId = params['pid'];

          this.pageService.findPagesByWebsiteId(this.websiteId)
            .subscribe((pages) => {
              this.pages = pages;
            });

          this.pageService.findPageById(this.pageId)
            .subscribe((page) => {
              this.page = page;
            });
        }
      );
  }

  updatePage(){
    this.pageService.updatePage(this.pageId,this.page)
      .subscribe((response) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page']);
      });
  }

  deletePage(){
    this.pageService.deletePage(this.pageId)
      .subscribe((response) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page']);
      });
  }

}
