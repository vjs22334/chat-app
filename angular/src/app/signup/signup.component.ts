import { Component, OnInit } from '@angular/core';
import{ HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  createUser()
  {
    var username=<HTMLInputElement>document.getElementById("username");
    var password=<HTMLInputElement>document.getElementById("password");
    var body={
    "username" : username.value,
    "password": password.value
    };
    this.http.post("http://localhost:3000/api/createUser",body).subscribe(
    data=>{
    console.log(data);
    },
    err=>{
    console.log(err);
    }
    );
    }


}
