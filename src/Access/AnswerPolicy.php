<?php

namespace Huydeerpets\Mason\Access;

use Huydeerpets\Mason\Answer;
use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class AnswerPolicy extends AbstractPolicy
{
    protected $model = Answer::class;

    public function addToDiscussion(User $user, Answer $answer)
    {
        return $answer->is_suggested || $user->can('useCustomAnswer', $answer->field);
    }
}
