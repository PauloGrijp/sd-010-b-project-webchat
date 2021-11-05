async function getAllMessages(req, res) {
  return res.status(200).render('chat', { });
}

module.exports = {
  getAllMessages,
};