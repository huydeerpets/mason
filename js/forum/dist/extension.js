'use strict';

System.register('flagrow/mason/addComposerFields', ['flarum/extend', 'flarum/app', 'flarum/components/DiscussionComposer', 'flagrow/mason/components/DiscussionFields'], function (_export, _context) {
    "use strict";

    var extend, app, DiscussionComposer, DiscussionFields;

    _export('default', function () {
        DiscussionComposer.prototype.flagrowMasonAnswers = [];

        extend(DiscussionComposer.prototype, 'headerItems', function (items) {
            var _this = this;

            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-mason-fields', DiscussionFields.component({
                answers: this.flagrowMasonAnswers,
                onchange: function onchange(answers) {
                    _this.flagrowMasonAnswers = answers;
                }
            }));
        });

        extend(DiscussionComposer.prototype, 'data', function (data) {
            data.relationships = data.relationships || {};
            data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers;
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer.default;
        }, function (_flagrowMasonComponentsDiscussionFields) {
            DiscussionFields = _flagrowMasonComponentsDiscussionFields.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/addFieldUpdateControl', ['flarum/extend', 'flarum/utils/DiscussionControls', 'flarum/components/Button', 'flagrow/mason/components/DiscussionFieldsModal'], function (_export, _context) {
    "use strict";

    var extend, DiscussionControls, Button, DiscussionFieldsModal;

    _export('default', function () {
        extend(DiscussionControls, 'moderationControls', function (items, discussion) {
            if (discussion.canUpdateFlagrowMasonAnswers()) {
                items.add('flagrow-mason-update-answers', Button.component({
                    children: app.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
                    icon: 'tag',
                    onclick: function onclick() {
                        return app.modal.show(new DiscussionFieldsModal({ discussion: discussion }));
                    }
                }));
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumUtilsDiscussionControls) {
            DiscussionControls = _flarumUtilsDiscussionControls.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasonComponentsDiscussionFieldsModal) {
            DiscussionFieldsModal = _flagrowMasonComponentsDiscussionFieldsModal.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/components/DiscussionFields', ['flarum/app', 'flarum/helpers/icon', 'flarum/Component'], function (_export, _context) {
    "use strict";

    var app, icon, Component, DiscussionFields;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }],
        execute: function () {
            DiscussionFields = function (_Component) {
                babelHelpers.inherits(DiscussionFields, _Component);

                function DiscussionFields() {
                    babelHelpers.classCallCheck(this, DiscussionFields);
                    return babelHelpers.possibleConstructorReturn(this, (DiscussionFields.__proto__ || Object.getPrototypeOf(DiscussionFields)).apply(this, arguments));
                }

                babelHelpers.createClass(DiscussionFields, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        this.fields = app.store.all('flagrow-mason-field');

                        // Index to quickly do a reverse lookup from answer to field
                        this.answerToFieldIndex = [];
                        this.fields.forEach(function (field) {
                            field.suggested_answers().forEach(function (answer) {
                                _this2.answerToFieldIndex[answer.id()] = field.id();
                            });
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this3 = this;

                        return m('ul', [this.fields.map(function (field) {
                            var selectedAnswerIdsForThisField = [];

                            field.suggested_answers().forEach(function (answer) {
                                if (_this3.props.answers.findIndex(function (a) {
                                    return a.id() === answer.id();
                                }) !== -1) {
                                    selectedAnswerIdsForThisField.push(answer.id());
                                }
                            });

                            return m('li', m('.FormGroup', [m('label', [field.icon() ? [icon(field.icon()), ' '] : null, field.name(), field.required() ? ' *' : null]), m('select', {
                                multiple: field.multiple(),
                                onchange: function onchange(event) {
                                    var ids = [];

                                    var _iteratorNormalCompletion = true;
                                    var _didIteratorError = false;
                                    var _iteratorError = undefined;

                                    try {
                                        for (var _iterator = event.target.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                            var option = _step.value;

                                            if (option.selected && option.value !== 'none') {
                                                ids.push(option.value);
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }
                                        } finally {
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }

                                    console.log(ids);

                                    _this3.updateSelection(field, ids);
                                }
                            }, [field.multiple() ? null : m('option', {
                                value: 'none',
                                selected: selectedAnswerIdsForThisField.length === 0,
                                disabled: field.required(),
                                hidden: field.required()
                            }, app.translator.trans('flagrow-mason.forum.answers.' + (field.required() ? 'choose-option' : 'no-option-selected'))), field.suggested_answers().map(function (answer) {
                                return m('option', {
                                    value: answer.id(),
                                    selected: selectedAnswerIdsForThisField.indexOf(answer.id()) !== -1
                                }, answer.content());
                            })]), field.description() ? m('span.helpText', field.description()) : null]));
                        })]);
                    }
                }, {
                    key: 'updateSelection',
                    value: function updateSelection(field, answerIds) {
                        var _this4 = this;

                        // Keep only answers to other fields
                        var answers = this.props.answers.filter(function (answer) {
                            return _this4.answerToFieldIndex[answer.id()] !== field.id();
                        });

                        answerIds.forEach(function (id) {
                            answers.push(app.store.getById('flagrow-mason-answer', id));
                        });

                        this.props.onchange(answers);
                    }
                }]);
                return DiscussionFields;
            }(Component);

            _export('default', DiscussionFields);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/DiscussionFieldsModal', ['flarum/app', 'flarum/components/Modal', 'flarum/components/Button', 'flarum/components/DiscussionPage', 'flagrow/mason/components/DiscussionFields'], function (_export, _context) {
    "use strict";

    var app, Modal, Button, DiscussionPage, DiscussionFields, DiscussionFieldsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flagrowMasonComponentsDiscussionFields) {
            DiscussionFields = _flagrowMasonComponentsDiscussionFields.default;
        }],
        execute: function () {
            DiscussionFieldsModal = function (_Modal) {
                babelHelpers.inherits(DiscussionFieldsModal, _Modal);

                function DiscussionFieldsModal() {
                    babelHelpers.classCallCheck(this, DiscussionFieldsModal);
                    return babelHelpers.possibleConstructorReturn(this, (DiscussionFieldsModal.__proto__ || Object.getPrototypeOf(DiscussionFieldsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(DiscussionFieldsModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(DiscussionFieldsModal.prototype.__proto__ || Object.getPrototypeOf(DiscussionFieldsModal.prototype), 'init', this).call(this);

                        this.answers = this.props.discussion.flagrowMasonAnswers();
                        this.dirty = false;
                        this.processing = false;
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-mason.forum.answers-modal.edit-title', {
                            title: m('em', this.props.discussion.title())
                        });
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return [m('.Modal-body', DiscussionFields.component({
                            answers: this.answers,
                            onchange: this.answersChanged.bind(this)
                        })), m('.Modal-footer', [Button.component({
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-mason.forum.answers-modal.save'),
                            loading: this.processing,
                            disabled: !this.dirty,
                            onclick: this.saveAnswers.bind(this)
                        })])];
                    }
                }, {
                    key: 'answersChanged',
                    value: function answersChanged(answers) {
                        this.answers = answers;
                        this.dirty = true;
                    }
                }, {
                    key: 'saveAnswers',
                    value: function saveAnswers() {
                        var _this2 = this;

                        this.processing = true;

                        this.props.discussion.save({
                            relationships: {
                                flagrowMasonAnswers: this.answers
                            }
                        }).then(function () {
                            if (app.current instanceof DiscussionPage) {
                                app.current.stream.update();
                            }

                            _this2.processing = false;
                            app.modal.close();
                            m.redraw();
                        });
                    }
                }]);
                return DiscussionFieldsModal;
            }(Modal);

            _export('default', DiscussionFieldsModal);
        }
    };
});;
'use strict';

System.register('flagrow/mason/main', ['flarum/app', 'flarum/Model', 'flarum/models/Discussion', 'flagrow/mason/models/Answer', 'flagrow/mason/models/Field', 'flagrow/mason/addComposerFields', 'flagrow/mason/addFieldUpdateControl'], function (_export, _context) {
    "use strict";

    var app, Model, Discussion, Answer, Field, addComposerFields, addFieldUpdateControl;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flagrowMasonModelsAnswer) {
            Answer = _flagrowMasonModelsAnswer.default;
        }, function (_flagrowMasonModelsField) {
            Field = _flagrowMasonModelsField.default;
        }, function (_flagrowMasonAddComposerFields) {
            addComposerFields = _flagrowMasonAddComposerFields.default;
        }, function (_flagrowMasonAddFieldUpdateControl) {
            addFieldUpdateControl = _flagrowMasonAddFieldUpdateControl.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-masquerade', function (app) {
                app.store.models['flagrow-mason-field'] = Field;
                app.store.models['flagrow-mason-answer'] = Answer;

                Discussion.prototype.flagrowMasonAnswers = Model.hasMany('flagrowMasonAnswers');
                Discussion.prototype.canUpdateFlagrowMasonAnswers = Model.attribute('canUpdateFlagrowMasonAnswers');

                addComposerFields();
                addFieldUpdateControl();
            });
        }
    };
});;
'use strict';

