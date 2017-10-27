/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {environment} from "../../environments/environment";

@Injectable()
export class UserService{

  baseURL : string;

  constructor(private http: Http){
    this.baseURL = environment.baseUrl + '/api/user';
  }

  createUser(user : any){
    return this.http.post(this.baseURL, user).map((response: Response) => {
      return response.json();
    });
  }

  findUserById(userId : string){
    return this.http.get(this.baseURL + "/" + userId).map((response: Response) => {
      return response.json();
    });
  }

  findUserByUsername(username : string){
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    params.set("username", username);
    requestOptions.params = params;
    return this.http.get(this.baseURL,requestOptions).map((response: Response) => {
      return response.json();
    });
  }

  findUserByCredentials(username : string, password : string){
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    params.set("username", username);
    params.set("password", password);
    requestOptions.params = params;
    return this.http.get(this.baseURL,requestOptions).map((response: Response) => {
      return response.json();
    });
  }

  updateUser(userId : string, user : any){
    return this.http.put(this.baseURL + "/" + userId, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId : string){
    return this.http.delete(this.baseURL + "/" + userId).map((response: Response) => {
      return response.json();
    });
  }

}

