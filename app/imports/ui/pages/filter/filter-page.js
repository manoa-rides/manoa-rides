import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedDriver = 'seletedDriverOrRider';
const selectedSeats = 'selectedSeats';
const selectedDriverZipcode = 'selectedDriverZipcode';
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
  timeOptions() {
    return [{ label: ' 12:00 AM', value: '0', selected: false },
      { label: '1:00 AM', value: '1', selected: false },
      { label: '2:00 AM', value: '2', selected: false },
      { label: '3:00 AM', value: '3', selected: false },
      { label: '4:00 AM', value: '4', selected: false },
      { label: '5:00 AM', value: '5', selected: false },
      { label: '6:00 AM', value: '6', selected: false },
      { label: '7:00 AM', value: '7', selected: false },
      { label: '8:00 AM', value: '8', selected: false },
      { label: '9:00 AM', value: '9', selected: false },
      { label: '10:00 AM', value: '10', selected: false },
      { label: '11:00 AM', value: '11', selected: false },
      { label: '12:00 PM', value: '12', selected: false },
      { label: '1:00 PM', value: '13', selected: false },
      { label: '2:00 PM', value: '14', selected: false },
      { label: '3:00 PM', value: '15', selected: false },
      { label: '4:00 PM', value: '16', selected: false },
      { label: '5:00 PM', value: '17', selected: false },
      { label: '6:00 PM', value: '18', selected: false },
      { label: '7:00 PM', value: '19', selected: false },
      { label: '8:00 PM', value: '20', selected: false },
      { label: '9:00 PM', value: '21', selected: false },
      { label: '10:00 PM', value: '22', selected: false },
      { label: '11:00 PM', value: '23', selected: false }];
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

