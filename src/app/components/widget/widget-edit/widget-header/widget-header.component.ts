import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {

          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];

          this.widgetService.findWidgetById(this.widgetId)
            .subscribe((widget) => {
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
