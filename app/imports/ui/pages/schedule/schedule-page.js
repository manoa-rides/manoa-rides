import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Schedule_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Schedule_Page');
});

Template.Schedule_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  MSH() {
    const rideTimes = Profiles.findDoc(FlowRouter.getParam('username')).rideTimes;
    return (rideTimes[0][0] % 1200) / 100;
  },
  hours() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [
      { label: '12', value: 0, selected: false },
      { label: '1', value: 1, selected: false },
      { label: '2', value: 2, selected: false },
      { label: '3', value: 3, selected: false },
      { label: '4', value: 4, selected: false },
      { label: '5', value: 5, selected: false },
      { label: '6', value: 6, selected: false },
      { label: '7', value: 7, selected: false },
      { label: '8', value: 8, selected: false },
      { label: '9', value: 9, selected: false },
      { label: '10', value: 10, selected: false },
      { label: '11', value: 11, selected: false }];
  },
  minutes() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [
      { label: '00', value: 0, selected: false },
      { label: '15', value: 25, selected: false },
      { label: '30', value: 50, selected: false },
      { label: '45', value: 75, selected: false }];
  },
  time() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [
      { label: 'AM', value: 1, selected: false },
      { label: 'PM', value: 2, selected: false }];
  },
});


Template.Schedule_Page.events({
  'submit .schedule-data-form'(event, instance) {
    event.preventDefault();
    // Keep Profile Information the same
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const firstName = profile.firstName;
    const lastName = profile.lastName;
    const picture = profile.picture;
    const phone = profile.phone;
    const zipcode = profile.zipcode;
    const facebook = profile.facebook;
    const instagram = profile.instagram;
    const snapchat = profile.snapchat;
    const interests = profile.interests;
    const bio = profile.bio;
    const driver = profile.driver;
    const car = profile.car;
    const seats = profile.seats;
    const owned = profile.owned;
    const username = profile.username;

    // Parse schedule changes
    const rideTimes = [];
    const mondayStart = parseInt((event.target.MSH.value % 12) * 100, 10) + parseInt(event.target.MSM.value, 10) + parseInt((event.target.MSA.value - 1) * 1200, 10);
    const mondayEnd = parseInt((event.target.MEH.value % 12) * 100, 10) + parseInt(event.target.MEM.value, 10) + parseInt((event.target.MEA.value - 1) * 1200, 10);
    const tuesdayStart = parseInt((event.target.TSH.value % 12) * 100, 10) + parseInt(event.target.TSM.value, 10) + parseInt((event.target.TSA.value - 1) * 1200, 10);
    const tuesdayEnd = parseInt((event.target.TEH.value % 12) * 100, 10) + parseInt(event.target.TEM.value, 10) + parseInt((event.target.TEA.value - 1) * 1200, 10);
    const wednesdayStart = parseInt((event.target.WSH.value % 12) * 100, 10) + parseInt(event.target.WSM.value, 10) + parseInt((event.target.WSA.value - 1) * 1200, 10);
    const wednesdayEnd = parseInt((event.target.WEH.value % 12) * 100, 10) + parseInt(event.target.WEM.value, 10) + parseInt((event.target.WEA.value - 1) * 1200, 10);
    const thursdayStart = parseInt((event.target.RSH.value % 12) * 100, 10) + parseInt(event.target.RSM.value, 10) + parseInt((event.target.RSA.value - 1) * 1200, 10);
    const thursdayEnd = parseInt((event.target.REH.value % 12) * 100, 10) + parseInt(event.target.REM.value, 10) + parseInt((event.target.REA.value - 1) * 1200, 10);
    const fridayStart = parseInt((event.target.FSH.value % 12) * 100, 10) + parseInt(event.target.FSM.value, 10) + parseInt((event.target.FSA.value - 1) * 1200, 10);
    const fridayEnd = parseInt((event.target.FEH.value % 12) * 100, 10) + parseInt(event.target.FEM.value, 10) + parseInt((event.target.FEA.value - 1) * 1200, 10);
    rideTimes.push(mondayStart, mondayEnd);
    rideTimes.push(tuesdayStart, tuesdayEnd);
    rideTimes.push(wednesdayStart, wednesdayEnd);
    rideTimes.push(thursdayStart, thursdayEnd);
    rideTimes.push(fridayStart, fridayEnd);
    console.log(rideTimes);

    const updatedProfileData = { firstName, lastName, picture, phone, zipcode, facebook, instagram, snapchat, interests, bio, driver, car, owned, seats, username, rideTimes };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      console.log(Profiles.findDoc(FlowRouter.getParam('username')));
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
