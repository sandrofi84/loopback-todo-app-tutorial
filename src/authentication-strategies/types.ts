// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  User,
  UserRelations,
  UserRepository,
} from '@loopback/authentication-jwt';
import {securityId, UserProfile} from '@loopback/security';
import {Profile} from 'passport';
import {ProfileRepository} from '../repositories';

export type ProfileFunction = (
  accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done: (err?: Error | null, profile?: any) => void,
) => void;

export type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done: (error: any, user?: any, info?: any) => void,
) => void;

export namespace PassportAuthenticationBindings {
  export const OAUTH2_STRATEGY = 'passport.authentication.oauth2.strategy';
}

/**
 * provides an appropriate verify function for oauth2 strategies
 * @param accessToken
 * @param refreshToken
 * @param profile
 * @param done
 */
export const verifyFunctionFactory = function (
  userRepository: UserRepository,
  profileRepository: ProfileRepository,
): VerifyFunction {
  return function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: (error: any, user?: any, info?: any) => void,
  ) {
    if (!profile.emails || !profile.emails.length) {
      throw new Error('email-id is required in returned profile to login');
    }

    const email = profile.emails[0].value;

    userRepository
      .find({
        where: {
          email: email,
        },
      })
      .then((users: (User & UserRelations)[]) => {
        if (!users || !users.length) {
          const name = profile.name?.givenName
            ? profile.name.givenName + ' ' + profile.name.familyName
            : profile.displayName;

          const a = userRepository.create({
            email: email,
            username: name || JSON.stringify(profile.name),
          });

          const b = a.then(user => {
            return profileRepository.create({
              username: user.username,
              displayName: profile.displayName,
              profilePicture: profile?.photos?.length
                ? profile.photos[0].value
                : '',
              pictures: [],
              userId: user.id,
            });
          });

          Promise.all([a, b])
            .then(([user, newProfile]) => {
              done(null, user);
            })
            .catch((err: Error) => {
              done(err);
            });
        } else {
          done(null, users[0]);
        }
      })
      .catch((err: Error) => {
        done(err);
      });
  };
};

/**
 * map passport profile to UserProfile in `@loopback/security`
 * @param user
 */
export const mapProfile = function (user: User): UserProfile {
  const userProfile: UserProfile = {
    [securityId]: '' + user.id,
    profile: {
      ...user,
    },
  };
  return userProfile;
};
