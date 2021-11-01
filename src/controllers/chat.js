async function getAllMessages(req, res) {
  return res.status(200).render('chat', { messages: [
      {
        chatMessage: 'Olá como vai?',
        nickname: 'Roger',
        timestamp: new Date().toLocaleString().replace(/\//g, '-'),
      },
      {
        chatMessage: 'Estou bem, obrigado!',
        nickname: 'David',
        timestamp: new Date().toLocaleString().replace(/\//g, '-'),
      },
    ],
  });
}

module.exports = {
  getAllMessages,
};