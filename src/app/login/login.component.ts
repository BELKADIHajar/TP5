import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {/*implements OnInit {

  formLogin! : FormGroup;
  errorMessage = undefined;

  constructor(private fb : FormBuilder, private router : Router, private authService : AuthService){
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  handleLogin() {
    /*let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username, password)
      .then(resp => {
        console.log("Login successful : " + resp);
        this.router.navigateByUrl('/admin');
      })
      .catch(error => {
        console.log(error);
        this.errorMessage = error;
      });
  }*/
}
