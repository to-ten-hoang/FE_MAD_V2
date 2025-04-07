export type MessageType = {
    id: string;
    sender: 'me' | 'other';
    text?: string;
    time: string;
    file?: {
      name: string;
      type: string;
      size: string;
    };
  };
  
  export type ChatContact = {
    id: string;
    name: string;
    avatar: any;
    lastMessage: string;
    time: string;
    unreadCount?: number;
  };
  