import app from 'flarum/app';
import Answer from './../lib/models/Answer';
import Field from './../lib/models/Field';
import addMasonFieldsPane from './addMasonFieldsPane';
import addPermissions from './addPermissions';

app.initializers.add('huydeerpets-mason', app => {
    app.store.models['huydeerpets-mason-field'] = Field;
    app.store.models['huydeerpets-mason-answer'] = Answer;

    addMasonFieldsPane();
    addPermissions();
});
