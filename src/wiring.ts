// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Application,
  Constructor,
  createBindingFromClass
} from '@loopback/core';
import {
  FaceBookOauth2Authentication,
  Oauth2AuthStrategy
} from './authentication-strategies';
import {
  CustomOauth2,
  FacebookOauth
} from './authentication-strategy-providers';

export function setupBindings(app: Application) {
  // passport strategies
  const passportStrategies: Record<string, Constructor<unknown>> = {
    facebookStrategy: FacebookOauth,
    oauth2Strategy: CustomOauth2,
  };
  for (const key in passportStrategies) {
    app.add(createBindingFromClass(passportStrategies[key], {key}));
  }

  // LoopBack 4 style authentication strategies
  const strategies: Constructor<unknown>[] = [
    FaceBookOauth2Authentication,
    Oauth2AuthStrategy,
  ];
  for (const s of strategies) {
    app.add(createBindingFromClass(s));
  }
}
