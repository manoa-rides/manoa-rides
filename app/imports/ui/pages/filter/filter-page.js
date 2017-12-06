import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedDriver = 'seletedDriverOrRider';
const selectedSeats = 'selectedSeats';
const selectedDriverZipcode = 'selectedDriverZipcode';
const selectedRiderZipcode = 'selectedRiderZipcode';
const selectedDriverGoingtoUHStart = 'driverGoingtoUHStart';
const selectedDriverGoingtoUHEnd = 'selectedDriverGoingtoUHEnd';
const selectedDriverReturntoUHStart = 'selectedDriverReturntoUHStart';
const selectedDriverReturntoUHEnd = 'selectedDriverReturntoUHEnd';
const selectedRiderGoingtoUHStart = 'driverGoingtoUHStart';
const selectedRiderGoingtoUHEnd = 'selectedRiderGoingtoUHEnd';
const selectedRiderReturntoUHStart = 'selectedRiderReturntoUHStart';
const selectedRiderReturntoUHEnd = 'selectedRiderReturntoUHEnd';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedDriver, true);
  this.messageFlags.set(selectedSeats, undefined);
  this.messageFlags.set(selectedDriverZipcode, undefined);
  this.messageFlags.set(selectedRiderZipcode, undefined);
  this.messageFlags.set(selectedDriverGoingtoUHStart, undefined);
  this.messageFlags.set(selectedDriverGoingtoUHEnd, undefined);
  this.messageFlags.set(selectedDriverReturntoUHStart, undefined);
  this.messageFlags.set(selectedDriverReturntoUHEnd, undefined);
  this.messageFlags.set(selectedRiderGoingtoUHStart, undefined);
  this.messageFlags.set(selectedRiderGoingtoUHEnd, undefined);
  this.messageFlags.set(selectedRiderReturntoUHStart, undefined);
  this.messageFlags.set(selectedRiderReturntoUHEnd, undefined);
});

Template.Filter_Page.helpers({
  profiles() {
    const allProfiles = Profiles.findAll();
    let profiles = null;
    const selectedD = Template.instance().messageFlags.get(selectedDriver);
    let selectedNumSeats = Template.instance().messageFlags.get(selectedSeats);
    const selectedRiderZip = Template.instance().messageFlags.get(selectedRiderZipcode);
    const selectedDriverZip = Template.instance().messageFlags.get(selectedDriverZipcode);
    const driverGoingtoUHS = Template.instance().messageFlags.get(selectedDriverGoingtoUHStart);
    const driverGoingtoUHE = Template.instance().messageFlags.get(selectedDriverGoingtoUHEnd);
    const driverReturntoUHS = Template.instance().messageFlags.get(selectedDriverReturntoUHStart);
    const driverReturntoUHE = Template.instance().messageFlags.get(selectedDriverReturntoUHEnd);

    if (selectedD === true) {
      profiles =  _.filter(allProfiles, function (profile) { if (profile.driver === true) { return profile; } });
      if (selectedNumSeats === undefined) {
        selectedNumSeats = 1;
      }
      if(selectedDriverZip !== '' && selectedDriverZip !== undefined) {
        const zipProfiles = _.filter(profiles,
            function (profile) { if (profile.zipcode === selectedDriverZip) { return profile; } });
        profiles = zipProfiles;
      }
      const seatProfiles = _.filter(profiles,
          function (profile) { if (profile.seats >= selectedNumSeats) { return profile; } });
      profiles = seatProfiles;
      console.log(driverGoingtoUHS);
      console.log(driverGoingtoUHE);
      console.log(driverReturntoUHS);
      console.log(driverReturntoUHE);
    } else {
      const riderGoingtoUHS = Template.instance().messageFlags.get(selectedRiderGoingtoUHStart);
      const riderGoingtoUHE = Template.instance().messageFlags.get(selectedRiderGoingtoUHEnd);
      const riderReturntoUHS = Template.instance().messageFlags.get(selectedRiderReturntoUHStart);
      const riderReturntoUHE = Template.instance().messageFlags.get(selectedRiderReturntoUHEnd);
      profiles = _.filter(allProfiles, function (profile) { if (profile.driver === false) { return profile; } });
      if(selectedRiderZip !== '' && selectedRiderZip !== undefined) {
        const zipProfiles = _.filter(profiles,
            function (profile) { if (profile.zipcode === selectedRiderZip) { return profile; } });
        profiles = zipProfiles;
      }
      console.log(riderGoingtoUHS);
      console.log(riderGoingtoUHE);
      console.log(riderReturntoUHS);
      console.log(riderReturntoUHE);
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
    instance.messageFlags.set(selectedDriverGoingtoUHStart, event.target.driverGoingtoUHStart.value);
    instance.messageFlags.set(selectedDriverGoingtoUHEnd, event.target.driverGoingtoUHEnd.value);
    instance.messageFlags.set(selectedDriverReturntoUHStart, event.target.driverReturntoUHStart.value);
    instance.messageFlags.set(selectedDriverReturntoUHEnd, event.target.driverReturntoUHEnd.value);
    instance.messageFlags.set(selectedRiderGoingtoUHStart, event.target.riderGoingtoUHStart.value);
    instance.messageFlags.set(selectedRiderGoingtoUHEnd, event.target.riderGoingtoUHEnd.value);
    instance.messageFlags.set(selectedRiderReturntoUHStart, event.target.riderReturntoUHStart.value);
    instance.messageFlags.set(selectedRiderReturntoUHEnd, event.target.riderReturntoUHEnd.value);
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

