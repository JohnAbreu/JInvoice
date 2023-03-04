import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authUser: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authUser.logout();
    this.router.navigate(['/login'])
    }
}
