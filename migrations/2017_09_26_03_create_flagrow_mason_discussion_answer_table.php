<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('huydeerpets_mason_discussion_answer', function (Blueprint $table) {
            $table->unsignedInteger('discussion_id');
            $table->unsignedInteger('answer_id');
            $table->timestamps();

            $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('cascade');
            $table->foreign('answer_id')->references('id')->on('huydeerpets_mason_answers')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('huydeerpets_mason_discussion_answer');
    },
];
