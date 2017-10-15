"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by kamat on 10/9/2017.
 */
var core_1 = require('@angular/core');
var WidgetService = (function () {
    function WidgetService() {
        this.widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO" },
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum" },
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/" },
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>" },
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum" },
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>" }
        ];
        this.api = {
            'createWidget': this.createWidget,
            'findWidgetsByPageId': this.findWidgetsByPageId,
            'findWidgetById': this.findWidgetById,
            'updateWidget': this.updateWidget,
            'deleteWidget': this.deleteWidget
        };
    }
    WidgetService.prototype.createWidget = function (pageId, widget) {
        widget["pageId "] = pageId;
        this.widgets.push(widget);
    };
    WidgetService.prototype.findWidgetsByPageId = function (pageId) {
        return this.widgets.find(function (widget) { return widget.pageId == pageId; });
    };
    WidgetService.prototype.findWidgetById = function (widgetId) {
        return this.widgets.find(function (widget) { return widget._id == widgetId; });
    };
    WidgetService.prototype.updateWidget = function (widgetId, widget) {
        var wId = this.widgets.findIndex(function (w) { return w._id == widgetId; });
        if (wId != -1) {
            this.widgets[wId] = widget;
        }
    };
    WidgetService.prototype.deleteWidget = function (widgetId) {
        var wId = this.widgets.findIndex(function (w) { return w._id == widgetId; });
        if (wId != -1) {
            this.widgets.splice(wId, 1);
        }
    };
    WidgetService = __decorate([
        core_1.Injectable()
    ], WidgetService);
    return WidgetService;
}());
exports.WidgetService = WidgetService;
//# sourceMappingURL=widget.service.client.js.map