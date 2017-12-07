import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

Template.Directory_Profile.onCreated(function onCreated() {
});

Template.Directory_Profile.helpers({
  formatTime(profile, going) {
    let retString = '';
    if (going === 'going') {
      if (profile.goingTime === 0) {
        retString = '12:00 am';
      } else if (profile.goingTime === 1) {
        retString = '1:00 am';
      } else if (profile.goingTime === 2) {
        retString = '2:00 am';
      } else if (profile.goingTime === 3) {
        retString = '3:00 am';
      } else if (profile.goingTime === 4) {
        retString = '4:00 am';
      } else if (profile.goingTime === 5) {
        retString = '5:00 am';
      } else if (profile.goingTime === 6) {
        retString = '6:00 am';
      } else if (profile.goingTime === 7) {
        retString = '7:00 am';
      } else if (profile.goingTime === 8) {
        retString = '8:00 am';
      } else if (profile.goingTime === 9) {
        retString = '9:00 am';
      } else if (profile.goingTime === 10) {
        retString = '10:00 am';
      } else if (profile.goingTime === 11) {
        retString = '11:00 am';
      } else if (profile.goingTime === 12) {
        retString = '12:00 am';
      } else if (profile.goingTime === 13) {
        retString = '1:00 pm';
      } else if (profile.goingTime === 14) {
        retString = '2:00 pm';
      } else if (profile.goingTime === 15) {
        retString = '3:00 pm';
      } else if (profile.goingTime === 16) {
        retString = '4:00 pm';
      } else if (profile.goingTime === 17) {
        retString = '5:00 pm';
      } else if (profile.goingTime === 18) {
        retString = '6:00 pm';
      } else if (profile.goingTime === 19) {
        retString = '7:00 pm';
      } else if (profile.goingTime === 20) {
        retString = '8:00 pm';
      } else if (profile.goingTime === 21) {
        retString = '9:00 pm';
      } else if (profile.goingTime === 22) {
        retString = '10:00 pm';
      } else if (profile.goingTime === 23) {
        retString = '11:00 pm';
      }
    } else {
      if (profile.returnTime === 0) {
        retString = '12:00 am';
      } else if (profile.returnTime === 1) {
        retString = '1:00 am';
      } else if (profile.returnTime === 2) {
        retString = '2:00 am';
      } else if (profile.returnTime === 3) {
        retString = '3:00 am';
      } else if (profile.returnTime === 4) {
        retString = '4:00 am';
      } else if (profile.returnTime === 5) {
        retString = '5:00 am';
      } else if (profile.returnTime === 6) {
        retString = '6:00 am';
      } else if (profile.returnTime === 7) {
        retString = '7:00 am';
      } else if (profile.returnTime === 8) {
        retString = '8:00 am';
      } else if (profile.returnTime === 9) {
        retString = '9:00 am';
      } else if (profile.returnTime === 10) {
        retString = '10:00 am';
      } else if (profile.returnTime === 11) {
        retString = '11:00 am';
      } else if (profile.returnTime === 12) {
        retString = '12:00 am';
      } else if (profile.returnTime === 13) {
        retString = '1:00 pm';
      } else if (profile.returnTime === 14) {
        retString = '2:00 pm';
      } else if (profile.returnTime === 15) {
        retString = '3:00 pm';
      } else if (profile.returnTime === 16) {
        retString = '4:00 pm';
      } else if (profile.returnTime === 17) {
        retString = '5:00 pm';
      } else if (profile.returnTime === 18) {
        retString = '6:00 pm';
      } else if (profile.returnTime === 19) {
        retString = '7:00 pm';
      } else if (profile.returnTime === 20) {
        retString = '8:00 pm';
      } else if (profile.returnTime === 21) {
        retString = '9:00 pm';
      } else if (profile.returnTime === 22) {
        retString = '10:00 pm';
      } else if (profile.returnTime === 23) {
        retString = '11:00 pm';
      }
    }


    return retString;
    // if (profile.goingTime === 0) {
    //   return '12:00AM';
    // }
  // [{ label: ' 12:00 AM', value: '0', selected: false },
  //     { label: '1:00 AM', value: '1', selected: false },
  //     { label: '2:00 AM', value: '2', selected: false },
  //     { label: '3:00 AM', value: '3', selected: false },
  //     { label: '4:00 AM', value: '4', selected: false },
  //     { label: '5:00 AM', value: '5', selected: false },
  //     { label: '6:00 AM', value: '6', selected: false },
  //     { label: '7:00 AM', value: '7', selected: false },
  //     { label: '8:00 AM', value: '8', selected: false },
  //     { label: '9:00 AM', value: '9', selected: false },
  //     { label: '10:00 AM', value: '10', selected: false },
  //     { label: '11:00 AM', value: '11', selected: false },
  //     { label: '12:00 PM', value: '12', selected: false },
  //     { label: '1:00 PM', value: '13', selected: false },
  //     { label: '2:00 PM', value: '14', selected: false },
  //     { label: '3:00 PM', value: '15', selected: false },
  //     { label: '4:00 PM', value: '16', selected: false },
  //     { label: '5:00 PM', value: '17', selected: false },
  //     { label: '6:00 PM', value: '18', selected: false },
  //     { label: '7:00 PM', value: '19', selected: false },
  //     { label: '8:00 PM', value: '20', selected: false },
  //     { label: '9:00 PM', value: '21', selected: false },
  //     { label: '10:00 PM', value: '22', selected: false },
  //     { label: '11:00 PM', value: '23', selected: false }];
  },
});

Template.Directory_Profile.events({
});