System.register('flagrow/mason/models/Answer', ['flarum/app', 'flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var app, Model, mixin, Answer;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Answer = function (_mixin) {
                babelHelpers.inherits(Answer, _mixin);

                function Answer() {
                    babelHelpers.classCallCheck(this, Answer);
                    return babelHelpers.possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).apply(this, arguments));
                }

                babelHelpers.createClass(Answer, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return app.forum.attribute('apiUrl') + '/flagrow/mason/answers' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Answer;
            }(mixin(Model, {
                content: Model.attribute('content'),
                is_suggested: Model.attribute('is_suggested'),
                sort: Model.attribute('sort'),
                field: Model.hasOne('field'),
                userId: Model.attribute('user_id')
            }));

            _export('default', Answer);
        }
    };
});;
'use strict';

System.register('flagrow/mason/models/Field', ['flarum/app', 'flarum/Model', 'flarum/utils/mixin', 'flarum/utils/computed'], function (_export, _context) {
    "use strict";

    var app, Model, mixin, computed, Field;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }, function (_flarumUtilsComputed) {
            computed = _flarumUtilsComputed.default;
        }],
        execute: function () {
            Field = function (_mixin) {
                babelHelpers.inherits(Field, _mixin);

                function Field() {
                    babelHelpers.classCallCheck(this, Field);
                    return babelHelpers.possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
                }

                babelHelpers.createClass(Field, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return app.forum.attribute('apiUrl') + '/flagrow/mason/fields' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Field;
            }(mixin(Model, {
                name: Model.attribute('name'),
                description: Model.attribute('description'),
                min_answers_count: Model.attribute('min_answers_count'),
                max_answers_count: Model.attribute('max_answers_count'),
                user_values_allowed: Model.attribute('user_values_allowed'),
                validation: Model.attribute('validation'),
                icon: Model.attribute('icon'),
                sort: Model.attribute('sort'),
                deleted_at: Model.attribute('deleted_at', Model.transformDate),
                all_answers: Model.hasMany('all_answers'),
                suggested_answers: Model.hasMany('suggested_answers'),
                required: computed('min_answers_count', function (min_answers_count) {
                    return min_answers_count > 0;
                }),
                multiple: computed('max_answers_count', function (max_answers_count) {
                    return max_answers_count > 1;
                })
            }));

            _export('default', Field);
        }
    };
});