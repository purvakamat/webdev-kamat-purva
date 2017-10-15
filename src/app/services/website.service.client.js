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
var WebsiteService = (function () {
    function WebsiteService() {
        this.websites = [
            { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
        ];
        this.api = {
            'createWebsite': this.createWebsite,
            'findWebsitesByUser': this.findWebsitesByUser,
            'findWebsiteById': this.findWebsiteById,
            'updateWebsite': this.updateWebsite,
            'deleteWebsite': this.deleteWebsite
        };
    }
    WebsiteService.prototype.createWebsite = function (userId, website) {
        website["developerId"] = userId;
        this.websites.push(website);
    };
    WebsiteService.prototype.findWebsitesByUser = function (userId) {
        return this.websites.find(function (website) { return website.developerId == userId; });
    };
    WebsiteService.prototype.findWebsiteById = function (websiteId) {
        return this.websites.find(function (website) { return website._id == websiteId; });
    };
    WebsiteService.prototype.updateWebsite = function (websiteId, website) {
        var wId = this.websites.findIndex(function (w) { return w._id == websiteId; });
        if (wId != -1) {
            this.websites[wId] = website;
        }
    };
    WebsiteService.prototype.deleteWebsite = function (websiteId) {
        var wId = this.websites.findIndex(function (w) { return w._id == websiteId; });
        if (wId != -1) {
            this.websites.splice(wId, 1);
        }
    };
    WebsiteService = __decorate([
        core_1.Injectable()
    ], WebsiteService);
    return WebsiteService;
}());
exports.WebsiteService = WebsiteService;
//# sourceMappingURL=website.service.client.js.map