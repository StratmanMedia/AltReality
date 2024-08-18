import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { constants } from 'src/app/shared/classes/constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.handleSigninCallback().subscribe(user => {
      const returnUrl = localStorage.getItem(constants.storageKeys.returnUrl);
      this.router.navigateByUrl(returnUrl, { replaceUrl: true });
    });
  }
}
