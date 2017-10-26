import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {ActivatedRoute} from '@angular/router';

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

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];

          this.userService.findUserById(this.userId).subscribe((user) => {
            this.user = user;
            this.username = this.user['username'];

            if(this.user['email'])
              this.email = this.user['email'];

            if(this.user['firstName'])
              this.firstName = this.user['firstName'];

            if(this.user['lastName'])
              this.lastName = this.user['lastName'];
          },
          (error) => {
            console.log("User not found");
          });
        }
      );
  }

  updateUser(){
    this.user['username'] = this.username;
    this.user['email'] = this.email;
    this.user['firstName'] = this.firstName;
    this.user['lastName'] = this.lastName;
    this.userService.updateUser(this.userId, this.user).subscribe((response)=>{
      console.log(response);
    });
  }
}
