ALTER TABLE saved_chats REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE saved_chats;