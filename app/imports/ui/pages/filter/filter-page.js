import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedDriver = 'seletedDriverOrRider';
const selectedSeats = 'selectedSeats';
const selectedDriverZipcode = 'selectedDriverZipcode';
const selectedRiderZipcode = 'selectedRiderZipcode';
const selectedDriverGoingtoUHStart = 'selectedDriverGoingtoUHStart';
const selectedDriverGoingtoUHEnd = 'selectedDriverGoingtoUHEnd';
const selectedDriverReturntoUHStart = 'selectedDriverReturntoUHStart';
const selectedDriverReturntoUHEnd = 'selectedDriverReturntoUHEnd';
const selectedRiderGoingtoUHStart = 'selectedRiderGoingtoUHStart';
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
  this.messageFlags.set(selectedDriverGoingtoUHStart, -1);
  this.messageFlags.set(selectedDriverGoingtoUHEnd, 24);
  this.messageFlags.set(selectedDriverReturntoUHStart, -1);
  this.messageFlags.set(selectedDriverReturntoUHEnd, 24);
  this.messageFlags.set(selectedRiderGoingtoUHStart, -1);
  this.messageFlags.set(selectedRiderGoingtoUHEnd, 24);
  this.messageFlags.set(selectedRiderReturntoUHStart, -1);
  this.messageFlags.set(selectedRiderReturntoUHEnd, 24);
});

Template.Filter_Page.helpers({
  profiles() {
    const allProfiles = Profiles.findAll();
    let profiles = null;
    const selectedD = Template.instance().messageFlags.get(selectedDriver);
    let selectedNumSeats = Template.instance().messageFlags.get(selectedSeats);
    const selectedRiderZip = Template.instance().messageFlags.get(selectedRiderZipcode);
    const selectedDriverZip = Template.instance().messageFlags.get(selectedDriverZipcode);
    let driverGoingtoUHS = Template.instance().messageFlags.get(selectedDriverGoingtoUHStart);
    let driverGoingtoUHE = Template.instance().messageFlags.get(selectedDriverGoingtoUHEnd);
    let driverReturntoUHS = Template.instance().messageFlags.get(selectedDriverReturntoUHStart);
    let driverReturntoUHE = Template.instance().messageFlags.get(selectedDriverReturntoUHEnd);
    if (driverGoingtoUHS === '') {
      driverGoingtoUHS = -1;
    }
    if (driverGoingtoUHE === '') {
      driverGoingtoUHE = 24;
    }
    if (driverReturntoUHS === '') {
      driverReturntoUHS = -1;
    }
    if (driverReturntoUHE === '') {
      driverReturntoUHE = 24;
    }

    if (selectedD === true) {
      profiles = _.filter(allProfiles,
          function (profile) {
            let retProfile;
            if (profile.driver === true) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      if (selectedNumSeats === undefined) {
        selectedNumSeats = 1;
      }
      if (selectedDriverZip !== '' && selectedDriverZip !== undefined) {
        const zipProfiles = _.filter(profiles,
            function (profile) {
              let retProfile;
              if (profile.zipcode === selectedDriverZip) {
                retProfile = profile;
              } else {
                retProfile = undefined;
              }
              return retProfile;
            });
        profiles = zipProfiles;
      }
      const seatProfiles = _.filter(profiles,
          function (profile) {
            let retProfile;
            if (profile.seats >= selectedNumSeats) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      profiles = seatProfiles;
      const startProfiles = _.filter(profiles,
          function (profile) {
            let retProfile;
            if (profile.goingTime <= driverGoingtoUHE && profile.goingTime >= driverGoingtoUHS) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      profiles = startProfiles;
      const endProfiles = _.filter(profiles,
          function (profile) {
            let retProfile;
            if (profile.returnTime <= driverReturntoUHE && profile.returnTime >= driverReturntoUHS) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      profiles = endProfiles;
      // console.log(driverGoingtoUHS);
      // console.log(driverGoingtoUHE);
      // console.log(driverReturntoUHS);
      // console.log(driverReturntoUHE);
    } else {
      let riderGoingtoUHS = Template.instance().messageFlags.get(selectedRiderGoingtoUHStart);
      let riderGoingtoUHE = Template.instance().messageFlags.get(selectedRiderGoingtoUHEnd);
      let riderReturntoUHS = Template.instance().messageFlags.get(selectedRiderReturntoUHStart);
      let riderReturntoUHE = Template.instance().messageFlags.get(selectedRiderReturntoUHEnd);
      if (riderGoingtoUHS === '') {
        riderGoingtoUHS = -1;
      }
      if (riderGoingtoUHE === '') {
        riderGoingtoUHE = 24;
      }
      if (riderReturntoUHS === '') {
        riderReturntoUHS = -1;
      }
      if (riderReturntoUHE === '') {
        riderReturntoUHE = 24;
      }
      profiles = _.filter(allProfiles,
          function (profile) {
            let retProfile;
            if (profile.driver === false) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      if (selectedRiderZip !== '' && selectedRiderZip !== undefined) {
        const zipProfiles = _.filter(profiles,
            function (profile) {
              let retProfile;
              if (profile.zipcode === selectedRiderZip) {
                retProfile = profile;
              } else {
                retProfile = undefined;
              }
              return retProfile;
            });
        profiles = zipProfiles;
      }
      const startProfiles = _.filter(profiles,
          function (profile) {
            let retProfile;
            if (profile.goingTime <= riderGoingtoUHE && profile.goingTime >= riderGoingtoUHS) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      profiles = startProfiles;
      const endProfiles = _.filter(profiles,
          function (profile) {
            let retProfile;
            if (profile.returnTime <= riderReturntoUHE && profile.returnTime >= riderReturntoUHS) {
              retProfile = profile;
            } else {
              retProfile = undefined;
            }
            return retProfile;
          });
      profiles = endProfiles;
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
    instance.messageFlags.set(selectedDriver, true);
  },
  'click .choose-rider'(event, instance) {
    event.preventDefault();
    instance.messageFlags.set(selectedDriver, false);
  },
});

