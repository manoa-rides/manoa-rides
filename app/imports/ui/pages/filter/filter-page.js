import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedDriver = 'seletedDriverOrRider';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedDriver, undefined);
});

Template.Filter_Page.helpers({
  profiles() {
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    // const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    // return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
    let profiles = null;
    const selectedD = Template.instance().messageFlags.get(selectedDriver);
    if (selectedD === true) {
      profiles =  _.filter(allProfiles, function (profile) { if (profile.driver === true) { return profile; } });
    } else {
      profiles = _.filter(allProfiles, function (profile) { if (profile.driver === false) { return profile; } });
    }
    return profiles;
  },

});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
  },
  'click .choose-driver'(event, instance) {
    event.preventDefault();
    console.log('Set to true');
    instance.messageFlags.set(selectedDriver, true);
  },
  'click .choose-rider'(event, instance) {
    event.preventDefault();
    console.log('Set to false');
    instance.messageFlags.set(selectedDriver, false);
  },
});

