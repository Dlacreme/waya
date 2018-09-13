import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { SessionService, LoginProvider, LoginSession } from '../services/session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  private sessionApiSub = Subscription.EMPTY;

  constructor(
    private router:Router,
    private socialAuthService: AuthService,
    private sessionService: SessionService
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
    this.sessionApiSub = this.sessionService
      .login(session)
      .subscribe((res) => {
        if (res.data) {
          this.sessionService.setToken(res.data.token || '');
          window.localStorage.setItem(environment.authToken, res.data.token);
        }
        this.router.navigate(['mYana'], {queryParamsHandling: 'merge'});
      });
  }

  public ngOnDestroy(): void {
    this.sessionApiSub.unsubscribe();
  }

}
