import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private userService: UserService) {  }

  ngOnInit() {
  }

  login(){
    var user = this.userService.findUserByCredentials(this.username, this.password);
    if(user){
      this.router.navigate(['/user', user._id]);
    }
    else{
      this.errorMessage = "Username and password do not match. Please eneter the correct credentials";
      this.showError = true;
    }
  }

}
