<?php

namespace Huydeerpets\Mason\Access;

use Flarum\Discussion\Discussion;
use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class DiscussionPolicy extends AbstractPolicy
{
    protected $model = Discussion::class;

    public function updateHuydeerpetsMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('huydeerpets.mason.update-other-fields')) {
            return true;
        }

        if ($actor->can('huydeerpets.mason.update-own-fields') && $discussion->user_id == $actor->id) {
            return true;
        }

        return false;
    }
}
