import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './core/classes/user.class';
import { AuthService, BasicUser } from '@lenne.tech/ng-base';
import { Subscription } from 'rxjs';

/**
 * App component
 */
@Component({
  selector: 'lt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  // Properties
  public status: 'login' | 'signup' | 'content' = 'login';
  public form: FormGroup;
  public user: User | BasicUser;

  // Subscription hanlding
  private subscriptions: Subscription = new Subscription();

  // Include services
  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {

    // Initialize form
    this.form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Subscription handling
    this.subscriptions.add(this.authService.currentUserObservable.subscribe((currentUser) => {

      // Check user
      if (!currentUser && this.user) {
        this.logout();
        return;
      } else if (currentUser) {
        this.user = currentUser;
        this.status = 'content';
      }
    }));
  }

  /**
   * Unsubscribe subscriptions
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Register new user
   */
  public async register() {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.user = await this.userService.register(userData).toPromise();
    if (!this.user) {
      alert('User could not be created, possibly an account already exists with the e-mail address.');
      return;
    }
    this.status = 'content';
  }

  /**
   * Login user
   */
  public login() {
    this.userService.login(this.form.value).toPromise().catch(() => {
      alert('Wrong email or password!');
    });
  }

  /**
   * Logout user
   */
  public logout() {
    this.user = null;
    this.userService.logout();
    this.status = 'login';
  }
}
