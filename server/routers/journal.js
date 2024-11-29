const JournalController = require("../controllers/JournalController");
const { journalAuthorization } = require("../middlewares/authorization");
const middlewareUpload = require("../utils/multer");
const router = require("express").Router();

// untuk timeline
router.get("/", JournalController.read);

// untuk latest journal
router.get("/latest", JournalController.readLatestJournal);

// untuk membuat journal
router.post("/create", middlewareUpload, JournalController.createJournal);

// untuk membaca satu post ketika diklik
router.get("/:id", journalAuthorization, JournalController.readJournalById);

// hanya untuk update journal saja
router.patch("/:id", journalAuthorization, JournalController.updateJournal);

// buat konfirmasinya dengan modal
router.delete("/:id", journalAuthorization, JournalController.deleteJournal);
// navigate ke login
// hapus localstoragenya di client

module.exports = router;
