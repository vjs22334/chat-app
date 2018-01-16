import { Component, OnInit } from '@angular/core';
import{ HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
login()
{
  var username=<HTMLInputElement>document.getElementById("username");
  var password=<HTMLInputElement>document.getElementById("password");
  var body={
  "username" : username.value,
  "password": password.value
  };
  this.http.post("http://localhost:3000/api/login",body).subscribe(
  data=>{
  console.log(data);
  },
  err=>{
  console.log(err);
  }
  );

}
}
