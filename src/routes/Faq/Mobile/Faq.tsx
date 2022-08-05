import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Faq.scss';
import { cn } from '../../../utils/bem-css-module';
import Layout33Content from '../../../components/Layout/Mobile/containers/Layout33Content';
import FaqTheme from './FaqTheme';

const themes = [
    {
        id: 1,
        title: 'ОБЩИЕ ПРАВИЛА И ВОПРОСЫ ПО ИГРЕ',
        questions: [
            {
                id: 1,
                title: 'Какие игры есть на проекте?',
                answer:
                    'На данный момент у нас на сайте представлены 2 игры: Classic game и Мины',
            },
            {
                id: 2,
                title: 'Как делать ставки?',
                answer:
                    'В каждом игровом режимы мы реализовали достаточно удобную и понятную навигацию. В классик режиме, чтобы сделать ставку, нужно под таймером указать ставку и нажать ИГРАТЬ, а для режима Мины навигация для ставок находится слева.',
            },
        ],
    },
    {
        id: 2,
        title: 'КАК ОБРАТИТЬСЯ В ПОДДЕРЖКУ?',
        questions: [
            {
                id: 1,
                title: 'Куда писать?',
                answer: 'Для обращения в поддержку нажмите в футере или в меню навигации если вы с телефона на Контакты(Поддержка) и вас перекинет на чат со службой поддержки.',
            },
            {
                id: 2,
                title: 'Как правильно обращаться?',
                answer:
                    'Первое, проявляйте вежливость! За угрозы, оскорбления в адрес поддержки, ваша заявка будет закрыта, а вы забанены навсегда. Во-вторых, указывайте полностью данные о вашей проблеме, а иначе ваша заявка будет проигнорирована или рассматриваться в несколько раз дольше.',
            },
        ],
    },
    {
        id: 3,
        title: 'Выплаты и Пополнения',
        questions: [
            {
                id: 1,
                title: 'Как пополнить баланс?',
                answer: 'Для пополнения своего баланса нажмите на синий значок плюса в правом верхнем углу напротив баланса. Затем у вас откроется форма с методами оплаты. Введите нужную сумму и нажмите оплатить. Вас перекинет на финальную часть оплаты.',
            },
            {
                id: 2,
                title: 'Как вывести средства?',
                answer:
                    'Для того, чтоб вывести средства на свой личный счёт, вам нужно: Нажать справа в углу на синий значок плюса, дальше откроется форма, где вы должны нажать на вкладку ВЫВОД. Дальше вам осталось выбрать метод вывода и указать свой номер счёта и сумму.',
            },
            {
                id: 3,
                title: 'Есть ли ограничения?',
                answer:
                    'На сайте нет никаких ограничений на вывод, кроме защиты от АБУЗЕРОВ. Для того, чтобы вывести средства, вам нужно сделать обязательный депозит мин.50 руб и после депозита отыграть 50 рублей в режиме мины с коэффом не ниже 1.6х. Данное ограничение действует единожды и будет снято автоматически после его первого выполнения.',
            },
        ],
    },
    {
        id: 4,
        title: 'Выигрыш',
        questions: [
            {
                id: 1,
                title: 'Есть ли ограничения на выигрыш?',
                answer: 'Да, как и у всех новых и ЧЕСТНЫХ проектов в первое время есть ограничения на макс.сумму выигрыша за раз. Со временем ограничения ослабляются.',
            },
            {
                id: 2,
                title: 'Я не делал депозитов, у меня будут ограничения?',
                answer:
                    'В качестве защиты от АБУЗЕРОВ для тех, кто не делал депозитов, мы вынуждены сделать ограничения на макс.сумму вашего баланса. Допустим вы в игре выиграли 300 рублей, но вы не делали депозитов, то на баланс вам начислится 200 (сумма может меняться) рублей, а остальная часть от 300 обрежется.',
            },
            {
                id: 3,
                title: 'Как быстро происходит выплата?',
                answer:
                    'Выплата может идти до 24 часов. В редких исключениях свыше 24 часов. Всё зависит от того, насколько платёжный агрегатор в данный момент подачи вашей выплаты будет загружен.',
            },
        ],
    },

    {
        id: 5,
        title: 'Промокоды и ежедневные монеты',
        questions: [
            {
                id: 1,
                title: 'Можно ли у вас создавать промокоды?',
                answer: 'Да, нажмите в правом углу на подарочек и откроется страница, где вы можете создавать промокоды.',
            },
            {
                id: 2,
                title: 'Есть ли ограничения для создания промокодов?',
                answer:
                    'Для того, чтобы создавать промокоды. Вам нужно быть подписанным на нашу группу ВК, а так же иметь депозит.',
            },
            {
                id: 3,
                title: 'Как активировать промокоды?',
                answer:
                    'Для того, чтобы активировать промокод, вам нужно выполнить 3 условия. Все условия указаны на странице активации промокода.',
            },
            {
                id: 4,
                title: 'Что такое бесплатные монеты?',
                answer:
                    'Вступай в группу ВК и получай до 3 рублей каждый день.',
            },
        ],
    },

    {
        id: 6,
        title: 'Партнёрская программа',
        questions: [
            {
                id: 1,
                title: 'Есть ли у вас партнёрская программа?',
                answer: 'Да, у нас имеется партнёрская программа. Перейти к ней можно по ссылке в нижней части сайта.',
            },
            {
                id: 2,
                title: 'Какие условия партнёрской программы?',
                answer:
                    'За приглашённого Вами реферала, Вы будете получать пожизненно до 10% с его депозитов, а Ваш реферал получит 5 ₽ на баланс.',
            },
            {
                id: 3,
                title: 'Мой реферал пополнил 100 рублей, сколько я получу?',
                answer:
                    'С каждого пополнения Вам будет отчисляться %, если у вас это 10%, то Вы получите 10 рублей.',
            },
        ],
    },

    {
        id: 7,
        title: 'Правила чата',
        questions: [
            {
                id: 1,
                title: 'Какие правила чата я должен соблюдать?',
                answer: (                    
                <span>
                    1. Запрещается оскорбление игроков.<br />
                    2. Запрещается оскорбление сайта и его представителей.<br />
                    3. Запрещается пиарить другие сайты, каналы и т.д.<br />
                    4. Запрещается флудить однотипными сообщениями, писать все буквы Caps lock'ом.
                  </span>),
            },
            {
                id: 2,
                title: 'Что мне будет за нарушение правил?',
                answer:
                    'За каждое нарушение вы будете получать штрафной балл, чем больше нарушений тем больше время блокировки общего и личного чата. Блокировка не обсуждается!',
            },
        ],
    },

    {
        id: 8,
        title: 'Сотрудничество для блогеров и групп.',
        questions: [
            {
                id: 1,
                title: 'Какие условия для сотрудничества?',
                answer: (                    
                <span>
                    1. Должно быть не менее 1к просмотров в среднем у видео и не менее 1к подписчиков.<br />
                    2. У ВК и TG групп от 500 просмотров каждого поста и от 1к подписчиков .<br />
                  </span>),
            },
            {
                id: 2,
                title: 'Что мне выдадут при сотрудничестве?',
                answer:
                    'Условия сотрудничества определяются нами, выгодно ли нам или нет. Каждый случай индивидуален и будет решаться напрямую с вами.',
            },
        ],
    },
];
const cnFaq = cn(s, 'Faq');

const Faq: React.FC = () => {
    useStyles(s);

    return (
        <Layout33Content
            centerContent={
                <div className={cnFaq('list')}>
                    <h4 className={cnFaq('title')}>Willy - Подробнее о проекте</h4>
                    <p className={cnFaq('description')}>
                        Если у вас возникли вопросы, то скорее всего вы найдёте ответ на него в наших подсказках снизу.
                    </p>
                    {themes.map((theme, index) => {
                        return <FaqTheme theme={theme} key={theme.id} id={index + 1} />;
                    })}
                </div>
            }
        />
    );
};

export default Faq;
