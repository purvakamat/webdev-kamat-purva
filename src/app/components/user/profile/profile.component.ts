import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string = "";
  user = {};
  username: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.username = this.user['username'];

    if(this.user['email'])
      this.email = this.user['email'];

    if(this.user['firstName'])
      this.firstName = this.user['firstName'];

    if(this.user['lastName'])
      this.lastName = this.user['lastName'];
  }

  updateUser(){
    this.user['username'] = this.username;
    this.user['email'] = this.email;
    this.user['firstName'] = this.firstName;
    this.user['lastName'] = this.lastName;
    this.userService.updateUser(this.userId, this.user).subscribe((response)=>{
      // successfully updated
    });
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

}
