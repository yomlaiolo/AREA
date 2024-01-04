import { ActionDto, ReactionDto } from '../dto/create-area.dto';

// Actions #########################################################
// Interval
import { intervalAction } from './actions/interval/interval';
// Google
import { receiveEmailAction } from './actions/google/receive_email';

// Reactions #######################################################
import { printReaction } from './reactions/print/print';

export const actionsList = {
    "interval": intervalAction,
    "receive_email": receiveEmailAction,
};

export const reactionsList = {
    "print": printReaction,
};

export function factoryAction(actionDto: ActionDto): Function | null {
    if (actionDto.type in actionsList) return actionsList[actionDto.type];
    return null;
}

export function factoryReaction(reactionDto: ReactionDto): Function | null {
    if (reactionDto.type in reactionsList) return reactionsList[reactionDto.type];
    return null;
}
