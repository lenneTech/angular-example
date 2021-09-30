import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserLoginInput } from '../interfaces/user-login-input.interface';
import { IUserRegisterInput } from '../interfaces/user-register-input.interface';
import { IUserCreate } from '../interfaces/user-create.interface';
import { IUserInput } from '../interfaces/user-input.interface';
import { User } from '../classes/user.class';
import { IUserUpdatePasswordInput } from '../interfaces/user-update-password-input.interface';
import {
  AuthService,
  GraphQLMetaService,
  GraphQLPlusService,
  GraphQLRequestType,
  LoaderService,
} from '@lenne.tech/ng-base';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GraphQLPlusService {
  constructor(
    protected apollo: Apollo,
    protected graphQLMetaService: GraphQLMetaService,
    protected authService: AuthService,
    protected loaderService: LoaderService,
  ) {
    super(apollo, graphQLMetaService, loaderService);
  }

  // Overwrite parent method to use extra handling
  displayError(error: any) {
    console.error('Server Error!', error);
  }

  /**
   * Login user for academy
   *
   * @param input of login
   */
  public login(input: IUserLoginInput): Observable<User> {
    return new Observable((subscriber) => {
      this.graphQl('signIn', {
        arguments: input,
        fields: ['token', {user: Object.keys(new User())}],
        type: GraphQLRequestType.QUERY,
        excludedErrors: 'not found',
        loading: true,
      }).subscribe(
        (data) => {
          // Save session
          if (data?.token && data?.user) {
            const user = User.map(data.user);
            this.authService.currentUser = user;
            this.authService.token = data.token;
            subscriber.next(user);
          } else {
            subscriber.next(null);
          }
          subscriber.complete();
        },
        (error) => {
          subscriber.error(error);
          subscriber.complete();
        }
      );
    });
  }

  /**
   * Register user for academy
   *
   * @param input of register
   */
  public register(input: IUserRegisterInput): Observable<User> {
    return this.graphQl('createUser', {
      arguments: {input},
      fields: User,
      type: GraphQLRequestType.MUTATION,
      loading: true,
    }).pipe(map(userData => {
      // Save session
      if (userData) {
        return User.map(userData);
      }
      return null;
    }));
  }

  /**
   * Logout user from academy
   */
  public logout() {
    this.authService.logout();
  }

  /**
   * Get all users
   */
  public find(): Observable<User[]> {
    return this.graphQl('findUsers', {
      fields: User,
      type: GraphQLRequestType.QUERY,
      model: User,
      loading: true,
    });
  }

  /**
   * Get user by id
   *
   * @param id userId
   */
  public get(id: string): Observable<User> {
    return this.graphQl('getUser', {
      arguments: {id},
      fields: User,
      type: GraphQLRequestType.QUERY,
      model: User,
      loading: true,
    });
  }

  /**
   * Create user
   *
   * @param input data for user
   */
  public create(input: IUserCreate): Observable<User> {
    return this.graphQl('createUser', {
      arguments: {input},
      fields: User,
      type: GraphQLRequestType.MUTATION,
      model: User,
      loading: true,
    });
  }

  /**
   * Update user
   *
   * @param id from user to update
   * @param input new user data
   */
  public update(id: string, input: IUserInput): Observable<User> {
    return new Observable((subscriber) => {
      this.graphQl('updateUser', {
        arguments: {id, input},
        fields: User,
        type: GraphQLRequestType.MUTATION,
        model: User,
        loading: true,
      }).subscribe(
        (data) => {
          // Update session
          if (data && data.id === this.authService.currentUser.id) {
            this.authService.currentUser = data;
          }

          subscriber.next(data);
          subscriber.complete();
        },
        (error) => {
          subscriber.error(error);
          subscriber.complete();
        }
      );
    });
  }

  /**
   * Update user password
   *
   * @param id from user to update
   * @param input new user data
   */
  public changePassword(id: string, input: IUserUpdatePasswordInput): Observable<User> {
    return this.graphQl('updateUser', {
      arguments: {id, input},
      fields: User,
      type: GraphQLRequestType.MUTATION,
      model: User,
      loading: true,
    });
  }

  /**
   * Delete user
   *
   * @param id from user to update
   */
  public delete(id: string): Observable<User> {
    return this.graphQl('deleteUser', {
      arguments: {id},
      fields: Object.keys(new User()),
      type: GraphQLRequestType.MUTATION,
      model: User,
      loading: true,
    });
  }
}
