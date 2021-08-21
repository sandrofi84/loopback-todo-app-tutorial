// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserRepository} from '@loopback/authentication-jwt';
import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Strategy as FacebookStrategy, StrategyOption} from 'passport-facebook';
import {verifyFunctionFactory} from '../authentication-strategies/types';

@injectable.provider({scope: BindingScope.SINGLETON})
export class FacebookOauth implements Provider<FacebookStrategy> {
  strategy: FacebookStrategy;

  constructor(
    @inject('facebookOAuth2Options')
    public facebookOptions: StrategyOption,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    this.strategy = new FacebookStrategy(
      this.facebookOptions,
      verifyFunctionFactory(this.userRepository),
    );
  }

  value() {
    return this.strategy;
  }
}
