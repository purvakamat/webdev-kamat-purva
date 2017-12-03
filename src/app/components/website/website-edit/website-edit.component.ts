import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute,
              private websiteService: WebsiteService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];

          this.websiteService.findWebsitesByUser(this.userId)
            .subscribe((websites) => {
              this.websites = websites;
            });

          this.websiteService.findWebsiteById(this.websiteId)
            .subscribe((website) => {
              this.website = website;
            });
        }
      );
  }

  updateWebsite(){
    this.websiteService.updateWebsite(this.websiteId, this.website)
      .subscribe((response) => {
        this.router.navigate(['/user',this.userId,'website']);
      });
  }

  deleteWebsite(){
    this.websiteService.deleteWebsite(this.websiteId)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/user',this.userId,'website']);
      });
  }

}
