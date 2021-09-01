// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {authenticate, AuthenticationBindings, TokenService} from '@loopback/authentication';
import {
  MyUserService,
  TokenServiceBindings,
  User,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  get, param, Request, Response, RestBindings
} from '@loopback/rest';
import {SecurityBindings} from '@loopback/security';

/**
 * Login controller for third party oauth provider
 *
 * This controller demonstrates using passport strategies both as express middleware and as an independent strategy
 *
 * The method loginToThirdParty uses the @authenticate decorator to plugin passport strategies independently
 * The method thirdPartyCallBack uses the passport strategies as express middleware
 */
export class Oauth2Controller {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
  ) {}

  @authenticate('oauth2')
  @get('/auth/thirdparty/{provider}')
  /**
   * This method uses the @authenticate decorator to plugin passport strategies independently
   *
   * Endpoint: '/auth/thirdparty/{provider}'
   *          an endpoint for api clients to login via a third party app, redirects to third party app
   */
  loginToThirdParty(
    @param.path.string('provider') provider: string,
    @inject(AuthenticationBindings.AUTHENTICATION_REDIRECT_URL)
    redirectUrl: string,
    @inject(AuthenticationBindings.AUTHENTICATION_REDIRECT_STATUS)
    status: number,
    @inject(RestBindings.Http.RESPONSE)
    response: Response,
  ) {
    response.statusCode = status || 302;
    response.setHeader('Location', redirectUrl);
    console.log(redirectUrl);
    response.end();
    return response;
  }

  @authenticate('oauth2')
  @get('/auth/thirdparty/{provider}/callback')
  async thirdPartyCallBack(
    @param.path.string('provider') provider: string,
    @inject(SecurityBindings.USER) user: User,
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }
}
