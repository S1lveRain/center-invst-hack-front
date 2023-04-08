import { DollarCircleFilled, AppleOutlined, ControlOutlined, DatabaseOutlined } from "@ant-design/icons";
import { VacancyT } from "../pages/SelectVacancy/SelectVacancy";
import { Option } from "../components/QuizQuestion/QuizQuestion";

export const data= [
    {
        title: 'iOS Разработчик',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
            'Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias ' +
            'officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
        link: '/iosDev',
        icon: AppleOutlined,
        id: '1',
        widgets: [
            {
                title: 'зарплата',
                value: '80,000 - 120,000 ',
                icon: DollarCircleFilled,
                suffix: "₽"
            },
            {
                title: 'зарплата',
                value: '80,000 - 120,000 ',
                icon: DollarCircleFilled,
                suffix: "₽"
            },
        ]
    },
    {
        title: 'Системный аналитик',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
            'Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias ' +
            'officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
        link: '/systemAnalytics',
        icon: ControlOutlined,
        id: '2',
        widgets: [
            {
                title: 'зарплата',
                value: '80,000 - 120,000 ',
                icon: DollarCircleFilled,
                suffix: "₽"
            },
        ]
    },
    {
        title: 'Администратор баз данных',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
            'Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias ' +
            'officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
        link: '/dbAdmin',
        icon: DatabaseOutlined,
        id: '3',
        widgets: [
        ]
    },
    {
        title: 'Аналитик баз данных',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
            'Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias ' +
            'officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
        link: '/dbAnalytics',
        icon: DatabaseOutlined,
        id: '4',
        widgets: [
            {
                title: 'зарплата',
                value: '80,000 - 120,000 ',
                icon: DollarCircleFilled,
                suffix: "₽"
            },
        ]
    },
]


export const vacancyList: VacancyT[] = [
    {
        id: 1,
        description: '10 вопросов',
        title: 'Макака'
    },
    {
        id: 2,
        description: '20 вопросов',
        title: 'Обезьян'
    }
]


const question = "Какая планета ближе к Солнцу?";
const options = [
    {id: "1", text: "Марс"},
    {id: "2", text: "Венера"},
    {id: "3", text: "Земля"},
    {id: "4", text: "Меркурий"},
];
const correctAnswers = ["1", "3"];
const correctAnswer = "4";

type quizOptionT = {
    id: string,
    text: string,
}
type quizOptionsT = Option[]

interface quizDataI {
    type: 'open' | 'multiple' | 'standart',
    quetion: string,
    options: quizOptionsT,
    correctAnswer: string | string[]
}

export const quizData = [
    {   
        type: "open",
        question: question,
        options: options,
        correctAnswer: correctAnswer,

    },
    {
        type: 'multiple',
        question: question,
        options: options,
        correctAnswer: correctAnswers,

    },
    {
        type: 'standart',
        question: question,
        options: options,
        correctAnswer: correctAnswer,

    },
    {
        type: 'multiple',
        question: question,
        options: options,
        correctAnswer: correctAnswers,

    },
    {
        type: 'open',
        question: question,
        options: options,
        correctAnswer: correctAnswers,

    },


]
