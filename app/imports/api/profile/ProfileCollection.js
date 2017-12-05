import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      phone: { type: String, optional: true, regEx: /^\d{3}-\d{3}-\d{4}$/ },
      zipcode: { type: String, optional: true },
      facebook: { type: SimpleSchema.RegEx.Url, optional: true },
      instagram: { type: SimpleSchema.RegEx.Url, optional: true },
      snapchat: { type: String, optional: true },
      interests: { type: Array, optional: true },
      'interests.$': { type: String },
      bio: { type: String, optional: true },
      driver: { type: Boolean, optional: false },
      car: { type: String, optional: true },
      seats: { type: Number, optional: false },
      owned: { type: Number, optional: false },
      accidents: { type: Number, optional: false },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, bio = '', picture = '', phone = '', zipcode = '', facebook = '', instagram = '', snapchat = '', interests = [], driver = false, car = '', seats = 0, owned = 0, accidents = 0 }) {
    // make sure required fields are OK.
    const checkPattern = { username: String, firstName: String, lastName: String, phone: String, zipcode: String, driver: Boolean, car: String, seats: Number, };
    check({ firstName, lastName, username, bio, driver, seats, zipcode, picture }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);

    // Throw an error if there are duplicates in the passed interest names.
    if (interests.length !== _.uniq(interests).length) {
      throw new Meteor.Error(`${interests} contains duplicates`);
    }

    return this._collection.insert({ firstName, lastName, picture, phone, zipcode, facebook, instagram, snapchat, interests, bio, driver, car, seats, owned, accidents, username });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const picture = doc.picture;
    const zipcode = doc.zipcode;
    const facebook = doc.facebook;
    const instagram = doc.instagram;
    const snapchat = doc.snapchat;
    const interests = doc.interests;
    const bio = doc.bio;
    const driver = doc.driver;
    const car = doc.car;
    const seats = doc.seats;
    const owned = doc.owned;
    const accidents = doc.accidents;
    const username = doc.username;
    return { firstName, lastName, picture, zipcode, facebook, instagram, snapchat, interests, bio, driver, car, seats, owned, accidents, username };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();

