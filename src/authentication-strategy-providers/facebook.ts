// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserRepository} from '@loopback/authentication-jwt';
import {BindingScope, inject, injectable, Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Strategy as FacebookStrategy, StrategyOption} from 'passport-facebook';
import {verifyFunctionFactory} from '../authentication-strategies/types';
import {ProfileRepository} from '../repositories';

@injectable.provider({scope: BindingScope.SINGLETON})
export class FacebookOauth implements Provider<FacebookStrategy> {
  strategy: FacebookStrategy;

  constructor(
    @inject('facebookOAuth2Options')
    public facebookOptions: StrategyOption,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) {
    this.strategy = new FacebookStrategy(
      this.facebookOptions,
      verifyFunctionFactory(this.userRepository, this.profileRepository),
    );
  }

  value() {
    return this.strategy;
  }
}
