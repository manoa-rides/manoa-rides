import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const driverButtonClicked = 'driverButtonClicked';
const riderButtonClicked = 'riderButtonClicked';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(driverButtonClicked, true);
  this.messageFlags.set(riderButtonClicked, false);
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Page.helpers({
  driverButtonClicked() {
    return Template.instance().messageFlags.get(driverButtonClicked);
  },
  riderButtonClicked() {
    return Template.instance().messageFlags.get(riderButtonClicked);
  },
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
  interests() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
            function makeInterestObject(interest) {
              return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
            });
  },
  numbers() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    return profile && [{ label: '1', selected: false }, { label: '2', selected: false }, { label: '3',
      selected: false }, { label: '4', selected: false }, { label: '5', selected: false },
      { label: '6', selected: false }, { label: '7', selected: false }, { label: '8+', selected: false }];
  },
});


Template.Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const picture = event.target.Picture.value;
    const phone = event.target.Phone.value;
    const zipcode = event.target.ZipCode.value;
    const facebook = event.target.Facebook.value;
    const instagram = event.target.Instagram.value;
    const snapchat = event.target.Snapchat.value;
    const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const interests = _.map(selectedInterests, (option) => option.value);
    const bio = event.target.Bio.value;
    const driver = instance.messageFlags.get(driverButtonClicked);
    const car = event.target.Car.value;
    const seats = event.target.Seats.value;
    const owned = event.target.Owned.value;
    const accidents = event.target.Accidents.value;
    const username = FlowRouter.getParam('username'); // schema requires username.

    const updatedProfileData = { firstName, lastName, picture, phone, zipcode, facebook, instagram, snapchat, interests, bio, driver, car, owned, seats, accidents, username };

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
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'click #driver_button'(event, instance) {
    event.preventDefault();
    instance.messageFlags.set(driverButtonClicked, true);
    instance.messageFlags.set(riderButtonClicked, false);
  },
  'click #rider_button'(event, instance) {
    event.preventDefault();
    instance.messageFlags.set(driverButtonClicked, false);
    instance.messageFlags.set(riderButtonClicked, true);
  },
});

