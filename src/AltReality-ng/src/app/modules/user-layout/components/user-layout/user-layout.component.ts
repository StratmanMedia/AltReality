import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/auth/user';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  user: User = null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => {
      if (!user) {
        this.authService.signin();
      }
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

}
