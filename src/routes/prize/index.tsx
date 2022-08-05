import React from 'react';

import { AppContextTypes } from '../../context';
import { RouteResult } from '../../router';
import Prize from './Prize';

const action = ({ user, chats }: AppContextTypes): RouteResult => {
    const chatId = chats.game;

    // if (!chatId) {
    //     throw new Error('Chat for classic is not defined');
    // }

    return {
        title: 'Бонусы',
        chunks: ['prize'],
        pageContent: <Prize chatId={chatId} />,
        redirect: user ? undefined : '/',
    };
};

export default action;
