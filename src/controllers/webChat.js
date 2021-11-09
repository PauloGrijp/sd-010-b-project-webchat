const getAllMessages = async (req, res) => res.status(200).render('chat', {});

module.exports = {
  getAllMessages,
};