interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface Case {
    title: string;
    content: string;
}