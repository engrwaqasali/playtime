import React, { useEffect, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { useSubscription } from '@apollo/client';

import s from './Layout.scss';
import { cn } from '../../utils/bem-css-module';
import Sidebar from './Web/Sidebar/Sidebar';
import LayoutHeader from './Web/Header/LayoutHeader';
import Footer from '../../routes/welcome/Footer/Footer';
import LayoutHeaderMobile from './Mobile/Header/LayoutHeader';
import SidebarMobile from './Mobile/Sidebar/Sidebar';
import PreLoader from '../PreLoader/PreLoader';
import PopUp from './Mobile/PopUp/PopUp';
import Chat from '../Chat/Mobile/Chat';
import {
    AddNotificationDocument,
    AddNotificationMutationVariables,
    BalanceSubscriptionDocument,
    BalanceSubscriptionSubscription,
    BalanceSubscriptionSubscriptionVariables,
    MeDocument,
    MeQuery,
    MeQueryVariables,
    Notification,
} from '../../__generated__/graphql';
import { makeWarningNotification } from '../../utils/apollo/notifications';

export interface LayoutProps {
    children: React.ReactNode;
    fullScreen?: Boolean;
}

const cnLayout = cn(s, 'Layout');

const Layout: React.FC<LayoutProps> = ({ children, fullScreen }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [popUp, setPopUp] = useState(false);
    const [chat, setChat] = useState(false);
    useEffect(() => {
        if (typeof window !== 'object') {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isLoading]);
    useStyles(s);

    useSubscription<BalanceSubscriptionSubscription, BalanceSubscriptionSubscriptionVariables>(
        BalanceSubscriptionDocument,
        {
            onSubscriptionData: async ({ client, subscriptionData }) => {
                const { data } = subscriptionData;

                if (data?.balance === undefined || data.balance === null) {
                    return;
                }

                const meQuery = client.cache.readQuery<MeQuery, MeQueryVariables>({ query: MeDocument });
                if (!meQuery?.me) {
                    return;
                }

                const { balance } = data;

                const { me } = meQuery;
                client.cache.modify({
                    id: client.cache.identify(me),
                    fields: { money: () => balance.money },
                });

                if (balance.maxReached) {
                    await client.mutate<Notification, AddNotificationMutationVariables>({
                        mutation: AddNotificationDocument,
                        variables: { input: makeWarningNotification('MAX_BALANCE_REACHED') },
                    });
                }
            },
        },
    );

    const popUpChange = () => {
        setPopUp(!popUp);
    };

    const chatChange = () => {
        setChat(!chat);
    };

    if (isLoading) {
        return <PreLoader />;
    }

    if (typeof window !== 'undefined' && window.screen.width < 992) {
        if (fullScreen || chat) {
            return <>{chat ? <Chat chatId="1" closeChat={() => chatChange()} /> : <div>{children}</div>}</>;
        }

        return (
            <div className={cnLayout()}>
                <div className={cnLayout('Main')}>
                    <LayoutHeaderMobile />
                    {popUp ? <PopUp close={popUpChange} /> : <div className={cnLayout('Content')}>{children}</div>}
                    <SidebarMobile
                        openPopUp={popUpChange}
                        openChat={() => chatChange()}
                        closePopUp={() => setPopUp(false)}
                    />
                </div>
            </div>
        );
    }
    return (
        <div className={cnLayout()}>
            <Sidebar />
            <div className={cnLayout('Main')}>
                <LayoutHeader />
                <div className={cnLayout('Content')}>{children}</div>
                <Footer isFluid />
            </div>
        </div>
    );
};

export default Layout;
