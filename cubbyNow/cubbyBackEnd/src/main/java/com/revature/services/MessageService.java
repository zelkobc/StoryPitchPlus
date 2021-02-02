package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.beans.Messages;
import com.revature.data.MessageDAO;

@Service
public class MessageService {
	private MessageDAO messageDAO;
	
	@Autowired
	public MessageService(MessageDAO messageDAO){
		this.messageDAO = messageDAO;
	}
	public Messages getMessageById(Integer id)
	{
		return messageDAO.findById(id).get();
	}
	public List<Messages> getAllMessages(){
		return messageDAO.findAll();
	}
	public Integer addMessages(Messages message) {
		if (!messageDAO.existsById(message.getId())) {
			return messageDAO.save(message).getId();
		} 
		return null;
	}
	public void updateMessage(Messages message)
	{
		if (messageDAO.existsById(message.getId()))
		{
			messageDAO.save(message);
		}
	}
	public void deleteMessage(Integer id)
	{
		Messages message = messageDAO.findById(id).get();
		messageDAO.delete(message);
	}
}