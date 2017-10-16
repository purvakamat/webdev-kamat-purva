import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;

  constructor(private widgetService: WidgetService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          this.widget = this.widgetService.findWidgetById(this.widgetId);
        }
      );
  }

  updateWidget(){
    this.widgetService.updateWidget(this.widgetId, this.widget);
  }

  deleteWidget(){
    this.widgetService.deleteWidget(this.widgetId);
  }

}
