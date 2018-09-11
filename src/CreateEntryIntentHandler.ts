import {
    HandlerInput,
    RequestHandler
} from 'ask-sdk-core';
import {
    Response
} from 'ask-sdk-model';
import { IJournal } from './IJournal';

const responseText = 'Dream recorded.';
const intentName = 'CreateEntryIntent';

export class CreateEntryIntentHandler implements RequestHandler {
    private journal: IJournal;
    public constructor(
        journal: IJournal) {
        this.journal = journal;
    }

    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === intentName;
    }
    
    handle(handlerInput: HandlerInput): Response | Promise<Response> {
        const speechText = responseText;
        const contents = (handlerInput.requestEnvelope.request as any)
            .intent.slots.contents.value;
        this.journal.createEntry(contents);
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }
}