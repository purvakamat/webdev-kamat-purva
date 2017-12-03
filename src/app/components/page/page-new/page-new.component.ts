import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from "../../../services/page.service.client";
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  websiteId: string;
  name: string = "";
  description: string = "";
  pages: any[];

  constructor(private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.websiteId = params['wid'];

          this.pageService.findPagesByWebsiteId(this.websiteId)
            .subscribe((pages) => {
              this.pages = pages;
            });
        }
      );
  }

  createPage(){
    this.pageService.createPage(this.websiteId, {'name': this.name, 'description':this.description})
      .subscribe((page) => {
        this.router.navigate(['/user', 'website', this.websiteId, 'page']);
      });
  }
}
