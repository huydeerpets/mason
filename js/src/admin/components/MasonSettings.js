import app from 'flarum/app';
import saveSettings from "flarum/utils/saveSettings";
import Component from 'flarum/Component';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';

export default class MasonSettings extends Component {
    init() {
        this.fieldsSectionTitle = m.prop(app.data.settings['huydeerpets.mason.fields-section-title'] || '');
        this.columnCount = m.prop(app.data.settings['huydeerpets.mason.column-count'] || 1);
        this.labelsAsPlaceholders = m.prop(app.data.settings['huydeerpets.mason.labels-as-placeholders'] > 0);
        this.fieldsInHero = m.prop(app.data.settings['huydeerpets.mason.fields-in-hero'] > 0);
        this.hideEmptyFieldsSection = m.prop(app.data.settings['huydeerpets.mason.hide-empty-fields-section'] > 0);
        this.tagsAsFields = m.prop(app.data.settings['huydeerpets.mason.tags-as-fields'] > 0);
        this.tagsFieldName = m.prop(app.data.settings['huydeerpets.mason.tags-field-name'] || '');

        this.columnOptions = {};

        for (let i = 1; i <= 3; i++) {
            this.columnOptions[i] = app.translator.trans('huydeerpets-mason.admin.settings.n-columns', {count: i});
        }
    }

    view() {
        return m('.Mason-Container', [
            m('.Form-group', [
                m('label', app.translator.trans('huydeerpets-mason.admin.settings.fields-section-title')),
                m('input.FormControl', {
                    value: this.fieldsSectionTitle(),
                    placeholder: app.translator.trans('huydeerpets-mason.admin.settings.fields-section-title-placeholder'),
                    onchange: m.withAttr('value', this.updateSetting.bind(this, this.fieldsSectionTitle, 'huydeerpets.mason.fields-section-title')),
                }),
                m('.helpText', app.translator.trans('huydeerpets-mason.admin.settings.fields-section-title-help')),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('huydeerpets-mason.admin.settings.column-count')),
                Select.component({
                    options: this.columnOptions,
                    value: this.columnCount(),
                    onchange: this.updateSetting.bind(this, this.columnCount, 'huydeerpets.mason.column-count'),
                }),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.labelsAsPlaceholders(),
                    onchange: this.updateSetting.bind(this, this.labelsAsPlaceholders, 'huydeerpets.mason.labels-as-placeholders'),
                    children: app.translator.trans('huydeerpets-mason.admin.settings.labels-as-placeholders'),
                })),
                m('.helpText', app.translator.trans('huydeerpets-mason.admin.settings.labels-as-placeholders-help')),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.fieldsInHero(),
                    onchange: this.updateSetting.bind(this, this.fieldsInHero, 'huydeerpets.mason.fields-in-hero'),
                    children: app.translator.trans('huydeerpets-mason.admin.settings.fields-in-hero'),
                })),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.hideEmptyFieldsSection(),
                    onchange: this.updateSetting.bind(this, this.hideEmptyFieldsSection, 'huydeerpets.mason.hide-empty-fields-section'),
                    children: app.translator.trans('huydeerpets-mason.admin.settings.hide-empty-fields-section'),
                })),
                m('.helpText', app.translator.trans('huydeerpets-mason.admin.settings.hide-empty-fields-section-help')),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.tagsAsFields(),
                    onchange: this.updateSetting.bind(this, this.tagsAsFields, 'huydeerpets.mason.tags-as-fields'),
                    children: app.translator.trans('huydeerpets-mason.admin.settings.tags-as-field'),
                })),
                m('.helpText', app.translator.trans('huydeerpets-mason.admin.settings.tags-as-field-help')),
            ]),
            (this.tagsAsFields() ? m('.Form-group', [
                m('label', app.translator.trans('huydeerpets-mason.admin.settings.tags-field-name')),
                m('input.FormControl', {
                    value: this.tagsFieldName(),
                    placeholder: app.translator.trans('huydeerpets-mason.admin.settings.tags-field-name-placeholder'),
                    onchange: m.withAttr('value', this.updateSetting.bind(this, this.tagsFieldName, 'huydeerpets.mason.tags-field-name')),
                }),
            ]) : null),
        ]);
    }

    /**
     * Updates setting in database.
     * @param prop
     * @param setting
     * @param value
     */
    updateSetting(prop, setting, value) {
        saveSettings({
            [setting]: value
        });

        prop(value)
    }
}
