import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from "../../../services/widget.service.client";
import {DomSanitizer, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  websiteId: string;
  pageId: string;
  widgets: any[];

  constructor(private widgetService: WidgetService,private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

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

  embedURL(url: string){
    var urlSegments = url.split("/");
    var embeddedUrl = "https://www.youtube.com/embed/" + urlSegments.pop();
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

  reorderWidgets(index) {
    this.widgetService.reorderWidgets(this.pageId, this.widgets[index['initial']], index['initial'], index['final'])
        .subscribe(
        (widgets) => {},
        (error) => {}
      );
  }
}
