import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorFlag: boolean = false;
  errorMsg: string = "";

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  register(){
    var username = this.registerForm.value.username;
    var password = this.registerForm.value.password;
    var ver_password = this.registerForm.value.verifypassword;

    if(password != ver_password){
      this.errorMsg = "The passwords do not match. Please re-enter the passwords."
      this.errorFlag = true;
    }
    else{
      this.userService.findUserByUsername(username)
        .subscribe(
          (user) => {
            if(user){
              this.errorMsg = "A user with this username already exists. Please try another username."
              this.errorFlag = true;
            }
          },
          (error) => {
            this.userService.createUser({'username':username, 'password':password})
              .subscribe((user) => {
                let user_id = user['_id'];
                this.router.navigate(['/user', user_id]);
              });
          });
    }
  }
}
