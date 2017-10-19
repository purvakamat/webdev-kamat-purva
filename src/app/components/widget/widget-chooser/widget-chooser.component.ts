import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from "../../../services/widget.service.client";

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgets: any[];

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
        }
      );
  }

  createWidget(widgetType:string){
    var widget_id = this.widgetService.createWidget(this.pageId, {"_id":"0", "widgetType" : widgetType});
    this.route.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', widget_id]);
  }
}
