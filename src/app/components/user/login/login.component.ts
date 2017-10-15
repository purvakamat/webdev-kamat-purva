import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorFlag: boolean = false;
  errorMsg: string = "";

  @ViewChild('f') loginForm: NgForm;

  constructor(private router: Router, private userService: UserService) {  }

  ngOnInit() {
  }

  login(){
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    var user = this.userService.findUserByCredentials(this.username, this.password);
    if(user){
      this.router.navigate(['/user', user._id]);
    }
    else{
      this.errorMsg = "Username and password do not match. Please eneter the correct credentials";
      this.errorFlag = true;
    }
  }

}
