<?php

namespace Huydeerpets\Mason;

use Huydeerpets\Mason\Extend\DiscussionAttributes;
use Huydeerpets\Mason\Extend\ForumAttributes;
use Huydeerpets\Mason\Extend\Policies;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Routes('api'))
        // Fields
        ->post('/huydeerpets/mason/fields/order', 'huydeerpets.mason.api.fields.order', Api\Controllers\FieldOrderController::class)
        ->get('/huydeerpets/mason/fields', 'huydeerpets.mason.api.fields.index', Api\Controllers\FieldIndexController::class)
        ->post('/huydeerpets/mason/fields', 'huydeerpets.mason.api.fields.store', Api\Controllers\FieldStoreController::class)
        ->patch('/huydeerpets/mason/fields/{id:[0-9]+}', 'huydeerpets.mason.api.fields.update', Api\Controllers\FieldUpdateController::class)
        ->delete('/huydeerpets/mason/fields/{id:[0-9]+}', 'huydeerpets.mason.api.fields.delete', Api\Controllers\FieldDeleteController::class)

        // Answers
        ->post('/huydeerpets/mason/fields/{id:[0-9]+}/answers/order', 'huydeerpets.mason.api.answers.order', Api\Controllers\AnswerOrderController::class)
        ->post('/huydeerpets/mason/fields/{id:[0-9]+}/answers', 'huydeerpets.mason.api.answers.create', Api\Controllers\AnswerStoreController::class)
        ->patch('/huydeerpets/mason/answers/{id:[0-9]+}', 'huydeerpets.mason.api.answers.update', Api\Controllers\AnswerUpdateController::class)
        ->delete('/huydeerpets/mason/answers/{id:[0-9]+}', 'huydeerpets.mason.api.answers.delete', Api\Controllers\AnswerDeleteController::class),
    (new Extend\Locales(__DIR__.'/resources/locale')),
    new ForumAttributes,
    new DiscussionAttributes,
    new Policies,
];
