const JournalController = require("../controllers/JournalController");
const { journalAuthorization } = require("../middlewares/authorization");
const router = require("express").Router();

// untuk membaca profil
router.get("/", JournalController.read);
// untuk membaca satu post
router.get("/:id", JournalController.readJournalById);
// hanya untuk update username dan password
router.put("/:id", journalAuthorization, JournalController.updateJournal);
// buat konfirmasinya dengan modal
// minta ketikkan usernamenya
router.delete("/:id", journalAuthorization, JournalController.deleteJournal);

module.exports = router;
