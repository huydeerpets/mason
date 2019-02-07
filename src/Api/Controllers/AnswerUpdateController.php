<?php

namespace Huydeerpets\Mason\Api\Controllers;

use Huydeerpets\Mason\Api\Serializers\AnswerSerializer;
use Huydeerpets\Mason\Repositories\AnswerRepository;
use Huydeerpets\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class AnswerUpdateController extends AbstractShowController
{
    use AssertPermissionTrait;

    public $serializer = AnswerSerializer::class;

    /**
     * @var FieldRepository
     */
    protected $answers;

    public function __construct(AnswerRepository $answers)
    {
        $this->answers = $answers;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = Arr::get($request->getQueryParams(), 'id');

        $answer = $this->answers->findOrFail($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->answers->update($answer, $attributes);
    }
}
