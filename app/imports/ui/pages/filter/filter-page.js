import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedDriver = 'seletedDriverOrRider';
const selectedSeats = 'selectedSeats';


Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedDriver, undefined);
  this.messageFlags.set(selectedSeats, undefined);
});

Template.Filter_Page.helpers({
  profiles() {
    const allProfiles = Profiles.findAll();
    let profiles = null;
    let selectedD = Template.instance().messageFlags.get(selectedDriver);
    let selectedNumSeats = Template.instance().messageFlags.get(selectedSeats);

    if(selectedD === undefined) {
      selectedD = true;
    }
    if (selectedD === true) {
      profiles =  _.filter(allProfiles, function (profile) { if (profile.driver === true) { return profile; } });
      if (selectedNumSeats === undefined) {
        selectedNumSeats = 1;
      }
      const seatProfiles = _.filter(profiles,
          function (profile) { if (profile.seats >= selectedNumSeats) { return profile; } });
      profiles = seatProfiles;
    } else {
      profiles = _.filter(allProfiles, function (profile) { if (profile.driver === false) { return profile; } });
    }

    return profiles;
  },
  seatOptions() {
    return [{ label: '1', selected: false }, { label: '2', selected: false }, { label: '3', selected: false },
      { label: '4', selected: false }, { label: '5', selected: false }, { label: '6', selected: false },
      { label: '7', selected: false }, { label: '8+', selected: false }];
  },
});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    instance.messageFlags.set(selectedSeats, event.target.carSeats.value);
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

