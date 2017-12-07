import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  baseUrl: string;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];

          this.widgetService.findWidgetById(this.widgetId)
            .subscribe((widget) => {
              console.log(this.baseUrl);
              console.log(widget)
              this.widget = widget;
            });
        }
      );
  }

  updateWidget(){
    this.widgetService.updateWidget(this.widgetId, this.widget)
      .subscribe((response) => {
        this.router.navigate(['/user','website',this.websiteId,'page',this.pageId,'widget']);
      });
  }

  deleteWidget(){
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe((response) => {
        this.router.navigate(['/user','website',this.websiteId,'page',this.pageId,'widget']);
      });
  }

}
