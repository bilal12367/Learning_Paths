
// User Events Type Definitions

export type TTopic = 'user.loggedIn' | 'user.created';

export interface UserLoggedEvent {
    userId: string;
    username: string;
    time: string;
}

export interface UserCreatedEvent {
    userId: string;
    username: string;
    time: string;
}