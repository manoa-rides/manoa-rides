import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedDriver = 'seletedDriverOrRider';
const selectedSeats = 'selectedSeats';
const selectedDriverZipcode= 'selectedDriverZipcode';
const selectedRiderZipcode = 'selectedRiderZipcode';


Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedDriver, undefined);
  this.messageFlags.set(selectedSeats, undefined);
  this.messageFlags.set(selectedDriverZipcode, undefined);
  this.messageFlags.set(selectedRiderZipcode, undefined);
});

Template.Filter_Page.helpers({
  profiles() {
    const allProfiles = Profiles.findAll();
    let profiles = null;
    let selectedD = Template.instance().messageFlags.get(selectedDriver);
    let selectedNumSeats = Template.instance().messageFlags.get(selectedSeats);
    let selectedRiderZip = Template.instance().messageFlags.get(selectedRiderZipcode);
    let selectedDriverZip = Template.instance().messageFlags.get(selectedDriverZipcode);

    if(selectedD === undefined) {
      selectedD = true;
    }
    if (selectedD === true) {
      profiles =  _.filter(allProfiles, function (profile) { if (profile.driver === true) { return profile; } });
      if (selectedNumSeats === undefined) {
        selectedNumSeats = 1;
      }
      console.log("selectedZip " + selectedDriverZip);
      if(selectedDriverZip !== '' && selectedDriverZip !== undefined) {
        const zipProfiles = _.filter(profiles,
            function (profile) { if (profile.zipcode === selectedDriverZip) { return profile; } });
        console.log(zipProfiles);
        profiles = zipProfiles;
      }
      const seatProfiles = _.filter(profiles,
          function (profile) { if (profile.seats >= selectedNumSeats) { return profile; } });
      profiles = seatProfiles;
    } else {
      profiles = _.filter(allProfiles, function (profile) { if (profile.driver === false) { return profile; } });
      if(selectedRiderZip !== '' && selectedRiderZip !== undefined) {
        const zipProfiles = _.filter(profiles,
            function (profile) { if (profile.zipcode === selectedRiderZip) { return profile; } });
        profiles = zipProfiles;
      }
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
    instance.messageFlags.set(selectedDriverZipcode, event.target.DriverZipcode.value);
    instance.messageFlags.set(selectedRiderZipcode, event.target.RiderZipcode.value);
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

