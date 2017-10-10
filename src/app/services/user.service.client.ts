/**
 * Created by kamat on 10/9/2017.
 */
import { Injectable } from '@angular/core';

@Injectable
export class UserService{

  users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ]

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'findUserByCredentials' : this.findUserByCredentials,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };

  createUser(user : any){
    this.users.push(user);
  }

  findUserById(userId : string){
    return this.users.find(user => user._id == userId);
  }

  findUserByUsername(username : string){
    return this.users.find(user => user.username == username);
  }

  findUserByCredentials(username : string, password : string){
    return this.users.find(user => user.username == username && user.password == password);
  }

  updateUser(userId : string, user : any){
    let uId = this.users.findIndex(u => u._id == userId);
    if(uId != -1){
      this.users[uId] = user;
    }
  }

  deleteUser(userId : string){
    let uId = this.users.findIndex(u => u._id == userId);
    if(uId != -1){
      this.users.splice(uId,1);
    }
  }

}

