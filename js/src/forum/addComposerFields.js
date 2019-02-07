import {extend} from 'flarum/extend';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import FieldsEditor from './components/FieldsEditor';

export default function () {
    DiscussionComposer.prototype.huydeerpetsMasonAnswers = [];

    extend(DiscussionComposer.prototype, 'headerItems', function (items) {
        items.add('huydeerpets-mason-fields', FieldsEditor.component({
            answers: this.huydeerpetsMasonAnswers,
            onchange: answers => {
                this.huydeerpetsMasonAnswers = answers;
            },
            ontagchange: tags => {
                this.tags = tags;
            },
        }));
    });

    extend(DiscussionComposer.prototype, 'data', function (data) {
        data.relationships = data.relationships || {};
        data.relationships.huydeerpetsMasonAnswers = this.huydeerpetsMasonAnswers;
    });
}
