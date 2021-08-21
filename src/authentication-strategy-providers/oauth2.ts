// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserRepository} from '@loopback/authentication-jwt';
import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  Strategy as OAuth2Strategy,
  StrategyOptions as OAuth2StrategyOptions
} from 'passport-oauth2';
import {
  ProfileFunction,
  verifyFunctionFactory
} from '../authentication-strategies/types';

@injectable.provider({scope: BindingScope.SINGLETON})
export class CustomOauth2 implements Provider<OAuth2Strategy> {
  strategy: OAuth2Strategy;

  constructor(
    @inject('customOAuth2Options')
    public oauth2Options: OAuth2StrategyOptions,
    @inject('authentication.oauth2.profile.function', {optional: true})
    public profileFn: ProfileFunction,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    if (profileFn) {
      OAuth2Strategy.prototype.userProfile = profileFn;
    }
    this.strategy = new OAuth2Strategy(
      this.oauth2Options,
      verifyFunctionFactory(this.userRepository),
    );
  }

  value() {
    return this.strategy;
  }
}
