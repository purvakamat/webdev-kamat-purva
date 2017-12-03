import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorFlag: boolean = false;
  errorMsg: string = "";

  @ViewChild('f') registerForm: NgForm;

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

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

      this.userService.register(username, password)
        .subscribe(
          (user: any) => {
            this.router.navigate(['/user']);
          },
          (error: any) => {
            this.errorMsg = error._body;
            this.errorFlag = true;
          }
        );
    }
  }

}
