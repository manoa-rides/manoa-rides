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
  hours() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [
      { label: '12', value: '0', selected: false },
      { label: '1', value: '1', selected: false },
      { label: '2', value: '2', selected: false },
      { label: '3', value: '3', selected: false },
      { label: '4', value: '4', selected: false },
      { label: '5', value: '5', selected: false },
      { label: '6', value: '6', selected: false },
      { label: '7', value: '7', selected: false },
      { label: '8', value: '8', selected: false },
      { label: '9', value: '9', selected: false },
      { label: '10', value: '10', selected: false },
      { label: '11', value: '11', selected: false }];
  },
  minutes() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [
      { label: '00', value: '0', selected: false },
      { label: '15', value: '1', selected: false },
      { label: '30', value: '2', selected: false },
      { label: '45', value: '3', selected: false }];
  },
  time() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [
      { label: 'AM', value: '0', selected: false },
      { label: 'PM', value: '1', selected: false }];
  },
});


Template.Schedule_Page.events({
  'submit .schedule-data-form'(event, instance) {
    event.preventDefault();
  },
});
