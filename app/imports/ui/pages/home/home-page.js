import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Home_Page');
});

Template.Home_Page.helpers({
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
    return ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
      '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
  },
  startTime(day) {
    const rideTimes = Profiles.findDoc(FlowRouter.getParam('username')).rideTimes;
    const time = rideTimes[day * 2];
    const hour = Math.trunc(time / 100) % 12 === 0 ? '12' : ((Math.trunc(time / 100)) % 12).toString(10);
    const minute = ((time % 100) / 25) === 0 ? '00' : (((time % 100) / 25) * 15).toString(10);
    const apm = time < 1200 ? 'AM' : 'PM';
    return `${hour}:${minute} ${apm}`;
  },
  endTime(day) {
    const rideTimes = Profiles.findDoc(FlowRouter.getParam('username')).rideTimes;
    const time = rideTimes[(day * 2) + 1];
    const hour = Math.trunc(time / 100) % 12 === 0 ? '12' : ((Math.trunc(time / 100)) % 12).toString(10);
    const minute = ((time % 100) / 25) === 0 ? '00' : (((time % 100) / 25) * 15).toString(10);
    const apm = time < 1200 ? 'AM' : 'PM';
    return `${hour}:${minute} ${apm}`;
  },
});


Template.Home_Page.events({
});
