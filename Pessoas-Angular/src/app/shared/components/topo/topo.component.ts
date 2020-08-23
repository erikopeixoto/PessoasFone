import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

// import { AuthService } from '../_services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html'
})
export class TopoComponent implements OnInit {

  constructor(// public authService: AuthService,
     public router: Router,
     private fb: FormBuilder)
     // private toastr: ToastrService)
     {  }

  ngOnInit(): void {

  }

  showMenu(): boolean {
    return true; // this.router.url !== '/user/login';
  }

  loggedIn(): boolean {
    return true; // this.authService.loggedIn();
  }

//  entrar() {
//    this.router.navigate(['/user/login']);
//  }

//  logout() {
//    localStorage.removeItem('token');
//    this.toastr.show('Log Out');
//    this.router.navigate(['/user/login']);
//  }

//  userName() {
//    return sessionStorage.getItem('username');
//  }

}
