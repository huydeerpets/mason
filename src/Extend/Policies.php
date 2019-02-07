<?php

namespace Huydeerpets\Mason\Extend;

use Huydeerpets\Mason\Access\AnswerPolicy;
use Huydeerpets\Mason\Access\DiscussionPolicy;
use Huydeerpets\Mason\Access\FieldPolicy;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class Policies implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->subscribe(AnswerPolicy::class);
        $container['events']->subscribe(DiscussionPolicy::class);
        $container['events']->subscribe(FieldPolicy::class);
    }
}
