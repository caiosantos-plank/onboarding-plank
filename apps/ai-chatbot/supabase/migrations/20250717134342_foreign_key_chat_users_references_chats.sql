alter table chat_users
    add constraint fk_chat_users_chats
    foreign key (chat_id)
    references chats(id);