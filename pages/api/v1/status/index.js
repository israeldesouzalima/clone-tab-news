function Status(req, res) {
  return res.status(200).json({ message: "Tudo certo por aqui!" })
}

export default Status;