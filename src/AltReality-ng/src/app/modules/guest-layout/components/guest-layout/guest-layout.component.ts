import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/auth/user';

@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.css']
})
export class GuestLayoutComponent implements OnInit {
  user: User = null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  login(): void {
    this.authService.signin();
  }
}
