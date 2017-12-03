import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../../services/widget.service.client";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  userId: string;
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
          this.userId = params['uid'];
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
        this.router.navigate(['/user',this.userId,'website',this.websiteId,'page',this.pageId,'widget']);
      });
  }

  deleteWidget(){
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe((response) => {
        this.router.navigate(['/user',this.userId,'website',this.websiteId,'page',this.pageId,'widget']);
      });
  }

}
