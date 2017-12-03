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
          this.websiteId = params['wid'];
          this.pageId = params['pid'];

          this.widgetService.findWidgetsByPageId(this.pageId)
            .subscribe((widgets) => {
              this.widgets = widgets;
            });
        }
      );
  }

  createWidget(type:string){
    this.widgetService.createWidget(this.pageId, {"type" : type, "name": "", "text": ""})
      .subscribe((widget) => {
        var widgetId = widget._id;
        this.route.navigate(['/user', 'website', this.websiteId, 'page', this.pageId, 'widget', widgetId]);
      });
  }
}
