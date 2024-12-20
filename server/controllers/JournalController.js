require("dotenv").config();
const { Journal } = require("../models");
const Groq = require("groq-sdk");
const handleUpload = require("../utils/cloudinary");

class JournalController {
  static async read(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const journals = await Journal.findAll({
        where: {
          UserId,
        },
        order: [["date", "desc"]],
        offset: 1,
      });

      res.status(200).json({
        journals,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readLatestJournal(req, res, next) {
    try {
      const { UserId } = req.loginInfo;
      const journal = await Journal.findOne({
        where: {
          UserId,
        },
        order: [["date", "desc"]],
      });

      res.status(200).json({
        journal,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readJournalById(req, res, next) {
    try {
      const { id } = req.params;
      const journal = await Journal.findByPk(id);
      res.status(200).json({
        journal,
      });
    } catch (error) {
      next(error);
    }
  }

  // hanya createJournal yang menggunakan OpenAI
  static async createJournal(req, res, next) {
    // membuat cloudinary Response jika ada gambarnya
    let cldRes = { url: null };
    try {
      let body = {};
      const { UserId } = req.loginInfo;

      // menerima file dari multer
      if (req.file) {
        const imageBase64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + imageBase64;
        // const cldRes = await handleUpload(dataURI);

        // ini adalah response dari cloudinary
        cldRes = await handleUpload(dataURI);
        console.log(cldRes);
      }

      const { journey } = req.body;
      const content = journey;

      // const content = journey;
      // groq ai here
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      async function getContentTitle() {
        return await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Anda adalah asisten AI berbahasa Indonesia yang bertugas memberikan judul dari catatan harian pengguna. Berdasarkan teks yang diberikan, berikan judul tidak lebih dari 3 kata",
            },
            {
              role: "user",
              content: `Berdasarkan konten ${content} buatlah satu judul yang menarik dan relevan yang mencerminkan esensi dari aktivitas tersebut. Hanya menggunakan bahasa Indonesia`,
            },
          ],
          model: "llama3-8b-8192",
        });
      }
      async function toneContent() {
        return await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Anda adalah asisten AI berbahasa Indonesia yang bertugas menganalisis mood dari catatan harian pengguna. Berdasarkan teks yang diberikan, identifikasi mood utama pengguna dan jawab dengan hanya satu kata: 'senang', 'netral', atau 'sedih'. Jangan memberikan penjelasan tambahan atau kalimat lainnya, hanya satu kata yang mewakili mood pengguna. gunakan semua huruf kecil",
            },
            {
              role: "user",
              content: `Analisis tone dari teks berikut: ${content}`,
            },
          ],
          model: "llama3-8b-8192",
        });
      }
      async function getContentInsight() {
        return await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Anda adalah asisten AI berbahasa Indonesia yang bertugas memberikan wawasan atau insight berdasarkan mood dan konteks tulisan pengguna. Insight Anda harus membangun, mendukung, dan membantu pengguna merenungkan pengalaman mereka. Gunakan nada ramah dan positif, serta buat respons singkat (maksimal 2-3 kalimat) yang relevan dengan mood dan tema yang terdeteksi.`,
            },
            {
              role: "user",
              content: `Berdasarkan jurnal: ${content} berikan insight atau pemahaman mendalam tentang intisari dari kegiatan tersebut dengan bahasa Indonesia`,
            },
          ],
          model: "llama3-8b-8192",
        });
      }
      async function getQuestion() {
        return await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Anda adalah asisten AI berbahasa Indonesia yang bertugas membantu pengguna merefleksikan pengalaman mereka melalui pertanyaan yang bermakna dan relevan. Pertanyaan harus dirancang untuk membangun mental pengguna. Fokuslah pada tiga tema utama: 'perasaan', 'pembelajaran hari ini', dan 'perencanaan untuk ke depan'. Berikan satu atau dua pertanyaan setiap kali, dan gunakan nada yang ramah serta suportif.`,
            },
            {
              role: "user",
              content: `Berdasarkan jurnal ${content} berikan hanya satu pertanyaan refleksi singkat hanya dengan bahasa Indonesia`,
            },
          ],
          model: "llama3-8b-8192",
        });
      }

      const [contentTitle, contentMood, contentInsight, contentQuestion] = await Promise.all([getContentTitle(), toneContent(), getContentInsight(), getQuestion()]);

      body.title = contentTitle.choices[0]?.message?.content || "";
      body.mood = contentMood.choices[0]?.message?.content || "";
      body.aiInsight = contentInsight.choices[0]?.message?.content || "";
      body.aiQuestion = contentQuestion.choices[0]?.message?.content || "";

      const journal = await Journal.create({
        UserId,
        content,
        date: new Date(),
        aiTitle: body.title,
        mood: body.mood,
        imageUrl: cldRes.url || null,
        aiInsight: body.aiInsight,
        aiQuestion: body.aiQuestion,
      });

      res.status(200).json({
        journal,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateJournal(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const journal = await Journal.findByPk(id);

      await journal.update({ content });
    } catch (error) {
      next(error);
    }
  }

  static async deleteJournal(req, res, next) {
    try {
      const { id } = req.params;

      const journal = await Journal.findByPk(id);
      if (!journal) throw { name: "NotFound", id };

      const deletedJournal = { ...journal.get() };

      await journal.destroy();
      res.status(200).json({
        journal: deletedJournal,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JournalController;
