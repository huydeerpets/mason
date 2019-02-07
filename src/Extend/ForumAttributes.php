<?php

namespace Huydeerpets\Mason\Extend;

use Huydeerpets\Mason\Api\Serializers\FieldSerializer;
use Huydeerpets\Mason\Repositories\FieldRepository;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Tobscure\JsonApi\Collection;
use Tobscure\JsonApi\Relationship;

class ForumAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(GetApiRelationship::class, [$this, 'serializer']);
        $container['events']->listen(WillGetData::class, [$this, 'includes']);
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function serializer(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'huydeerpetsMasonFields')) {
            /**
             * @var $fields FieldRepository
             */
            $fields = app(FieldRepository::class);

            /**
             * @var $serializer FieldSerializer
             */
            $serializer = app(FieldSerializer::class);

            return new Relationship(new Collection($fields->all(), $serializer));
        }
    }

    public function includes(WillGetData $event)
    {
        if ($event->controller->serializer === ForumSerializer::class) {
            $event->addInclude('huydeerpetsMasonFields');
            $event->addInclude('huydeerpetsMasonFields.suggested_answers');
        }
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes['huydeerpets.mason.fields-section-title'] = $settings->get('huydeerpets.mason.fields-section-title', '');
            $event->attributes['huydeerpets.mason.column-count'] = (int) $settings->get('huydeerpets.mason.column-count', 1);
            $event->attributes['huydeerpets.mason.labels-as-placeholders'] = (bool) $settings->get('huydeerpets.mason.labels-as-placeholders', false);
            $event->attributes['huydeerpets.mason.fields-in-hero'] = (bool) $settings->get('huydeerpets.mason.fields-in-hero', false);
            $event->attributes['huydeerpets.mason.hide-empty-fields-section'] = (bool) $settings->get('huydeerpets.mason.hide-empty-fields-section', false);
            $event->attributes['huydeerpets.mason.tags-as-fields'] = (bool) $settings->get('huydeerpets.mason.tags-as-fields', false);
            $event->attributes['huydeerpets.mason.tags-field-name'] = $settings->get('huydeerpets.mason.tags-field-name', '');
        }
    }
}
