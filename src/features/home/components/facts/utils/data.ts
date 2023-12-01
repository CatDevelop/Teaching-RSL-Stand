type factsType = {
    title: string,
    description: string,
    source: string,
    variant: 'blue' | 'grape' | 'green'
}[]

export const facts: factsType = [
    {
        title: "630 млн чел.",
        description: "численность слабослышащих\nи глухих в мире к 2030 г.",
        source: "Всемирная организация здравоохранения",
        variant: "blue"
    },
    {
        title: ">432 млн чел.",
        description: "в мире имеют проблемы \nсо слухом",
        source: "Всемирная организация здравоохранения",
        variant: "grape"
    },
    {
        title: "34 млн чел.",
        description: "слабослышащих и глухих – \nдети моложе 15 лет",
        source: "Всемирная организация здравоохранения",
        variant: "green"
    },
    {
        title: ">13 млн чел.",
        description: "в России имеют заметные \nпроблемы со слухом",
        source: "Всероссийское общество глухих",
        variant: "blue"
    },
    {
        title: "~200 тыс. чел.",
        description: "слабослышащих и глухих\nпроживают в России",
        source: "Министерство здравоохранения России",
        variant: "grape"
    },
    {
        title: "4 тыс.",
        description: "специалистов-переводчиков \nрусского жестового языка \nне хватает в России",
        source: "Всероссийское общество глухих",
        variant: "green"
    },
    {
        title: "Каждый 9",
        description: "житель Земли имеет те или иные нарушения слуха",
        source: "Всемирная организация здравоохранения",
        variant: "blue"
    },
    {
        title: "~900 чел.",
        description: "общее количество \n переводчиков русского \nжестового языка в России",
        source: "Министерство просвещения России",
        variant: "grape"
    }
]
