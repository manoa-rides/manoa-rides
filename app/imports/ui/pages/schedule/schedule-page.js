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
  times() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [{ label: ' 12:00 AM', value: '0', selected: false },
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


Template.Schedule_Page.events({
  'submit .schedule-data-form'(event, instance) {
    event.preventDefault();
  },
});
