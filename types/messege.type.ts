export type TMessage = {
    message_id: string,
    from_user_id: string,
    to_room_id: string,
    created_at: string,
    message_text: string,
}

export type TMessageCreation = Omit<TMessage, 'message_id' | 'created_at'>