import app from 'flarum/app';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';
import Answer from './../lib/models/Answer';
import Field from './../lib/models/Field';
import addComposerFields from './addComposerFields';
import addFieldUpdateControl from './addFieldUpdateControl';
import addFieldsOnDiscussionHero from './addFieldsOnDiscussionHero';
import addFieldsOnDiscussionPost from './addFieldsOnDiscussionPost';
import patchModelIdentifier from "./patchModelIdentifier";

app.initializers.add('huydeerpets-mason', app => {
    app.store.models['huydeerpets-mason-field'] = Field;
    app.store.models['huydeerpets-mason-answer'] = Answer;

    Discussion.prototype.huydeerpetsMasonAnswers = Model.hasMany('huydeerpetsMasonAnswers');
    Discussion.prototype.canUpdateHuydeerpetsMasonAnswers = Model.attribute('canUpdateHuydeerpetsMasonAnswers');

    addComposerFields();
    addFieldsOnDiscussionHero();
    addFieldsOnDiscussionPost();
    addFieldUpdateControl();
    patchModelIdentifier();
});
