/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WidgetService {

  basePageURL : string;
  baseWidgetURL: string;

  constructor(private http: Http){
    this.basePageURL = 'http://localhost:3100/api/page';
    this.baseWidgetURL = 'http://localhost:3100/api/widget';
  }

  createWidget(pageId : string, widget : any){
    return this.http.post(this.basePageURL + "/" + pageId + "/widget", widget).map((response: Response) => {
      return response.json();
    });
  }

  findWidgetsByPageId(pageId : string){
    return this.http.get(this.basePageURL + "/" + pageId + "/widget").map((response: Response) => {
      return response.json();
    });
  }

  findWidgetById(widgetId : string){
    return this.http.get(this.baseWidgetURL + "/" + widgetId).map((response: Response) => {
      return response.json();
    });
  }

  updateWidget(widgetId : string, widget : any){
    return this.http.put(this.baseWidgetURL + "/" + widgetId, widget).map((response: Response) => {
      return response.json();
    });
  }

  deleteWidget(widgetId : string){
    return this.http.delete(this.baseWidgetURL + "/" + widgetId).map((response: Response) => {
      return response.json();
    });
  }
}
