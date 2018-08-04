import { Component, OnDestroy } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { SessionService, LoginProvider, LoginSession } from '../api/session.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface FacebookSession {
  email: string;
  id: string;
  image: string;
  name: string;
  provider: string;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private sessionApiSub: Subscription = Subscription.EMPTY;

  constructor(
    private router:Router,
    private socialAuthService: AuthService,
    private sessionApiService: SessionService
  ) { }

  public signinFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData:SocialUser) =>
        this.saveSession({
        id: userData.id,
        username: userData.name,
        email: userData.email,
        provider: LoginProvider.Facebook,
        token: userData.authToken
      })
    );
  }

  public saveSession(session: LoginSession): void {
    this.sessionApiSub = this.sessionApiService
      .login(session)
      .subscribe((res) => {
        if (res.data) {
          this.sessionApiService.setToken(res.data.token || '');
        }
        this.router.navigate(['staff/dashboard'])
      });
  }

  public ngOnDestroy(): void {
    this.sessionApiSub.unsubscribe();
  }

}
